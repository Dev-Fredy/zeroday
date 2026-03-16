const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/privacy", (req, res) => {
  res.render("pages/privacy", {
    title: "Privacy",
  });
});
router.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Contact",
  });
});
router.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About",
  });
});

module.exports = router;
