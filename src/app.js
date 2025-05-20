const express = require("express");
const app = express();
const routes = require("./routes");
const textMiddleware = require("./middlewares/text.middleware");
const errorLogger = require("./middlewares/error.middleware");

app.use(express.json());

app.use(textMiddleware);

app.use("/api", routes);

app.use(errorLogger);
module.exports = app;
