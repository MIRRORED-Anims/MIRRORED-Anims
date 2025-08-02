import boto3
import os
from collections import defaultdict
from urllib.parse import urlparse

def download_specific_uuids(s3_uri, uuids, output_dir='downloads'):
    """Download specific UUIDs for all allowed characters."""
    s3 = boto3.client('s3')
    parsed = urlparse(s3_uri)
    bucket = parsed.netloc
    prefix = parsed.path.lstrip('/')

    # Define allowed character names
    allowed_chars = {'Ortiz', 'Abe', 'Aj', 'Amy', 'claire', 'James', 'Jolleen', 'kaya', 'Ty'}

    print(f"Downloading {len(uuids)} UUIDs for {len(allowed_chars)} characters")

    # Download each file into {uuid}/{char_name}.fbx
    os.makedirs(output_dir, exist_ok=True)
    for uuid in uuids:
        for char_name in allowed_chars:
            key = f"{prefix}{uuid}_{char_name}.fbx"
            dest_path = os.path.join(output_dir, uuid, f"{char_name}.fbx")
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            print(f"Downloading s3://{bucket}/{key} → {dest_path}")
            try:
                s3.download_file(bucket, key, dest_path)
            except Exception as e:
                print(f"Failed to download {key}: {e}")

def download_n_first_uuids(s3_uri, n, skip_first=0, output_dir='downloads', specific_uuids=None):
    """Download UUIDs - either find common ones automatically or use specific provided list."""
    if specific_uuids:
        download_specific_uuids(s3_uri, specific_uuids, output_dir)
        return
        
    s3 = boto3.client('s3')
    parsed = urlparse(s3_uri)
    bucket = parsed.netloc
    prefix = parsed.path.lstrip('/')

    # Define allowed character names
    allowed_chars = {'Ortiz', 'Abe', 'Aj', 'Amy', 'claire', 'James', 'Jolleen', 'kaya', 'Ty'}

    # Step 1: list all .fbx files directly
    paginator = s3.get_paginator('list_objects_v2')
    page_iterator = paginator.paginate(Bucket=bucket, Prefix=prefix)
    
    # Step 2: build mapping: char_name -> list of uuids
    char_files = defaultdict(list)
    for page in page_iterator:
        for obj in page.get('Contents', []):
            key = obj['Key']
            if key.endswith('.fbx'):
                filename = os.path.basename(key).replace('.fbx', '')
                # Expect format: uuid_character_name
                if '_' in filename:
                    parts = filename.split('_')
                    if len(parts) >= 2:
                        uuid = '_'.join(parts[:-1])  # Everything except last part
                        char_name = parts[-1]       # Last part is character name
                        
                        # Filter to only allowed characters
                        if char_name in allowed_chars:
                            char_files[char_name].append(uuid)

    # Limit to n UUIDs per character and sort
    for char_name in char_files:
        char_files[char_name] = sorted(char_files[char_name])[:n]

    # Step 3: determine N common UUIDs across all characters
    if not char_files:
        print("No character files found")
        return
    
    char_uuid_sets = [set(v) for v in char_files.values()]
    if not char_uuid_sets:
        print("No UUIDs found for any characters")
        return
    
    common_uuids = set.intersection(*char_uuid_sets)
    all_common_sorted = sorted(common_uuids)
    selected_uuids = all_common_sorted[skip_first:skip_first+n]

    print(f"Found {len(all_common_sorted)} total common UUIDs")
    print(f"Skipping first {skip_first}, downloading {len(selected_uuids)} UUIDs")

    # Step 4: download each file into {uuid}/{char_name}.fbx
    os.makedirs(output_dir, exist_ok=True)
    for uuid in selected_uuids:
        for char_name in char_files:
            key = f"{prefix}{uuid}_{char_name}.fbx"
            dest_path = os.path.join(output_dir, uuid, f"{char_name}.fbx")
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            print(f"Downloading s3://{bucket}/{key} → {dest_path}")
            s3.download_file(bucket, key, dest_path)

if __name__ == "__main__":
    # Option 1: Download specific UUIDs
    specific_uuids = [
        "009b2b9b-2974-40f2-8825-feb4db36a6b2",
        # Add more UUIDs here
    ]
    download_n_first_uuids("s3://kinetix-rd-storage/retargeting/outputs/", n=30, specific_uuids=specific_uuids)
    
    # Option 2: Auto-discover common UUIDs (original behavior)
    # download_n_first_uuids("s3://kinetix-rd-storage/retargeting/outputs/", n=30, skip_first=20)

