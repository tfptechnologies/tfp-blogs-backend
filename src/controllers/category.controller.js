const categoryService = require("../services/category.service");

exports.getAllCategories = async (req, res) => {
  try {
    const filters = req.query;
    const categories = await categoryService.getAllCategories(filters);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await categoryService.updateCategory(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    res.json({ message: "Category deleted", data: deleted });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};
