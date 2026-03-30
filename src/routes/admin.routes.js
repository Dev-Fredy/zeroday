const express = require("express");
const path = require("path");

const AuthMiddleware = require("../../middleware/auth.middleware");
const Users = require("./../models/user.model");
const UserController = require("../controller/user.controller");
const FaqsController = require("../controller/faqs.controller");
const pagesController = require("../controller/pages.controller");

class Admin {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.use(AuthMiddleware.isAdmin);
    this.router.get("/", (req, res) => {
      res.render("admin/admin", {
        title: "Admin",
        meta: {},
      });
    });
    this.router.get("/users", (req, res) => {
      res.render("admin/users", {
        title: "Users",
        meta: {},
      });
    });

    this.router.get("/faqs/add", FaqsController.getFaqAddPage);

    //pages
    this.router.get("/pages", async (req, res) => {
      res.render("admin/pages/index", { title: "Admin Pages", meta: {} });
    });

    this.router.post("/faqs", FaqsController.addFaq);
    this.router.post("/pages", pagesController.addPage);
    this.router.get("/pages/add", (req, res) => {
      res.render("admin/pages/addPage", {
        title: "Add Page",
        meta: {},
        type: "page",
      });
    });
    this.router.put("/pages/:page", async (req, res) => {
      res.json({ success: true });
    });

    this.router.get("/searchusers", UserController.searchusers);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new Admin().getRouter();
