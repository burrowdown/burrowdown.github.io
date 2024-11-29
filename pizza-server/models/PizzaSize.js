import { mongoose } from "../db.js"

const PizzaSize = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 99,
  },
})

export default mongoose.model("topping", PizzaSize)
