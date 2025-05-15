import express from 'express';
import {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  updatePost,
} from '../controllers/postController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { isAuthor } from '../middlewares/isAuthor.js';
import validate from '../middlewares/validate.js';
import { postValidator } from '../validators/postValidator.js';

const router = express.Router();

router.post('/', protect, isAuthor, validate(postValidator), createPost);
router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.put('/:id', protect, isAuthor, validate(postValidator), updatePost);
router.delete('/:id', protect, isAuthor, deletePost);

export default router;
