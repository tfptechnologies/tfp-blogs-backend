const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadImage,
  getImage,
  deleteImage
} = require('../controllers/imageController');
const protect = require('../middleware/auth');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// Routes
router.post('/', protect, upload.single('image'), uploadImage);
router.get('/:id', getImage);
router.delete('/:id', protect, deleteImage);

module.exports = router; 