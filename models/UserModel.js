const { Schema, model } = require("mongoose")
const validator = require("validator")

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    min: [3, "Username must be at least 3 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: [2, "Password must be at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
  },
})

const User = model("User", userSchema)
module.exports = User
