const blogService = require('../services/blog.service');

// @desc    Create a new blog
const createBlog = async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      authorId: req.user.id,
    };

    // Validate required fields explicitly
    if (!blogData.title || !blogData.content) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title and content are required',
      });
    }

    const blog = await blogService.createBlogService(blogData);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating blog',
      error: error.message,
    });
  }
};

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogsService();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No blogs found',
      });
    }

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error fetching blogs',
      error: error.message,
    });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Blog ID is required',
      });
    }

    const blog = await blogService.getBlogByIdService(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error fetching blog',
      error: error.message,
    });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Blog ID is required',
      });
    }

    const blog = await blogService.getBlogByIdService(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    if (blog.authorId !== authorId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this blog',
      });
    }

    const updatedBlog = await blogService.updateBlogService(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error updating blog',
      error: error.message,
    });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Blog ID is required',
      });
    }

    const blog = await blogService.getBlogByIdService(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    if (blog.authorId !== authorId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this blog',
      });
    }

    await blogService.deleteBlogService(id);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error deleting blog',
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
