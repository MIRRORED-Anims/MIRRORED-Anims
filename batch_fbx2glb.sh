#!/usr/bin/env bash
# fbx2glb.sh – loop over all .fbx in a folder

FBX_DIR="/home/theo/Documents/MIRRORED-Anims-webpage/public/mixamo_fbx/Standing 1H Magic Attack 02"
BLENDER="/home/theo/Documents/blender-4.4.0-linux-x64/blender"
SCRIPT="./fbx2glb.py"

for f in "$FBX_DIR"/*.fbx; do
  echo "$BLENDER --background --python $SCRIPT -- $f"
  "$BLENDER" --background --python "$SCRIPT" -- "$f"
done