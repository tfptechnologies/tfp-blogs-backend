import express from 'express';
import {
  createSubcomment,
  getSubcomments,
  updateSubcomment,
  deleteSubcomment,
} from '../controllers/subcommentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createSubcomment);         // Logged in user only
router.get('/', getSubcomments);                      // Publicly accessible
router.put('/:id', protect, updateSubcomment);       // Only owner can update
router.delete('/:id', protect, deleteSubcomment);    // Only owner can delete

export default router;
