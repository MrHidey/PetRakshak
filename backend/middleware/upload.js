// middleware/upload.js - Direct Cloudinary integration without multer-storage-cloudinary
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Create uploads directory if it doesn't exist (for temporary storage)
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer storage for temporary local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
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
  },
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

// Upload to Cloudinary middleware
const uploadToCloudinary = async (req, res, next) => {
  // If there's no file, just continue
  if (!req.file) {
    return next();
  }

  try {
    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'petrakshak',
      transformation: [{ width: 1000, crop: "limit" }]
    });
    
    // Add cloudinary data to the request
    req.file.cloudinaryUrl = result.secure_url;
    req.file.cloudinaryPublicId = result.public_id;
    
    // Delete the local file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });
    
    next();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({ message: 'Error uploading image to cloud storage' });
  }
};

module.exports = { upload, handleMulterError, uploadToCloudinary };