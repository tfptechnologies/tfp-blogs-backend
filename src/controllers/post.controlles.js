import prisma from '../config/db.js';

export const createPost = async (req, res) => {
  const { title, content, image, categoryId, tagIds } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      image,
      categoryId,
      authorId: req.user.id,
      tags: {
        connect: tagIds?.map(id => ({ id })),
      },
    },
    include: {
      tags: true,
      category: true,
    },
  });

  res.status(201).json(post);
};

export const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      tags: true,
      category: true,
    },
  });
  res.json(posts);
};

export const getSinglePost = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    include: {
      author: true,
      tags: true,
      category: true,
    },
  });

  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

export const deletePost = async (req, res) => {
  await prisma.post.delete({ where: { id: req.params.id } });
  res.json({ message: 'Post deleted successfully' });
};

export const updatePost = async (req, res) => {
  const { title, content, image, categoryId, tagIds } = req.body;

  const post = await prisma.post.update({
    where: { id: req.params.id },
    data: {
      title,
      content,
      image,
      categoryId,
      tags: {
        set: tagIds?.map(id => ({ id })),
      },
    },
    include: {
      tags: true,
      category: true,
    },
  });

  res.json(post);
};
