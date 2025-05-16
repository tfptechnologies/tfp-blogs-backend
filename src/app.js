const express = require("express");
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const routes = require("./routes");
const errorLogger = require("./middlewares/error.middleware");
const { apiLimiter } = require('./src/middleware/rateLimiter');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');
const commentRoutes = require('./routes/comment.routes');

app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);
app.use(express.json());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use("/api", routes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use(errorLogger);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;
 