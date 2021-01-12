#!/usr/bin/env bash

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
root_dir=$( realpath "${script_dir}/.." )
src_dir="${root_dir}/pixmaps"
dest_dir="${root_dir}/src/pixmaps"
manifest="${dest_dir}/manifest.json"

mkdir -p $dest_dir

for file in $src_dir/*; do
  dest_jpg="${dest_dir}/$(basename $file)"
  dest_webp="${dest_dir}/$(basename $file .jpg).webp"
  convert $file -quality 90 -resize 1400x $dest_jpg
  convert $file -quality 90 -resize 1400x $dest_webp
done

cd $dest_dir
ls | grep -v manifest | jq -R -s -c 'split("\n")[:-1]' > $manifest
