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
    const query = `select * from faqs f join faqs_categories fc on f.id = fc.faq_id join categories c on fc.category_id = c.id`;

    const [results] = await db.execute(query);

    return results;
  }

  async readRelatedFaqs(id) {
    console.log(id);
    const query = `select f.id, f.slug, f.title, f.featuredUrl, c.category from faqs f join faqs_categories fc on f.id = fc.faq_id join categories c on fc.category_id = c.id where f.id = ?`;

    const [results] = await db.execute(query, [id]);

    return results;
  }

  async readAllSlugs() {
    const query = `select slug from faqs`;

    let [results] = await db.execute(query);

    return results;
  }

  async readBySlugAndId({ slug, id }) {
    let query = `select f.id, f.title, f.slug from faqs f where f.slug = '${slug}' and f.id = ${id}`;

    let [results] = await db.execute(query);
    console.log(results);

    return results;
  }
}

module.exports = new Faqs();
