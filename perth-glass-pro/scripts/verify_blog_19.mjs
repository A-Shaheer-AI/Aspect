async function check() {
  const res = await fetch('http://localhost:3000/blog/how-to-choose-a-window-cleaner-perth');
  const html = await res.text();

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  console.log('TITLE:', titleMatch ? titleMatch[1] : 'NOT FOUND');

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  console.log('H1:', h1Match ? h1Match[1].trim() : 'NOT FOUND');

  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].trim());
  console.log('H2s (' + h2Matches.length + '):', h2Matches);

  const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].trim());
  console.log('H3s (' + h3Matches.length + '):', h3Matches);

  const internalLinks = [...html.matchAll(/href=["'](\/[^"']+)["']/g)]
    .map(m => m[1])
    .filter(l => !l.startsWith('/_next'));
  console.log('Unique Internal Links:', [...new Set(internalLinks)]);

  // Check Kyle Roof POP target query counts
  const lowerHtml = html.toLowerCase();
  const countOccurrences = (term) => (lowerHtml.match(new RegExp(term.toLowerCase(), 'g')) || []).length;

  console.log('\n--- POP KEYWORD FREQUENCY CHECK ---');
  console.log('how to choose a window cleaner perth:', countOccurrences('how to choose a window cleaner perth'));
  console.log('window cleaning perth:', countOccurrences('window cleaning perth'));
  console.log('window cleaners perth:', countOccurrences('window cleaners perth'));
  console.log('window cleaning prices perth:', countOccurrences('window cleaning prices perth'));
  console.log('residential window cleaning perth:', countOccurrences('residential window cleaning perth'));
  console.log('commercial window cleaning perth:', countOccurrences('commercial window cleaning perth'));
}

check().catch(console.error);
