const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/privacy", (req, res) => {
  res.render(path.join(path.resolve(), "/src/views/pages/privacy.ejs"), {
    title: "Privacy",
  });
});
router.get("/contact", (req, res) => {
  res.render(path.join(path.resolve(), "/src/views/pages/contact.ejs"), {
    title: "Contact",
  });
});
router.get("/about", (req, res) => {
  res.render(path.join(path.resolve(), "/src/views/pages/about.ejs"), {
    title: "About",
  });
});

module.exports = router;
