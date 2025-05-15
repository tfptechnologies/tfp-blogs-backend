const prisma = require("../prisma/client");



// tag ={
//     id :"generated",
//     name :"AI" ,    
//     slug :"ai" ,   
//     isActive : true
// }

const createTag= async (model) => {
  //this function is used to create a new tag in the database
  return await prisma.tag.create({
    data: { ...model },
  });
  
};

module.exports = {
  findUserByEmail,
  createUser,
  updateUser,
  findUserById,
  getAllUsersList,
  deleteUserByEmail,
};
  