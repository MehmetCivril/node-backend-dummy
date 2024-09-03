const express = require("express")
const User = require("../models/UserModel")
const UserRouter = express.Router()
const jwt = require("jsonwebtoken")
const tokenControl = require("../middleware/auth")

UserRouter.post("/register", async (req, res) => {
  try {
    let savedUser = await User.create(req.body)
    res.status(200).send({
      status: true,
      message: `${savedUser.username} created successfully!`,
    })
  } catch (error) {
    res.status(404).send({ status: false, message: error.message })
  }
})

UserRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password || username === "" || password === "") {
      return res
        .status(404)
        .send({ status: false, message: "Invalid Credentials!" })
    }
    let enteredUser = await User.findOne({ username })
    if (!enteredUser) {
      return res
        .status(404)
        .send({ status: false, message: "Username not found" })
    }
    if (enteredUser.password !== password) {
      return res
        .status(404)
        .send({ status: false, message: "Password is incorrect" })
    }
    let access_token = jwt.sign(
      // sign özelliğini kullandık.
      {
        id: enteredUser._id,
        username: enteredUser.username,
        email: enteredUser.email,
      },
      process.env.KEYFORJWT,
      { expiresIn: "30d" }
    )
    //console.log(access_token)
    res.status(200).send({
      status: true,
      message: `Welcome ${enteredUser.username}`,
      user: enteredUser,
      access_token: access_token,
    })
  } catch (error) {
    res.status(404).send({ status: false, message: error.message })
  }
})

UserRouter.post("/resetPassword", async (req, res) => {
  try {
    // console.log(req.headers.authorization)
    let { username, password, newPassword } = req.body // we are taking these from the request body
    let userFromDB = await User.findOne({ username }) // We are searching for a user from the database
    if (!userFromDB || userFromDB.password !== password) {
      // We are controlling the username and password fields
      return res
        .status(404)
        .send({ status: false, message: "Invalid Username or Password!" })
    }
    await User.findOneAndUpdate({ username }, { password: newPassword })
    res
      .status(200)
      .send({ status: true, message: "Password changed successfully!" })
  } catch (error) {
    res.status(404).send({ status: false, message: error.message })
  }
})

UserRouter.get("/getAll", tokenControl, async (req, res) => {
  try {
    let users = await User.find({})
    return res
      .status(200)
      .send({ status: true, message: "User List", users: users })
  } catch (error) {
    res.status(404).send({ status: false, message: error.message })
  }
})

module.exports = UserRouter
