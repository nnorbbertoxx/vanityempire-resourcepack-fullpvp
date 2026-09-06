import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourcePack = path.join(root, 'pack.zip');
const dist = path.join(root, 'dist');
const distPack = path.join(dist, 'pack.zip');

await mkdir(dist, { recursive: true });
const data = await readFile(sourcePack);
const sha1 = createHash('sha1').update(data).digest('hex');
await copyFile(sourcePack, distPack);

const manifest = {
  version: sha1.slice(0, 8),
  sha1,
  url: './pack.zip'
};

await writeFile(
  path.join(dist, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8'
);

const html = `<!doctype html>
<html lang="hu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>VanityEmpire Resource Pack</title>
<style>
body{font-family:system-ui,sans-serif;background:#07111f;color:#e9f8ff;display:grid;place-items:center;min-height:100vh;margin:0}
main{background:#0b1b30;border:1px solid #123a5e;border-radius:18px;padding:28px;max-width:680px;box-shadow:0 20px 60px #0008}
h1{margin-top:0;color:#31d9ff}code{background:#06101c;padding:4px 8px;border-radius:8px;color:#7ceaff;word-break:break-all}a{color:#31d9ff}
</style>
</head>
<body><main>
<h1>VanityEmpire FullPvP Resource Pack</h1>
<p>Aktív build: <code>${sha1.slice(0, 8)}</code></p>
<p>SHA1: <code>${sha1}</code></p>
<p><a href="./pack.zip?v=${sha1}">pack.zip</a> · <a href="./manifest.json">manifest.json</a></p>
</main></body></html>`;
await writeFile(path.join(dist, 'index.html'), html, 'utf8');

const headers = `/manifest.json\n  Cache-Control: no-store, no-cache, must-revalidate\n/pack.zip\n  Cache-Control: public, max-age=31536000, immutable\n`;
await writeFile(path.join(dist, '_headers'), headers, 'utf8');

console.log(`Built resource pack manifest: ${sha1}`);
