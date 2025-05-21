const prisma = require("../prisma/client");

// Get all categories with optional filters
const getAllCategoriesList = async (filters = {}) => {
  const { isActive, search } = filters; //this is optional but when we want to filterd data then it's

  try {
    const categories = await prisma.category.findMany({
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

    return categories;
  } catch (error) {
    console.error("Error in getAllCategoriesList:", error);
    throw error;
  }
};

// Get category by ID
const getCategoryById = async (id) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    return category;
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    throw error;
  }
};

// Create a new category
const createCategory = async (data) => {
  try {
    const newCategory = await prisma.category.create({
      data,
    });

    return newCategory;
  } catch (error) {
    console.error("Error in createCategory:", error);
    throw error;
  }
};

// Update category by ID
const updateCategory = async (id, data) => {
  try {
    const updated = await prisma.category.update({
      where: { id },
      data,
    });

    return updated;
  } catch (error) {
    if (error.code === "P2025") {
      return null; // Record not found
    }
    console.error("Error in updateCategory:", error);
    throw error;
  }
};

// Delete category by ID
const deleteCategory = async (id) => {
  try {
    const deleted = await prisma.category.delete({
      where: { id },
    });

    return deleted;
  } catch (error) {
    if (error.code === "P2025") {
      return null; // Record not found
    }
    console.error("Error in deleteCategory:", error);
    throw error;
  }
};

module.exports = {
  getAllCategoriesList,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
