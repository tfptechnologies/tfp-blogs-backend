const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");
const validate = require("../middlewares/tag.middleware");
const { getAllTagsValidator } = require("../validators/tag.validator");

router.get("/", validate({ query: getAllTagsValidator }), tagController.getAllTags);
router.get("/:id", tagController.getTagById);
router.post("/", tagController.createTag);
router.put("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

module.exports = router;
