const fs = require('fs');

const file = fs.readFileSync('content/blogs.ts', 'utf8');

// Match each blog object
const blogRegex = /"id":\s*(\d+),[\s\S]*?"slug":\s*"([^"]+)",[\s\S]*?"intro":\s*"([^"]+)",[\s\S]*?"conclusion":\s*"([^"]+)"/g;
let match;
const blogs = [];
while ((match = blogRegex.exec(file)) !== null) {
  blogs.push({
    id: parseInt(match[1]),
    slug: match[2],
    intro: match[3],
    conclusion: match[4]
  });
}

console.log('Total verified blogs:', blogs.length);

// Define Silos
const silos = {
  residential: {
    parent: '/services/residential-window-cleaning',
    chain: [1, 2, 8, 9, 10, 14]
  },
  commercial: {
    parent: '/services/commercial-window-cleaning',
    chain: [3, 11, 12, 13, 16, 17]
  },
  solar: {
    parent: '/services/solar-panel-washing',
    chain: [4, 15, 18]
  }
};

let allPassed = true;

for (const [siloName, silo] of Object.entries(silos)) {
  console.log(`\n========================================`);
  console.log(`VERIFYING SILO: ${siloName.toUpperCase()}`);
  console.log(`Parent Money Page: ${silo.parent}`);
  console.log(`Expected Chain: ${silo.chain.join(' -> ')} -> ${silo.chain[0]}`);
  console.log(`========================================`);

  for (let i = 0; i < silo.chain.length; i++) {
    const currentId = silo.chain[i];
    const nextId = silo.chain[(i + 1) % silo.chain.length];
    
    const currentBlog = blogs.find(b => b.id === currentId);
    const nextBlog = blogs.find(b => b.id === nextId);

    if (!currentBlog) {
      console.error(`❌ Blog ID ${currentId} NOT FOUND!`);
      allPassed = false;
      continue;
    }

    // 1. Check Top Money Page Link in Intro
    const hasParentLink = currentBlog.intro.includes(silo.parent);
    if (hasParentLink) {
      console.log(`  ✅ Blog #${currentId} (${currentBlog.slug}): Intro has top link to ${silo.parent}`);
    } else {
      console.error(`  ❌ Blog #${currentId} (${currentBlog.slug}): Missing top link to ${silo.parent} in intro!`);
      allPassed = false;
    }

    // 2. Check Lateral Link to Next Sibling in Conclusion
    const hasNextLink = currentBlog.conclusion.includes(`/blog/${nextBlog.slug}`);
    if (hasNextLink) {
      console.log(`  ✅ Blog #${currentId} (${currentBlog.slug}): Conclusion links laterally to Blog #${nextId} (${nextBlog.slug})`);
    } else {
      console.error(`  ❌ Blog #${currentId} (${currentBlog.slug}): Missing lateral link to /blog/${nextBlog.slug} in conclusion!`);
      allPassed = false;
    }
  }
}

if (allPassed) {
  console.log('\n🏆 ALL REVERSE SILO INTEGRATIONS PASSED WITH 100% COMPLIANCE!');
} else {
  console.log('\n⚠️ Some silo checks failed. Review errors above.');
}
