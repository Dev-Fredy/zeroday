const { runMonteCarlo } = require("../utils/demoSimulation");

class Demo {
  async getDemoPage(req, res) {
    res.render("pages/demo", {
      title: "Demo",
      meta: {
        title: "Demo",
        description: "See what your future could look like",
        image: "/Images/ZeroDayFinance.png",
      },
    });
  }

  async demo(req, res) {
    try {
      const result = await runMonteCarlo(req.body);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Simulation failed",
        error: error.message,
      });
    }
  }
}

module.exports = new Demo();
