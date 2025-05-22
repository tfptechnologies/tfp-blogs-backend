const express = require("express");
const userRoutes = require("./user.routes");
const blogRoutes = require("./blog.routes");
const commentRoutes = require("./comment.routes");
const imageRoutes = require("./image.routes");
const authRoutes = require("./auth.routes");

const router = express.Router();

router.use("/user", userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);
router.use('/image', imageRoutes);
router.use('/auth', authRoutes);


module.exports = router;






// const authRoutes = require("./auth.routes");
// router.use("/auth", authRoutes);