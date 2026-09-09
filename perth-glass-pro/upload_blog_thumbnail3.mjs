import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dr8tjrszy', 
  api_key: '674498424377776', 
  api_secret: 'BHby39ir52bLdc3_4-DJPGMVTt8' 
});

const filePaths = [
    'C:\\Users\\IQRA TRADERS\\.gemini\\antigravity-ide\\brain\\76b1af8b-6658-46f0-9380-2bbded6ac6a5\\.user_uploaded\\media_1788990667719.png',
    'C:\\Users\\IQRA TRADERS\\.gemini\\antigravity-ide\\brain\\76b1af8b-6658-46f0-9380-2bbded6ac6a5\\.user_uploaded\\media_1788990677432.png'
];

async function uploadImages() {
    for (const filePath of filePaths) {
        try {
            console.log(`Uploading ${filePath}...`);
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'aspect_blog',
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                format: 'jpg',
                resource_type: 'image'
            });
            console.log(`Uploaded URL: ${result.secure_url}`);
        } catch (err) {
            console.error(`Failed to upload:`, err);
        }
    }
}

uploadImages();
