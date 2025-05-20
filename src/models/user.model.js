const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Find user by email
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

// Create new user with hashed password
const createUser = async ({ fullName, email, password, gender, dob, phone, occupation }) => {
  // Check if email already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  // Basic validation (optional but good practice)
  if (!fullName || !email || !password) {
    throw new Error('Full name, email, and password are required.');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Create user
    return await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        gender,
        dob: dob ? new Date(dob) : null,
        phone,
        occupation
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true
      }
    });
  } catch (error) {
    // Catch Prisma-specific or unknown errors
    throw new Error('Failed to create user: ' + error.message);
  }
};

// Verify plain password with hashed password
const verifyPassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

// Get user by ID with selected fields and user image url
const getUserById = async (id) => {
  if (!id) throw new Error('User ID is required.');

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      gender: true,
      dob: true,
      phone: true,
      occupation: true,
      role: true,
      isActive: true,
      createdAt: true,
      userImage: {
        select: { url: true }
      }
    }
  });

  if (!user) {
    throw new Error('User not found.');
  }

  return user;
};


// Update user profile fields
const updateUserProfile = async (id, data) => {
  if (!id) throw new Error('User ID is required.');

  // Check if user exists before updating
  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (!existingUser) {
    throw new Error('User not found.');
  }

  try {
    return await prisma.user.update({
      where: { id },
      data: {
        fullName: data.fullName,
        gender: data.gender,
        dob: data.dob ? new Date(data.dob) : undefined,
        phone: data.phone,
        occupation: data.occupation
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        gender: true,
        dob: true,
        phone: true,
        occupation: true,
        role: true,
        isActive: true
      }
    });
  } catch (err) {
    throw new Error('Failed to update user profile: ' + err.message);
  }
};


// Get list of all users
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: null // Optional: exclude soft-deleted users
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    if (!users || users.length === 0) {
      throw new Error('No users found.');
    }

    return users;
  } catch (err) {
    throw new Error('Failed to fetch users: ' + err.message);
  }
};


// Soft delete user by setting isDeleted field to current date
const softDeleteUser = async (id) => {
  if (!id) throw new Error('User ID is required.');

  const user = await prisma.user.findUnique({
    where: { id },
    select: { isDeleted: true }
  });

  if (!user) {
    throw new Error('User not found.');
  }

  if (user.isDeleted) {
    throw new Error('User is already deleted.');
  }

  try {
    return await prisma.user.update({
      where: { id },
      data: { isDeleted: new Date() },
      select: {
        id: true,
        fullName: true,
        email: true,
        isDeleted: true
      }
    });
  } catch (err) {
    throw new Error('Failed to delete user: ' + err.message);
  }
};


module.exports = {
  findUserByEmail,
  createUser,
  verifyPassword,
  getUserById,
  updateUserProfile,
  getAllUsers,
  softDeleteUser
};
