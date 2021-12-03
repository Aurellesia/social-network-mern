const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");

const commentsController = require("../controllers/comments");

router.post("/comments/:id", verifyToken, commentsController.store);
router.get("/comments/:id", verifyToken, commentsController.index);

router.put("/comments/:commentId", verifyToken, commentsController.update);
router.delete("/comments/:commentId", verifyToken, commentsController.destroy);
router.post("/comments/likes/:commentId", verifyToken, commentsController.like);

module.exports = router;
