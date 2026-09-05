const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

// Replace all garbled mojibake
content = content.replace(/ÃƒÆ’Ã†â€™[^\s]*/g, ''); // This might be too greedy or leave spaces, let's just do a regex for the known long string.
content = content.replace(/Ã[^A-Za-z0-9<>=\/{}\(\)\[\]]+/g, ''); 

// For 'Send Me a Quote', let's replace whatever follows it until the closing tag
content = content.replace(/Send Me a Quote[^<]+/, 'Send Me a Quote ➔\n              ');

// For 'We never share your details', replace whatever precedes it until the closing tag of previous element
content = content.replace(/>[^<]*We never share your details/g, '>\n                  🔒 We never share your details');

// Fix the sections comments
content = content.replace(/\{\/\*[^A-Za-z0-9]+SECTION ([0-9]+(\.[0-9]+)?): ([A-Z0-9 '\/]+)[^A-Za-z0-9]+\*\/\}/g, '{/* 🔹🔹🔹 SECTION $1: $3 🔹🔹🔹 */}');
content = content.replace(/\{\/\*[^A-Za-z0-9]+STICKY BAR[^A-Za-z0-9]+\*\/\}/g, '{/* 🔹🔹🔹 STICKY BAR 🔹🔹🔹 */}');

// The star rating in SECTION 2: STATS STRIP
// { num: ..., label: "Google Rating" } - it was { num: "5.0⭐", ... }
// Let's just fix the emoji if it was mangled
content = content.replace(/\{ num: \$\{gmb\.rating\}[^]+, label: "Google Rating"/g, '{ num: \\${gmb.rating}⭐\\, label: "Google Rating"');

// The checkmarks in the bento grid: { icon: "🛡️", text: " Insured" }
content = content.replace(/\{ icon: "[^"]+", text: "\ Insured"/g, '{ icon: "🛡️", text: " Insured"');
content = content.replace(/\{ icon: "[^"]+", text: "Police Cleared"/g, '{ icon: "🏅", text: "Police Cleared"');
content = content.replace(/\{ icon: "[^"]+", text: "Pure Water Tech"/g, '{ icon: "💧", text: "Pure Water Tech"');
content = content.replace(/\{ icon: "[^"]+", text: \$\{gmb\.rating\} Google Reviews/g, '{ icon: "⭐", text: \\${gmb.rating} Google Reviews\\');

// Write back
fs.writeFileSync('app/landing/page.tsx', content, 'utf8');