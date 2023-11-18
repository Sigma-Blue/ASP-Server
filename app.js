const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");

const userRouter = require("./routes/v1/userRouter");
const postRouter = require("./routes/v1/postRouter");
const profileRouter = require("./routes/v1/profileRouter");
const docRouter = require("./routes/v1/docRouter");
const postController = require("./controllers/postController");

const app = express();

//TODO: GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

app.use(cors());

// Development logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  console.log(req.body);
  next();
});

// To get Request Time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Initial page
app.get("/", (req, res) => {
  res.send(
    "<center><h1> Alumni Student Platform API created By Metta Surendhar </h1><center>"
  );
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/doc", docRouter);
app.use("/api/v1/homePage", postController.getHomePage);

// False Url
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

module.exports = app;
