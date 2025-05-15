import prisma from '../config/db.js';

export const createCategory = async (req, res) => {
  const { name } = req.body;

  const exists = await prisma.category.findUnique({ where: { name } });
  if (exists) return res.status(400).json({ message: 'Category already exists' });

  const category = await prisma.category.create({
    data: {
      name,
      authorId: req.user.id,
    },
  });

  res.status(201).json(category);
};

export const getAllCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await prisma.category.delete({ where: { id } });
  res.json({ message: 'Category deleted successfully' });
};
