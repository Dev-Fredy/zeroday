const express = require("express");
const faqsController = require("../controller/faqs.controller");
const pagesController = require("../controller/pages.controller");

class Api {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/api/faqs", faqsController.getAll);
    this.router.get("/api/pages", pagesController.getPages);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new Api().getRouter();
