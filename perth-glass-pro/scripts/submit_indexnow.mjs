import fs from 'fs';

async function submitIndexNow() {
  const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
  const matches = [...sitemapXml.matchAll(/<loc>(https:\/\/aspectwindowcleaning\.com\.au[^<]+)<\/loc>/g)];
  const urls = [...new Set(matches.map(m => m[1]))];

  console.log(`Found ${urls.length} unique URLs in public/sitemap.xml`);

  const payload = {
    host: 'aspectwindowcleaning.com.au',
    key: '7d2972d317ee4eebb8a6a4f0c8adb833',
    keyLocation: 'https://aspectwindowcleaning.com.au/7d2972d317ee4eebb8a6a4f0c8adb833.txt',
    urlList: urls
  };

  console.log('Submitting to https://api.indexnow.org/IndexNow and https://www.bing.com/indexnow ...');

  try {
    const resBing = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });

    console.log(`Bing IndexNow Response: ${resBing.status} ${resBing.statusText}`);

    const resIndexNow = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });

    console.log(`Global IndexNow Response: ${resIndexNow.status} ${resIndexNow.statusText}`);
  } catch (err) {
    console.error('Error submitting to IndexNow:', err);
  }
}

submitIndexNow();
