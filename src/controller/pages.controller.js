const pagesModel = require("../models/pages.model");
const slugify = require("../utils/helper/slugify");
const db = require("../config/db");
const faqsModel = require("../models/faqs.model");
const env = require("../config/env");
const categoriesModel = require("../models/categories.model");

class Page {
  async getPage(req, res) {
    let { page } = req.params;

    let [results] = await pagesModel.readPageSlug({ slug: page });

    let config = env();

    res.render("pages/page", {
      title: results.title,
      meta: {
        title: results.title,
        description: results.description,
        url: `${config.URL}/pages/${results.slug}`,
        image: `/Images/ZeroDayFinance.png`,
      },
      results,
    });
  }

  async faq(req, res) {
    let { faq } = req.params;

    let faqdata = faq.split("_");

    let result = await faqsModel.readBySlugAndId({
      slug: faqdata[0],
      id: faqdata[1],
    });
    let config = env();
    let related = await faqsModel.readRelatedFaqs({ id: result[0].id });
    res.render("pages/faq", {
      title: result[0].title,
      meta: {
        description: result[0].description,
        title: result[0].title,
        image: result[0].featuredUrl,
        url: `${config.URL}/faqs/${result[0].slug}_${result[0].id}`,
      },
      faq: result[0],
      related,
    });
  }
  async faqs(req, res) {
    let results = await faqsModel.readAll();

    res.render("pages/faqs", {
      title: "Faqs",
      meta: {},
      faqs: results,
    });
  }
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
