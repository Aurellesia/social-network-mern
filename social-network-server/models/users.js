const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
const Profile = require("./profiles");

let userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name cannot be empty"],
      maxLength: [100, "Maximum first name length is 100 characters"],
      minLength: [3, "Minimum first name length is 3 characters"],
    },
    last_name: {
      type: String,
      required: [true, "Last name cannot be empty"],
      maxLength: [100, "Maximum last name length is 100 characters"],
      minLength: [3, "Minimum last name length is 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      maxLength: [100, "Maximum email length is 100 characters"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      maxlength: [100, "Maximum password length is 100 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: [String],
  },
  { timestamps: true }
);

userSchema.path("email").validate(
  function (value) {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(value);
  },
  (attr) => `${attr.value} must be a valid email`
);

userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").count({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} already registered`
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.post("save", async function () {
  let profile = new Profile({
    user: this._id,
  });
  await profile.save();
});

module.exports = model("User", userSchema);
