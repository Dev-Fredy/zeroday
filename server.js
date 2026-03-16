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
app.use(expressejs);
app.use(express.json());
app.use(cookieParser());

app.set("layout", path.join(path.resolve(), "/src/views/layout.ejs"));

const port = process.env.PORT;

app.use(express.static(path.join(path.resolve(), "/public")));
app.use("/libs", express.static("node_modules"));

app.use("/", (req, res, next) => {
  const cookies = req.cookies;

  const token = cookies.token;

  res.locals.authenticated = token;

  next();
});

app.get("/", (req, res) => {
  let token = req.cookies.token;

  if (!token) {
    return res.render(path.join(path.resolve(), "/src/views/pages/home.ejs"), {
      title: "",
    });
  } else {
    return res.render(
      path.join(path.resolve(), "/src/views/pages/simulations.ejs"),
      {
        title: "",
      }
    );
  }
});

app.use("/", userRoute);
app.use("/", pagesRoute);
app.use("/admin", adminRoute);
app.use("/", simulationsRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
