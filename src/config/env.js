function env() {
  return {
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PORT: process.env.MYSQL_PORT,
    NODE_ENV: process.env.NODE_ENV,
    URL: process.env.NODE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  };
}

module.exports = env;
