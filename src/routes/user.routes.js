import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from '../controllers/userController.js';

import { protect } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { registerValidator, loginValidator } from '../validators/userValidator.js';

const router = express.Router();

router.post('/signup', validate(registerValidator), registerUser);
router.post('/login', validate(loginValidator), loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, deleteUser);

export default router;
