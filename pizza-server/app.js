import express from "express"
import cors from "cors"
const app = express()
import Topping from "./models/Topping.js"
import PizzaSize from "./models/PizzaSize.js"
import PizzaOrder from "./models/PizzaOrder.js"

app.use(cors())
app.use(express.json())

app.get("/toppings", async (req, res) => {
  try {
    const filter = {}
    if (req.query.vegetarian === "true") filter.vegetarian = true
    if (req.query.inStock === "true") filter.inStock = true

    const toppings = await Topping.find(filter)

    res.json(toppings)
  } catch (error) {
    console.error("Error fetching toppings:", error)
    res.status(500).json({ message: "Server error fetching toppings" })
  }
})

// TODO: add sizes to DB
// app.get("/sizes", async (req, res) => {
//   try {
//     const sizes = await PizzaSize.find(filter)
//     res.json(sizes)
//   } catch (error) {
//     console.error("Error fetching sizes:", error)
//     res.status(500).json({ message: "Server error fetching sizes" })
//   }
// })

app.post("/order", async (req, res) => {
  try {
    const { toppings, size } = req.body
    if (!size) res.status(400).json({ message: "Pizza size is required" })

    // const basePrice = pizzaPrices.basePrices[size]
    // const price = pizzaPrices.getPrice(toppings, size)

    const newOrder = new PizzaOrder({ toppings, size })
    const savedOrder = await newOrder.save()
    console.log(savedOrder)

    const totalPrice = savedOrder.totalPrice

    const message = `Your order for a ${size} pizza with ${toppings
      .map((t) => t.displayName)
      .join(", ")} has been placed. The price is $${totalPrice.toFixed(2)}`
    res.status(201).send({ message })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})

export default app
