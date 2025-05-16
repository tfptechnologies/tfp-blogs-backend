const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

const tagRoutes = require('./tag.routes');

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

router.use("tags",tagRoutes);


module.exports = router;


