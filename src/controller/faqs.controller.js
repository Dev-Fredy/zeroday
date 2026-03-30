const db = require("../config/db");
const tagsModel = require("../models/tags.model");
const slugify = require("../utils/helper/slugify");
const FaqsModel = require("./../models/faqs.model");

class Faq {
  constructor() {}

  async getFaqPage(req, res) {
    res.render("admin/faqs", { title: "Faqs", meta: {} });
  }
  async getFaqAddPage(req, res) {
    res.render("admin/addFaqs", {
      title: "Add faq",
      meta: {},
      type: "faq",
    });
  }

  async getAll(req, res) {
    const faqs = await FaqsModel.readAll();

    res.json({ success: true, data: faqs });
  }

  async addFaq(req, res) {
    console.log(req.body);
    let {
      title,
      content,
      description,
      featuredImageUrl,
      tagsList,
      keywordsList,
      categoriesList,
    } = req.body;

    let slug = slugify(title);

    let faq_id = await FaqsModel.create({
      title,
      slug,
      content,
      description,
      featuredUrl: featuredImageUrl,
    });

    tagsList.forEach(async (tag, index) => {
      tag = tag.toLowerCase().trim();

      await db.query(
        `insert into tags (tag) values (?) on duplicate key update id = last_insert_id(id)`,
        [tag]
      );

      const [result] = await db.query(`select last_insert_id() as id`);

      const tagId = result[0].id;

      await db.execute(
        `insert ignore into faqs_tags (tag_id, faq_id) values (?, ?)`,
        [tagId, faq_id]
      );
    });

    categoriesList.forEach(async (category, index) => {
      category = category.toLowerCase().trim();

      await db.query(
        `insert into categories (category) values (?) on duplicate key update id = last_insert_id(id)`,
        [category]
      );

      const [result] = await db.query(`select last_insert_id() as id`);

      const categoryId = result[0].id;

      await db.execute(
        `insert ignore into faqs_categories ( faq_id, category_id) values (?, ?)`,
        [faq_id, categoryId]
      );
    });

    keywordsList.forEach(async (keyword, index) => {
      keyword = keyword.toLowerCase().trim();

      await db.query(
        `insert into keywords (keyword) values (?) on duplicate key update id = last_insert_id(id)`,
        [keyword]
      );

      const [result] = await db.query(`select last_insert_id() as id`);

      const keywordId = result[0].id;

      await db.execute(
        `insert ignore into faqs_keywords (faq_id, keyword_id) values (?, ?)`,
        [faq_id, keywordId]
      );
    });

    return res.json({ success: true });
  }
}

module.exports = new Faq();
