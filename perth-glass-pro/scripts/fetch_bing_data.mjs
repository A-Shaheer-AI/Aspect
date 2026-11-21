import fs from 'fs';
import path from 'path';

const API_KEY = process.env.BING_API_KEY || '1160585d77f94136b8b733c09ba3b535';
const SITE_URL = 'https://aspectwindowcleaning.com.au/';
const ENCODED_SITE = encodeURIComponent(SITE_URL);

async function fetchBingApi(endpoint) {
  const url = `https://ssl.bing.com/webmaster/api.svc/json/${endpoint}?siteUrl=${ENCODED_SITE}&apikey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Bing API ${endpoint} failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.d || [];
}

function parseDate(msDateStr) {
  if (!msDateStr) return null;
  const match = msDateStr.match(/\/Date\((\d+)\)\//);
  if (match) {
    const ts = parseInt(match[1], 10);
    return new Date(ts).toISOString().split('T')[0];
  }
  return msDateStr;
}

async function main() {
  console.log('===========================================================');
  console.log('      SYNCING BING WEBMASTER TOOLS DATA FOR ASPECT        ');
  console.log('===========================================================');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);

  try {
    // 1. Fetch Query Stats
    console.log('\n[1/4] Fetching Query Stats (GetQueryStats)...');
    const rawQueries = await fetchBingApi('GetQueryStats');
    console.log(`Received ${rawQueries.length} query records.`);

    const formattedQueries = rawQueries.map(q => ({
      query: q.Query,
      clicks: q.Clicks,
      impressions: q.Impressions,
      avgImpressionPosition: q.AvgImpressionPosition,
      avgClickPosition: q.AvgClickPosition,
      date: parseDate(q.Date)
    }));

    // 2. Fetch Page Stats
    console.log('\n[2/4] Fetching Page Stats (GetPageStats)...');
    const rawPages = await fetchBingApi('GetPageStats');
    console.log(`Received ${rawPages.length} page records.`);

    const formattedPages = rawPages.map(p => ({
      url: p.Url || p.Query,
      clicks: p.Clicks,
      impressions: p.Impressions,
      avgImpressionPosition: p.AvgImpressionPosition,
      avgClickPosition: p.AvgClickPosition,
      date: parseDate(p.Date)
    }));

    // 3. Fetch Daily Rank & Traffic Stats
    console.log('\n[3/4] Fetching Traffic Stats (GetRankAndTrafficStats)...');
    const rawTraffic = await fetchBingApi('GetRankAndTrafficStats');
    console.log(`Received ${rawTraffic.length} daily traffic history records.`);

    const formattedTraffic = rawTraffic.map(t => ({
      date: parseDate(t.Date),
      clicks: t.Clicks,
      impressions: t.Impressions
    }));

    // 4. Fetch Crawl Stats
    console.log('\n[4/4] Fetching Crawl Stats (GetCrawlStats)...');
    let crawlStats = [];
    try {
      crawlStats = await fetchBingApi('GetCrawlStats');
      console.log(`Received ${crawlStats.length} crawl stats entries.`);
    } catch (e) {
      console.log('Crawl stats not available or empty yet.');
    }

    // Save consolidated Bing dataset
    const outputData = {
      metadata: {
        siteUrl: SITE_URL,
        syncedAt: new Date().toISOString(),
        totalQueries: formattedQueries.length,
        totalPages: formattedPages.length,
        totalHistoricalDays: formattedTraffic.length
      },
      queries: formattedQueries,
      pages: formattedPages,
      dailyTraffic: formattedTraffic,
      crawlStats: crawlStats
    };

    const outPath = path.join('data', 'bing_keywords_data.json');
    fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2), 'utf8');
    console.log(`\nSuccessfully saved complete Bing Webmaster dataset to ${outPath}`);

  } catch (err) {
    console.error('Error syncing Bing data:', err);
    process.exit(1);
  }
}

main();
