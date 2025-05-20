const userModel = require('../models/user.model');

// Register new user
const registerUser = async (userData) => {
  // Extra business logic can be added here if needed
  return await userModel.createUser(userData);
};

// Find user by email (for login, etc.)
const findUserByEmail = async (email) => {
  return await userModel.findUserByEmail(email);
};

// Verify password
const verifyPassword = async (inputPassword, hashedPassword) => {
  return await userModel.verifyPassword(inputPassword, hashedPassword);
};

// Get user profile by ID
const getUserProfile = async (userId) => {
  return await userModel.getUserById(userId);
};

// Update user profile
const updateUser = async (userId, updateData) => {
  return await userModel.updateUserProfile(userId, updateData);
};

// Get all users (for admin etc.)
const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

// Soft delete user
const deleteUser = async (userId) => {
  return await userModel.softDeleteUser(userId);
};

module.exports = {
  registerUser,
  findUserByEmail,
  verifyPassword,
  getUserProfile,
  updateUser,
  getAllUsers,
  deleteUser
};
