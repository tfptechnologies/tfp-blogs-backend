import express from 'express';
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from '../controllers/categoryController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { isAuthor } from '../middlewares/isAuthor.js';
import validate from '../middlewares/validate.js';
import { categoryValidator } from '../validators/categoryValidator.js';

const router = express.Router();

router.post('/', protect, isAuthor, validate(categoryValidator), createCategory);
router.get('/', getAllCategories);
router.delete('/:id', protect, isAuthor, deleteCategory);

export default router;
