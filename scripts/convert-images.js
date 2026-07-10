import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');

async function convertImages() {
  try {
    if (!fs.existsSync(IMAGES_DIR)) {
      console.error(`Directory not found: ${IMAGES_DIR}`);
      return;
    }

    const files = fs.readdirSync(IMAGES_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
    });

    console.log(`Found ${imageFiles.length} images to convert.`);

    for (const file of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      const outputName = `${path.basename(file, path.extname(file))}.webp`;
      const outputPath = path.join(IMAGES_DIR, outputName);

      console.log(`Converting ${file} -> ${outputName}...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Converted successfully!`);
    }

    console.log('All image conversions completed.');
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

convertImages();
