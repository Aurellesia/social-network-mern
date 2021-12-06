const Post = require("../models/posts");
const User = require("../models/users");

const timeline = async (req, res, next) => {
  try {
    let post = await Post.find();
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

const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    const result = await User.find({
      first_name: { $regex: `${q}`, $options: "i" },
    });
    return res.json(result);
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

module.exports = { timeline, search };
