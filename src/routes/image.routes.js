// routes/image.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require("../controllers/image.Controller");

// Use multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes

// POST: Upload a new image
router.post('/', upload.single('file'), imageController.createImage);

// GET: Get all images
router.get('/', imageController.getAllImages);

// GET: Get image by ID
router.get('/:id', imageController.getImageById);

// GET: View image by unique URL
router.get('/view/:url', imageController.viewImageByUrl);

// PUT: Update image by ID
router.put('/:id', upload.single('file'), imageController.updateImage);

// DELETE: Delete image by ID
router.delete('/:id', imageController.deleteImage);

module.exports = router;
