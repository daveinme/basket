#!/usr/bin/env bash

BUCKET="basket"
MATCH="14_AGROPOLI - MONDRAGONE"
SRC="/home/daveinme/Scrivania/baskkk/done/firma"

encoded_match=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$MATCH")

echo "=== Upload Mondragone ==="
for photo in "$SRC"/*.jpg; do
  [ -f "$photo" ] || continue
  filename=$(basename "$photo")
  encoded_file=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$filename")
  wrangler r2 object put "${BUCKET}/basket/${encoded_match}/${encoded_file}" \
    --file "$photo" \
    --content-type "image/jpeg" \
    --remote
  echo "✓ $filename"
done

echo "Fatto!"
