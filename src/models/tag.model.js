const prisma = require("../prisma/client");

// Create Tag
const createTag = async (tag) => {
  return await prisma.tag.create({ data: { ...tag } });
};

// Get All Tags (Only non-deleted ones)
const getAllTags = async () => {
  return await prisma.tag.findMany({ where: { deleted: false } });
};

// Get Tag by ID (only if not deleted)
const getTagById = async (id) => {
  return await prisma.tag.findFirst({ where: { id, deleted: false } });
};

// Get Tag by Slug (only if not deleted)
const getTagBySlug = async (slug) => {
  return await prisma.tag.findFirst({ where: { slug, deleted: false } });
};

// Update Tag
const updateTag = async (id, tag) => {
  return await prisma.tag.update({
    where: { id },
    data: { ...tag },
  });
};




module.exports = {
  createTag,
  getAllTags,
  getTagById,
  getTagBySlug,
  updateTag,
};
