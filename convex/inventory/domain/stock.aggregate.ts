import { Stock } from "./stock.model";
import { Id } from "@/_generated/dataModel";

export class StockAggregate {
  constructor(private stock: Stock) {}

  toEntity(): Stock {
    return { ...this.stock };
  }

  hasAvailableStock(): boolean {
    return this.stock.quantity > 0;
  }

  getQuantity(): number {
    return this.stock.quantity;
  }

  getProductId(): Id<"products"> {
    return this.stock.product;
  }

  updateQuantity(quantity: number): StockAggregate {
    if (quantity < 0) {
      throw new Error("Stock quantity cannot be negative");
    }
    this.stock.quantity = quantity;
    return this;
  }

  reserve(quantity: number): StockAggregate {
    if (quantity <= 0) {
      throw new Error("Reserve quantity must be positive");
    }
    if (this.stock.quantity < quantity) {
      throw new Error("Insufficient stock available");
    }
    this.stock.quantity -= quantity;
    return this;
  }

  restock(quantity: number): StockAggregate {
    if (quantity <= 0) {
      throw new Error("Restock quantity must be positive");
    }
    this.stock.quantity += quantity;
    return this;
  }
}
