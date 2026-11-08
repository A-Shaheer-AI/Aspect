import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getFiles(fullPath, files);
    } else {
      files.push({
        path: fullPath,
        relPath: path.relative(process.cwd(), fullPath).replace(/\\/g, '/'),
        size: stat.size,
        lines: fs.readFileSync(fullPath, 'utf8').split('\n').length
      });
    }
  }
  return files;
}

const allFiles = getFiles(process.cwd());

console.log('=== TOP 25 LARGEST SOURCE FILES BY LINE COUNT (Excluding data/json) ===');
allFiles
  .filter(f => !f.relPath.endsWith('.json') && !f.relPath.endsWith('.xml') && !f.relPath.endsWith('.tsbuildinfo'))
  .sort((a, b) => b.lines - a.lines)
  .slice(0, 25)
  .forEach(f => {
    console.log(`${f.lines.toString().padStart(6)} lines | ${(f.size / 1024).toFixed(1).padStart(7)} KB | ${f.relPath}`);
  });

console.log('\n=== TOP 15 LARGEST FILES BY FILE SIZE ===');
allFiles
  .sort((a, b) => b.size - a.size)
  .slice(0, 15)
  .forEach(f => {
    console.log(`${(f.size / 1024).toFixed(1).padStart(8)} KB | ${f.lines.toString().padStart(6)} lines | ${f.relPath}`);
  });
