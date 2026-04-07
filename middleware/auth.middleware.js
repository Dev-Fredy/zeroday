const jwt = require("jsonwebtoken");

const User = require("../src/models/user.model");
const env = require("../src/config/env");
const authController = require("../src/controller/auth.controller");

class Auth {
  async isAdmin(req, res, next) {
    const cookies = req.cookies;

    const token = cookies.token;

    if (!token) {
      return res.redirect("/");
    }

    const secret = process.env.JWT_SECRET;

    const decoded = await jwt.verify(token, secret);

    const email = decoded?.email;

    const userResult = await User.readUser(email);

    const [user] = userResult;

    const role = user.role;

    if (role !== "admin") {
      return res.redirect("/");
    }

    next();
  }
  async authenticated(req, res, next) {
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
      return res.redirect("/auth/login");
    }

    next();
  }
}

module.exports = new Auth();
