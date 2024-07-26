const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")

const Product = require("./models/ProductModel")
const ProductRouter = require("./router/ProductRouter")
const UserRouter = require("./router/UserRouter")
const authMiddleware = require("./middleware/auth")

const app = express()

// MONGODB CONNECTION
mongoose
  .connect(
    "mongodb+srv://mehmetcivril:3458479@bulutproje.rkzlao8.mongodb.net/?retryWrites=true&w=majority&appName=BulutProje"
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err))

app.use(express.json()) // JSON MIDDLEWARE HAS TO BE ABOVE THE ROUTES

//CORS (Cross-Origin Resource Sharing).
app.use(
  cors({
    origin: "*",
  })
)

//ROUTES
app.use("/product", ProductRouter)
app.use("/user", UserRouter)

app.get("/", (req, res) => {
  res.send("YOUR FIRST PROJECT IS HERE")
})

//MIDDLEWARES (Define these after routes are loaded)
app.use(authMiddleware) // Bu kod sayfanın altında olmalı yoksa unauthorized hatası veriyor.

app.listen(9000, () => {
  console.log("listening is on, port 9000")
})
