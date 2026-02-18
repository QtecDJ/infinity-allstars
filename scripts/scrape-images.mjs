import fs from 'node:fs/promises';

const pages = [
  'https://www.tsvplattenhardt.de/cheerleading46a5e1b6',
  'https://www.tsvplattenhardt.de/schnupperstunden-cheerleading',
  'https://www.tsvplattenhardt.de/cheerleading',
  'https://www.tsvplattenhardt.de/galerie92b76788',
  'https://www.tsvplattenhardt.de/galerie',
  'https://www.instagram.com/infinity_cheer_allstars/',
];

const imageRegex = /https?:\/\/[^"'<>\s]+\.(?:png|jpe?g|webp|gif)(?:\?[^"'<>\s]*)?/gi;

const result = {};

for (const url of pages) {
  try {
    const response = await fetch(url, { redirect: 'follow' });
    const html = await response.text();

    const urls = [...html.matchAll(imageRegex)].map((m) => m[0]);
    const unique = [...new Set(urls)];

    result[url] = {
      status: response.status,
      images: unique,
    };

    console.log(`OK ${url} (${response.status}) -> ${unique.length} images`);
  } catch (err) {
    result[url] = {
      status: 'error',
      error: err?.message ?? String(err),
      images: [],
    };
    console.log(`ERR ${url} -> ${err?.message ?? String(err)}`);
  }
}

await fs.writeFile('scripts/scraped-images.json', JSON.stringify(result, null, 2), 'utf8');
console.log('Wrote scripts/scraped-images.json');
