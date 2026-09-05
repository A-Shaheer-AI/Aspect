const fs = require('fs');
const glob = require('glob');
const globPattern = 'app/services/**/*.tsx';

glob(globPattern, (err, files) => {
    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        if (content.match(/Ã|Â|/)) {
            console.log(file, 'has mojibake!');
        }
    });
});