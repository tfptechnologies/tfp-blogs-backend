const express = require("express");
const core = require("cors");
const path = require('path');

const errorLogger = require("./middlewares/error.middleware");

const app = express();
const routes = require("./routes");
// const textMiddleware = require("./middlewares/text.middleware");

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// use errorLogger middelwere
app.use(errorLogger);

// app.use(textMiddleware);

app.use(core({origin:"http://localhost:5173", credentials:true}));


app.use('/api/v1', routes);

app.use(errorLogger);
module.exports = app;