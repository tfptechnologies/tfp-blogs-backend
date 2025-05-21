const commentService = require('../services/comment.service');

//  Create a top-level comment
exports.createComment = async (req, res) => {
  try {
    const { content, blogId } = req.body;
    const userId = req.user?.id;

    // Validate inputs
    if (!content || !blogId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Content, blogId, and userId are required.',
      });
    }

    const comment = await commentService.createComment({ content, userId, blogId });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

//  Create a reply to a comment
exports.createReply = async (req, res) => {
  try {
    const { content, blogId, replyId } = req.body;
    const userId = req.user?.id;

    // Validate inputs
    if (!content || !blogId || !replyId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Content, blogId, replyId, and userId are required.',
      });
    }

    const reply = await commentService.createCommentReply({
      content,
      userId,
      blogId,
      replyId,
    });

    res.status(201).json({
      success: true,
      message: 'Reply created successfully',
      data: reply,
    });
  } catch (error) {
    const notFound = error.message.includes('Parent comment not found');
    res.status(notFound ? 404 : 500).json({ success: false, message: error.message });
  }
};

//  Get all comments and their replies for a blog
exports.getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: 'Blog ID is required.',
      });
    }

    const comments = await commentService.getCommentsWithRepliesByBlog(blogId);

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

//  Get single comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Comment ID is required.',
      });
    }

    const comment = await commentService.getCommentById(id);

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    const notFound = error.message.includes('Comment not found');
    res.status(notFound ? 404 : 500).json({ success: false, message: error.message });
  }
};

//  Soft delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Comment ID is required.',
      });
    }

    await commentService.deleteComment(id);

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    const notFound = error.message.includes('not found');
    res.status(notFound ? 404 : 500).json({ success: false, message: error.message });
  }
};
