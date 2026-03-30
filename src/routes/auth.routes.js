const express = require("express");
const AuthController = require("../controller/auth.controller");

class Auth {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/login", (req, res) => {
      res.render("auth/login", {
        title: "Login",
        meta: {}
      });
    });
    this.router.get("/signup", (req, res) => {
      res.render("auth/signup", {
        title: "Sign Up",
        meta: {}
      });
    });
    this.router.post("/signup", AuthController.register);

    this.router.post("/login", AuthController.loginUser);

    this.router.post("/logout", AuthController.logoutUser);
    this.router.get("/reset", AuthController.forgotPasswordPage);
    this.router.post("/reset", AuthController.forgotPassword);
    this.router.post("/reset/:tk", AuthController.resetPassword);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new Auth().getRouter();
