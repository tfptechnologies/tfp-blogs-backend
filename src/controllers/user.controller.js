const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Create
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    });
    res.status(201).json({ ...user, password: undefined });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { ...user, password: undefined } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  res.json(users);
};

// Get User by ID
exports.getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Update User
exports.updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const data = { name, email, role };
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data,
    });
    res.json({ ...user, password: undefined });
  } catch (err) {
    res.status(404).json({ message: "User not found", error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(404).json({ message: "User not found", error: err.message });
  }
};
