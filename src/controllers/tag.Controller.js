const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

// @desc    Create a new tag
// @route   POST /api/tags
// @access  Private/Admin
const createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const slug = slugify(name, { lower: true });

  const tag = await prisma.tag.create({
    data: {
      name,
      slug
    }
  });

  res.status(201).json({
    success: true,
    data: tag
  });
});

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
const getTags = asyncHandler(async (req, res) => {
  const tags = await prisma.tag.findMany({
    where: {
      isActive: true
    },
    include: {
      _count: {
        select: {
          tagOnBlogs: true
        }
      }
    }
  });

  res.json({
    success: true,
    data: tags
  });
});

// @desc    Get single tag
// @route   GET /api/tags/:slug
// @access  Public
const getTag = asyncHandler(async (req, res) => {
  const tag = await prisma.tag.findFirst({
    where: {
      slug: req.params.slug,
      isActive: true
    },
    include: {
      tagOnBlogs: {
        include: {
          blog: {
            include: {
              author: {
                select: {
                  id: true,
                  fullName: true,
                  userImage: {
                    select: {
                      url: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!tag) {
    return res.status(404).json({
      success: false,
      message: 'Tag not found'
    });
  }

  res.json({
    success: true,
    data: tag
  });
});

// @desc    Update tag
// @route   PUT /api/tags/:id
// @access  Private/Admin
const updateTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const slug = name ? slugify(name, { lower: true }) : undefined;

  const tag = await prisma.tag.update({
    where: { id: req.params.id },
    data: {
      name,
      slug
    }
  });

  res.json({
    success: true,
    data: tag
  });
});

// @desc    Delete tag
// @route   DELETE /api/tags/:id
// @access  Private/Admin
const deleteTag = asyncHandler(async (req, res) => {
  await prisma.tag.update({
    where: { id: req.params.id },
    data: { isActive: false }
  });

  res.json({
    success: true,
    message: 'Tag deleted successfully'
  });
});

module.exports = {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag
}; 