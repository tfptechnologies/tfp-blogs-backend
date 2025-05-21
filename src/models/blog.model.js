const prisma = require('../prisma/client');

const blogcreate = async (data) => {
  return await prisma.blog.create({ data });
};

const blogfindAll = async () => {
  return await prisma.blog.findMany({
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};

const blogfindById = async (id) => {
  return await prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};

const blogupdate = async (id, data) => {
  return await prisma.blog.update({
    where: { id },
    data,
  });
};

const blogdelete = async (id) => {
  return await prisma.blog.delete({
    where: { id },
  });
};

const blogfindExists = async (id) => {
  return await prisma.blog.findUnique({ where: { id } });
};

module.exports = {
  blogcreate,
  blogfindAll,
  blogfindById,
  blogupdate,
  blogdelete,
  blogfindExists,
};
