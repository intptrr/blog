// Downsize oversized gallery originals into reasonable "source masters" before
// Git tracks them. Astro generates the responsive variants at build time, so the
// committed source only needs ~3000px / ~2MB to feed that pipeline. Runs in place
// and is idempotent: files already within the limits are left untouched.
//
// Usage: pnpm photos  [dir]

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const MAX_EDGE = 3000; // longest side, in pixels
const MAX_BYTES = 2 * 1024 * 1024; // ~2 MB target
const QUALITY = 80;

const FORMATS = { '.jpg': 'jpeg', '.jpeg': 'jpeg', '.png': 'png', '.webp': 'webp' };

const dir =
	process.argv[2] ??
	fileURLToPath(new URL('../src/assets/gallery', import.meta.url));

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const file of (await readdir(dir)).sort()) {
	const format = FORMATS[extname(file).toLowerCase()];
	if (!format) continue;

	const path = join(dir, file);
	const input = await readFile(path);
	const { width = 0, height = 0 } = await sharp(input).metadata();
	const longest = Math.max(width, height);

	if (longest <= MAX_EDGE && input.byteLength <= MAX_BYTES) {
		console.log(`skip  ${file} (${longest}px, ${kb(input.byteLength)})`);
		continue;
	}

	const output = await sharp(input)
		.rotate() // bake in EXIF orientation, strip metadata
		.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
		.toFormat(format, { quality: QUALITY, mozjpeg: format === 'jpeg' })
		.toBuffer();

	await writeFile(path, output);
	console.log(`done  ${file}  ${kb(input.byteLength)} -> ${kb(output.byteLength)}`);
}
