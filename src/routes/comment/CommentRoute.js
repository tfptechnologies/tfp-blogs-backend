import express from 'express';
import {
  createComment,
  getCommentsByPostId,
  likeComment,
  dislikeComment,
  deleteComment,
  updateComment
} from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/post/:postId', getCommentsByPostId);
router.put('/like/:id', likeComment);
router.put('/dislike/:id', dislikeComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
