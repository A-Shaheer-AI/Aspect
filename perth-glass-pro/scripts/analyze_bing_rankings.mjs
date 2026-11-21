import fs from 'fs';

const bingData = JSON.parse(fs.readFileSync('data/bing_keywords_data.json', 'utf8'));
const gscData = fs.existsSync('data/gsc_keywords_data.json')
  ? JSON.parse(fs.readFileSync('data/gsc_keywords_data.json', 'utf8'))
  : { gscQueries: [] };

const gscQueries = gscData.gscQueries || [];

// Helper to aggregate queries across dates
const aggregatedQueries = {};
for (const q of bingData.queries) {
  const norm = q.query.toLowerCase().trim();
  if (!aggregatedQueries[norm]) {
    aggregatedQueries[norm] = {
      query: q.query,
      clicks: 0,
      impressions: 0,
      positions: []
    };
  }
  aggregatedQueries[norm].clicks += q.clicks;
  aggregatedQueries[norm].impressions += q.impressions;
  if (q.avgImpressionPosition > 0) {
    aggregatedQueries[norm].positions.push(q.avgImpressionPosition);
  }
}

const queryList = Object.values(aggregatedQueries).map(item => {
  const avgPos = item.positions.length > 0 
    ? item.positions.reduce((a, b) => a + b, 0) / item.positions.length 
    : 0;
  return {
    query: item.query,
    clicks: item.clicks,
    impressions: item.impressions,
    avgPos: Number(avgPos.toFixed(1))
  };
});

// Calculate totals
const totalClicks = queryList.reduce((acc, q) => acc + q.clicks, 0);
const totalImpressions = queryList.reduce((acc, q) => acc + q.impressions, 0);
const overallCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : 0;

console.log('========================================================================');
console.log('            BING WEBMASTER TOOLS SEARCH ANALYTICS AUDIT                 ');
console.log('========================================================================');
console.log(`Site: ${bingData.metadata.siteUrl}`);
console.log(`Synced At: ${bingData.metadata.syncedAt}`);
console.log(`Total Unique Queries on Bing: ${queryList.length}`);
console.log(`Total Organic Clicks on Bing: ${totalClicks}`);
console.log(`Total Organic Impressions on Bing: ${totalImpressions}`);
console.log(`Overall Bing CTR: ${overallCtr}%\n`);

// Sort by clicks descending, then impressions
const clickMakers = queryList.filter(q => q.clicks > 0).sort((a, b) => b.clicks - a.clicks);
console.log('🎯 TOP CLICK-GENERATING QUERIES ON BING:');
console.table(clickMakers);

// Top Page 1 queries on Bing (Position 1 to 10)
const page1 = queryList.filter(q => q.avgPos > 0 && q.avgPos <= 10).sort((a, b) => b.impressions - a.impressions);
console.log(`\n🏆 TOP PAGE 1 QUERIES ON BING (Total: ${page1.length}):`);
console.table(page1.slice(0, 20));

// Side-by-side comparison with Google for Core Target Keywords
const coreTargets = [
  "window cleaning perth",
  "residential window cleaning perth",
  "commercial window cleaning perth",
  "office window cleaning perth",
  "window cleaners perth",
  "window cleaning services fremantle",
  "window cleaning duncraig",
  "aspect window cleaning",
  "aspect window cleaning perth",
  "window cleaner morley"
];

console.log('\n⚔️ HEAD-TO-HEAD: GOOGLE SEARCH CONSOLE VS BING WEBMASTER');
console.log('---------------------------------------------------------------------------------------------');
console.log(`${'TARGET KEYWORD'.padEnd(38)} | ${'BING POS'.padEnd(10)} | ${'BING IMPR'.padEnd(10)} | ${'GSC POS'.padEnd(10)} | ${'GSC IMPR'.padEnd(10)}`);
console.log('---------------------------------------------------------------------------------------------');

for (const target of coreTargets) {
  const bMatch = queryList.find(q => q.query.toLowerCase().includes(target.toLowerCase()));
  const gMatch = gscQueries.find(q => q.query.toLowerCase() === target.toLowerCase());

  const bPos = bMatch ? String(bMatch.avgPos) : 'N/A';
  const bImpr = bMatch ? String(bMatch.impressions) : '0';
  const gPos = gMatch ? String(gMatch.position.toFixed(1)) : 'N/A';
  const gImpr = gMatch ? String(gMatch.impressions) : '0';

  console.log(`${target.padEnd(38)} | ${bPos.padEnd(10)} | ${bImpr.padEnd(10)} | ${gPos.padEnd(10)} | ${gImpr.padEnd(10)}`);
}
console.log('---------------------------------------------------------------------------------------------');
