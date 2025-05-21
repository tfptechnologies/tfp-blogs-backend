const commentModel = require("../models/comment.model");

// Create top-level comment
exports.createComment = async ({ content, userId, blogId }) => {
  try {
    if (!content || !userId || !blogId) {
      throw new Error('Missing required fields');
    }

    return await commentModel.createComment({ content, userId, blogId });
  } catch (error) {
    throw new Error(`Failed to create comment: ${error.message}`);
  }
};

// Create reply to a comment
exports.createCommentReply = async ({ content, userId, blogId, replyId }) => {
  try {
    if (!content || !userId || !blogId || !replyId) {
      throw new Error('Missing required fields for reply');
    }

    const parentComment = await commentModel.findById(replyId);
    if (!parentComment) {
      throw new Error('Parent comment not found');
    }

    return await commentModel.createReply({ content, userId, blogId, replyId });
  } catch (error) {
    throw new Error(`Failed to create reply: ${error.message}`);
  }
};

// Get all comments with their replies for a blog
exports.getCommentsWithRepliesByBlog = async (blogId) => {
  try {
    if (!blogId) throw new Error('Blog ID is required');

    return await commentModel.findByBlog(blogId);
  } catch (error) {
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }
};

// Get single comment by ID
exports.getCommentById = async (id) => {
  try {
    if (!id) throw new Error('Comment ID is required');

    const comment = await commentModel.findById(id);
    if (!comment) throw new Error('Comment not found');

    return comment;
  } catch (error) {
    throw new Error(`Failed to get comment: ${error.message}`);
  }
};

// Update a comment
// exports.updateComment = async (id, content) => {
//   try {
//     if (!id || !content) throw new Error('ID and content are required');

//     const comment = await commentModel.findById(id);
//     if (!comment || comment.isDeleted) throw new Error('Comment not found or already deleted');

//     return await commentModel.update(id, { content });
//   } catch (error) {
//     throw new Error(`Failed to update comment: ${error.message}`);
//   }
// };

// Soft delete a comment
exports.deleteComment = async (id) => {
  try {
    if (!id) throw new Error('ID is required');

    const comment = await commentModel.findById(id);
    if (!comment || comment.isDeleted) throw new Error('Comment not found or already deleted');

    return await commentModel.softDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
};
