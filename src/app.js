require("dotenv/config");

const express = require("express");
const expressejs = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.routes");
const pagesRoute = require("./routes/pages.routes");
const adminRoute = require("./routes/admin.routes");
const simulationsRoute = require("./routes/simulations.routes");
const AuthRoutes = require("./routes/auth.routes");
const ImageRoutes = require("./routes/image.routes");
const FaqRoutes = require("./routes/faqs.routes");
const robotsRoutes = require("./routes/robots.routes");
const sitemapsRoutes = require("./routes/sitemaps.routes");
const apiRoutes = require("./routes/api.routes");

class App {
  constructor() {
    this.app = express();
    this.runApp();
  }

  runApp() {
    //after update
    this.app.use(expressejs);
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
    this.app.use(cookieParser());
    this.app.use(express.json());

    this.app.set("layout", path.join(__dirname, "views/layout"));

    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use("/libs", express.static("node_modules"));
    this.app.use("/uploads", express.static("uploads"));

    this.app.use((req, res, next) => {
      const cookies = req.cookies;

      const token = cookies.token;

      res.locals.authenticated = token;

      next();
    });

    this.app.get("/", (req, res) => {
      let token = req.cookies.token;

      if (!token) {
        return res.render("pages/home", {
          title: "",
          meta: {
            description:
              "Get your financial future simulated and predicted with math",
          },
        });
      } else {
        return res.render("pages/simulations", {
          title: "",
          meta: {
            description:
              "Get your financial future simulated and predicted with math",
          },
        });
      }
    });

    this.app.use("/", userRoute);
    this.app.use("/", pagesRoute);
    this.app.use("/admin", adminRoute);
    this.app.use("/", simulationsRoute);
    this.app.use("/auth", AuthRoutes);
    this.app.use("/", ImageRoutes);
    this.app.use("/", FaqRoutes);
    this.app.use("/", robotsRoutes);
    this.app.use("/", sitemapsRoutes);
    this.app.use("/", apiRoutes);
  }

  getApp() {
    return this.app;
  }
}

module.exports = new App().getApp();
