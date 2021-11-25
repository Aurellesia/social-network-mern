const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const authController = require("../controllers/users");

passport.use(
  new LocalStrategy({ usernameField: "email" }, authController.localStrategy)
);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
