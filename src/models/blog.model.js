const prisma = require('../prisma/client');

// Create a new blog
const createBlog = async (data) => {
  if (!data.title || !data.content || !data.authorId) {
    throw new Error('Missing required fields: title, content, and authorId are required');
  }
  try {
    return await prisma.blog.create({ data });
  } catch (error) {
    throw new Error('Failed to create blog: ' + error.message);
  }
};

// Get all blogs with author info
const getAllBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        }
      }
    });
    if (!blogs || blogs.length === 0) {
      throw new Error('No blogs found');
    }
    return blogs;
  } catch (error) {
    throw new Error('Failed to fetch blogs: ' + error.message);
  }
};

// Get blog by ID
const getBlogById = async (id) => {
  if (!id) throw new Error('Blog ID is required');
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        }
      }
    });
    if (!blog) throw new Error('Blog not found');
    return blog;
  } catch (error) {
    throw new Error('Failed to fetch blog: ' + error.message);
  }
};

// Update blog
const updateBlog = async (id, data) => {
  if (!id) throw new Error('Blog ID is required');
  try {
    // check if blog exists first
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) throw new Error('Blog not found');

    return await prisma.blog.update({
      where: { id },
      data
    });
  } catch (error) {
    throw new Error('Failed to update blog: ' + error.message);
  }
};

// Delete blog
const deleteBlog = async (id) => {
  if (!id) throw new Error('Blog ID is required');
  try {
    // check if blog exists first
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) throw new Error('Blog not found');

    return await prisma.blog.delete({ where: { id } });
  } catch (error) {
    throw new Error('Failed to delete blog: ' + error.message);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
};
