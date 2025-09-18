#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import url from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const galleryDir = path.join(root, 'public', 'Gallery');
const targets = [
  path.join(galleryDir, 'cleans'),
  path.join(galleryDir, 'team'),
  path.join(galleryDir, 'reviews2')
];
const validSrcExt = new Set(['.jpg', '.jpeg', '.png', '.heic', '.HEIC', '.JPG', '.JPEG', '.PNG']);

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function convertFile(srcPath, dstPath) {
  try {
    await sharp(srcPath).rotate().webp({ quality: 82 }).toFile(dstPath);
    const rel = path.relative(root, dstPath);
    console.log(`Converted → ${rel}`);
  } catch (err) {
    console.warn(`WARN: Failed converting ${srcPath} → ${dstPath}: ${err?.message || err}`);
  }
}

async function convertDir(dir) {
  const relDir = path.relative(root, dir);
  if (!fs.existsSync(dir)) {
    console.warn(`Skip: directory not found ${relDir}`);
    return;
  }
  const entries = await fs.promises.readdir(dir);
  const jobs = [];
  for (const entry of entries) {
    const fp = path.join(dir, entry);
    const stat = await fs.promises.stat(fp).catch(() => null);
    if (!stat || !stat.isFile()) continue;
    const ext = path.extname(entry);
    const base = path.basename(entry, ext);
    const dst = path.join(dir, `${base}.webp`);
    if (!validSrcExt.has(ext)) {
      // Already webp or unsupported; skip
      continue;
    }
    if (fs.existsSync(dst)) {
      // Skip if up-to-date
      const dstStat = await fs.promises.stat(dst).catch(() => null);
      if (dstStat && dstStat.mtimeMs >= stat.mtimeMs) continue;
    }
    jobs.push(convertFile(fp, dst));
  }
  await Promise.all(jobs);
}

(async function main() {
  await ensureDir(galleryDir);
  for (const dir of targets) {
    await convertDir(dir);
  }
  console.log('Done converting images to WebP.');
})();


