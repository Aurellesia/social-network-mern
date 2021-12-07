const User = require("../models/users");
const bcrypt = require("bcrypt");

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
    if (!user) {
      res.json({
        error: 1,
        message: "User not found!",
      });
    }
    return res.json({
      message: "Change password success",
      data: user,
    });
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

module.exports = { changePassword };
