const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
