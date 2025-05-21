// services/image.service.js
const { v4: uuidv4 } = require('uuid');
const imageModel = require('../models/image.model');

const createImage = async (input, fileBuffer) => {
  try {
    if (!fileBuffer) {
      const error = new Error("Image file buffer is missing.");
      error.statusCode = 400;
      throw error;
    }

    const uniqueUrl = `/images/${uuidv4()}`;
    const data = {
      ...input,
      data: fileBuffer,
      url: uniqueUrl,
    };

    return await imageModel.createImage(data);
  } catch (err) {
    throw formatError(err, "Failed to create image.");
  }
};

const getAllImages = async () => {
  try {
    return await imageModel.getAllImages();
  } catch (err) {
    throw formatError(err, "Failed to fetch images.");
  }
};

const getImageById = async (id) => {
  try {
    const image = await imageModel.getImageById(id);
    if (!image) {
      const error = new Error("Image not found.");
      error.statusCode = 404;
      throw error;
    }
    return image;
  } catch (err) {
    throw formatError(err, "Failed to fetch image by ID.");
  }
};

const getImageByUrl = async (url) => {
  try {
    const image = await imageModel.getImageByUrl(url);
    if (!image) {
      const error = new Error("Image not found for this URL.");
      error.statusCode = 404;
      throw error;
    }
    return image;
  } catch (err) {
    throw formatError(err, "Failed to fetch image by URL.");
  }
};

const updateImage = async (id, input, fileBuffer) => {
  try {
    const existingImage = await imageModel.getImageById(id);
    if (!existingImage) {
      const error = new Error("Image not found.");
      error.statusCode = 404;
      throw error;
    }

    const data = { ...input };
    if (fileBuffer) {
      data.data = fileBuffer;
    }

    return await imageModel.updateImage(id, data);
  } catch (err) {
    throw formatError(err, "Failed to update image.");
  }
};

const deleteImage = async (id) => {
  try {
    const existingImage = await imageModel.getImageById(id);
    if (!existingImage) {
      const error = new Error("Image not found.");
      error.statusCode = 404;
      throw error;
    }

    return await imageModel.deleteImage(id);
  } catch (err) {
    throw formatError(err, "Failed to delete image.");
  }
};

// Helper function to attach status code
function formatError(err, defaultMsg) {
  const error = new Error(err.message || defaultMsg);
  error.statusCode = err.statusCode || 500;
  return error;
}

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  getImageByUrl,
  updateImage,
  deleteImage,
};
