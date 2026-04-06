const db = require("../config/db");

class Category {
  async insert({ category }) {
    let query = `insert into categories (category) values (?)`;

    let [results] = await db.execute(query, [category]);

    return results;
  }

  async readAll() {
    let query = `select * from categories`;

    let [results] = await db.execute(query);

    return results;
  }

  async readById({ id }) {
    let query = `select * from categories where categories.id = ?`;

    let [results] = await db.execute(query, [id]);

    return results;
  }

  async readByCategory({ category }) {
    let query = `select * from categories where categories.category = ?`;

    let [results] = await db.execute(query, [category]);

    return results;
  }

  async updateById({ id, category }) {
    let query = `update categories set category = ? where id = ?`;

    let [results] = await db.execute(query, [category, id]);

    return results;
  }

  async deleteById({ id }) {
    let query = `delete from categories where id = ?`;

    let [results] = await db.execute(query, [id]);

    return results;
  }
}

module.exports = new Category();
