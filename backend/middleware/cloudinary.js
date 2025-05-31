// middleware/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'petrakshak', // The folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 1000, crop: "limit" }] // Resize if needed
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF images are allowed'), false);
  }
};

// Configure Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit to 5MB
  }
});

// Error handling middleware for Multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

module.exports = { upload, handleMulterError };