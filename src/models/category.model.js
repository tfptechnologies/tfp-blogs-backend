const prisma = require("../prisma/client");

// Create a new category
const createCategory = async (category) => {
  return await prisma.category.create({
    data: { ...category },
  });
};

// Update category by ID
const updateCategoryById = async (id, category) => {
  return await prisma.category.update({
    where: { id },
    data: { ...category },
  });
};

// Get all categories
const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

// Find category by ID
const findCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

// Find category by Slug
const findCategoryBySlug = async (slug) => {
  return await prisma.category.findUnique({
    where: { slug },
  });
};

// Delete category by ID
const deleteCategoryById = async (id) => {
  return await prisma.category.delete({
    where: { id },
  });
};

module.exports = {
  createCategory,
  updateCategoryById,
  getAllCategories,
  findCategoryById,
  findCategoryBySlug,
  deleteCategoryById,
};
