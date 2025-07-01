const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: '684377111323663',
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "DevBoardProfilePics",
    allowed_formats: ['jpeg', 'jpg', 'png'],
    transformation: [{ width: 300, height: 300, crop: 'limit' }]
  },
});

module.exports = { storage, cloudinary };
