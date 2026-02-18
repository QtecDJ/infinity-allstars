import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const scrapedJsonPath = path.resolve('scripts', 'scraped-images.json');
const outDirTsv = path.resolve('public', 'media', 'tsv');
const outDirInstagram = path.resolve('public', 'media', 'instagram');

function decodeHtmlEntities(input) {
  return input.replaceAll('&amp;', '&');
}

function isSignedTsvUrl(url) {
  const host = url.hostname;
  if (host === 'le-cdn.website-editor.net') return true;
  if (host === 'cdn.website-editor.net') {
    return url.searchParams.has('Signature') && url.searchParams.has('Expires');
  }
  return false;
}

function isInstagramProfileImage(url) {
  return (
    /(^|\.)cdninstagram\.com$/i.test(url.hostname) &&
    url.pathname.includes('/t51.82787-19/') &&
    /\.jpe?g$/i.test(url.pathname)
  );
}

function safeBasenameFromUrl(url) {
  const rawName = url.pathname.split('/').filter(Boolean).at(-1) ?? 'file';
  const decoded = decodeURIComponent(rawName);
  const withoutPlus = decoded.replaceAll('+', '_');
  const cleaned = withoutPlus.replaceAll(/[^a-zA-Z0-9._-]+/g, '_');
  return cleaned || 'file';
}

function shortHash(input) {
  return crypto.createHash('sha1').update(input).digest('hex').slice(0, 8);
}

async function downloadToFile(url, outPath) {
  const headers = {
    'user-agent': 'Mozilla/5.0 (compatible; ShadcenSiteBot/1.0)',
    accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    referer: 'https://www.tsvplattenhardt.de/',
  };

  const res = await fetch(url.toString(), { redirect: 'follow', headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(outPath, Buffer.from(arrayBuffer));
}

const scrapedRaw = await fs.readFile(scrapedJsonPath, 'utf8');
const scraped = JSON.parse(scrapedRaw);

/** @type {URL[]} */
const urlsToDownload = [];

for (const [_pageUrl, payload] of Object.entries(scraped)) {
  const images = Array.isArray(payload?.images) ? payload.images : [];
  for (const raw of images) {
    const normalized = decodeHtmlEntities(String(raw));
    let url;
    try {
      url = new URL(normalized);
    } catch {
      continue;
    }

    if (isSignedTsvUrl(url) || isInstagramProfileImage(url)) {
      urlsToDownload.push(url);
    }
  }
}

// De-duplicate by full URL string
const uniqueUrls = Array.from(new Map(urlsToDownload.map((u) => [u.toString(), u])).values());

await fs.mkdir(outDirTsv, { recursive: true });
await fs.mkdir(outDirInstagram, { recursive: true });

const usedNames = new Set();
let ok = 0;
let err = 0;

for (const url of uniqueUrls) {
  const baseName = safeBasenameFromUrl(url);
  const isInstagram = isInstagramProfileImage(url);
  const targetDir = isInstagram ? outDirInstagram : outDirTsv;

  let outName = baseName;
  if (usedNames.has(outName)) {
    const ext = path.extname(outName);
    const stem = ext ? outName.slice(0, -ext.length) : outName;
    outName = `${stem}-${shortHash(url.toString())}${ext}`;
  }
  usedNames.add(outName);

  const outPath = path.join(targetDir, outName);

  try {
    await downloadToFile(url, outPath);
    ok += 1;
    console.log(`OK  ${path.relative(process.cwd(), outPath)}  <=  ${url.toString()}`);
  } catch (e) {
    err += 1;
    console.log(`ERR ${path.relative(process.cwd(), outPath)}  <=  ${url.toString()}`);
    console.log(`    ${e?.message ?? String(e)}`);
  }
}

console.log(`\nDone. Downloaded: ${ok}, Failed: ${err}, Total: ${uniqueUrls.length}`);
