import fs from 'fs';
import path from 'path';

const mappingFile = path.join(process.cwd(), 'data', 'gsc_query_page_mapping.json');
const gscDataFile = path.join(process.cwd(), 'data', 'gsc_keywords_data.json');

const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
const gscData = JSON.parse(fs.readFileSync(gscDataFile, 'utf8'));

// Aggregate queries by unique query (picking best position & summing impressions/clicks)
const queryMap = new Map();

for (const item of mapping) {
  const q = item.query.trim().toLowerCase();
  if (!queryMap.has(q)) {
    queryMap.set(q, {
      query: q,
      impressions: 0,
      clicks: 0,
      bestPos: 999,
      pages: new Set(),
      topPage: item.page
    });
  }
  const entry = queryMap.get(q);
  entry.impressions += item.impressions;
  entry.clicks += item.clicks;
  if (item.position < entry.bestPos) {
    entry.bestPos = item.position;
    entry.topPage = item.page;
  }
  entry.pages.add(item.page);
}

// Merge targetKeywords volume data if available
const targetKwMap = new Map();
if (gscData.targetKeywords) {
  for (const tk of gscData.targetKeywords) {
    targetKwMap.set(tk.keyword.toLowerCase(), tk);
  }
}

const allQueries = Array.from(queryMap.values()).map(q => {
  const tk = targetKwMap.get(q.query);
  return {
    ...q,
    volume: tk ? tk.volume : null,
    cpc: tk ? tk.cpc : null,
    intent: tk ? tk.intent : null,
    targetStatus: tk ? tk.status : null,
    pages: Array.from(q.pages)
  };
});

// Separate into Page 1 (pos <= 10.9) and Page 2 (11.0 <= pos <= 20.9)
const page1 = allQueries
  .filter(q => q.bestPos <= 10.9)
  .sort((a, b) => (b.volume || b.impressions) - (a.volume || a.impressions));

const page2 = allQueries
  .filter(q => q.bestPos > 10.9 && q.bestPos <= 21.0)
  .sort((a, b) => (b.volume || b.impressions) - (a.volume || a.impressions));

console.log('=== TOP PAGE 1 KEYWORDS (High Volume / Impressions) ===');
page1.slice(0, 30).forEach(q => {
  console.log(`- "${q.query}": Pos ${q.bestPos.toFixed(1)} | Impr: ${q.impressions} | Clicks: ${q.clicks} | Vol: ${q.volume || 'N/A'} | Page: ${q.topPage}`);
});

console.log('\n=== TOP PAGE 2 KEYWORDS (Striking Distance: Positions 11 - 21) ===');
page2.slice(0, 35).forEach(q => {
  console.log(`- "${q.query}": Pos ${q.bestPos.toFixed(1)} | Impr: ${q.impressions} | Clicks: ${q.clicks} | Vol: ${q.volume || 'N/A'} | Page: ${q.topPage}`);
});
