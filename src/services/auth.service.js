const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");
const config = require("../config/config");
const { signToken } = require("../utils/jwt");

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user.id, email: user.email });
  return token;
};

exports.register = async ({name, email, password }) => {
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email, password: hash } });
};
