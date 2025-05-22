const {
  createCategory,
  updateCategoryById,
  getAllCategories,
  findCategoryById,
  findCategoryBySlug,
  deleteCategoryById,
} = require("../models/category.model");

// Service to create a new category
const createCategoryService = async (categoryData) => {
  try {
    return await createCategory(categoryData);
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};

// Service to update a category by ID
const updateCategoryService = async (id, categoryData) => {
  try {
    const existing = await findCategoryById(id);
    if (!existing) {
      throw new Error("Category not found");
    }
    return await updateCategoryById(id, categoryData);
  } catch (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
};

// Service to get all categories
const getAllCategoriesService = async () => {
  try {
    return await getAllCategories();
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

// Service to get a category by ID
const getCategoryByIdService = async (id) => {
  try {
    const category = await findCategoryById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error(`Failed to get category by ID: ${error.message}`);
  }
};

// Service to get a category by slug
const getCategoryBySlugService = async (slug) => {
  try {
    const category = await findCategoryBySlug(slug);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error(`Failed to get category by slug: ${error.message}`);
  }
};

// Service to delete a category by ID
const deleteCategoryService = async (id) => {
  try {
    const existing = await findCategoryById(id);
    if (!existing) {
      throw new Error("Category not found");
    }
    return await deleteCategoryById(id);
  } catch (error) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
};

module.exports = {
  createCategoryService,
  updateCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  getCategoryBySlugService,
  deleteCategoryService,
};
