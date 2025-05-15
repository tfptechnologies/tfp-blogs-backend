const express = require("express");
const path = require("path");

const authorRoutes = require("./author.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const uploadImage = require("./image.routes"); 
const post = require("./post.routes");
const tag = require("./tag.routes");
const comment = require("./comment.routes");
const subComment = require("./sub.comment");

const router = express.Router();


router.use("/author", authorRoutes);
router.use("/user", userRoutes);
router.use("/categories", categoryRoutes);
router.post('/', protect, isAuthor, upload.single('image'), uploadImage); 
router.use("/posts", post);  
router.use("/tag", tag);  
router.use("/comments", comment); 
router.use("/sub-comment",subComment);




// router.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

module.exports = router;
