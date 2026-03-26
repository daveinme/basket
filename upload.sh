#!/usr/bin/env bash
# Upload tutte le foto su R2 e poi i file del sito

BUCKET="basket"
SRC="/home/daveinme/Scrivania/bas/1_PARTITE"

echo "=== Upload foto partite ==="
for dir in "$SRC"/*/; do
  match=$(basename "$dir")
  echo "→ $match"
  for photo in "$dir"*.jpg; do
    [ -f "$photo" ] || continue
    filename=$(basename "$photo")
    # URL-encoda spazi e caratteri speciali nel path R2
    encoded_match=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$match")
    encoded_file=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$filename")
    r2_key="${BUCKET}/basket/${encoded_match}/${encoded_file}"
    # Salta se già presente su R2
    if wrangler r2 object get "$r2_key" --pipe --remote > /dev/null 2>&1; then
      echo "  skip: $filename"
      continue
    fi
    wrangler r2 object put "$r2_key" \
      --file "$photo" \
      --content-type "image/jpeg" \
      --remote
  done
done

echo ""
echo "=== Upload file sito ==="
SITE_DIR="$(dirname "$0")"
for f in index.html style.css data.js app.js; do
  case "$f" in
    *.html) ct="text/html" ;;
    *.css)  ct="text/css" ;;
    *.js)   ct="application/javascript" ;;
  esac
  wrangler r2 object put "${BUCKET}/${f}" \
    --file "${SITE_DIR}/${f}" \
    --content-type "$ct" \
    --remote
  echo "✓ $f"
done

echo ""
echo "Fatto! Sito disponibile su:"
echo "https://pub-7ec8eda6eaf64b8f846c26d12ee3eb17.r2.dev/basket/index.html"
