const userModel = require("../models/user.model");


const getAllusers = async ()=>{

    let users = await userModel.getAllUsersList();

    return users;

}

const getUserById = async (id)=>{

  let user = await userModel.getUserById(id)

  return user;

}


const createUser = async (user)=>{
  console.log("Service");
    return await userModel.createUser(user);

}

module.exports = {
  getAllusers,
  createUser,
};