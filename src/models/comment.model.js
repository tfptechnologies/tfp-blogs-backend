const prisma = require('../prisma/client');

//  Create  comment
exports.createComment = async ({ content, userId, blogId }) => {
  return await prisma.comment.create({
    data: { content, userId, blogId },
  });
};

// Create reply to a comment
exports.createReply = async ({ content, userId, blogId, replyId }) => {
  return await prisma.comment.create({
    data: {
      content,
      userId,
      blogId,
      replyId,
      isReply: true,
    },
  });
};

// Get all comments with replies for a blog
exports.findByBlog = async (blogId) => {
  return await prisma.comment.findMany({
    where: {
      blogId,
      isReply: false,
      isDeleted: false,
    },
    include: {
      user: true,
      replies: {
        where: { isDeleted: false },
        include: { user: true },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

//  Get comment by ID
exports.findById = async (id) => {
  return await prisma.comment.findUnique({
    where: { id },
    include: {
      user: true,
      replies: {
        where: { isDeleted: false },
        include: { user: true },
      },
    },
  });
};

//  Update comment by ID
// exports.update = async (id, data) => {
//   return await prisma.comment.update({
//     where: { id },
//     data,
//   });
// };

//  Soft delete comment by ID
exports.softDelete = async (id) => {
  return await prisma.comment.update({
    where: { id },
    data: { isDeleted: true },
  });
};
