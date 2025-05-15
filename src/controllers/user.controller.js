import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { name, email, password, mobile, altMobile, age } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, mobile, altMobile, age },
  });

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
};

export const getUserProfile = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    altMobile: user.altMobile,
    age: user.age,
  });
};

export const updateUserProfile = async (req, res) => {
  const { name, email, mobile, altMobile, age } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { name, email, mobile, altMobile, age },
  });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    altMobile: user.altMobile,
    age: user.age,
  });
};

export const deleteUser = async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ message: 'User deleted successfully' });
};
