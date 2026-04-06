const express = require("express");
const FaqsController = require("../controller/faqs.controller");

class Faq {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {}

  getRouter() {
    return this.router;
  }
}

module.exports = new Faq().getRouter();
