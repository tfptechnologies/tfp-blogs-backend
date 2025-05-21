const prisma = require("../prisma/client");

// Get all categories with optional filters
const getAllCategoriesList = async (filters = {}) => {
  const { isActive, search } = filters;

  try {
    const categories = await prisma.category.findMany({
      where: {
        ...(isActive !== undefined && {
          isActive: isActive === "true", // ensures it's boolean
        }),
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },
      orderBy: { name: "asc" },
    });

    return {
      success: true,
      message: "Categories fetched successfully",
      data: categories,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error in getAllCategoriesList:", error);

    return {
      success: false,
      message: "An error occurred while fetching categories",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};


// Get category by ID
const getCategoryById = async (id) => {
  try {
    const categoryId = Number(id);

    if (isNaN(categoryId)) {
      return {
        success: false,
        message: "Invalid category ID",
        error: "ID must be a number",
        data: null,
        statusCode: 400,
      };
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
        error: `No category exists with ID ${id}`,
        data: null,
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: "Category fetched successfully",
      data: category,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error in getCategoryById:", error);

    return {
      success: false,
      message: "An error occurred while fetching the category",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};


// Create a new category
const createCategory = async (data) => {
  try {
    const newCategory = await prisma.category.create({ data });

    return {
      success: true,
      message: "Category created successfully",
      data: newCategory,
      statusCode: 201,
    };
  } catch (error) {
    console.error("Error in createCategory:", error);

    return {
      success: false,
      message: "An error occurred while creating the category",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};


// Update category by ID
const updateCategory = async (id, data) => {
  try {
    const categoryId = id;

    if (!categoryId) {
      return {
        success: false,
        message: "Invalid category ID",
        error: "ID must be a number",
        data: null,
        statusCode: 400,
      };
    }

    const updated = await prisma.category.update({
      where: { id: categoryId },
      data,
    });

    return {
      success: true,
      message: "Category updated successfully",
      data: updated,
      statusCode: 200,
    };
  } catch (error) {
    if (error.code === "P2025") {
      return {
        success: false,
        message: "Category not found",
        error: `No category exists with ID ${id}`,
        data: null,
        statusCode: 404,
      };
    }

    console.error("Error in updateCategory:", error);

    return {
      success: false,
      message: "An error occurred while updating the category",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};


// Delete category by ID
const deleteCategory = async (id) => {
  try {
    const categoryId = id;

    if (!categoryId) {
      return {
        success: false,
        message: "Invalid category ID",
        error: "ID must be a number",
        data: null,
        statusCode: 400,
      };
    }

    const deleted = await prisma.category.delete({
      where: { id: categoryId },
    });

    return {
      success: true,
      message: "Category deleted successfully",
      data: deleted,
      statusCode: 200,
    };
  } catch (error) {
    if (error.code === "P2025") {
      return {
        success: false,
        message: "Category not found",
        error: `No category exists with ID ${id}`,
        data: null,
        statusCode: 404,
      };
    }

    console.error("Error in deleteCategory:", error);

    return {
      success: false,
      message: "An error occurred while deleting the category",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};

module.exports = {
  getAllCategoriesList,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
