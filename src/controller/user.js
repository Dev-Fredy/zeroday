const UserModel = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const user = new UserModel();

class User {
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

  async register(req, res) {
    try {
      const data = req.body;

      console.log(data);

      const results = await user.create(data);

      res.json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers(req, res) {
    const users = await user.readAll();

    res.json({ data: users });
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    const [singleUser] = await user.readUser(email);

    let matchedPassword = await bcrypt.compare(password, singleUser.password);

    if (!matchedPassword) {
      return res.json({ success: false, message: 'Passwords don"t match' });
    }

    const payload = {
      email: singleUser.email,
    };

    const secret = process.env.JWT_SECRET;

    const token = await jwt.sign(payload, secret, { expiresIn: "7d" });

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
    });

    res.json({ success: true });
  }

  async logoutUser(req, res) {
    try {
      res.clearCookie("token");
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
    res.json({ success: true });
  }

  async getUser(req, res) {
    const { email, password } = req.body;
    const [singleUser] = await user.readUser(email);

    res.json({ success: true, data: singleUser });
  }
}

module.exports = User;
