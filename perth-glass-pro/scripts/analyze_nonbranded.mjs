import fs from 'fs';
import path from 'path';

const mappingFile = path.join(process.cwd(), 'data', 'gsc_query_page_mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

// Filter out pure branded queries like 'aspect window cleaning' or variations of aspect
function isBranded(q) {
  return q.includes('aspect');
}

// Group by query
const queryMap = new Map();
for (const item of mapping) {
  const q = item.query.trim().toLowerCase();
  if (!queryMap.has(q)) {
    queryMap.set(q, {
      query: q,
      impressions: 0,
      clicks: 0,
      bestPos: 999,
      page: item.page
    });
  }
  const entry = queryMap.get(q);
  entry.impressions += item.impressions;
  entry.clicks += item.clicks;
  if (item.position < entry.bestPos) {
    entry.bestPos = item.position;
    entry.page = item.page;
  }
}

const list = Array.from(queryMap.values()).filter(q => !isBranded(q.query));

// Page 1 non-branded high impression queries
const p1List = list.filter(q => q.bestPos <= 10.9).sort((a,b) => b.impressions - a.impressions);

// Page 2 non-branded high impression queries (striking distance: 11 - 20.9)
const p2List = list.filter(q => q.bestPos > 10.9 && q.bestPos <= 21.0).sort((a,b) => b.impressions - a.impressions);

// Page 3 / high impression near striking distance (21.1 - 30)
const p3List = list.filter(q => q.bestPos > 21.0 && q.bestPos <= 30.0).sort((a,b) => b.impressions - a.impressions);

console.log('=== TOP 25 NON-BRANDED PAGE 1 QUERIES (IMPRESSIONS) ===');
p1List.slice(0, 25).forEach(q => {
  console.log(`- "${q.query}" | Pos: ${q.bestPos.toFixed(1)} | Impr: ${q.impressions} | Clicks: ${q.clicks} | Page: ${q.page}`);
});

console.log('\n=== TOP 35 NON-BRANDED PAGE 2 QUERIES (IMPRESSIONS) ===');
p2List.slice(0, 35).forEach(q => {
  console.log(`- "${q.query}" | Pos: ${q.bestPos.toFixed(1)} | Impr: ${q.impressions} | Clicks: ${q.clicks} | Page: ${q.page}`);
});

console.log('\n=== TOP 20 NON-BRANDED PAGE 3 QUERIES (IMPRESSIONS) ===');
p3List.slice(0, 20).forEach(q => {
  console.log(`- "${q.query}" | Pos: ${q.bestPos.toFixed(1)} | Impr: ${q.impressions} | Clicks: ${q.clicks} | Page: ${q.page}`);
});
