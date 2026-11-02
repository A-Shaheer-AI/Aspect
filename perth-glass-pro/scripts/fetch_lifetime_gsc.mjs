import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const projectRoot = 'C:/projetcs/Aspect/perth-glass-pro';
const TOKEN_PATH = path.join(projectRoot, 'oauth-tokens.json');
const OAUTH_PATH = path.join(projectRoot, 'oauth-credentials.json');

async function run() {
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
  const siteUrl = 'sc-domain:islamicmarriagewa.com.au';

  // Last 16 months (up to ~480 days back)
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - 2);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 480);

  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];

  console.log(`Querying lifetime performance: ${startStr} to ${endStr}...`);

  // Overall
  const overall = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: startStr, endDate: endStr }
  });

  // By Date (timeline)
  const dates = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: startStr, endDate: endStr, dimensions: ['date'], rowLimit: 500 }
  });

  // By Device
  const devices = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: startStr, endDate: endStr, dimensions: ['device'] }
  });

  // By Country
  const countries = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: startStr, endDate: endStr, dimensions: ['country'], rowLimit: 30 }
  });

  // By Query (all time)
  const allQueries = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: startStr, endDate: endStr, dimensions: ['query'], rowLimit: 500 }
  });

  const fullData = {
    siteUrl,
    dateRange: { start: startStr, end: endStr },
    overall: overall.data.rows || [],
    devices: devices.data.rows || [],
    countries: countries.data.rows || [],
    timeline: dates.data.rows || [],
    queries: allQueries.data.rows || []
  };

  fs.writeFileSync('C:/projetcs/gsc_full_history.json', JSON.stringify(fullData, null, 2), 'utf8');
  console.log('Successfully saved full GSC history to C:/projetcs/gsc_full_history.json');
}

run().catch(console.error);
