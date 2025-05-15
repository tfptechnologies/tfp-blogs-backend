// Example: protectAuthor middleware - sirf author hi access kar sake
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export const protectAuthor = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user is author
      const author = await prisma.author.findUnique({ where: { id: decoded.id } });

      if (!author) {
        return res.status(403).json({ message: 'Access denied. Author only.' });
      }

      req.author = author;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
