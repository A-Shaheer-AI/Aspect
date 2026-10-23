const { execSync } = require('child_process');
const fs = require('fs');

const prevData = JSON.parse(execSync('git show HEAD:./data/gsc_keywords_data.json', { encoding: 'utf8' }));
const currData = JSON.parse(fs.readFileSync('data/gsc_keywords_data.json', 'utf8'));

const prevQueries = prevData.gscQueries;
const currQueries = currData.gscQueries;

const diffs = [];
currQueries.forEach(curr => {
  const prev = prevQueries.find(p => p.query.toLowerCase() === curr.query.toLowerCase());
  if (prev) {
    const diff = prev.position - curr.position;
    diffs.push({
      query: curr.query,
      prevPos: prev.position,
      currPos: curr.position,
      diff,
      prevImpr: prev.impressions,
      currImpr: curr.impressions,
      clicks: curr.clicks
    });
  } else {
    // New query!
    diffs.push({
      query: curr.query,
      prevPos: null,
      currPos: curr.position,
      diff: 999, // newly indexed
      prevImpr: 0,
      currImpr: curr.impressions,
      clicks: curr.clicks
    });
  }
});

console.log('--- TOP 20 BIGGEST CLIMBERS (Existing Queries) ---');
const existingClimbers = diffs
  .filter(d => d.prevPos !== null && d.diff > 0 && d.currImpr >= 2)
  .sort((a,b) => b.diff - a.diff)
  .slice(0, 20);

existingClimbers.forEach((c, idx) => {
  console.log((idx+1) + '. "' + c.query + '" | Prev: ' + c.prevPos.toFixed(1) + ' -> Curr: ' + c.currPos.toFixed(1) + ' (▲ +' + c.diff.toFixed(1) + ' spots) | Impr: ' + c.currImpr);
});

console.log('\n--- NEWLY INDEXED QUERIES (Breakouts on Page 1 / Page 2) ---');
const newQueries = diffs
  .filter(d => d.prevPos === null && d.currPos <= 30)
  .sort((a,b) => a.currPos - b.currPos)
  .slice(0, 20);

newQueries.forEach((n, idx) => {
  console.log((idx+1) + '. "' + n.query + '" | Pos: ' + n.currPos.toFixed(1) + ' | Impr: ' + n.currImpr + ' | Clicks: ' + n.clicks);
});
