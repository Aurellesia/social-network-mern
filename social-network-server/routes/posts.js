const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");
const multer = require("multer");
const os = require("os");

const postController = require("../controllers/posts");

router.post(
  "/posts",
  verifyToken,
  multer({ dest: os.tmpdir() }).array("files", 5),
  postController.store
);

router.get("/posts", verifyToken, postController.index);

module.exports = router;
