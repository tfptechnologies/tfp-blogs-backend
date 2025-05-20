const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");

const tagRoutes = require("../routes/tag.routes");
const categoryRoutes = require("../routes/category.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

router.use('/tags', tagRoutes);
router.use('/category',categoryRoutes);

module.exports = router;
