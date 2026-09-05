const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');
let match = content.match(/const windowCleaningReviews = \[([\s\S]*?)\];/);
if (match) {
    console.log('FOUND ARRAY');
} else {
    console.log('NOT FOUND');
}