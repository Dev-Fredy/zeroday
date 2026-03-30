const db = require("../config/db");

class Faqs {
  async create({ title, slug, content, description, featuredUrl }) {
    const query = `insert into faqs (title, slug, content, description, featuredUrl) values (?, ?, ?, ?, ?)`;

    const [results] = await db.execute(query, [
      title,
      slug,
      content,
      description,
      featuredUrl,
    ]);

    return results.insertId;
  }

  // async update(data) {
  //   const {title, slug, content, category, tags, keywords} = data;
  //   const query = ``;
  //   if (title) {
  //     query = `updatetabl`
  //   }
  // }

  async readAll() {
    const query = `select * from faqs`;

    const [results] = await db.execute(query);

    return results;
  }

  async readAllSlugs() {
    const query = `select slug from faqs`;

    let [results] = await db.execute(query);

    return results;
  }
}

module.exports = new Faqs();
