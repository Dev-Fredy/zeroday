const express = require("express");
const ImageController = require("../controller/image.controller");
const multer = require("multer");

class Image {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    const storage = multer.diskStorage({
      destination: "uploads/",
      filename: (req, file, cb) => {
        const unique = Date.now() + "-" + file.originalname;
        cb(null, unique);
      },
    });
    const upload = multer({ storage });
    this.router.post(
      "/uploads",
      upload.single("image"),
      ImageController.upload
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new Image().getRouter();
