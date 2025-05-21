const router = require("express").Router(); //  call Router()

const categoryController = require("../controllers/category.controller");
const validate = require("../middlewares/category.middleware"); //  only one import

const {
  getAllCategoriesValidator,
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validators/category.validator");

router.get(
  "/",
  validate({ query: getAllCategoriesValidator }),
  categoryController.getAllCategories
);
router.get("/:id", categoryController.getCategoryById);
router.post(
  "/",
  validate({ body: createCategoryValidator }),
  categoryController.createCategory
);
router.put(
  "/:id",
  validate({ body: updateCategoryValidator }),
  categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
