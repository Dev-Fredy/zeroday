const express = require("express");
const path = require("path");
const pagesController = require("../controller/pages.controller");

const router = express.Router();

router.get("/faqs", pagesController.faqs);
router.get("/faqs/:faq", pagesController.faq);
router.get("/pages/:page", pagesController.getPage);

module.exports = router;
