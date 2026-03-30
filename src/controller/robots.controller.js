const env = require("../config/env");

class Robots {
  async getRobotTxt(req, res) {
    const config = env();
    res.type("text/plain");

    res.send(`
      User-agent: *
      
      Disallow: /api
      Disallow: /admin
      
      Allow: /

      Sitemap: ${config.URL}/sitemap.xml

      `);
  }
}

module.exports = new Robots();
