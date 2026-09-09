import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dr8tjrszy', 
  api_key: '674498424377776', 
  api_secret: 'BHby39ir52bLdc3_4-DJPGMVTt8' 
});

const mediaDir = 'C:\\Users\\IQRA TRADERS\\OneDrive\\Documents\\Aspectheo';
const outputFile = './hero_media_mappings.json';

async function uploadMedia() {
  const files = fs.readdirSync(mediaDir);
  const mappings = {};
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|webp|heic|mp4|mov)$/i)) {
      const filePath = path.join(mediaDir, file);
      console.log(`Uploading ${file}...`);
      
      const isVideo = file.match(/\.(mp4|mov)$/i);
      
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'aspect_hero_new',
          use_filename: true,
          unique_filename: false,
          overwrite: true,
          resource_type: isVideo ? 'video' : 'image',
          format: file.match(/\.heic$/i) ? 'jpg' : undefined, // Convert HEIC to JPG
        });
        console.log(`Uploaded ${file} -> ${result.secure_url}`);
        
        // Extract the number from the file name to help with sorting
        const numberMatch = file.match(/^(\d+)/);
        let num = 999;
        if (numberMatch) {
            num = parseInt(numberMatch[1], 10);
        } else if (file === 'IMG_0144.HEIC') {
            num = 12; // Inferring 12 is missing
        } else if (file === 'IMG_0370.MOV') {
            num = 19;
        }

        mappings[num] = {
            url: result.secure_url,
            type: isVideo ? 'video' : 'image'
        };
      } catch (err) {
        console.error(`Failed to upload ${file}:`, err);
      }
    }
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(mappings, null, 2));
  console.log('Mappings saved to', outputFile);
}

uploadMedia();
