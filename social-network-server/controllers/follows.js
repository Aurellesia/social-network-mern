const Profile = require("../models/profiles");
const User = require("../models/users");
const { ObjectId } = require("mongodb");

const follows = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userFollowing = ObjectId(req.user._id);
    let userFollower = await Profile.findOne({ user: id });
    if (id !== req.user._id) {
      if (userFollower.followers.toString().indexOf(userFollowing) === -1) {
        userFollower = await Profile.findOneAndUpdate(
          { user: id },
          { $push: { followers: userFollowing } },
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        userFollower = await Profile.findOneAndUpdate(
          { user: id },
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
    const user = await Profile.findOne({ user: userId });
    const followers = await Promise.all(
      user.followers.map(async (item) => {
        let user = await User.findOne({ _id: item });
        return user;
      })
    );
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
    const following = await Profile.find({ followers: { $in: [userId] } });
    const user = await Promise.all(
      following.map(async (item) => {
        let user = await User.findOne({ _id: item.user });
        return user;
      })
    );
    return res.json(user);
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
