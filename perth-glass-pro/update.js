const fs = require('fs');
let content = fs.readFileSync('content/case-studies.ts', 'utf8');

// 1. Add googlePosts to the type
content = content.replace('tags: string[];', 'tags: string[];\n  googlePosts?: string[];');

// 2. Update Suburb for the second case study
content = content.replace('suburb: \"Perth\",', 'suburb: \"Subiaco\",');
content = content.replace('slug: \"post-renovation-to-auction-window-cleaning-perth\",', 'slug: \"post-renovation-to-auction-window-cleaning-subiaco\",');

// 3. Add googlePosts to the second case study
// We need to inject it right after tags: [...] for the second item
content = content.replace('tags: [\"post-renovation\", \"pre-sale\", \"auction\", \"property management\", \"skylights\", \"pool fencing\", \"vintage windows\"],', 'tags: [\"post-renovation\", \"pre-sale\", \"auction\", \"property management\", \"skylights\", \"pool fencing\", \"vintage windows\"],\n    googlePosts: [\n      \"https://posts.gle/sRSweqVdnrURyTgQ6\",\n      \"https://posts.gle/VrXtYmem5fJFzTs16\"\n    ],');

fs.writeFileSync('content/case-studies.ts', content);
console.log('Updated case-studies.ts');
