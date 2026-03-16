const express = require("express");
const path = require("path");

const Auth = require("./../../middleware/auth");
const Users = require("./../models/user");
const userControl = require("./../controller/user");

const UserControl = new userControl();

const User = new Users();

const auth = new Auth();

const router = express.Router();

router.get("/", auth.isAdmin, (req, res) => {
  res.render(path.join(path.resolve(), "/src/views/admin/admin.ejs"), {
    title: "Admin",
  });
});
router.get("/users", auth.isAdmin, (req, res) => {
  res.render(path.join(path.resolve(), "/src/views/admin/users.ejs"), {
    title: "Users",
  });
});

router.get("/searchusers", UserControl.searchusers);

module.exports = router;
