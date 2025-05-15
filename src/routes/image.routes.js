import express from 'express';
import { uploadImage } from '../controllers/imageController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAuthor } from '../middlewares/isAuthor.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/', protect, isAuthor, upload.single('image'), uploadImage);

export default router;
