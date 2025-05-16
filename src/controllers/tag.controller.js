const tagService = require("../services/tag.service");

exports.getAllTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

exports.getTagById = async (req, res) => {
  try {
    const tag = await tagService.getTagById(req.params.id);
    res.json(tag);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

exports.createTag = async (req, res) => {
  try {
    const tag = await tagService.createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const updated = await tagService.updateTag(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const deleted = await tagService.deleteTag(req.params.id);
    res.json({ message: "Tag deleted", data: deleted });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};
