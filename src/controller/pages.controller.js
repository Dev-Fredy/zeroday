const pagesModel = require("../models/pages.model");
const slugify = require("../utils/helper/slugify");
const db = require("../config/db");

class Page {
  async addPage(req, res) {
    let { title, content, description, keywords } = req.body;

    try {
      let slug = slugify(title);

      let page_id = await pagesModel.createPage({
        title,
        slug,
        description,
        content,
      });

      console.log(keywords);

      keywords.forEach(async (keyword, index) => {
        keyword = keyword.toLowerCase().trim();

        await db.query(
          `insert into keywords (keyword) values (?) on duplicate key update id = last_insert_id(id)`,
          [keyword]
        );

        const [result] = await db.query(`select last_insert_id() as id`);

        const keyworId = result[0].id;

        await db.execute(
          `insert ignore into pages_keywords (page_id, keyword_id) values (?, ?)`,
          [page_id, keyworId]
        );
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error });
    }
  }

  async getPages(req, res) {
    let results = await pagesModel.readAll();

    res.status(200).json({ success: true, data: results });
  }
}

module.exports = new Page();
