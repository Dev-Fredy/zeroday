const express = require("express");
const demoController = require("../controller/demo.controller");

class Demo {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/demo", demoController.getDemoPage);
    this.router.post("/sim_demo", demoController.demo);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new Demo().getRouter();
