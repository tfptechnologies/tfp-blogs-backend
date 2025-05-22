const tagService = require("../services/tag.service");

const createTagController = async (req, res) => {
  try {
    const tag = await tagService.createTagService(req.body);
    return res.status(201).json({ success: true, tag });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTagsController = async (req, res) => {
  try {
    const tags = await tagService.getAllTagsService();
    return res.status(200).json({ success: true, tags });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTagByIdController = async (req, res) => {
  try {
    const tag = await tagService.getTagByIdService(req.params.id);
    return res.status(200).json({ success: true, tag });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const getTagBySlugController = async (req, res) => {
  try {
    const tag = await tagService.getTagBySlugService(req.params.slug);
    return res.status(200).json({ success: true, tag });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const updateTagController = async (req, res) => {
  try {
    const tag = await tagService.updateTagService(req.params.id, req.body);
    return res.status(200).json({ success: true, tag });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const softDeleteTagController = async (req, res) => {
  try {
    const tag = await tagService.softDeleteTagService(req.params.id);
    return res.status(200).json({ success: true, message: "Tag soft deleted", tag });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const hardDeleteTagController = async (req, res) => {
  try {
    await tagService.hardDeleteTagService(req.params.id);
    return res.status(200).json({ success: true, message: "Tag permanently deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};




module.exports = {
  createTagController,
  getAllTagsController,
  getTagByIdController,
  getTagBySlugController,
  updateTagController,
  softDeleteTagController,
   hardDeleteTagController,
};
