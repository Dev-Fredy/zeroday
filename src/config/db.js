const mysql = require("mysql2/promise");

const fetchDBConfig = () => {
  return {
    USER: process.env.MYSQL_USER,
    HOST: process.env.MYSQL_HOST,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DATABASE: process.env.MYSQL_DATABASE,
    PORT: process.env.MYSQL_PORT,
  };
};

const config = fetchDBConfig();

const db = mysql.createPool({
  user: config.USER,
  host: config.HOST,
  password: config.PASSWORD,
  database: config.DATABASE,
  port: config.PORT,
});

module.exports = db;
