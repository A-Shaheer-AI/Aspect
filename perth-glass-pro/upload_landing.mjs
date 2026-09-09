import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dr8tjrszy', 
  api_key: '674498424377776', 
  api_secret: 'BHby39ir52bLdc3_4-DJPGMVTt8' 
});

const dir = 'C:\\Users\\IQRA TRADERS\\OneDrive\\Documents\\landing images';

async function uploadLandingImages() {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.HEIC'));
    const urls = [];

    for (const file of files) {
        const fullPath = path.join(dir, file);
        try {
            console.log(`Uploading ${file}...`);
            const result = await cloudinary.uploader.upload(fullPath, {
                folder: 'aspect_landing',
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                format: 'jpg', // Convert HEIC to JPG
                resource_type: 'image'
            });
            urls.push(result.secure_url);
            console.log(`Uploaded ${file} -> ${result.secure_url}`);
        } catch (err) {
            console.error(`Failed to upload ${file}:`, err);
        }
    }

    console.log('\nAll Uploaded URLs:');
    console.log(JSON.stringify(urls, null, 2));
}

uploadLandingImages();
