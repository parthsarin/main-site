#!/usr/bin/env bash
# process_portfolio.sh — media pipeline for /portfolio
#
# Inputs live at ~/Desktop/portfolio
# Outputs land in ./img/portfolio (relative to repo root)
#
# Requires: ffmpeg, imagemagick (magick), python3 (will create a local venv
#           with rembg + opencv-python + numpy + pillow on first run).

set -eo pipefail

SRC="${HOME}/Desktop/portfolio"
DEST="img/portfolio"
VENV="scripts/.venv"

mkdir -p "${DEST}"

# ----- venv for python deps (rembg, opencv, pillow) -----
if [ ! -d "${VENV}" ]; then
  echo ">> creating python venv at ${VENV}"
  python3 -m venv "${VENV}"
  "${VENV}/bin/pip" install --upgrade pip >/dev/null
  "${VENV}/bin/pip" install "rembg[cli,cpu]" click opencv-python pillow numpy onnxruntime >/dev/null
fi
PY="${VENV}/bin/python"

# ===== 1. MOV -> GIF =====
echo ">> MOV -> GIF"

make_gif() {
  local in_file="$1"
  local out_file="$2"
  local ss="$3"     # start seconds (or "")
  local to="$4"     # end seconds (or "")
  local fps="${5:-12}"
  local width="${6:-720}"
  local palette
  palette="$(mktemp -d)/palette.png"

  local trim=()
  [ -n "${ss}" ] && trim+=("-ss" "${ss}")
  [ -n "${to}" ] && trim+=("-to" "${to}")

  ffmpeg -y -hide_banner -loglevel error "${trim[@]}" -i "${in_file}" \
    -vf "fps=${fps},scale=${width}:-1:flags=lanczos,palettegen=max_colors=128" "${palette}"

  ffmpeg -y -hide_banner -loglevel error "${trim[@]}" -i "${in_file}" -i "${palette}" \
    -lavfi "fps=${fps},scale=${width}:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" \
    -loop 0 "${out_file}"

  rm -rf "$(dirname "${palette}")"
  echo "   -> ${out_file} ($(du -h "${out_file}" | cut -f1))"
}

make_gif "${SRC}/IMG_7304.MOV" "${DEST}/recognition-a.gif" "9" "22" 12 640
make_gif "${SRC}/IMG_7524.MOV" "${DEST}/recognition-c.gif" ""  ""   12 640

# retry smaller if any gif is huge
for g in recognition-a recognition-c; do
  f="${DEST}/${g}.gif"
  [ -f "${f}" ] || continue
  size_mb=$(du -m "${f}" | cut -f1)
  if [ "${size_mb}" -gt 8 ]; then
    echo ">> ${g}.gif is ${size_mb}MB; re-rendering at 480px / 10fps"
    if [ "${g}" = "recognition-a" ]; then
      make_gif "${SRC}/IMG_7304.MOV" "${f}" "9" "22" 10 480
    else
      make_gif "${SRC}/IMG_7524.MOV" "${f}" "" "" 10 480
    fi
  fi
done

# ===== 2. Background removal (rembg) =====
echo ">> rembg background removal"

rembg_one() {
  local in_file="$1"
  local out_file="$2"
  "${VENV}/bin/rembg" i "${in_file}" "${out_file}"
  echo "   -> ${out_file}"
}

rembg_one "${SRC}/IMG_8936.jpeg" "${DEST}/beanie-holding.png"
rembg_one "${SRC}/IMG_2372.JPG"  "${DEST}/cake-b.png"

# shrink cutout PNGs (rembg outputs full-resolution)
for f in beanie-holding cake-b; do
  magick "${DEST}/${f}.png" -auto-orient -resize "1400x1400>" -strip \
    -define png:compression-level=9 "${DEST}/${f}.png"
done

# ===== 3. Background removal + face blur (IMG_8937) =====
echo ">> beanie-wearing (rembg + face blur)"

rembg_one "${SRC}/IMG_8937.jpeg" "${DEST}/beanie-wearing-raw.png"

"${PY}" scripts/blur_face.py \
  "${DEST}/beanie-wearing-raw.png" \
  "${DEST}/beanie-wearing.png"

rm -f "${DEST}/beanie-wearing-raw.png"

magick "${DEST}/beanie-wearing.png" -auto-orient -resize "1400x1400>" -strip \
  -define png:compression-level=9 "${DEST}/beanie-wearing.png"

# ===== 4. Resize JPEGs =====
echo ">> resize JPEGs"

resize_img() {
  local in_file="$1"
  local out_file="$2"
  local max="${3:-1600}"
  magick "${in_file}" -auto-orient -resize "${max}x${max}>" -strip -quality 82 "${out_file}"
  echo "   -> ${out_file} ($(du -h "${out_file}" | cut -f1))"
}

resize_img "${SRC}/IMG_4604.JPG" "${DEST}/nectarine.jpg" 1800
resize_img "${SRC}/IMG_2692.JPG" "${DEST}/cake-a.jpg"    1600
resize_img "${SRC}/IMG_7383.PNG" "${DEST}/recognition-b.jpg" 1200
resize_img "${SRC}/IMG_7313.jpeg" "${DEST}/prosthetic-a.jpg" 1400
resize_img "${SRC}/IMG_7322.jpeg" "${DEST}/prosthetic-b.jpg" 1400
resize_img "${SRC}/IMG_7765.jpeg" "${DEST}/bloom.jpg"        1400
resize_img "${SRC}/IMG_8683.jpeg" "${DEST}/crochet-a.jpg"    1400
resize_img "${SRC}/IMG_8684.jpeg" "${DEST}/crochet-b.jpg"    1400
resize_img "${SRC}/IMG_9591.jpeg" "${DEST}/crochet-d.jpg"    1400

echo ""
echo ">> done."
ls -lh "${DEST}"
