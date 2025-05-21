const router = require("express").Router(); //  call Router()

const categoryController = require("../controllers/category.controller");
const validate = require("../middlewares/category.middleware"); 

// const {
//   getAllCategoriesValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
// } = require("../validators/category.validator");

router.get(
  "/",
  categoryController.getAllCategories
);
router.get("/:id", categoryController.getCategoryById);
router.post(
  "/",
  categoryController.createCategory
);
router.put(
  "/:id",
  categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
