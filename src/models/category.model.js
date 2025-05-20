const prisma = require("../prisma/client");

const getAllCategoriesList = async (filters = {}) => {
  const { isActive, search } = filters;

  return await prisma.category.findMany({
    where: {
      ...(isActive !== undefined && { isActive: isActive === "true" }),
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: { name: "asc" },
  });
};

const getCategoryById = async (id) => {
  return await prisma.category.findUnique({ where: { id } });
};

const createCategory = async (data) => {
  return await prisma.category.create({ data });
};

const updateCategory = async (id, data) => {
  return await prisma.category.update({ where: { id }, data });
};

const deleteCategory = async (id) => {
  return await prisma.category.delete({ where: { id } });
};

module.exports = {
  getAllCategoriesList,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
