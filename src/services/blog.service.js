
const blogModel = require('../models/blog.model');

// Create a new blog
const createBlogService = async (blogData) => {
  return await blogModel.createBlog(blogData);
};

// Get all blogs
const getAllBlogsService = async () => {
  return await blogModel.getAllBlogs();
};

// Get a blog by ID
const getBlogByIdService = async (id) => {
  return await blogModel.getBlogById(id);
};

// Update a blog by ID
const updateBlogService = async (id, updatedData) => {
  return await blogModel.updateBlog(id, updatedData);
};

// Delete a blog by ID
const deleteBlogService = async (id) => {
  return await blogModel.deleteBlog(id);
};

module.exports = {
  createBlogService,
  getAllBlogsService,
  getBlogByIdService,
  updateBlogService,
  deleteBlogService
};
