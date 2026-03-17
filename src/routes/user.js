const express = require("express");
const path = require("path");

const router = express.Router();

const User = require("./../controller/user");
const Auth = require("./../../middleware/auth");

const auth = new Auth();

const user = new User();

router.get("/api/users", user.getAllUsers);
router.get("/login", (req, res) => {
  res.render("pages/login", {
    title: "Login",
  });
});
router.get("/signup", (req, res) => {
  res.render("pages/signup", {
    title: "Sign Up",
  });
});
router.get("/dashboard", auth.authenticated, user.getDashboard);

router.post("/signup", user.register);
router.post("/api/user", user.getUser);
router.post("/login", user.loginUser);

router.post("/logout", user.logoutUser);

router.delete("/api/user:id", user.deleteuser);

module.exports = router;
