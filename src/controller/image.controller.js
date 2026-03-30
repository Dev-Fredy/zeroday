const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ImageModel = require("../models/image.model");

class Image {
  constructor() {}

  async upload(req, res) {
    const file = req.file;

    if (!file) {
      return res.json({ success: false, message: "No file was uploaded!" });
    }

    const fileBuffer = fs.readFileSync(file.path);

    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    let rows = await ImageModel.read({ hash: hash });

    if (rows.length > 0) {
      fs.unlinkSync(file.path);
      return res.json({ url: rows[0].path, reused: true });
    }

    let results = await ImageModel.insert({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      hash: hash,
    });

    console.log(results);

    res.json({
      url: `/uploads/${file.filename}`,
      reused: false,
    });
  }
}

module.exports = new Image();
