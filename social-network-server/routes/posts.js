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

router.get("/posts/:id", verifyToken, postController.view);
router.get("/posts", verifyToken, postController.index);
router.delete("/posts/:id", verifyToken, postController.destroy);
router.put(
  "/posts/:id",
  verifyToken,
  multer({ dest: os.tmpdir() }).array("files", 5),
  postController.update
);

module.exports = router;
