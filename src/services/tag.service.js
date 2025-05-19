const tagModel = require("../models/tag.model");

const getAllTags = async () => {
  return await tagModel.getAllTagsList();
};

const getTagById = async (id) => {
  return await tagModel.getTagById(id);
};

const createTag = async (tag) => {
  return await tagModel.createTag(tag);
};

const updateTag = async (id, data) => {
  return await tagModel.updateTag(id, data);
};

const deleteTag = async (id) => {
  return await tagModel.deleteTag(id);
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
