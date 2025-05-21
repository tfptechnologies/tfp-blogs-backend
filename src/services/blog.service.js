const blogmodel = require('../models/blog.model');

// Create a new blog
const createBlog = async (data) => {
  if (!data.title || !data.content || !data.authorId) {
    // 400 Bad Request
    throw new Error('400: Missing required fields: title, content, and authorId are required');
  }

  try {
    return await blogmodel.blogcreate(data);
  } catch (error) {
    // 500 Internal Server Error
    throw new Error('500: Failed to create blog - ' + error.message);
  }
};

// Get all blogs
const getAllBlogs = async () => {
  try {
    const blogs = await blogmodel.blogfindAll();
    if (!blogs || blogs.length === 0) {
      // 404 Not Found
      throw new Error('404: No blogs found');
    }
    return blogs;
  } catch (error) {
    // 500 Internal Server Error
    throw new Error('500: Failed to fetch blogs - ' + error.message);
  }
};

// Get blog by ID
const getBlogById = async (id) => {
  if (!id) {
    // 400 Bad Request
    throw new Error('400: Blog ID is required');
  }

  try {
    const blog = await blogmodel.blogfindById(id);
    if (!blog) {
      // 404 Not Found
      throw new Error('404: Blog not found');
    }
    return blog;
  } catch (error) {
    // 500 Internal Server Error
    throw new Error('500: Failed to fetch blog - ' + error.message);
  }
};

// Update blog
const updateBlog = async (id, data) => {
  if (!id) {
    // 400 Bad Request
    throw new Error('400: Blog ID is required');
  }

  try {
    const existing = await blogmodel.blogfindExists(id);
    if (!existing) {
      // 404 Not Found
      throw new Error('404: Blog not found');
    }

    return await blogmodel.blogupdate(id, data);
  } catch (error) {
    // 500 Internal Server Error
    throw new Error('500: Failed to update blog - ' + error.message);
  }
};

// Delete blog
const deleteBlog = async (id) => {
  if (!id) {
    // 400 Bad Request
    throw new Error('400: Blog ID is required');
  }

  try {
    const existing = await blogmodel.blogfindExists(id);
    if (!existing) {
      // 404 Not Found
      throw new Error('404: Blog not found');
    }

    return await blogmodel.blogdelete(id);
  } catch (error) {
    // 500 Internal Server Error
    throw new Error('500: Failed to delete blog - ' + error.message);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
