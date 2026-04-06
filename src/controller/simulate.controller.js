const calculateBurnRate = require("../utils/burn");
let ApexCharts = require("apexcharts");
const generateRunway = require("../utils/runway");

class Simulate {
  risk(req, res) {
    let data = req.body;

    let burnRate = calculateBurnRate(data);
    let runWay = generateRunway(data);

    res.json({ success: true, burnRate, runWay });
  }
}

module.exports = new Simulate();
