import { mongoose } from "../db.js"

const Topping = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  displayName: {
    type: String,
    required: true,
    maxLength: 200,
  },
  vegetarian: {
    type: Boolean,
    required: true,
    default: false,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 50,
  },
})

export default mongoose.model("topping", Topping)
