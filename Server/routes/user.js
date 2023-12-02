const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const ImageModel = require("../Models/images");
const { downloadFile } = require("../utils/file");

const upload = multer();

router.post("/uploadPhoto", upload.single("myImage"), async (req, res) => {
  const body = req.body;
  console.log(body);
  const downloaded = await downloadFile(
    req.file.originalname /*userid add krdo */,
    req.file.buffer
  );
  const newImage = await new ImageModel({
    image: downloaded,
    caption: req.body.caption,
    description: req.body.description,
    //   author: "1",
  });
  res.send(await newImage.save());
});

router.get("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
