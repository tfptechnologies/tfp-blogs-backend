const categoryModel = require("../models/category.model");

const getAllCategories = async (filters) => {
  return await categoryModel.getAllCategoriesList(filters);
};

const getCategoryById = async (id) => {
  return await categoryModel.getCategoryById(id);
};

const createCategory = async (data) => {
  return await categoryModel.createCategory(data);
};

const updateCategory = async (id, data) => {
  return await categoryModel.updateCategory(id, data);
};

const deleteCategory = async (id) => {
  return await categoryModel.deleteCategory(id);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
