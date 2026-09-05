const fs = require('fs');
const files = ['components/Footer.tsx', 'components/ResidentialEstimator.tsx', 'components/GoogleMap.tsx'];
for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/Ã/);
    if (match) console.log(file, 'corrupted!');
}