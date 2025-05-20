const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUser,
  getAllUsers
} = require('../controllers/user.controller');
const protect = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.Check');


// Routes
// router.post('/register', registerValidation, registerUser);
// router.post('/login', loginValidation, loginUser);

// getUserById
router.get('/:id', getUserById);

// deleteUser b?
router.delete('/:id', deleteUser);

router.get('/profile', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.get('/', protect, authorize('admin'), getAllUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);



// router.post('/refresh-token', refreshToken);

module.exports = router; 

















// Validation middleware
// const registerValidation = [
//   body('fullName').notEmpty().withMessage('Full name is required'),
//   body('email').isEmail().withMessage('Please include a valid email'),
//   body('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long')
// ];

// const loginValidation = [
//   body('email').isEmail().withMessage('Please include a valid email'),
//   body('password').notEmpty().withMessage('Password is required')
// ];