import fs from 'fs';
import path from 'path';

const gscDataFile = path.join(process.cwd(), 'data', 'gsc_keywords_data.json');
const gscData = JSON.parse(fs.readFileSync(gscDataFile, 'utf8'));

console.log('=== TARGET KEYWORDS BY VOLUME & POSITION ===');
const targetKws = gscData.targetKeywords || [];

// Sort by volume descending, then position ascending
targetKws.sort((a, b) => (b.volume || 0) - (a.volume || 0) || a.position - b.position);

console.log(`Total target keywords: ${targetKws.length}\n`);

console.log('--- HIGH VOLUME (Vol >= 100) on PAGE 1 (Pos <= 10) ---');
targetKws
  .filter(k => (k.volume >= 50 || k.position <= 10) && k.position <= 10)
  .forEach(k => {
    console.log(`[P1] "${k.keyword}" | Pos: ${k.position} | Vol: ${k.volume} | CPC: $${k.cpc} | Intent: ${k.intent} | URL: ${k.rankingUrl}`);
  });

console.log('\n--- HIGH VOLUME (Vol >= 50) on PAGE 2 (Pos 11 - 20) ---');
targetKws
  .filter(k => k.position >= 11 && k.position <= 20)
  .forEach(k => {
    console.log(`[P2] "${k.keyword}" | Pos: ${k.position} | Vol: ${k.volume} | CPC: $${k.cpc} | Intent: ${k.intent} | URL: ${k.rankingUrl}`);
  });

console.log('\n--- HIGH VOLUME (Vol >= 50) on PAGE 3 (Pos 21 - 30) ---');
targetKws
  .filter(k => k.position >= 21 && k.position <= 30 && (k.volume >= 70 || k.volume === null))
  .forEach(k => {
    console.log(`[P3] "${k.keyword}" | Pos: ${k.position} | Vol: ${k.volume} | CPC: $${k.cpc} | Intent: ${k.intent} | URL: ${k.rankingUrl}`);
  });
