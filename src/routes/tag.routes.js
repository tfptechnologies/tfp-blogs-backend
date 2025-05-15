import express from 'express';
import {
  createTag,
  getAllTags,
  deleteTag,
} from '../controllers/tagController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { isAuthor } from '../middlewares/isAuthor.js';
import validate from '../middlewares/validate.js';
import { tagValidator } from '../validators/tagValidator.js';

const router = express.Router();

router.post('/', protect, isAuthor, validate(tagValidator), createTag);
router.get('/', getAllTags);
router.delete('/:id', protect, isAuthor, deleteTag);

export default router;
