import fs from 'fs';
import http from 'http';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TOKEN_PATH = path.join(projectRoot, 'oauth-tokens.json');
const OAUTH_PATH = path.join(projectRoot, 'oauth-credentials.json');
const SERVICE_KEY_PATH = path.join(projectRoot, 'gsc-credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Authenticate via OAuth2 Desktop client
async function getOAuth2Client() {
  const credentials = JSON.parse(fs.readFileSync(OAUTH_PATH, 'utf8'));
  const config = credentials.installed || credentials.web;

  if (!config) {
    throw new Error('Invalid oauth-credentials.json format. Expected "installed" or "web" key.');
  }

  // Check if we already have saved tokens
  if (fs.existsSync(TOKEN_PATH)) {
    try {
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

      return oauth2Client;
    } catch {
      console.warn('⚠️ Saved token was invalid or expired. Re-authorizing...');
    }
  }

  // Need new authorization
  return new Promise((resolve, reject) => {
    let oauth2Client;

    // Start local server to capture the OAuth redirect
    const server = http.createServer(async (req, res) => {
      try {
        const reqUrl = new URL(req.url, `http://${req.headers.host}`);
        const code = reqUrl.searchParams.get('code');
        const error = reqUrl.searchParams.get('error');

        if (error) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`<h1>Authentication Failed</h1><p>${error}</p>`);
          server.close();
          reject(new Error(`OAuth error: ${error}`));
          return;
        }

        if (code) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h1 style="color: #16a34a;">Authentication Successful!</h1>
                <p>Google Search Console access granted. You can close this tab and return to your terminal.</p>
              </body>
            </html>
          `);
          server.close();

          const { tokens } = await oauth2Client.getToken(code);
          oauth2Client.setCredentials(tokens);
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2), 'utf8');
          console.log('✅ Tokens received and saved to oauth-tokens.json.');
          resolve(oauth2Client);
        }
      } catch (err) {
        reject(err);
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      const redirectUri = `http://127.0.0.1:${port}`;

      oauth2Client = new google.auth.OAuth2(
        config.client_id,
        config.client_secret,
        redirectUri
      );

      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: SCOPES,
      });

      console.log('\n👉 Open the following URL in your browser to sign in:');
      console.log(`\n${authUrl}\n`);

      // Open browser automatically on Windows
      exec(`start "" "${authUrl}"`, (err) => {
        if (err) {
          console.log('(Could not open browser automatically. Please click the link above.)');
        }
      });
    });

    server.on('error', reject);
  });
}

// Get Auth client (either Service Account or OAuth2)
async function getAuthClient() {
  if (fs.existsSync(OAUTH_PATH)) {
    console.log('🔑 Using OAuth 2.0 Credentials (oauth-credentials.json)');
    return await getOAuth2Client();
  }

  if (fs.existsSync(SERVICE_KEY_PATH)) {
    console.log('🔑 Using Service Account Credentials (gsc-credentials.json)');
    return new google.auth.GoogleAuth({
      keyFile: SERVICE_KEY_PATH,
      scopes: SCOPES,
    });
  }

  throw new Error('No credentials found! Put oauth-credentials.json or gsc-credentials.json in the project root.');
}

async function main() {
  console.log('\n======================================================');
  console.log('   Aspect Window Cleaning - Google Search Console Sync');
  console.log('======================================================\n');

  let auth;
  try {
    auth = await getAuthClient();
  } catch (err) {
    console.error(`❌ Authentication error: ${err.message}`);
    process.exit(1);
  }

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  console.log('🔍 Checking accessible Search Console properties...');
  let siteUrl = null;

  try {
    const sitesRes = await searchconsole.sites.list();
    const sites = sitesRes.data.siteEntry || [];

    if (sites.length === 0) {
      console.warn('\n⚠️  No sites are accessible to this Google account.');
      console.log('👉 Make sure the Google account you authorized has access to your Search Console property.\n');
      process.exit(1);
    }

    console.log(`✅ Accessible properties (${sites.length}):`);
    sites.forEach((s) => console.log(`   - ${s.siteUrl} (${s.permissionLevel})`));

    // Prefer domain property sc-domain:aspectwindowcleaning.com.au for complete coverage across all protocols
    const matched = sites.find((s) => s.siteUrl.toLowerCase() === 'sc-domain:aspectwindowcleaning.com.au') ||
                    sites.find((s) => s.siteUrl.toLowerCase().includes('aspectwindowcleaning'));
    siteUrl = matched ? matched.siteUrl : sites[0].siteUrl;
    console.log(`\n🎯 Target property selected: ${siteUrl}`);
  } catch (err) {
    console.error(`❌ Failed to list sites: ${err.message}`);
    if (err.message.includes('API has not been used') || err.message.includes('disabled')) {
      console.log('\n👉 Enable Google Search Console API in Google Cloud:');
      console.log('   https://console.cloud.google.com/apis/library/searchconsole.googleapis.com\n');
    }
    process.exit(1);
  }

  // Calculate dates (last 90 days, with 3-day buffer for GSC data latency)
  const today = new Date();
  const endDateObj = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
  const startDateObj = new Date(today.getTime() - 93 * 24 * 60 * 60 * 1000);

  const startDate = formatDate(startDateObj);
  const endDate = formatDate(endDateObj);

  console.log(`📅 Fetching search performance: ${startDate} to ${endDate}...`);

  let queryRows = [];
  try {
    const queryRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 25000,
      },
    });

    queryRows = queryRes.data.rows || [];
    console.log(`📊 Successfully fetched ${queryRows.length} query records.`);
  } catch (err) {
    console.error(`❌ Query fetch error: ${err.message}`);
    process.exit(1);
  }

  // Fetch query + page breakdown
  console.log('📄 Fetching query + landing page mapping...');
  let queryPageRows = [];
  try {
    const pageRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 25000,
      },
    });
    queryPageRows = pageRes.data.rows || [];
    console.log(`🔗 Successfully mapped ${queryPageRows.length} query-to-page combinations.`);
  } catch (err) {
    console.warn(`⚠️ Warning: Could not fetch page mapping (${err.message}). Continuing with query data.`);
  }

  // Process data
  const formattedQueries = queryRows.map((r) => {
    const q = r.keys[0];
    return {
      query: q,
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: Number(((r.ctr || 0) * 100).toFixed(2)),
      position: Number((r.position || 0).toFixed(2)),
    };
  });

  // Sort by impressions descending
  formattedQueries.sort((a, b) => b.impressions - a.impressions);

  // Breakdown counts
  const page1 = formattedQueries.filter((q) => q.position <= 10);
  const page2 = formattedQueries.filter((q) => q.position > 10 && q.position <= 20);
  const page3 = formattedQueries.filter((q) => q.position > 20 && q.position <= 30);
  const page4Plus = formattedQueries.filter((q) => q.position > 30);

  // Read existing target keywords if present
  const dataPath = path.join(projectRoot, 'data', 'gsc_keywords_data.json');
  let existingTargetKeywords = [];
  if (fs.existsSync(dataPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      if (Array.isArray(existing.targetKeywords)) {
        existingTargetKeywords = existing.targetKeywords;
      }
    } catch {
      // ignore
    }
  }

  const outputData = {
    metadata: {
      savedAt: new Date().toISOString(),
      siteUrl,
      startDate,
      endDate,
      totalGscQueries: formattedQueries.length,
      breakdown: {
        page1Count: page1.length,
        strikingDistancePage2Count: page2.length,
        strikingDistancePage3Count: page3.length,
        page4PlusCount: page4Plus.length,
      },
    },
    targetKeywords: existingTargetKeywords,
    gscQueries: formattedQueries,
  };

  const dataDir = path.join(projectRoot, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(dataPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`💾 Saved updated query dataset to: ${path.relative(projectRoot, dataPath)}`);

  if (queryPageRows.length > 0) {
    const pageMappingPath = path.join(dataDir, 'gsc_query_page_mapping.json');
    const mapped = queryPageRows.map((r) => ({
      query: r.keys[0],
      page: r.keys[1],
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: Number(((r.ctr || 0) * 100).toFixed(2)),
      position: Number((r.position || 0).toFixed(2)),
    }));
    fs.writeFileSync(pageMappingPath, JSON.stringify(mapped, null, 2), 'utf8');
    console.log(`💾 Saved query-page mapping to: ${path.relative(projectRoot, pageMappingPath)}`);
  }

  // Print Summary
  console.log('\n======================================================');
  console.log('                SYNC SUMMARY REPORT                   ');
  console.log('======================================================');
  console.log(`Total Search Queries:          ${formattedQueries.length}`);
  console.log(`Page 1 Queries (Pos 1–10):     ${page1.length}`);
  console.log(`Page 2 Striking Distance:      ${page2.length} 🚨 (Prime Targets)`);
  console.log(`Page 3 Striking Distance:      ${page3.length} 🔥`);
  console.log(`Page 4+ Queries:               ${page4Plus.length}`);
  console.log('------------------------------------------------------');
  console.log('Top 5 Page 2 Striking Distance Queries (Highest Impressions):');
  page2.slice(0, 5).forEach((q, idx) => {
    console.log(`  ${idx + 1}. "${q.query}" -> Pos: ${q.position} | Impr: ${q.impressions} | Clicks: ${q.clicks}`);
  });
  console.log('======================================================\n');
  console.log('🎉 Google Search Console Sync completed successfully!\n');
}

main().catch((err) => {
  console.error('\n❌ Unexpected error during sync:', err);
  process.exit(1);
});
