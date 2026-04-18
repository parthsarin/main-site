#!/usr/bin/env python3
"""Blur the face region of an image (preserves alpha channel if present).

Usage: blur_face.py INPUT OUTPUT

Strategy:
  1. Try OpenCV Haar cascade face detection on the RGB portion.
  2. If a face is found, apply a heavy gaussian blur to that bbox
     (expanded slightly to cover the whole head + neck).
  3. If no face is found, fall back to blurring the top third of
     non-transparent pixels (reasonable for a standing portrait
     where rembg has already cut out the person).
"""
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


def blur_region(img_bgr: np.ndarray, x: int, y: int, w: int, h: int) -> np.ndarray:
    out = img_bgr.copy()
    # expand bbox ~35% around detected face so the whole head + hair is covered
    cx, cy = x + w / 2, y + h / 2
    w2, h2 = int(w * 1.7), int(h * 1.9)
    x0 = max(0, int(cx - w2 / 2))
    y0 = max(0, int(cy - h2 / 2))
    x1 = min(img_bgr.shape[1], int(cx + w2 / 2))
    y1 = min(img_bgr.shape[0], int(cy + h2 / 2))

    roi = out[y0:y1, x0:x1]
    if roi.size == 0:
        return out

    # mosaic first, then gaussian — looks like a proper redaction
    mosaic = cv2.resize(
        cv2.resize(roi, (max(1, (x1 - x0) // 24), max(1, (y1 - y0) // 24)),
                   interpolation=cv2.INTER_LINEAR),
        (x1 - x0, y1 - y0),
        interpolation=cv2.INTER_NEAREST,
    )
    blurred = cv2.GaussianBlur(mosaic, (0, 0), sigmaX=18, sigmaY=18)
    out[y0:y1, x0:x1] = blurred
    return out


def find_face_bbox(bgr: np.ndarray):
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    cascade = cv2.CascadeClassifier(cascade_path)
    faces = cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(60, 60))
    if len(faces) == 0:
        # try profile face
        cascade_path = cv2.data.haarcascades + "haarcascade_profileface.xml"
        cascade = cv2.CascadeClassifier(cascade_path)
        faces = cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(60, 60))
    if len(faces) == 0:
        return None
    # pick largest
    faces = sorted(faces, key=lambda r: r[2] * r[3], reverse=True)
    return tuple(int(v) for v in faces[0])


def fallback_top_third(bgr: np.ndarray, alpha: np.ndarray | None):
    """Blur the top portion of non-transparent content."""
    h, w = bgr.shape[:2]
    if alpha is not None:
        # find vertical bounds of visible pixels
        ys, _ = np.where(alpha > 8)
        if ys.size == 0:
            y0, y1 = 0, h // 3
        else:
            y_min, y_max = int(ys.min()), int(ys.max())
            y0 = y_min
            y1 = y_min + int((y_max - y_min) * 0.35)
        xs, _ = np.where(alpha.T > 8)
        if xs.size == 0:
            x0, x1 = 0, w
        else:
            x_min, x_max = int(xs.min()), int(xs.max())
            x0, x1 = x_min, x_max
    else:
        y0, y1 = 0, h // 3
        x0, x1 = 0, w
    return blur_region(bgr, x0, y0, x1 - x0, y1 - y0)


def main():
    if len(sys.argv) != 3:
        print("usage: blur_face.py INPUT OUTPUT", file=sys.stderr)
        sys.exit(2)

    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])

    img = Image.open(src).convert("RGBA")
    arr = np.array(img)                      # HxWx4 RGBA
    rgb = arr[:, :, :3][:, :, ::-1]          # RGB -> BGR
    alpha = arr[:, :, 3]

    bbox = find_face_bbox(rgb)
    if bbox is not None:
        x, y, w, h = bbox
        print(f"   face detected at ({x},{y},{w},{h})")
        blurred_bgr = blur_region(rgb, x, y, w, h)
    else:
        print("   no face detected — blurring top region of cutout as fallback")
        blurred_bgr = fallback_top_third(rgb, alpha)

    out_rgb = blurred_bgr[:, :, ::-1]
    out = np.dstack([out_rgb, alpha])
    Image.fromarray(out, mode="RGBA").save(dst, optimize=True)
    print(f"   wrote {dst}")


if __name__ == "__main__":
    main()
