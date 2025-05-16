const express = require("express");
const userRoutes = require("./user.routes");
const blogRoutes = require("./blog.routes");
const commentRoutes = require("./comment.routes");
const categoryRoutes = require("./category.routes");
const tagRoutes = require("./tagRoutes");
const imageRoutes = require("./image.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);
router.use('/images', imageRoutes);




module.exports = router;






// const authRoutes = require("./auth.routes");
// router.use("/auth", authRoutes);