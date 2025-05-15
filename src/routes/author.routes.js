import express from 'express';
import {
  registerAuthor,
  loginAuthor,
  getAuthorProfile,
  updateAuthorProfile,
  deleteAuthor,
} from '../controllers/authorController.js';

import { protect } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import {
  registerAuthorValidator,
  loginAuthorValidator,
} from '../validators/authorValidator.js';

const router = express.Router();

router.post('/signup', validate(registerAuthorValidator), registerAuthor);
router.post('/login', validate(loginAuthorValidator), loginAuthor);
router.get('/profile', protect, getAuthorProfile);
router.put('/profile', protect, updateAuthorProfile);
router.delete('/:id', protect, deleteAuthor);

export default router;
