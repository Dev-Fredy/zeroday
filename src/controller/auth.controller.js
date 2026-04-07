const env = require("../config/env");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class Auth {
  async register(req, res) {
    try {
      const data = req.body;

      console.log(data);

      const results = await userModel.create(data);

      res.json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    const [singleUser] = await userModel.readUser(email);

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
  async forgotPasswordPage(req, res) {
    try {
      if (req.query.tk) {
        return res.render("auth/reset", {
          title: "Set new password",
          meta: {},
        });
      } else {
        return res
          .status(200)
          .render("auth/forgot", { title: "Reset password", meta: {} });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server encountered an error while fetching page",
      });
    }
  }
  async forgotPassword(req, res) {
    console.log(req.body);
    const { email } = req.body;

    if (!email) {
      return res
        .status(401)
        .json({ success: false, message: "You need to provide email!" });
    }
    try {
      let [user] = await userModel.findByEmail(email);
      let foundUser = user[0];

      if (!foundUser) {
        return res
          .status(404)
          .json({ success: false, message: "No user with that email" });
      }

      let payload = {
        id: foundUser.id,
        email: foundUser.email,
      };

      const config = env();

      const secret = config.JWT_SECRET;

      const token = await jwt.sign(payload, secret, { expiresIn: "6000s" });

      console.log(`${config.URL}/auth/reset?tk=${token}`);

      const hashedToken = await bcrypt.hash(token, 10);

      let data = {
        token: hashedToken,
        id: foundUser.id,
      };
      await userModel.updateToken(data);
      res.status(200).json({ success: true, message: "Reset link sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  async resetPassword(req, res) {
    let { tk } = req.params;

    let { password } = req.body;

    if (!tk) {
      return res.status(401).json({ success: false, message: "Denied!" });
    }

    if (!password) {
      return res
        .status(401)
        .json({ success: false, message: "Provide password to reset" });
    }

    let config = env();

    let secret = config.JWT_SECRET;

    try {
      let token = tk;

      let payload = await jwt.verify(token, secret);

      let [user] = await userModel.findByEmail(payload.email);

      let foundUser = user[0];

      if (!foundUser) {
        return res
          .status(401)
          .json({ success: false, message: "User with that email not found!" });
      }

      let matchingPasswords = await bcrypt.compare(
        password,
        foundUser.password,
      );

      if (matchingPasswords) {
        return res.status(402).json({
          success: false,
          message: "Set password different from your previous password",
        });
      }

      let matchingToken = await bcrypt.compare(token, foundUser.token);

      if (!matchingToken) {
        return res
          .status(401)
          .json({ success: false, message: "Link is not valid" });
      }

      let hashedPassword = await bcrypt.hash(password, 10);

      await userModel.updatePassword({
        password: hashedPassword,
        id: foundUser.id,
      });

      await userModel.updateToken({ token: "", id: foundUser.id });

      res
        .status(200)
        .json({ success: true, message: "Password set successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new Auth();
