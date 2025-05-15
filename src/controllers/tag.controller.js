import prisma from '../config/db.js';

export const createTag = async (req, res) => {
  const { name } = req.body;

  const exists = await prisma.tag.findUnique({ where: { name } });
  if (exists) return res.status(400).json({ message: 'Tag already exists' });

  const tag = await prisma.tag.create({
    data: {
      name,
      authorId: req.user.id, 
    },
  });

  res.status(201).json(tag);
};

export const getAllTags = async (req, res) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;

  await prisma.tag.delete({ where: { id } });

  res.json({ message: 'Tag deleted successfully' });
};
