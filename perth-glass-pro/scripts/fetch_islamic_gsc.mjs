import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const projectRoot = 'C:/projetcs/Aspect/perth-glass-pro';
const TOKEN_PATH = path.join(projectRoot, 'oauth-tokens.json');
const OAUTH_PATH = path.join(projectRoot, 'oauth-credentials.json');

async function main() {
  console.log('Connecting to Google Search Console...');
  const credentials = JSON.parse(fs.readFileSync(OAUTH_PATH, 'utf8'));
  const config = credentials.installed || credentials.web;

  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  const oauth2Client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    'http://localhost'
  );
  oauth2Client.setCredentials(tokens);

  oauth2Client.on('tokens', (newTokens) => {
    const merged = { ...tokens, ...newTokens };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2), 'utf8');
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

  // List sites to verify
  const sitesRes = await searchconsole.sites.list();
  console.log('Available sites:');
  sitesRes.data.siteEntry?.forEach(s => console.log(' - ' + s.siteUrl + ' (' + s.permissionLevel + ')'));

  const siteUrl = 'sc-domain:islamicmarriagewa.com.au';
  console.log(`\nQuerying Search Performance for ${siteUrl}...`);

  // Calculate dates: last 90 days
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - 2); // GSC has a 2-day delay
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 90);

  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];
  console.log(`Date range: ${startStr} to ${endStr}`);

  // 1. Overall stats
  const overallRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: startStr,
      endDate: endStr,
      aggregationType: 'auto'
    }
  });

  console.log('\n--- OVERALL TOTALS ---');
  console.log(overallRes.data.rows || 'No data');

  // 2. Query breakdown
  const queryRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: startStr,
      endDate: endStr,
      dimensions: ['query'],
      rowLimit: 250
    }
  });

  // 3. Page breakdown
  const pageRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: startStr,
      endDate: endStr,
      dimensions: ['page'],
      rowLimit: 50
    }
  });

  // 4. Query + Page combinations
  const queryPageRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: startStr,
      endDate: endStr,
      dimensions: ['query', 'page'],
      rowLimit: 250
    }
  });

  const result = {
    siteUrl,
    dateRange: { start: startStr, end: endStr },
    overall: overallRes.data.rows || [],
    queries: queryRes.data.rows || [],
    pages: pageRes.data.rows || [],
    queryPages: queryPageRes.data.rows || []
  };

  fs.writeFileSync('C:/projetcs/gsc_islamicmarriagewa.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('\nSaved full GSC data to C:/projetcs/gsc_islamicmarriagewa.json');
}

main().catch(err => {
  console.error('Error fetching GSC data:', err);
});
