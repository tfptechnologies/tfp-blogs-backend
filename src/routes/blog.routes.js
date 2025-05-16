const express = require('express');
const router = express.Router();
const { 
    createBlog, 
    getBlogs, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blog.controller');
const validate = require('../middlewares/validate.middleware');
const { createBlogSchema, updateBlogSchema } = require('../validators/blog.validator');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);


// Protected routes
router.get('/:slug', getBlog);
router.post('/', authMiddleware, validate(createBlogSchema), createBlog);
router.put('/:id', authMiddleware, validate(updateBlogSchema), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router; 