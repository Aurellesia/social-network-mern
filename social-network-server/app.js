require("./database");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const accountRouter = require("./routes/accounts");
const profileRouter = require("./routes/profiles");
const postRouter = require("./routes/posts");
const timelineRouter = require("./routes/timeline");
const likesRouter = require("./routes/likes");
const commentsRouter = require("./routes/comments");
const followsRouter = require("./routes/follows");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", usersRouter);
app.use("/api", accountRouter);
app.use("/api", profileRouter);
app.use("/api", postRouter);
app.use("/api", timelineRouter);
app.use("/api", likesRouter);
app.use("/api", commentsRouter);
app.use("/api", followsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
