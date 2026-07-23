import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dr8tjrszy', 
  api_key: '674498424377776', 
  api_secret: 'BHby39ir52bLdc3_4-DJPGMVTt8' 
});

const galleryDir = './public/gallery';
const mappingsFile = './cloudinary_mappings.json';

async function uploadImages() {
  const files = fs.readdirSync(galleryDir);
  const mappings = {};
  
  for (const file of files) {
    if (file.match(/\.(jpeg|jpg|png|webp)$/i)) {
      const filePath = path.join(galleryDir, file);
      console.log(`Uploading ${file}...`);
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'aspect_gallery',
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        });
        console.log(`Uploaded ${file} -> ${result.secure_url}`);
        // We will store the original local path as key, and new cloudinary URL as value
        mappings[`/gallery/${file}`] = result.secure_url;
      } catch (err) {
        console.error(`Failed to upload ${file}:`, err);
      }
    }
  }
  
  fs.writeFileSync(mappingsFile, JSON.stringify(mappings, null, 2));
  console.log('Mappings saved to', mappingsFile);
}

uploadImages();
