const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'info');
const destDir = path.join(__dirname, '..', 'assets', 'info_images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => !f.includes('(1)'));
let copyCount = 0;

files.forEach(file => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  fs.copyFileSync(srcPath, destPath);
  copyCount++;
});

console.log(`Copied ${copyCount} unique info screenshots to assets/info_images/!`);
