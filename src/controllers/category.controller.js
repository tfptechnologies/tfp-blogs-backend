const {
  createCategoryService,
  updateCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  getCategoryBySlugService,
  deleteCategoryService,
} = require("../services/category.service");

// Create Category Controller
const createCategoryController = async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await createCategoryService(categoryData);
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Categories Controller
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Category by ID Controller
const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService(id);
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Category by Slug Controller
const getCategoryBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await getCategoryBySlugService(slug);
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Category by ID Controller
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;
    const updatedCategory = await updateCategoryService(id, categoryData);
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Category by ID Controller
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteCategoryService(id);
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getCategoryBySlugController,
  updateCategoryController,
  deleteCategoryController,
};
