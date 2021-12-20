const User = require("../models/users");

const follows = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userFollowing = req.user._id;
    let userFollower = await User.findById({ _id: id });
    if (!userFollower) {
      return res.json({
        error: 1,
        message: "User not found!",
      });
    }
    if (id !== req.user._id) {
      if (userFollower.followers.toString().indexOf(userFollowing) === -1) {
        userFollower = await User.findByIdAndUpdate(
          { _id: id },
          { $push: { followers: userFollowing } },
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        userFollower = await User.findByIdAndUpdate(
          { _id: id },
          { $pull: { followers: userFollowing } },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    } else {
      return res.json({
        error: 1,
        message: "You cannot follow this user",
      });
    }

    if (!userFollower) {
      return res.json({
        error: 1,
        message: `No user found`,
      });
    }

    return res.json(userFollower);
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

const followers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.json({
        error: 1,
        message: "User not found!",
      });
    }
    const followers = await Promise.all(
      user.followers.map(async (item) => {
        let user = await User.findById({ _id: item });
        return user;
      })
    );
    if (followers.length === 0) {
      return res.json({
        message: "You don't have any followers.",
      });
    }
    return res.json(followers);
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

const following = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const following = await User.find({ followers: { $in: [userId] } });
    if (!following) {
      return res.json({
        error: 1,
        message: "You are not following anyone!",
      });
    }
    // const user = await Promise.all(
    //   following.map(async (item) => {
    //     let userFollowed = await User.findById({ _id: item.user });
    //     return userFollowed;
    //   })
    // );
    // if (user.length === 0) {
    //   return res.json({
    //     message: "You are not following anyone.",
    //   });
    // }
    return res.json(following);
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

module.exports = { follows, followers, following };
