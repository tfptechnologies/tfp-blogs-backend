const prisma = require("../prisma/client");

// Get all tags 
const getAllTagsList = async () => {
  try {
    const tags = await prisma.tag.findMany({ where: { deleted: false } });

    return {
      success: true,
      message: "Tags fetched successfully",
      data: tags,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching tags",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};


// Get tag by ID
const getTagById = async (id) => {
  try {
    const tag = await prisma.tag.findUnique({ where: { id: id } });

    if (!tag) {
      return {
        success: false,
        message: "Tag not found",
        data: null,
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: "Tag fetched successfully",
      data: tag,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the tag",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};

// Create a new tag
const createTag = async (tag) => {
  try {
    const createdTag = await prisma.tag.create({ data: tag });

    return {
      success: true,
      message: "Tag created successfully",
      data: createdTag,
      statusCode: 201,
    };
  } catch (error) {

    return {
      success: false,
      message: "An error occurred while creating the tag",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};


// Update tag
const updateTag = async (id, data) => {
  try {
    const tagId = id;

    if (!tagId) {
      return {
        success: false,
        message: "Invalid tag ID",
        error: "ID must be a number",
        data: null,
        statusCode: 400,
      };
    }
    const updated = await prisma.tag.update({
      where: { id: tagId },
      data,
    });

    return {
      success: true,
      message: "Tag updated successfully",
      data: updated,
      statusCode: 200,
    };
  } catch (error) {
    if (error.code === "P2025") {
      return {
        success: false,
        message: "Tag not found",
        error: "No tag exists with the provided ID",
        data: null,
        statusCode: 404,
      };
    }
    return {
      success: false,
      message: "An error occurred while updating the tag",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};



// Soft-delete tag (set deleted: true)
const deleteTag = async (id) => {
  try {
    const tagId = id;

    if (!tagId) {
      return {
        success: false,
        message: "Invalid tag ID",
        error: "ID must be a number",
        data: null,
        statusCode: 400,
      };
    }

    const deleted = await prisma.tag.update({
      where: { id: tagId },
      data: { deleted: true },
    });

    return {
      success: true,
      message: "Tag deleted successfully",
      data: deleted,
      statusCode: 200,
    };
  } catch (error) {
    if (error.code === "P2025") {
      return {
        success: false,
        message: "Tag not found",
        error: "No tag exists with the provided ID",
        data: null,
        statusCode: 404,
      };
    }

    console.error("Error in deleteTag:", error);

    return {
      success: false,
      message: "An error occurred while deleting the tag",
      error: error.message,
      data: null,
      statusCode: 500,
    };
  }
};



module.exports = {
  getAllTagsList,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
