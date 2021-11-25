const User = require("../models/users");
const bcrypt = require("bcrypt");

const index = async (req, res, next) => {
  try {
    const user = req.user;
    let account = await User.findOne({ _id: user._id });
    if (!account) {
      return res.json({
        error: 1,
        message: `No account found`,
      });
    }
    return res.json(account);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { first_name, last_name } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          first_name,
          last_name,
        },
      },
      { new: true, runValidators: true }
    );
    return res.json(user);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
      });
    }
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const HASH_ROUND = 10;
    const { password } = req.body;
    let newPassword = bcrypt.hashSync(password, HASH_ROUND);
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          password: newPassword,
        },
      },
      { new: true, runValidators: true }
    );
    return res.json(user);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
      });
    }
    next(err);
  }
};

module.exports = { index, update, changePassword };
