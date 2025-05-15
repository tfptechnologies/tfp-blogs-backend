const userService = require("../services/user.service");

exports.getAllusers = async (req,res) =>{

    try{
  
        res.send( await userService.getAllusers());

    }catch(e){
        res.status(500).send({msg:"Internal Server Error",error:e});
    }
}



exports.createUser = async (req, res) => {
  try {
    let user = req.body;
      console.log("Controller");

    let response = await userService.createUser(user);

    res.send(response);

  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", error: error });
  }
};



exports.updateUser =async (req,res)=>{

}

exports.getUserById = async(req,res)=>{
  try {
    const userId = req.params.id;
    let response = await userService.getUserById(userId);
    res.send(response);
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", error: error });
  }

}