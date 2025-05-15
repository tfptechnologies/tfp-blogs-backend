const prisma = require("../prisma/client");



const createUser = async (user) => {
  //this function is used to create a new user in the database
  return  await prisma.user.create({
    data: {...user},
  });
};


const updateUser = async (user) =>{
  return await prisma.user.update({
    where: { email: user.email },
    data: { ...user },
  });
}

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

const getAllUsersList = async ()=>{
  return await prisma.user.findMany();
}

const deleteUserByEmail = async (email) =>{
  return await prisma.user.delete({
    where: { email },
  });
}


module.exports = {
  findUserByEmail,
  createUser,
  updateUser,
  findUserById,
  getAllUsersList,
  deleteUserByEmail
};
