const authService = require("../services/auth.service");

exports.login = async (req, res) => {
  try{
     const token = await authService.login(req.body);
     res.json({ token });
  }
  catch(err){
     res.status(401).json({ error: err.message });
  }
 
};

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
