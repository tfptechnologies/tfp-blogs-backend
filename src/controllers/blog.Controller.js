const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private/Author
const createBlog = async (req, res) => {
    try {
        const { title, content, category, tags, isPublished } = req.body;
        const authorId = req.user.id;

        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                category,
                tags,
                isPublished,
                authorId
            }
        });

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating blog',
            error: error.message
        });
    }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.json({
            success: true,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blogs',
            error: error.message
        });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await prisma.blog.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog',
            error: error.message
        });
    }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Author
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, tags, isPublished } = req.body;
        const authorId = req.user.id;

        // Check if blog exists and belongs to user
        const existingBlog = await prisma.blog.findUnique({
            where: { id }
        });

        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        if (existingBlog.authorId !== authorId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this blog'
            });
        }

        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: {
                title,
                content,
                category,
                tags,
                isPublished
            }
        });

        res.json({
            success: true,
            message: 'Blog updated successfully',
            data: updatedBlog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating blog',
            error: error.message
        });
    }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Author
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const authorId = req.user.id;

        // Check if blog exists and belongs to user
        const existingBlog = await prisma.blog.findUnique({
            where: { id }
        });

        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        if (existingBlog.authorId !== authorId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this blog'
            });
        }

        await prisma.blog.delete({
            where: { id }
        });

        res.json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting blog',
            error: error.message
        });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}; 