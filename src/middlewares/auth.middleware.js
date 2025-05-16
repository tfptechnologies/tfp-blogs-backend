const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('../utils/asyncHandler');

const prisma = new PrismaClient();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Extract token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. If token not found
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is missing or invalid',
    });
  }

  // 3. Verify token and decode user ID
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 4. Find user by ID and select only needed fields
  const user = await prisma.user.findUnique({
    where: { id: decoded.id || decoded.userId }, // handles both id and userId
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      isActive: true,
    },
  });

  // 5. If user not found or inactive
  if (!user || !user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'User not found or inactive',
    });
  }

  // 6. Attach user to request
  req.user = user;
  next();
});

module.exports = protect;
