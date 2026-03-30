let db = require("../config/db");

class Tag {
  async insertNewTag({ tag }) {
    let query = `insert into tags (tag) values (?)`;

    let [results] = await db.execute(query, [tag]);

    return results;
  }

  async updateById({ id, tag }) {
    let query = `update tags set tag = ? where id = ?`;

    let [results] = await db.execute(query, [tag, id]);

    return results;
  }

  async deleteById({ id }) {
    let query = `delete from tags where id = ?`;

    let [results] = await db.execute(query, [id]);

    return results;
  }
}

module.exports = new Tag();
