// Web versions of the Behance presentation pages and of each project's cover,
// plus the list of pages and cover sizes the site reads.
//
//   node tools/build-images.mjs            only images that are new or changed
//   node tools/build-images.mjs --force    everything again
//
// Reads (never changes) Selected Work/<folder>/, using the folders in data/work.js:
//   *.png       the presentation pages, in order. PNGs with "cover" in the name and no page
//               number in front (e.g. grafpub-2026-cover-open.png) are ignored.
//   cover.jpg   the project's cover on the home, the List and Next project (any proportions,
//               never cropped). Never shown on the project page.
//
// Writes:
//   assets/pages/<slug>/NN-1600.webp, NN-2400.webp   project page images (WebP, quality 82)
//   assets/covers/<slug>-800.webp, <slug>-1600.webp  covers (WebP, quality 82 or COVER_SETTINGS, real proportions)
//   data/pages.js                                     page list and cover size of each project
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = createRequire(path.join(root, 'index.html'))('sharp');
const FORCE = process.argv.includes('--force');
const PAGE_WIDTHS = [1600, 2400];
const COVER_WIDTHS = [800, 1600];
const QUALITY = 82;
// covers that need lighter settings (very detailed photos); everything else uses QUALITY and effort 5
const COVER_SETTINGS = { posters: { quality: 48, effort: 6 } };

// data/work.js is written for the browser: run it with a stand-in window
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'data', 'work.js'), 'utf8'), sandbox);
const WORK = sandbox.window.WORK;

// other cover files: "cover" in the name and no page number in front (so "01 · Cover.png" stays a page)
const isCoverFile = f => /cover/i.test(f) && !/^\d/.test(f);
const byName = (a, b) => a.localeCompare(b, 'en', { numeric: true });
// An output is up to date when it exists, is newer than its source, and was made from that same
// source file (pages are numbered by position, so a page added or removed shifts the numbers).
const sig = src => { const st = fs.statSync(src); return `${path.basename(src)}|${st.size}|${Math.round(st.mtimeMs)}`; };
const fresh = (out, src, record) => !FORCE && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs
  && record[path.basename(out)] === sig(src);
const readRecord = f => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
const webp = (src, out, w, { quality = QUALITY, effort = 5 } = {}) => sharp(src).rotate().resize({ width: w, withoutEnlargement: true })
  .webp({ quality, effort, smartSubsample: true }).toFile(out);

const pagesOut = {}, coversOut = {};
let made = 0, kept = 0;

const coverDir = path.join(root, 'assets', 'covers');
fs.mkdirSync(coverDir, { recursive: true });
const coverRecordFile = path.join(coverDir, 'sources.json');
const coverRecord = readRecord(coverRecordFile);
const coverExpected = new Set(['sources.json']);

for (const p of WORK) {
  const dir = path.join(root, 'Selected Work', p.folder);
  if (!fs.existsSync(dir)) { console.warn(`! ${p.name}: folder "${p.folder}" not found`); continue; }

  // presentation pages
  const pages = fs.readdirSync(dir).filter(f => /\.png$/i.test(f) && !isCoverFile(f)).sort(byName);
  const outDir = path.join(root, 'assets', 'pages', p.slug);
  fs.mkdirSync(outDir, { recursive: true });
  const recordFile = path.join(outDir, 'sources.json');
  const record = readRecord(recordFile);
  const expected = new Set(['sources.json']);
  const list = [];
  for (const [i, f] of pages.entries()) {
    const src = path.join(dir, f);
    const nn = String(i + 1).padStart(2, '0');
    const meta = await sharp(src).metadata();
    for (const w of PAGE_WIDTHS) {
      const out = path.join(outDir, `${nn}-${w}.webp`);
      expected.add(path.basename(out));
      if (fresh(out, src, record)) { kept++; continue; }
      record[path.basename(out)] = sig(src);
      await webp(src, out, w);
      made++;
    }
    list.push({ file: f, w: meta.width, h: meta.height });
  }
  for (const f of fs.readdirSync(outDir)) if (!expected.has(f)) { fs.unlinkSync(path.join(outDir, f)); delete record[f]; }
  fs.writeFileSync(recordFile, JSON.stringify(record, null, 1));
  pagesOut[p.slug] = list;

  // cover
  const cover = path.join(dir, 'cover.jpg');
  if (fs.existsSync(cover)) {
    const meta = await sharp(cover).rotate().metadata();
    for (const w of COVER_WIDTHS) {
      const out = path.join(coverDir, `${p.slug}-${w}.webp`);
      coverExpected.add(path.basename(out));
      const set = COVER_SETTINGS[p.slug] || {};
      const want = `${sig(cover)}|q${set.quality || QUALITY}|e${set.effort || 5}`;   // a settings change also remakes the cover
      if (!FORCE && fs.existsSync(out) && coverRecord[path.basename(out)] === want) { kept++; continue; }
      coverRecord[path.basename(out)] = want;
      await webp(cover, out, w, set);
      made++;
    }
    coversOut[p.slug] = { w: meta.width, h: meta.height };
  } else console.warn(`! ${p.name}: no cover.jpg in "${p.folder}"`);

  console.log(`${p.name}: ${pages.length} pages${coversOut[p.slug] ? `, cover ${coversOut[p.slug].w} × ${coversOut[p.slug].h}` : ''}`);
}
for (const f of fs.readdirSync(coverDir)) if (!coverExpected.has(f)) { fs.unlinkSync(path.join(coverDir, f)); delete coverRecord[f]; }
fs.writeFileSync(coverRecordFile, JSON.stringify(coverRecord, null, 1));

fs.writeFileSync(path.join(root, 'data', 'pages.js'),
`/* Generated by tools/build-images.mjs: do not edit by hand, rerun the script instead.
   PAGES: the presentation pages of each project, in order (assets/pages/<slug>/NN-1600.webp, NN-2400.webp).
   COVERS: the size of each project's cover.jpg (assets/covers/<slug>-800.webp, <slug>-1600.webp). */
window.PAGES = ${JSON.stringify(pagesOut, null, 1)};
window.COVERS = ${JSON.stringify(coversOut, null, 1)};
`);
console.log(`web images: ${made} made, ${kept} already up to date`);
console.log('wrote data/pages.js');
