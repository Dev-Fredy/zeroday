const mysql = require("mysql2/promise");
const env = require("./env");

const config = env();

const db = mysql.createPool({
  user: config.MYSQL_USER,
  host: config.MYSQL_HOST,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  port: config.MYSQL_PORT,
});

module.exports = db;
