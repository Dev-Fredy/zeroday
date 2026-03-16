const jwt = require("jsonwebtoken");

const user = require("./../src/models/user");

const User = new user();

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
      res.redirect("/login");
    }

    next();
  }
}

module.exports = Auth;
