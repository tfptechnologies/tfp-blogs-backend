const router = require('express').Router;
const { 
    createBlog, 
    getBlogs, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blog.Controller');


router.get('/', getBlogs);
router.get('/:id', getBlogById);

router.post('/',  createBlog);

router.put('/:id',  updateBlog);
router.delete('/:id',  deleteBlog);

module.exports = router; 