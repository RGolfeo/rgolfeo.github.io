"""Draws public/contours.svg: a still topographic map in the same spirit as the
live WebGL background, for phones, reduced motion and slow devices (where the
shader never loads). Used as a CSS mask, so it is black lines on transparent
and the page picks the colour per theme.

Run: python3 scripts/make-contours.py   (needs numpy + scikit-image)
"""
from pathlib import Path
import numpy as np
from skimage.measure import find_contours, approximate_polygon

W, H = 1200, 1600  # portrait: phones are the main audience for the still
rng = np.random.default_rng(24)

ys, xs = np.mgrid[0:H:6, 0:W:6].astype(float)
field = np.zeros_like(xs)
# A few broad, overlapping hills and basins: big sweeping lines, not busy detail.
for _ in range(11):
    cx, cy = rng.uniform(-200, W + 200), rng.uniform(-200, H + 200)
    sx, sy = rng.uniform(220, 520), rng.uniform(220, 560)
    amp = rng.uniform(-1, 1)
    field += amp * np.exp(-(((xs - cx) / sx) ** 2 + ((ys - cy) / sy) ** 2))
for _ in range(4):
    kx, ky, ph = rng.uniform(0.002, 0.006), rng.uniform(0.002, 0.006), rng.uniform(0, 6.28)
    field += 0.18 * np.sin(xs * kx + ys * ky + ph)

levels = np.linspace(field.min(), field.max(), 22)[2:-2]
paths = []
for lv in levels:
    for c in find_contours(field, lv):
        if len(c) < 12:
            continue
        c = approximate_polygon(c, tolerance=0.35) * 6
        d = 'M' + ' L'.join(f'{x:.0f} {y:.0f}' for y, x in c)
        paths.append(d)

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">'
       f'<g fill="none" stroke="#000" stroke-width="1.4" stroke-linejoin="round">'
       + ''.join(f'<path d="{d}"/>' for d in paths) + '</g></svg>')
out = Path(__file__).resolve().parent.parent / 'public' / 'contours.svg'
out.write_text(svg)
print(f'{len(paths)} paths, {len(svg) // 1024} KB')
