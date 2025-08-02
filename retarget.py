import bpy
import sys


def retarget_fbx(source_path, target_path, output_path):
    # --- Clean scene ---
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    # --- Import source armature ---
    bpy.ops.import_scene.fbx(filepath=source_path)
    source_arm = next(obj for obj in bpy.context.selected_objects if obj.type == 'ARMATURE')

    # --- Import target armature ---
    bpy.ops.import_scene.fbx(filepath=target_path)
    target_arm = next(obj for obj in bpy.context.selected_objects 
                      if obj.type == 'ARMATURE' and obj != source_arm)

    # --- Clear any animation on target ---
    if target_arm.animation_data:
        target_arm.animation_data_clear()

    # --- Match target edit bones exactly to source (head, tail, roll) ---
    bpy.context.view_layer.objects.active = source_arm
    bpy.ops.object.mode_set(mode='EDIT')
    source_edit_bones = {bone.name: bone for bone in source_arm.data.edit_bones}
    
    bpy.context.view_layer.objects.active = target_arm
    bpy.ops.object.mode_set(mode='EDIT')
    
    for target_bone in target_arm.data.edit_bones:
        if target_bone.name in source_edit_bones:
            source_bone = source_edit_bones[target_bone.name]
            target_bone.head = source_bone.head.copy()
            target_bone.tail = source_bone.tail.copy()
            target_bone.roll = source_bone.roll
    
    bpy.ops.object.mode_set(mode='OBJECT')

    # --- Bake source animation onto target per-frame ---
    if source_arm.animation_data and source_arm.animation_data.action:
        action = source_arm.animation_data.action
        frame_range = action.frame_range
        start_frame = int(frame_range[0])
        end_frame = int(frame_range[1])
        
        # Store rest pose matrices for both armatures
        bpy.context.scene.frame_set(start_frame)
        source_rest_matrices = {}
        target_rest_matrices = {}
        
        # Find root bones (bones with no parent)
        source_root_bones = [bone.name for bone in source_arm.pose.bones if bone.parent is None]
        target_root_bones = [bone.name for bone in target_arm.pose.bones if bone.parent is None]
        
        for bone in source_arm.pose.bones:
            if bone.name in [b.name for b in target_arm.pose.bones]:
                source_rest_matrices[bone.name] = source_arm.matrix_world @ bone.bone.matrix_local
                target_bone = target_arm.pose.bones[bone.name]
                target_rest_matrices[bone.name] = target_arm.matrix_world @ target_bone.bone.matrix_local
        
        # Bake animation frame by frame
        for frame in range(start_frame, end_frame + 1):
            bpy.context.scene.frame_set(frame)
            
            for bone_name in source_rest_matrices:
                if bone_name in [b.name for b in target_arm.pose.bones]:
                    source_bone = source_arm.pose.bones[bone_name]
                    target_bone = target_arm.pose.bones[bone_name]
                    
                    # Calculate world-space transform of source bone at current frame
                    source_current_matrix = source_arm.matrix_world @ source_bone.matrix
                    
                    # Calculate the transform difference from rest pose
                    source_rest_matrix = source_rest_matrices[bone_name]
                    transform_diff = source_current_matrix @ source_rest_matrix.inverted()
                    
                    # Apply same transform to target's rest pose
                    target_rest_matrix = target_rest_matrices[bone_name]
                    target_new_matrix = transform_diff @ target_rest_matrix
                    
                    # Convert back to bone's local space
                    target_bone.matrix = target_arm.matrix_world.inverted() @ target_new_matrix
                    
                    # Keyframe the transform - only location for root bones
                    if bone_name in target_root_bones:
                        target_bone.keyframe_insert(data_path="location", frame=frame)
                    target_bone.keyframe_insert(data_path="rotation_quaternion", frame=frame)
                    bpy.context.view_layer.update()

    # --- Replace target meshes with source meshes ---
    # Find all mesh objects parented to target armature
    target_meshes = [obj for obj in bpy.data.objects if obj.type == 'MESH' and obj.parent == target_arm]
    
    # Find all mesh objects parented to source armature
    source_meshes = [obj for obj in bpy.data.objects if obj.type == 'MESH' and obj.parent == source_arm]
    
    # Delete target meshes
    bpy.ops.object.select_all(action='DESELECT')
    for mesh_obj in target_meshes:
        mesh_obj.select_set(True)
    if target_meshes:
        bpy.ops.object.delete()
    
    # Process each source mesh
    for mesh_obj in source_meshes:
        # Duplicate the mesh
        bpy.ops.object.select_all(action='DESELECT')
        mesh_obj.select_set(True)
        bpy.context.view_layer.objects.active = mesh_obj
        bpy.ops.object.duplicate()
        
        duplicated_mesh = bpy.context.active_object
        duplicated_mesh.data = mesh_obj.data.copy()  # Create independent mesh data
        
        # Unparent and keep transformation
        bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
        # Remove existing armature modifier
        for modifier in list(duplicated_mesh.modifiers):
            if modifier.type == 'ARMATURE':
                duplicated_mesh.modifiers.remove(modifier)
        
        # Add new armature modifier pointing to target armature
        armature_modifier = duplicated_mesh.modifiers.new(name="Armature", type='ARMATURE')
        armature_modifier.object = target_arm
        
        # Parent to target armature while keeping transforms
        bpy.ops.object.select_all(action='DESELECT')
        duplicated_mesh.select_set(True)
        target_arm.select_set(True)
        bpy.context.view_layer.objects.active = target_arm
        bpy.ops.object.parent_set(type='ARMATURE', keep_transform=True)
    
    bpy.context.view_layer.update()

    # --- Delete source hierarchy and orphaned actions ---
    objs = [source_arm] + list(source_arm.children_recursive)
    bpy.ops.object.select_all(action='DESELECT')
    for obj in objs:
        obj.select_set(True)
    bpy.ops.object.delete()

    for action in bpy.data.actions:
        # Clear fake user to allow proper cleanup
        action.use_fake_user = False
        if action.users == 0:
            bpy.data.actions.remove(action)

    # --- Export resulting GLB ---
    bpy.ops.object.select_all(action='DESELECT')
    target_arm.select_set(True)
    bpy.context.view_layer.objects.active = target_arm
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        use_selection=False,
        export_format='GLB'
    )


if __name__ == "__main__":
    # Find the -- separator and get arguments after it
    try:
        separator_index = sys.argv.index('--')
        script_args = sys.argv[separator_index + 1:]
    except ValueError:
        # No -- found, assume all args after script name are for us
        script_args = sys.argv[1:]
    
    if len(script_args) != 3:
        print("Usage: blender --background --python retarget.py -- <source_fbx> <target_fbx> <output_fbx>")
        print(f"Received {len(script_args)} arguments: {script_args}")
        sys.exit(1)
    
    source_path = script_args[0]
    target_path = script_args[1]
    output_path = script_args[2]
    
    print(f"Retargeting: {source_path} -> {target_path} -> {output_path}")
    retarget_fbx(source_path, target_path, output_path)
    print("Retargeting complete!")

