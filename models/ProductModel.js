const { Schema, model } = require("mongoose")

const productSchema = new Schema({
  breedName: { type: String, required: [true, "breedName is required"] },
  price: { type: Number, required: [true, "Price field is required"] },
  age: { type: Number, required: [true, "Age field is required"] },
  //image: { type: Number, required: [true, "Image field is required"] },
  quantity: { type: Number, default: 5 },
})

const Product = model("Product", productSchema)
module.exports = Product
