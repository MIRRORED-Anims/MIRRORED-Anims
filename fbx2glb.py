# fbx2glb.py
import bpy
import sys
import os

def convert_fbx_to_glb(input_path: str):
    # start from an empty scene to avoid leftovers
    bpy.ops.wm.read_factory_settings(use_empty=True)
    # import FBX
    bpy.ops.import_scene.fbx(filepath=input_path)
    # export GLB alongside, yielding e.g. blabla.fbx.glb
    output_path = input_path + ".glb"
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format='GLB'
    )
    print(f"Exported → {output_path}")

if __name__ == "__main__":
    # Blender injects its own args; real script args come after “--”
    if "--" in sys.argv:
        fbxpath = sys.argv[sys.argv.index("--") + 1]
        convert_fbx_to_glb(fbxpath)
    else:
        print("Usage: blender --python fbx2glb.py -- <path/to/file.fbx>")
