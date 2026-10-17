const { execSync } = require('child_process');
const fs = require('fs');

const prevData = JSON.parse(execSync('git show HEAD:./data/gsc_keywords_data.json', { encoding: 'utf8' }));
const currData = JSON.parse(fs.readFileSync('data/gsc_keywords_data.json', 'utf8'));

console.log('Previous total queries:', prevData.gscQueries.length);
console.log('Current total queries:', currData.gscQueries.length);

const prevTotalClicks = prevData.gscQueries.reduce((sum, q) => sum + q.clicks, 0);
const currTotalClicks = currData.gscQueries.reduce((sum, q) => sum + q.clicks, 0);

const prevTotalImpr = prevData.gscQueries.reduce((sum, q) => sum + q.impressions, 0);
const currTotalImpr = currData.gscQueries.reduce((sum, q) => sum + q.impressions, 0);

console.log(`Previous Total Clicks (90-day window to Oct 5): ${prevTotalClicks}`);
console.log(`Current Total Clicks (90-day window to Oct 13): ${currTotalClicks}`);
console.log(`Previous Total Impressions: ${prevTotalImpr}`);
console.log(`Current Total Impressions: ${currTotalImpr}`);

// Check queries with click drops
console.log('\n--- QUERIES WHERE CLICKS DROPPED ---');
prevData.gscQueries.forEach(pq => {
  const cq = currData.gscQueries.find(q => q.query.toLowerCase() === pq.query.toLowerCase());
  if (!cq) {
    if (pq.clicks > 0) {
      console.log(`Query dropped out: "${pq.query}" had ${pq.clicks} clicks`);
    }
  } else if (cq.clicks < pq.clicks) {
    console.log(`"${pq.query}": ${pq.clicks} clicks -> ${cq.clicks} clicks (impr: ${pq.impressions} -> ${cq.impressions}, pos: ${pq.position.toFixed(1)} -> ${cq.position.toFixed(1)})`);
  }
});

// Check queries with click gains
console.log('\n--- QUERIES WHERE CLICKS INCREASED ---');
currData.gscQueries.forEach(cq => {
  const pq = prevData.gscQueries.find(q => q.query.toLowerCase() === cq.query.toLowerCase());
  if (!pq) {
    if (cq.clicks > 0) {
      console.log(`New query with clicks: "${cq.query}" has ${cq.clicks} clicks`);
    }
  } else if (cq.clicks > pq.clicks) {
    console.log(`"${cq.query}": ${pq.clicks} clicks -> ${cq.clicks} clicks (impr: ${pq.impressions} -> ${cq.impressions}, pos: ${pq.position.toFixed(1)} -> ${cq.position.toFixed(1)})`);
  }
});
