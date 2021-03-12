const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const memeRouter = require("./routes/memeRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Implement CORS
app.use(cors());
app.options("*", cors());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body Parser, reading data from body into res.body
app.use(express.json());

// Routes
app.use("/memes", memeRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
