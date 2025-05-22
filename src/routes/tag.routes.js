const express = require("express");
const router = express.Router();

const {
  createTagController,
  getAllTagsController,
  getTagByIdController,
  getTagBySlugController,
  updateTagController
} = require("../controllers/tag.controller.js");

const validateTag = require("../middlewares/tag.middleware");

// Routes
router.post("/", validateTag, createTagController);
router.get("/", getAllTagsController);

// IMPORTANT: Place specific routes BEFORE dynamic ones
router.get("/slug/:slug", getTagBySlugController);
router.get("/id/:id", getTagByIdController); // Changed from "/:id" to "/id/:id" to avoid route conflicts

router.put("/:id", validateTag, updateTagController);
module.exports = router;
