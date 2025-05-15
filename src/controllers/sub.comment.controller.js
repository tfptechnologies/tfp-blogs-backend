import prisma from '../config/db.js';

// Create Subcomment - koi bhi logged-in user
export const createSubcomment = async (req, res) => {
  try {
    const { commentId, content } = req.body;

    if (!commentId || !content) {
      return res.status(400).json({ message: 'Comment ID and content required' });
    }

    const subcomment = await prisma.subcomment.create({
      data: {
        content,
        commentId,
        userId: req.user.id,
      },
    });

    res.status(201).json(subcomment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get subcomments (optionally by commentId)
export const getSubcomments = async (req, res) => {
  try {
    const { commentId } = req.query;

    const subcomments = await prisma.subcomment.findMany({
      where: commentId ? { commentId: Number(commentId) } : {},
      include: { user: true },
    });

    res.json(subcomments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update subcomment - sirf malik (user)
export const updateSubcomment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const subcomment = await prisma.subcomment.findUnique({ where: { id: Number(id) } });

    if (!subcomment) return res.status(404).json({ message: 'Subcomment not found' });
    if (subcomment.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own subcomments' });
    }

    const updatedSubcomment = await prisma.subcomment.update({
      where: { id: Number(id) },
      data: { content },
    });

    res.json(updatedSubcomment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete subcomment - sirf malik (user)
export const deleteSubcomment = async (req, res) => {
  try {
    const { id } = req.params;

    const subcomment = await prisma.subcomment.findUnique({ where: { id: Number(id) } });

    if (!subcomment) return res.status(404).json({ message: 'Subcomment not found' });
    if (subcomment.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own subcomments' });
    }

    await prisma.subcomment.delete({ where: { id: Number(id) } });

    res.json({ message: 'Subcomment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
