// controllers/image.controller.js
const imageService = require('../services/image.service');

const createImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Image file is required' });

    const newImage = await imageService.createImage(req.body, file.buffer);
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await imageService.getAllImages();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getImageById = async (req, res) => {
  try {
    const image = await imageService.getImageById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const viewImageByUrl = async (req, res) => {
  try {
    const image = await imageService.getImageByUrl(`/images/${req.params.url}`);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    res.set('Content-Type', image.mimeType);
    res.send(image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const file = req.file;
    const updated = await imageService.updateImage(req.params.id, req.body, file?.buffer);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    await imageService.deleteImage(req.params.id);
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  viewImageByUrl,
  updateImage,
  deleteImage,
};
