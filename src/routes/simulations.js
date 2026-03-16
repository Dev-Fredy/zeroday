const express = require("express");
const path = require("path");
const ApexCharts = require("apexcharts");
const simulate = require("../controller/simulate");

const router = express.Router();

router.get("/simulations", (req, res) => {
  res.render(path.join(path.resolve(), "/src/views/pages/simulations.ejs"), {
    title: "Simulations",
  });
});

router.get("/simulations/runway", (req, res) => {
  res.render(path.join(path.resolve(), "/src/views/simulations/runway.ejs"), {
    title: "Runway",
  });
});

router.post("/simulate", simulate.risk);

module.exports = router;
