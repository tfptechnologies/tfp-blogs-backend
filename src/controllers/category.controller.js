const categoryService = require("../services/category.service");

// GET all categories with optional filters
exports.getAllCategories = async (req, res) => {
  try {
    const filters = req.query;
    const categories = await categoryService.getAllCategories(filters);

    if (!categories || categories.length === 0) {
      return res.status(404).send({ message: "No categories found" });
    }

    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

// GET category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.send(category);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// CREATE category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);

    if (!newCategory) {
      return res.status(400).send({ message: "Failed to create category" });
    }

    res.status(201).send(newCategory);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

//Update Category
exports.updateCategory = async (req, res) => {
  try {
    const updated = await categoryService.updateCategory(req.params.id, req.body);

    if (!updated) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(500).send({ message: "Internal Server Error", error });
  }
};


// DELETE category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);

    if (!deleted) {
      return res.status(404).send({ message: "Category not found or already deleted" });
    }

    res.send({ message: "Category deleted", data: deleted });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(500).send({ message: "Internal Server Error", error });
  }
};
