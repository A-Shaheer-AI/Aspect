const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const targetStr = 'export default function WindowCleaningAdsPage() {';
const startIndex = content.indexOf(targetStr);
const chunk = content.substring(startIndex, startIndex + 1000);
console.log(chunk);