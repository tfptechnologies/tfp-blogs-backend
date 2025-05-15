import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create comment
export const createComment = async (req, res) => {
  const { text, author, postId, parentId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        author,
        postId,
        parentId,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get comments by postId (with replies)
export const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
        parentId: null,
      },
      include: {
        replies: {
          include: {
            replies: true, // Recursive up to 2 levels
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like comment
export const likeComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        likes: { increment: 1 },
      },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dislike comment
export const dislikeComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        dislikes: { increment: 1 },
      },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update comment
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { text },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({ where: { id: Number(id) } });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
