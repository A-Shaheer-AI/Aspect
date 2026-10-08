const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/gsc_keywords_data.json', 'utf8'));
const queries = data.gscQueries;
const targetKeywords = data.targetKeywords || [];
const map = JSON.parse(fs.readFileSync('data/gsc_query_page_mapping.json', 'utf8'));

const targets = [
  'window cleaning perth',
  'window cleaners perth',
  'solar panel cleaning perth',
  'window cleaning near me',
  'residential window cleaning perth',
  'commercial window cleaning perth',
  'aspect window cleaning',
  'high rise window cleaning',
  'perth strata cleaning services',
  'commercial window cleaning',
  'window washing perth',
  'window cleaner perth',
  'solar panel cleaning perth cost',
  'cleaner perth',
  'perth window cleaning',
  'window cleaning cost perth',
  'pressure washing perth',
  'house washing perth'
];

console.log('--- TARGET HIGH-VOLUME & CORE SEARCHES ---');
targets.forEach(t => {
  const q = queries.find(item => item.query.toLowerCase() === t.toLowerCase());
  const tk = targetKeywords.find(item => item.keyword.toLowerCase() === t.toLowerCase());
  const pages = map.filter(item => item.query.toLowerCase() === t.toLowerCase());
  console.log(`\n=== [${t}] ===`);
  if (tk) {
    console.log(`  Target metadata -> Vol: ${tk.volume}, CPC: $${tk.cpc}, Intent: ${tk.intent}, Status: ${tk.status}`);
  }
  if (q) {
    console.log(`  GSC Aggregated -> Impr: ${q.impressions}, Clicks: ${q.clicks}, Pos: ${q.position.toFixed(2)}, CTR: ${q.ctr}%`);
  } else {
    console.log('  GSC Aggregated -> Not found in query list');
  }
  if (pages.length > 0) {
    pages.forEach(p => {
      console.log(`  Page: ${p.page} | Impr: ${p.impressions}, Clicks: ${p.clicks}, Pos: ${p.position.toFixed(2)}`);
    });
  } else {
    console.log('  Page mapping -> None');
  }
});

// Top 40 queries by impressions
console.log('\n\n--- TOP 30 QUERIES BY IMPRESSIONS ---');
const sortedByImpr = [...queries].sort((a, b) => b.impressions - a.impressions).slice(0, 30);
sortedByImpr.forEach((q, idx) => {
  console.log(`${idx + 1}. "${q.query}" | Impr: ${q.impressions} | Clicks: ${q.clicks} | Pos: ${q.position.toFixed(2)} | CTR: ${q.ctr}%`);
});

// Striking distance (Positions 11 to 25) with highest impressions
console.log('\n\n--- PAGE 2 STRIKING DISTANCE (Pos 11 - 25) SORTED BY IMPRESSIONS ---');
const striking = queries
  .filter(q => q.position >= 10.5 && q.position <= 25.5 && q.impressions >= 10)
  .sort((a, b) => b.impressions - a.impressions);
striking.slice(0, 30).forEach((q, idx) => {
  console.log(`${idx + 1}. "${q.query}" | Impr: ${q.impressions} | Clicks: ${q.clicks} | Pos: ${q.position.toFixed(2)}`);
});
