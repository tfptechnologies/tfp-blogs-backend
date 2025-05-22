const tagModel = require("../models/tag.model");

const createTagService = async (data) => {
  try {
    return await tagModel.createTag(data);
  } catch (error) {
    throw new Error("Failed to create tag: " + error.message);
  }
};

const getAllTagsService = async () => {
  try {
    return await tagModel.getAllTags();
  } catch (error) {
    throw new Error("Failed to fetch tags");
  }
};

const getTagByIdService = async (id) => {
  try {
    return await tagModel.getTagById(id);
  } catch (error) {
    throw new Error("Tag not found");
  }
};

const getTagBySlugService = async (slug) => {
  try {
    return await tagModel.getTagBySlug(slug);
  } catch (error) {
    throw new Error("Tag not found");
  }
};

const updateTagService = async (id, data) => {
  try {
    return await tagModel.updateTag(id, data);
  } catch (error) {
    throw new Error("Failed to update tag");
  }
};



module.exports = {
  createTagService,
  getAllTagsService,
  getTagByIdService,
  getTagBySlugService,
  updateTagService,
};
