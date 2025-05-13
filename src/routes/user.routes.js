const router = require("express").Router();
const userController = require("../controllers/user.controller");

const {userValidator} = require("../validators/user.validator");
const{validateBody} = require("../middlewares/validate.middleware");
const { userValidatorMiddleWare } = require("../middlewares/userValidator.middleware");


router.get("/",userController.getAllusers);
router.post("/", userValidatorMiddleWare, userController.createUser);
router.put("/",userController.updateUser);
router.patch("/",userController.createUser);
router.delete("/",userController.createUser);

module.exports = router;