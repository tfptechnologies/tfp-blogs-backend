const router = require('express').Router;
// const router = express.Router();
const commentController = require('../controllers/comment.Controller');


router.post('/',  commentController.createComment);
router.post('/reply',  commentController.createReply);

router.get('/blog/:blogId', commentController.getCommentsByBlog);
router.get('/:id', commentController.getCommentById);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
