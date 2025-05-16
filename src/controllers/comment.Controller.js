const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {
    try {
        const { content, blogId } = req.body;
        const userId = req.user.id;

        const comment = await prisma.comment.create({
            data: {
                content,
                blogId,
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: 'Comment created successfully',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating comment',
            error: error.message
        });
    }
};

// @desc    Get comments for a blog
// @route   GET /api/comments/blog/:blogId
// @access  Public
const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { blogId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json({
            success: true,
            data: comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching comments',
            error: error.message
        });
    }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        // Check if comment exists and belongs to user
        const existingComment = await prisma.comment.findUnique({
            where: { id }
        });

        if (!existingComment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        if (existingComment.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this comment'
            });
        }

        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { content },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.json({
            success: true,
            message: 'Comment updated successfully',
            data: updatedComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating comment',
            error: error.message
        });
    }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Check if comment exists and belongs to user
        const existingComment = await prisma.comment.findUnique({
            where: { id }
        });

        if (!existingComment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        if (existingComment.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this comment'
            });
        }

        await prisma.comment.delete({
            where: { id }
        });

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting comment',
            error: error.message
        });
    }
};

// @desc    Approve comment (Admin only)
// @route   PUT /api/comments/:id/approve
// @access  Private/Admin
const approveComment = asyncHandler(async (req, res) => {
  const comment = await prisma.comment.findUnique({
    where: { id: req.params.id }
  });

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found'
    });
  }

  const updatedComment = await prisma.comment.update({
    where: { id: req.params.id },
    data: { isApproved: true },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          userImage: {
            select: {
              url: true
            }
          }
        }
      }
    }
  });

  res.json({
    success: true,
    data: updatedComment
  });
});

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment,
    approveComment
}; 