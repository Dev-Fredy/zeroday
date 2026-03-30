const express = require("express");
const path = require("path");
const ApexCharts = require("apexcharts");
const simulate = require("../controller/simulate.controller");

const router = express.Router();

router.get("/simulations", (req, res) => {
  res.render("pages/simulations", {
    title: "Simulations",
    meta: {}
  });
});

router.get("/simulations/runway", (req, res) => {
  res.render("simulations/runway", {
    title: "Runway",
    meta: {}
  });
});

router.post("/simulate", simulate.risk);

module.exports = router;
