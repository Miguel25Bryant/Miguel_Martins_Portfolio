// Cuts the project logos out of the Behance presentation boards for the intro.
//   node tools/extract-logos.mjs
// Reads only (never changes) the boards in Desktop/PORTFOLIO/Behance. For each logo:
// crop a region of the board, measure how far every pixel is from the board's plain
// background, turn that into transparency, fill the mark with the site's ink colour
// (--fg, #1c1c1c), trim to the mark and save a PNG in assets/logos.
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = createRequire(path.join(root, 'index.html'))('sharp');
const SRC = 'C:/Users/Utilizador/Desktop/PORTFOLIO/Behance/';
const OUT = path.join(root, 'assets', 'logos');
const INK = [0x1c, 0x1c, 0x1c];

// region: [left, top, width, height] in the 3200×2000 board
export const LOGOS = [
  { id: 'kaya',          file: 'KAYA/03 · Wordmark.png',                 region: [300, 400, 2600, 1050] },
  { id: 'swell',         file: 'Swell/03-wordmark.png',                  region: [400, 350, 2450, 1150] },
  { id: 'swell-symbol',  file: 'Swell/04-symbol.png',                    region: [150, 230, 1350, 1490] },
  { id: 'sol-sombra',    file: 'Sol & Sombra/sol-sombra-03-logo.png',    region: [350, 500, 2600, 900] },
  { id: 'sos',           file: 'SOS Renovações/sos-04-logo.png',         region: [450, 350, 2450, 950], dropColour: true },
  // dropColour: the orange place tag beside the wordmark is left out (the site names no places)
  { id: 'sos-symbol',    file: 'SOS Renovações/sos-06-symbol.png',       region: [200, 300, 1300, 1100] },
  { id: 'stay-home',     file: 'Stay Home/stay-home-03-logo.png',        region: [350, 400, 2550, 1000] },
  { id: 'inova',         file: 'Inova/inova-03-versoes.png',             region: [260, 430, 1220, 530] },
  { id: 'terra-sa',      file: 'Terra Sã/terra-sa-04.png',               region: [1350, 330, 1300, 1370] },
];

async function extract({ id, file, region, dropColour }) {
  const [left, top, width, height] = region;
  const { data } = await sharp(SRC + file).removeAlpha().extract({ left, top, width, height })
    .raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => (y * width + x) * 3;

  // background: median of the region's border
  const border = [];
  for (let x = 0; x < width; x += 4) border.push(px(x, 0), px(x, height - 1));
  for (let y = 0; y < height; y += 4) border.push(px(0, y), px(width - 1, y));
  const bg = [0, 1, 2].map(c => border.map(i => data[i + c]).sort((a, b) => a - b)[border.length >> 1]);

  const n = width * height, dist = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const r = data[i * 3] - bg[0], g = data[i * 3 + 1] - bg[1], b = data[i * 3 + 2] - bg[2];
    dist[i] = Math.sqrt(r * r + g * g + b * b);
  }
  const D = Float32Array.from(dist).sort()[Math.floor(n * 0.995)];   // the mark's strongest contrast
  const lo = 0.1 * D, hi = 0.3 * D;                                     // light parts of a mark still read solid

  const out = Buffer.alloc(n * 4);
  let x0 = width, y0 = height, x1 = 0, y1 = 0;
  for (let i = 0; i < n; i++) {
    const t = Math.min(1, Math.max(0, (dist[i] - lo) / (hi - lo)));
    let a = Math.round(255 * t * t * (3 - 2 * t));
    if (dropColour) {        // keep only the neutral (grey) parts of the mark
      const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      a = Math.round(a * Math.min(1, Math.max(0, 1 - (sat - 20) / 40)));
    }
    out[i * 4] = INK[0]; out[i * 4 + 1] = INK[1]; out[i * 4 + 2] = INK[2]; out[i * 4 + 3] = a;
    if (a > 40) {
      const x = i % width, y = (i / width) | 0;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  const pad = 6;
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
  x1 = Math.min(width - 1, x1 + pad); y1 = Math.min(height - 1, y1 + pad);
  const trimmed = await sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }).png().toBuffer();
  const file_ = path.join(OUT, id + '.png');
  const info = await sharp(trimmed).resize({ width: 640, height: 400, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(file_);
  console.log(id, info.width + '×' + info.height, 'background', bg.join(','));
}

fs.mkdirSync(OUT, { recursive: true });
for (const logo of LOGOS) await extract(logo);
