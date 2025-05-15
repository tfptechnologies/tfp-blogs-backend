import express from 'express';
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createComment);         // Logged in user only
router.get('/', getComments);                      // Publicly accessible
router.put('/:id', protect, updateComment);       // Logged in & owner only
router.delete('/:id', protect, deleteComment);    // Logged in & owner only

export default router;
