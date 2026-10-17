const { execSync } = require('child_process');
const fs = require('fs');

const prevData = JSON.parse(execSync('git show HEAD:./data/gsc_keywords_data.json', { encoding: 'utf8' }));
const currData = JSON.parse(fs.readFileSync('data/gsc_keywords_data.json', 'utf8'));

const currMap = fs.existsSync('data/gsc_query_page_mapping.json') 
  ? JSON.parse(fs.readFileSync('data/gsc_query_page_mapping.json', 'utf8')) 
  : [];

const prevQueries = prevData.gscQueries;
const currQueries = currData.gscQueries;
const targetKeywords = currData.targetKeywords || [];

console.log('=== RANK TRACKING COMPARISON (PREVIOUS VS CURRENT) ===');
console.log('Previous dataset dates: up to Oct 5, 2026 (741 queries)');
console.log('Current dataset dates: up to Oct 8, 2026 (757 queries)');
console.log('');

// Helper to find query in list
function findQ(list, name) {
  return list.find(q => q.query.toLowerCase() === name.toLowerCase());
}

// 1. Analyze the 20 Master Tracked Keywords
console.log('--- 1. MASTER 20 TRACKED KEYWORDS ---');
const masterReport = targetKeywords.map(tk => {
  const prev = findQ(prevQueries, tk.keyword);
  const curr = findQ(currQueries, tk.keyword);

  const prevPos = prev ? prev.position : null;
  const currPos = curr ? curr.position : null;
  const diffPos = (prevPos !== null && currPos !== null) ? (prevPos - currPos) : null; // positive means improved

  const prevImpr = prev ? prev.impressions : 0;
  const currImpr = curr ? curr.impressions : 0;
  const diffImpr = currImpr - prevImpr;

  const prevClicks = prev ? prev.clicks : 0;
  const currClicks = curr ? curr.clicks : 0;
  const diffClicks = currClicks - prevClicks;

  return {
    keyword: tk.keyword,
    volume: tk.volume,
    cpc: tk.cpc,
    baselinePos: tk.position,
    prevPos,
    currPos,
    diffPos,
    prevImpr,
    currImpr,
    diffImpr,
    prevClicks,
    currClicks,
    diffClicks,
    status: tk.status
  };
});

console.log(JSON.stringify(masterReport, null, 2));

// 2. Analyze Tier 1-6 Keywords from target_keywords_action_plan.md
const allTrackedList = [
  // Tier 1: Master Head Terms
  'window cleaning perth',
  'window cleaners perth',
  'solar panel cleaning perth',
  'window cleaning service',
  'window cleaning services perth',
  'window cleaning near me',
  'residential window cleaning perth',
  'residential window cleaning',
  'perth window cleaning',
  // Tier 2: Commercial & Strata
  'commercial window cleaning perth',
  'commercial window cleaners perth',
  'office window cleaning perth',
  'strata window cleaning perth',
  'commercial window cleaning',
  'high rise window cleaning',
  'highrise window cleaning near me',
  'commercial window cleaners near me',
  'commercial window cleaning service near me',
  'shop front window cleaning perth',
  'highrise window cleaning perth',
  'facade cleaning',
  'facade cleaning services',
  'perth strata cleaning services',
  // Tier 3: Core Residential
  'window cleaner near me',
  'window cleaner perth',
  'window cleaners near me',
  'window washing perth',
  'perth window cleaning services',
  'house window cleaners',
  'domestic window cleaners',
  'window washer perth',
  'window cleaning company',
  // Tier 4: Suburbs
  'window cleaning fremantle',
  'window cleaner fremantle',
  'window cleaners fremantle',
  'window cleaning services fremantle',
  'window cleaners nedland',
  'window cleaning nedlands',
  'window cleaners nedlands',
  'window cleaning cottesloe',
  'window cleaning applecross',
  'window cleaning peppermint grove',
  'gutter cleaning joondalup',
  'window cleaning joondalup',
  'window cleaning west perth',
  'commercial office cleaning west perth',
  'window cleaning armadale',
  'window cleaners armadale',
  'commercial window cleaning morley',
  'residential window cleaning morley',
  'window cleaning morley',
  'window cleaning subiaco',
  'window cleaning dunsborough',
  'window cleaners dunsborough',
  'window cleaning albany',
  // Tier 5: Ancillary & Incubation
  'clean solar panels perth',
  'pressure washing perth',
  'pressure cleaning perth',
  'downpipe cleaning perth',
  'gutter and window cleaning perth',
  'gutter cleaning perth',
  'gutter and downpipe cleaning perth',
  'driveway pressure cleaning perth',
  // Tier 6: Brand & Competitor
  'aspect window cleaning',
  'galeforce window cleaning',
  'all glass cleaning reviews'
];

console.log('\n--- 2. ALL TIER 1-6 TRACKED KEYWORDS ---');
const tierReport = allTrackedList.map(kw => {
  const prev = findQ(prevQueries, kw);
  const curr = findQ(currQueries, kw);

  const prevPos = prev ? prev.position : null;
  const currPos = curr ? curr.position : null;
  const diffPos = (prevPos !== null && currPos !== null) ? (prevPos - currPos) : null;

  const prevImpr = prev ? prev.impressions : 0;
  const currImpr = curr ? curr.impressions : 0;
  const diffImpr = currImpr - prevImpr;

  const prevClicks = prev ? prev.clicks : 0;
  const currClicks = curr ? curr.clicks : 0;
  const diffClicks = currClicks - prevClicks;

  return {
    keyword: kw,
    prevPos: prevPos !== null ? Number(prevPos.toFixed(2)) : 'Unranked',
    currPos: currPos !== null ? Number(currPos.toFixed(2)) : 'Unranked',
    diffPos: diffPos !== null ? Number(diffPos.toFixed(2)) : 'N/A',
    prevImpr,
    currImpr,
    diffImpr,
    prevClicks,
    currClicks,
    diffClicks
  };
});

fs.writeFileSync('scratch/rank_track_report.json', JSON.stringify({ masterReport, tierReport }, null, 2), 'utf8');
console.log('Saved report to scratch/rank_track_report.json');
