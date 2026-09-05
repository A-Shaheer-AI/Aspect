const fs = require('fs');
const file = '.env.local.example';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/hello@aspect.com.au/g, 'info@aspectwindowcleaning.com.au');

fs.writeFileSync(file, content, 'utf8');
console.log("Updated .env.local.example");