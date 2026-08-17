import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve('frame new');
const outputDir = path.resolve('public/frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs
  .readdirSync(inputDir)
  .filter((f) => f.endsWith('.png'))
  .sort();

console.log(`Found ${files.length} frames to optimize in ${inputDir}...`);

let totalOriginalSize = 0;
let totalOptimizedSize = 0;

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const inputPath = path.join(inputDir, file);
  const baseName = path.parse(file).name;
  const outputJpgPath = path.join(outputDir, `${baseName}.jpg`);
  const outputWebpPath = path.join(outputDir, `${baseName}.webp`);

  const stat = fs.statSync(inputPath);
  totalOriginalSize += stat.size;

  // Optimize to high-clarity progressive MozJPEG (quality 86)
  await sharp(inputPath)
    .jpeg({ quality: 86, mozjpeg: true, progressive: true })
    .toFile(outputJpgPath);

  // Also create WebP (quality 88)
  await sharp(inputPath)
    .webp({ quality: 88, effort: 4 })
    .toFile(outputWebpPath);

  const optStat = fs.statSync(outputJpgPath);
  totalOptimizedSize += optStat.size;

  if (i % 10 === 0 || i === files.length - 1) {
    console.log(
      `[${i + 1}/${files.length}] ${baseName}: ${(stat.size / 1024 / 1024).toFixed(2)}MB -> ${(
        optStat.size / 1024
      ).toFixed(1)}KB`
    );
  }
}

console.log('--------------------------------------------------');
console.log(`Original total size:  ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Optimized total size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(
  `Reduction:            ${(
    (1 - totalOptimizedSize / totalOriginalSize) *
    100
  ).toFixed(1)}% lighter with 100% crystal-clear clarity!`
);
