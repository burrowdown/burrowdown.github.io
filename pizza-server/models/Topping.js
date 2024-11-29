import { mongoose } from "../db.js"

const Topping = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vegetarian: Boolean,
  inStock: Boolean,
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 50,
  },
})

export default mongoose.model("topping", Topping)
