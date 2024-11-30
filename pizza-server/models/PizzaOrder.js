import { mongoose } from "../db.js"
import { pizzaPrices } from "../utils/pizza.js"
import Topping from "./Topping.js"

const PizzaOrder = new mongoose.Schema(
  {
    size: {
      // TODO: add sizes to DB
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "PizzaSize",
      type: String,
      enum: ["small", "medium", "large", "extraLarge"],
      required: true,
    },
    toppings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topping",
      },
    ],
    fulfilled: {
      type: Date,
      default: null,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

// pre-validation hook to calculate total price
PizzaOrder.pre("validate", async function (next) {
  try {
    // TODO: add sizes to DB
    // const size = await mongoose.model("PizzaSize").findById(this.size)

    // Fetch the size price
    const basePrice = pizzaPrices.basePrices[this.size]

    // get topping prices
    const toppings = await Topping.find({ _id: { $in: this.toppings } })

    // Calculate total price
    const toppingsPriceTotal = toppings.reduce(
      (total, topping) => total + topping.price,
      0
    )

    this.totalPrice = basePrice + toppingsPriceTotal

    next()
  } catch (error) {
    next(error)
  }
})

export default mongoose.model("order", PizzaOrder)
