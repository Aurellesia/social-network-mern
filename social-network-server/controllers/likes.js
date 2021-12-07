const Post = require("../models/posts");
const User = require("../models/users");
const { ObjectId } = require("mongodb");

const like = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user._id;
    console.log(user);
    let post = await Post.findById({ _id: id });
    if (!post) {
      return res.json({
        error: 1,
        message: "Post not found!",
      });
    }
    if (post.likes.indexOf(ObjectId(user)) === -1) {
      post = await Post.findByIdAndUpdate(
        { _id: id },
        { $push: { likes: user } },
        { new: true, runValidators: true }
      );
    } else {
      post = await Post.findByIdAndUpdate(
        { _id: id },
        { $pull: { likes: user } },
        { new: true, runValidators: true }
      );
    }
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

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById({ _id: id });
    const likeList = post.likes;
    console.log(likeList);
    let liker = await Promise.all(
      likeList.map(async (item) => {
        let user = await User.findById({ _id: item });
        if (!user) {
          return res.json({
            error: 1,
            message: "User not found!",
          });
        }
        return user;
      })
    );
    return res.json(liker);
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

module.exports = { like, index };
