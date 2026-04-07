const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  async getDashboard(req, res) {
    let token = req.cookies.token;

    const secret = process.env.JWT_SECRET;

    let decoded = await jwt.verify(token, secret);
    let [dbuser] = await user.readUser(decoded.email);

    res.render("pages/account", {
      title: "Dashboard",
      user: dbuser,
      meta: {},
    });
  }
  async deleteuser(req, res) {
    let { id } = await req.params;
    let result = await user.deleteUser(id);
    console.log(result);
    res.json({ success: true });
  }
  async searchusers(req, res) {
    let s = req.query.s;

    let users = await user.searchUser(s);

    res.json({ success: true, data: users });
  }

  async getAllUsers(req, res) {
    const users = await user.readAll();

    res.json({ data: users });
  }

  async getUser(req, res) {
    const { email, password } = req.body;
    const [singleUser] = await user.readUser(email);

    res.json({ success: true, data: singleUser });
  }
}

module.exports = new User();
