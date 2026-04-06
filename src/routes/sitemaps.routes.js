const express = require("express");
const sitemapController = require("../controller/sitemap.controller");

class Sitemaps {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/sitemap.xml", sitemapController.getSitemaps);
    this.router.get("/sitemaps-faqs.xml", sitemapController.getFaqsSitemaps);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new Sitemaps().getRouter();
