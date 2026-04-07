const express = require("express");

const UserController = require("../controller/user.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");

class User {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/api/users", UserController.getAllUsers);

    this.router.get(
      "/account",
      AuthMiddleware.authenticated,
      UserController.getDashboard,
    );
    this.router.get("/dashboard", (req, res) => {
      res.render("pages/dashboard", {
        title: "Dash",
        meta: {},
      });
    });
    this.router.get("/scenarios", (req, res) => {
      res.render("pages/scenarios", {
        title: "Scenarios",
        meta: {
          title: "Scenarios",
          description:
            "Create and compare your financial scenarios in one place and see what best works for you.",
        },
      });
    });

    this.router.post("/api/user", UserController.getUser);
    this.router.delete("/api/user:id", UserController.deleteuser);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new User().getRouter();
