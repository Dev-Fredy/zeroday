require("dotenv/config");

const express = require("express");
const expressejs = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const authenticated = require("./middleware/auth");

const userRoute = require("./src/routes/user");
const pagesRoute = require("./src/routes/pages");
const adminRoute = require("./src/routes/admin");
const simulationsRoute = require("./src/routes/simulations");

const auth = new authenticated();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(expressejs);
app.use(express.json());
app.use(cookieParser());

app.set("layout", path.join(path.resolve(), "/src/views/layout.ejs"));

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/libs", express.static("node_modules"));

app.use((req, res, next) => {
  const cookies = req.cookies;

  const token = cookies.token;

  res.locals.authenticated = token;

  next();
});

app.get("/", (req, res) => {
  let token = req.cookies.token;

  if (!token) {
    return res.render("pages/home", {
      title: "",
    });
  } else {
    return res.render("pages/simulations", {
      title: "",
    });
  }
});

app.use("/", userRoute);
app.use("/", pagesRoute);
app.use("/admin", adminRoute);
app.use("/", simulationsRoute);

module.exports = app;
