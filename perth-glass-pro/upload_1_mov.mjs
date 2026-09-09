import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dr8tjrszy', 
  api_key: '674498424377776', 
  api_secret: 'BHby39ir52bLdc3_4-DJPGMVTt8' 
});

const file = 'C:\\Users\\IQRA TRADERS\\OneDrive\\Documents\\Aspectheo\\1.MOV';

async function uploadMedia() {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'aspect_hero_new',
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: 'video',
        });
        console.log(`Uploaded 1.MOV -> ${result.secure_url}`);
    } catch (err) {
        console.error(`Failed to upload:`, err);
    }
}

uploadMedia();
