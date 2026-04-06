const db = require("../config/db");

class PageModel {
  async createPage({ title, slug, description, content }) {
    let query = `insert into pages (title, slug, content, description) values (?, ?, ?, ?)`;

    let [results] = await db.execute(query, [
      title,
      slug,
      content,
      description,
    ]);

    return results.insertId;
  }

  async readAll() {
    let query = `select * from pages`;

    let [results] = await db.execute(query);

    return results;
  }

  async readPageSlug({ slug }) {
    let query = `select * from pages p where p.slug like '${slug}%'`;

    let [results] = await db.execute(query);

    return results;
  }
}

module.exports = new PageModel();
