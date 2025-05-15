import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const registerAuthor = async (req, res) => {
  const { name, email, password, bio } = req.body;

  const existing = await prisma.author.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: 'Author already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const author = await prisma.author.create({
    data: { name, email, password: hashedPassword, bio },
  });

  res.status(201).json({
    id: author.id,
    name: author.name,
    email: author.email,
    bio: author.bio,
    token: generateToken(author.id),
  });
};

export const loginAuthor = async (req, res) => {
  const { email, password } = req.body;

  const author = await prisma.author.findUnique({ where: { email } });
  if (!author) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, author.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    bio: author.bio,
    token: generateToken(author.id),
  });
};

export const getAuthorProfile = async (req, res) => {
  const author = await prisma.author.findUnique({ where: { id: req.user.id } });
  if (!author) return res.status(404).json({ message: 'Author not found' });

  res.json(author);
};

export const updateAuthorProfile = async (req, res) => {
  const { name, email, bio } = req.body;

  const author = await prisma.author.update({
    where: { id: req.user.id },
    data: { name, email, bio },
  });

  res.json(author);
};

export const deleteAuthor = async (req, res) => {
  await prisma.author.delete({ where: { id: req.params.id } });
  res.json({ message: 'Author deleted successfully' });
};
