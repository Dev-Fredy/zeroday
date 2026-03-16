const db = require("./../config/db");

class Faqs {
  async create({ title, slug, content, category, tags, keywords }) {
    const query = `insert into faq (title, slug, content, category, tags, keywords) values (?, ?, ?, ?, ?, ?)`;

    const [results] = await db.execute(query, [
      title,
      slug,
      content,
      category,
      tags,
      keywords,
    ]);

    return results;
  }

  // async update(data) {
  //   const {title, slug, content, category, tags, keywords} = data;
  //   const query = ``;
  //   if (title) {
  //     query = `updatetabl`
  //   }
  // }
}

module.exports = Faqs;
