const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Listening to UNCAUGHT EXCEPTION event
process.on("uncaughtException", (err) => {
  console.log("--UNHANDLED EXCEPTION--");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

// Connecting to the DATABASE
const DB = "mongodb://localhost:27017/x-meme-app";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

const port = process.env.PORT || 8081;

// Starting the Node Server
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Listening to UNHANDLED REJECTION event
process.on("unhandledRejection", (err) => {
  console.log("--UNHANDLED REJECTION--");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
