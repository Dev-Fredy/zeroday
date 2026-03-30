let db = require("../config/db");

class Image {
  async insert({ filename, path, hash }) {
    let query = `insert into images (filename, path, hash) values (?, ?, ?)`;

    let [results] = await db.execute(query, [filename, path, hash]);

    return results;
  }

  async read({ hash }) {
    let query = `select * from images where hash = ?`;

    let [results] = await db.execute(query, [hash]);

    return results;
  }
}

module.exports = new Image();
