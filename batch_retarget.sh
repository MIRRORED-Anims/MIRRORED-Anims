#!/bin/bash

# Check if correct number of arguments provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source_folder> <target_folder>"
    echo "Example: $0 ./public/fbx/Standing\\ 1H\\ Magic\\ Attack\\ 02/ ./public/mixamo_fbx/Standing\\ 1H\\ Magic\\ Attack\\ 02/"
    exit 1
fi

source_folder="$1"
target_folder="$2"

# Check if folders exist
if [ ! -d "$source_folder" ]; then
    echo "Error: Source folder '$source_folder' does not exist"
    exit 1
fi

if [ ! -d "$target_folder" ]; then
    echo "Error: Target folder '$target_folder' does not exist"
    exit 1
fi

# Check if blender is available
if ! /home/theo/Documents/blender-4.4.0-linux-x64/blender -v blender &> /dev/null; then
    echo "Error: Blender is not installed or not in PATH"
    exit 1
fi

echo "Processing FBX files from:"
echo "  Source: $source_folder"
echo "  Target: $target_folder"
echo ""

# Counter for processed files
processed=0
errors=0

# Find all FBX files in source folder
for source_fbx in "$source_folder"/*.fbx; do
    # Check if file exists (in case no .fbx files found)
    if [ ! -f "$source_fbx" ]; then
        echo "No FBX files found in source folder"
        exit 1
    fi
    
    # Get just the filename without path
    filename=$(basename "$source_fbx")
    
    # Construct target path
    target_fbx="$target_folder/$filename"
    
    # Check if corresponding target file exists
    if [ ! -f "$target_fbx" ]; then
        echo "Warning: Target file '$target_fbx' not found, skipping '$filename'"
        continue
    fi
    
    echo "Processing: $filename"
    echo "  Source: $source_fbx"
    echo "  Target: $target_fbx"
    echo "  Output: $source_fbx (overwrite)"
    # Echo full command
    echo "/home/theo/Documents/blender-4.4.0-linux-x64/blender --python retarget.py -- '"$source_fbx"' '"$target_fbx"' '"$source_fbx"' > /dev/null 2>&1"
    
    # Run the retargeting script with Blender
    #if /home/theo/Documents/blender-4.4.0-linux-x64/blender --python retarget.py -- '"$source_fbx"' '"$target_fbx"' '"$source_fbx"'; then
    #    echo "  ✓ Success"
    #    ((processed++))
    #else
    #    echo "  ✗ Error processing $filename"
    #    ((errors++))
    #fi
    echo ""
done

echo "Processing complete!"
echo "Files processed: $processed"
if [ $errors -gt 0 ]; then
    echo "Errors: $errors"
    exit 1
fi 