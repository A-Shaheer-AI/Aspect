import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dr8tjrszy', 
  api_key: '674498424377776', 
  api_secret: 'BHby39ir52bLdc3_4-DJPGMVTt8' 
});

async function uploadImages() {
  const files = [
    './images/3before.jpg',
    './images/3after.png'
  ];
  
  for (const filePath of files) {
    console.log(`Uploading ${filePath}...`);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'aspect_gallery',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        format: 'webp' // Convert to WebP for optimization
      });
      console.log(`Uploaded -> ${result.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${filePath}:`, err);
    }
  }
}

uploadImages();
