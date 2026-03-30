const express = require("express");
const robotsController = require("../controller/robots.controller");

class Robots {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/robots.txt", robotsController.getRobotTxt);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new Robots().getRouter();
