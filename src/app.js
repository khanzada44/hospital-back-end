const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const authmiddleware = require("./common/middleware/auth.middleware");

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: true
  })
);


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(morgan("combined"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital API is running"
  });
});

app.use("/", routes);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Hospital Backend API"
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});


module.exports = app;