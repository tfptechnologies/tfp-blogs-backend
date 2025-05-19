const prisma = require("../prisma/client");

const getAllTagsList = async () => {
  return await prisma.tag.findMany({ where: { deleted: false } });
};

const getTagById = async (id) => {
  return await prisma.tag.findUnique({ where: { id: Number(id) } });
};

const createTag = async (tag) => {
  return await prisma.tag.create({ data: tag });
};

const updateTag = async (id, data) => {
  return await prisma.tag.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteTag = async (id) => {
  return await prisma.tag.update({
    where: { id: Number(id) },
    data: { deleted: true },
  });
};

module.exports = {
  getAllTagsList,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
