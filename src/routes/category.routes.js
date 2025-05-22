const express = require("express");
const router = express.Router();
const {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getCategoryBySlugController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/category.controller");

const validateCategory = require("../middlewares/category.middleware");

router.post("/", validateCategory, createCategoryController);
router.put("/:id", validateCategory, updateCategoryController);
router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryByIdController);
router.get("/slug/:slug", getCategoryBySlugController);
router.delete("/:id", deleteCategoryController);

module.exports = router;
