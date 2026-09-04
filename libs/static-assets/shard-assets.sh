#!/bin/bash

# Set the current working directory as the default
DIRECTORY="."

# If a directory argument is provided, use it instead
[ ! -z "$1" ] && DIRECTORY="$1"

# Shard assets with awk
shard_0=$(find "$DIRECTORY" -type f | awk 'NR%3==0')
shard_1=$(find "$DIRECTORY" -type f | awk 'NR%3==1')
shard_2=$(find "$DIRECTORY" -type f | awk 'NR%3==2')

# If non-empty create the zip file
[ -z "$shard_0" ] || echo $shard_0 | xargs zip -r /assets_shard_0.zip
[ -z "$shard_1" ] || echo $shard_1 | xargs zip -r /assets_shard_1.zip
[ -z "$shard_2" ] || echo $shard_2 | xargs zip -r /assets_shard_2.zip
