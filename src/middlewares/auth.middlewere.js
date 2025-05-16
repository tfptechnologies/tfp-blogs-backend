const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT and attach user
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user; // user object now available in all routes
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to restrict access by role
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Only for roles: ${roles.join(', ')}`,
      });
    }
    next();
  };
};

module.exports = {
  auth,
  requireRole,
};
