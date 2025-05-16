const express = require('express');
const router = express.Router();
const { 
    createComment, 
    getComments, 
    updateComment, 
    deleteComment 
} = require('../controllers/comment.controller');
const validate = require('../middlewares/validate.middleware');
const { createCommentSchema, updateCommentSchema } = require('../validators/comment.validator');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.get('/blog/:blogId', getComments);

// Protected routes
router.post('/', authMiddleware, validate(createCommentSchema), createComment);
router.put('/:id', authMiddleware, validate(updateCommentSchema), updateComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router; 