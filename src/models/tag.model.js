const prisma = require("../prisma/client");

// Get all tags (excluding soft-deleted ones)
const getAllTagsList = async () => {
  try {
    const tags = await prisma.tag.findMany({ where: { deleted: false } });
    return tags;
  } catch (error) {
    console.error(" Error in getAllTagsList:", error);
    throw error;
  }
};

// Get tag by ID
const getTagById = async (id) => {
  try {
    const tag = await prisma.tag.findUnique({ where: { id: Number(id) } });
    return tag;
  } catch (error) {
    console.error(" Error in getTagById:", error);
    throw error;
  }
};

// Create a new tag
const createTag = async (tag) => {
  try {
    const createdTag = await prisma.tag.create({ data: tag });
    return createdTag;
  } catch (error) {
    console.error(" Error in createTag:", error);
    throw error;
  }
};

// Update tag
const updateTag = async (id, data) => {
  try {
    const updated = await prisma.tag.update({
      where: { id: Number(id) },
      data,
    });
    return updated;
  } catch (error) {
    if (error.code === "P2025") {
      return null; // Record not found
    }
    console.error(" Error in updateTag:", error);
    throw error;
  }
};

// Soft-delete tag (set deleted: true)
const deleteTag = async (id) => {
  try {
    const deleted = await prisma.tag.update({
      where: { id: Number(id) },
      data: { deleted: true },
    });
    return deleted;
  } catch (error) {
    if (error.code === "P2025") {
      return null; // Record not found
    }
    console.error(" Error in deleteTag:", error);
    throw error;
  }
};

module.exports = {
  getAllTagsList,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
