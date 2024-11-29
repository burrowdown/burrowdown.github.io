import { mongoose } from "../db.js"

const PizzaOrder = new mongoose.Schema(
  {
    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PizzaSize",
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

// pre-save hook to calculate total price
PizzaOrder.pre("save", async (next) => {
  try {
    // Fetch the size price
    const size = await mongoose.model("PizzaSize").findById(this.size)

    // Fetch topping prices
    const toppings = await mongoose.model("Topping").find({
      _id: { $in: this.toppings },
    })

    // Calculate total price
    const toppingsPriceTotal = toppings.reduce(
      (total, topping) => total + topping.price,
      0
    )
    this.totalPrice = size.price + toppingsPriceTotal

    next()
  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model("PizzaOrder", PizzaOrder)
