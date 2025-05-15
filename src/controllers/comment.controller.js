import prisma from '../config/db.js';

// Create comment - koi bhi logged-in user kar sakta hai
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    if (!postId || !content) {
      return res.status(400).json({ message: 'Post ID and content required' });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: req.user.id,   // comment creator ka userId save hoga
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get comments - public ya protected, aap decide karein (yahaan public bana rahe hain)
export const getComments = async (req, res) => {
  try {
    const { postId } = req.query;

    const comments = await prisma.comment.findMany({
      where: postId ? { postId: Number(postId) } : {},
      include: { user: true },
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update comment - sirf comment ka malik (user) kar sakta hai
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.findUnique({ where: { id: Number(id) } });

    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own comments' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
    });

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete comment - sirf comment ka malik (user) kar sakta hai
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({ where: { id: Number(id) } });

    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await prisma.comment.delete({ where: { id: Number(id) } });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
