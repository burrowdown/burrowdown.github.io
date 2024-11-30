import { describe, expect, it } from "vitest"
import { pizzaPrices, pizzaToppings } from "./pizza"

describe("pizza pricing logic", () => {
  it("calculates correct price with no toppings", () => {
    const price = pizzaPrices.getPrice([], "large")
    expect(price).toBe(pizzaPrices.basePrices.large)
  })
  it("should calculate correct price with multiple toppings", () => {
    const price = pizzaPrices.getPrice(["cheese", "peppers"], "large")
    const expectedPrice =
      pizzaPrices.basePrices.large +
      pizzaToppings.cheese.price +
      pizzaToppings.peppers.price

    expect(price).toBe(expectedPrice)
  })
  it("should show error for invalid size", () => {
    const priceRun = () => pizzaPrices.getPrice(["cheese", "peppers"], "big")
    expect(priceRun).toThrowError(Error("big is not a size we offer"))
    expect(() =>
      pizzaPrices.getPrice(["cheese", "peppers"], "Large")
    ).toThrowError(Error("Large is not a size we offer"))
  })
  it("should show error for invalid toppings", () => {
    // check with ONLY invalid toppings
    expect(() =>
      pizzaPrices.getPrice(["invalid topping"], "small")
    ).toThrowError(Error("invalid topping is not a topping we offer"))
    // check with mix of valid and invalid toppings
    expect(() =>
      pizzaPrices.getPrice(["peppers", "invalid topping"], "small")
    ).toThrowError(Error("invalid topping is not a topping we offer"))
    // check case sensitivity
    expect(() => pizzaPrices.getPrice(["PEPPERS"], "small")).toThrowError(
      Error("PEPPERS is not a topping we offer")
    )
  })
  it("should throw error for out of stock toppings", () => {
    expect(() =>
      pizzaPrices.getPrice(["peppers", "mushrooms"], "small")
    ).toThrowError(Error("mushrooms is out of stock"))
  })
})
