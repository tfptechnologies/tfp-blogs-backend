const userService = require('../services/user.service');

// Register/Create a new user
const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    if (error.message.includes('exists')) {
      return res.status(409).json({ // Conflict
        success: false,
        message: 'User with this email already exists',
        error: error.message
      });
    }
    if (error.message.includes('required')) {
      return res.status(400).json({ // Bad Request
        success: false,
        message: 'Missing required fields',
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error during user registration',
      error: error.message
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    if (error.message.includes('required')) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
        error: error.message
      });
    }
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching user',
      error: error.message
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    if (error.message.includes('required')) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
        error: error.message
      });
    }
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: error.message
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Failed to update user profile',
      error: error.message
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users
    });
  } catch (error) {
    if (error.message.includes('No users')) {
      return res.status(404).json({
        success: false,
        message: 'No users found',
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching users',
      error: error.message
    });
  }
};

// Soft delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    if (error.message.includes('required')) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
        error: error.message
      });
    }
    if (error.message.includes('already deleted')) {
      return res.status(409).json({
        success: false,
        message: 'User is already deleted',
        error: error.message
      });
    }
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error deleting user',
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  getUserById,
  updateUserProfile,
  getAllUsers,
  deleteUser
};
