const Post = require("../models/posts");
const User = require("../models/users");

const timeline = async (req, res, next) => {
  try {
    const feed = [];
    const user = req.user;
    const following = await User.find({ followers: { $in: [user] } });
    if (!following) {
      return res.json({
        error: 1,
        message: "You are not following anyone!",
      });
    }
    const post = await Promise.all(
      following.map(async (item) => {
        let post = await Post.find({ "user._id": item._id.toString() });
        return post;
      })
    );
    post.forEach((item) => item.forEach((i) => feed.push(i)));
    feed.sort((b, a) => {
      return a.createdAt - b.createdAt;
    });
    return res.json(feed);
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
