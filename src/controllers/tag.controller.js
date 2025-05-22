const tagService = require("../services/tag.service");

//create tag controller
const createTagController = async (req, res) => {
  try {
    const tag = await tagService.createTagService(req.body);
    return res.status(201).json({ success: true, tag });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get all tag controller
const getAllTagsController = async (req, res) => {
  try {
    const tags = await tagService.getAllTagsService();
    return res.status(200).json({ success: true, tags });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get tag by ID controller
const getTagByIdController = async (req, res) => {
  try {
    
    const tag = await tagService.getTagByIdService(req.params.id);
    return res.status(200).json({ success: true, tag });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

//get data or tag by ID or Slug controller
const getTagBySlugController = async (req, res) => {
  try {
    const tag = await tagService.getTagBySlugService(req.params.slug);
    return res.status(200).json({ success: true, tag });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

//update tag controller
const updateTagController = async (req, res) => {
  try {
    const tag = await tagService.updateTagService(req.params.id, req.body);
    return res.status(200).json({ success: true, tag });
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
};
