#!/usr/bin/env python3
"""
Prepare Fairy Garden printable artwork from the supplied artwork sheets.

    python3 scripts/prepare-printable-art.py <folder-with-source-pngs>

Source files (names as delivered, in the folder given):
  border-blush.png      tall floral border, pink & lavender with toadstools
  border-lavender.png   tall floral border, ribbons & butterflies
  border-sage.png       tall floral border, wildflowers & toadstools
  welcome-8x10.png      4:5 meadow with toadstools
  toppers-sheet.png     3x3 sheet of round wreath toppers
  tags-sheet.png        2x3 sheet of tag shapes
  clues-sheet.png       2x2 sheet of framed garden scenes
  tents-sheet.png       3x3 sheet of horizontal place-card frames

Writes slot files into src/assets/printables/fairy-garden/. Re-run with
higher-resolution sources to improve print quality; layouts don't change.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
OUT = Path(__file__).resolve().parent.parent / 'src/assets/printables/fairy-garden'
OUT.mkdir(parents=True, exist_ok=True)


def load(name):
    return Image.open(SRC / name).convert('RGB')


def pieces(img, bg, thr, min_area=5000):
    """Bounding boxes of the separate pieces on a sheet, in reading order."""
    a = np.asarray(img).astype(int)
    m = np.abs(a - np.array(bg)).sum(2) > thr
    m = ndimage.binary_fill_holes(ndimage.binary_closing(m, iterations=3))
    lab, _ = ndimage.label(m)
    boxes = []
    for sl in ndimage.find_objects(lab):
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if h * w > min_area:
            boxes.append((sl[1].start, sl[0].start, sl[1].stop, sl[0].stop))
    return sorted(boxes, key=lambda b: (b[1] // 100, b[0]))


def save(img, slot):
    path = OUT / f'{slot}.png'
    img.save(path, optimize=True)
    print(f'  {slot}.png  {img.size[0]}×{img.size[1]}')


def knock_out_background(img, bg, thr):
    """Make the sheet background around a shape transparent (flood from the edges)."""
    a = np.asarray(img).astype(int)
    near = np.abs(a - np.array(bg)).sum(2) <= thr
    lab, _ = ndimage.label(near)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    outside = np.isin(lab, list(edge))
    alpha = Image.fromarray(np.where(outside, 0, 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8))
    rgba = img.convert('RGBA')
    rgba.putalpha(alpha)
    return rgba


def circle(img, inset=1.5):
    """Square crop → circle with a soft anti-aliased edge."""
    s = 4
    w, h = img.size
    mask = Image.new('L', (w * s, h * s), 0)
    ImageDraw.Draw(mask).ellipse((inset * s, inset * s, (w - inset) * s, (h - inset) * s), fill=255)
    rgba = img.convert('RGBA')
    rgba.putalpha(mask.resize((w, h), Image.LANCZOS))
    return rgba


print('Borders')
save(load('border-blush.png'), 'border-portrait')
save(load('border-lavender.png'), 'border-portrait--lavender')
save(load('border-sage.png'), 'border-portrait--sage')
save(load('welcome-8x10.png'), 'border-8x10')

print('Cupcake toppers')
sheet = load('toppers-sheet.png')
names = ['butterfly', 'bloom', 'toadstool', 'sprig', 'mushroom', 'leaf', 'wings', 'cupcake', 'lavender']
for name, b in zip(names, pieces(sheet, (252, 254, 254), 12)):
    save(circle(sheet.crop(b)), f'topper-{name}')
# An empty wreath for name and age toppers: clear the centre of the sprig topper.
b = pieces(sheet, (252, 254, 254), 12)[3]
ring = sheet.crop(b)
w, h = ring.size
a = np.asarray(ring).astype(int)
yy, xx = np.mgrid[0:h, 0:w]
r = np.hypot(xx - w / 2, yy - h / 2) / (w / 2)
band = (r > 0.62) & (r < 0.7)
cream = tuple(int(v) for v in np.median(a[band], axis=0))
inner = Image.fromarray(((r < 0.72) * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(2))
ring.paste(Image.new('RGB', ring.size, cream), (0, 0), inner)
save(circle(ring), 'topper-ring')

print('Favor tags')
sheet = load('tags-sheet.png')
boxes = pieces(sheet, (242, 244, 250), 10)
for slot, i in [('tag', 1), ('tag--sage', 3), ('tag--lavender', 2)]:
    x0, y0, x1, y1 = boxes[i]
    save(knock_out_background(sheet.crop((x0 - 6, y0 - 6, x1 + 6, y1 + 6)), (242, 244, 250), 22), slot)

print('Clue pictures')
sheet = load('clues-sheet.png')
for name, b in zip(['flowers', 'tree', 'toadstool', 'bench'], pieces(sheet, (232, 236, 216), 14)):
    x0, y0, x1, y1 = b
    save(sheet.crop((x0 + 5, y0 + 5, x1 - 5, y1 - 5)), f'clue-{name}')

print('Food tent frames')
sheet = load('tents-sheet.png')
boxes = pieces(sheet, (252, 250, 245), 14)
for slot, i in [('tent-frame', 0), ('tent-frame--sage', 1), ('tent-frame--lavender', 5)]:
    x0, y0, x1, y1 = boxes[i]
    save(sheet.crop((x0 + 2, y0 + 2, x1 - 2, y1 - 2)), slot)
