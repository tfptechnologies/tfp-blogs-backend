const express = require('express');
const router = express.Router();
const {
  
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUser,
  getAllUsers
} = require('../controllers/user.controller');




// getUserById
router.get('/:id', getUserById);

// deleteUser b?
router.delete('/:id', deleteUser);

router.get('/profile',  getUserProfile);
router.put('/:id',  updateUserProfile);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);



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