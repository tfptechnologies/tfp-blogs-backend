const express = require("express");
const core = require("cors");
const categoryRoutes = require("./routes/category.routes");
const tagRoutes = require("./routes/tag.routes");

const app = express();
const routes = require("./routes");
// const textMiddleware = require("./middlewares/text.middleware");
const errorLogger = require("./middlewares/error.middleware");

app.use(express.json());

// app.use(textMiddleware);

app.use(core({origin:"http://localhost:5173", credentials:true}));


app.use('/api/v1', routes);

app.use(errorLogger);
module.exports = app;
