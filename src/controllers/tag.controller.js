const tagService = require("../services/tag.service");

// Get all tags (with optional filters later)
exports.getAllTags = async (req, res) => {
  try {
    const filters = req.query;
    const tags = await tagService.getAllTags(filters);

    if (!tags || tags.length === 0) {
      return res.status(404).send({ message: "No tags found" });
    }

    res.send(tags);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

// Get a single tag by ID
exports.getTagById = async (req, res) => {
  try {
    const tag = await tagService.getTagById(req.params.id);

    if (!tag) {
      return res.status(404).send({ message: "Tag not found" });
    }

    res.send(tag);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

// Create a new tag
exports.createTag = async (req, res) => {
  try {
    const tag = await tagService.createTag(req.body);

    if (!tag) {
      return res.status(400).send({ message: "Failed to create tag" });
    }

    res.status(201).send(tag);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
    console.log("duplicate value not enter")
  }
};


// Update tag by ID
exports.updateTag = async (req, res) => {
  try {
    const updated = await tagService.updateTag(req.params.id, req.body);

    if (!updated) {
      return res.status(404).send({ message: "Tag not found" });
    }

    res.send(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).send({ message: "Tag not found" });
    }

    res.status(500).send({ message: "Internal Server Error", error });
  }
};


// Delete tag by ID
exports.deleteTag = async (req, res) => {
  try {
    const deleted = await tagService.deleteTag(req.params.id);

    if (!deleted) {
      return res.status(404).send({ message: "Tag not found or already deleted" });
    }

    res.send({ message: "Tag deleted", data: deleted });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).send({ message: "Tag not found" });
    }

    res.status(500).send({ message: "Internal Server Error", error });
  }
};

