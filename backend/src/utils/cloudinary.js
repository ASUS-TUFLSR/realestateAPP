const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploading an array of files (from multer) or dataURIs.
 * Each file is expected to have .path (local) or buffer.
 */
async function uploadToCloudinary(filePath, folder = 'realestate') {
  if (!filePath) throw new Error('filePath is required');
  const res = await cloudinary.uploader.upload(filePath, { folder });
  return res.secure_url;
}

module.exports = { uploadToCloudinary, cloudinary };
