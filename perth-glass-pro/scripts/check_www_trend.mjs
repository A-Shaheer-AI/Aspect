import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TOKEN_PATH = path.join(projectRoot, 'oauth-tokens.json');
const OAUTH_PATH = path.join(projectRoot, 'oauth-credentials.json');

async function getClient() {
  const credentials = JSON.parse(fs.readFileSync(OAUTH_PATH, 'utf8'));
  const config = credentials.installed || credentials.web;
  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  const oauth2Client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    'http://localhost'
  );
  oauth2Client.setCredentials(tokens);
  return oauth2Client;
}

async function run() {
  const auth = await getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const siteUrl = 'sc-domain:aspectwindowcleaning.com.au';

  // 1. Fetch performance by date and page dimension
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: '2026-07-21',
      endDate: '2026-10-19',
      dimensions: ['date', 'page'],
      rowLimit: 25000,
    },
  });

  const rows = res.data.rows || [];
  console.log('Total date+page rows:', rows.length);

  // Group by date: www vs non-www
  const byDate = {};

  for (const r of rows) {
    const date = r.keys[0];
    const page = r.keys[1];
    const isWww = page.includes('www.aspectwindowcleaning.com.au');

    if (!byDate[date]) {
      byDate[date] = { date, wwwClicks: 0, wwwImpr: 0, nonWwwClicks: 0, nonWwwImpr: 0 };
    }

    if (isWww) {
      byDate[date].wwwClicks += r.clicks || 0;
      byDate[date].wwwImpr += r.impressions || 0;
    } else {
      byDate[date].nonWwwClicks += r.clicks || 0;
      byDate[date].nonWwwImpr += r.impressions || 0;
    }
  }

  const sortedDates = Object.keys(byDate).sort();
  console.log('\n--- TIMELINE: WWW VS NON-WWW IMPRESSIONS & CLICKS ---');
  console.log('Date       | WWW Impr | WWW Clicks | Non-WWW Impr | Non-WWW Clicks');
  console.log('------------------------------------------------------------------');

  // Print every 5th day and the last 10 days
  sortedDates.forEach((d, idx) => {
    if (idx % 5 === 0 || idx >= sortedDates.length - 10) {
      const row = byDate[d];
      console.log(`${d} | ${String(row.wwwImpr).padStart(8)} | ${String(row.wwwClicks).padStart(10)} | ${String(row.nonWwwImpr).padStart(12)} | ${String(row.nonWwwClicks).padStart(14)}`);
    }
  });

  // Also query specific query performance for 'window cleaning perth' under www vs non-www
  console.log('\n--- "window cleaning perth" by page over time ---');
  const qRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: '2026-07-21',
      endDate: '2026-10-19',
      dimensions: ['date', 'page'],
      dimensionFilterGroups: [
        {
          filters: [
            {
              dimension: 'query',
              operator: 'equals',
              expression: 'window cleaning perth',
            },
          ],
        },
      ],
    },
  });

  const qRows = qRes.data.rows || [];
  console.log('Total rows for "window cleaning perth":', qRows.length);
  qRows.sort((a,b) => a.keys[0].localeCompare(b.keys[0]));
  qRows.forEach(r => {
    console.log(`${r.keys[0]} | ${r.keys[1]} | pos: ${r.position.toFixed(1)} | impr: ${r.impressions} | clicks: ${r.clicks}`);
  });
}

run().catch(console.error);
