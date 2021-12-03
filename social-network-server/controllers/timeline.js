const Post = require("../models/posts");

const timeline = async (req, res, next) => {
  try {
    let post = await Post.find().populate("comments");
    if (!post) {
      return res.json({
        error: 1,
        message: `No post found`,
      });
    }
    return res.json(post);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = { timeline };
