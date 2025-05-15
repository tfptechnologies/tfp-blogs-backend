const express = require("express");
const app = express();
const routes = require("./routes");l̥
const errorLogger = require("./middlewares/error.middleware");


app.use(express.json());
app.use("/api", routes);
app.use(errorLogger);


module.exports = app;
 