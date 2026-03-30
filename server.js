const app = require("./src/app");

const port = 3000;

if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`Server is listening on port ${3000}`);
  });
}

module.exports = app;
