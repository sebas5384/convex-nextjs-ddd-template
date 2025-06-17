import { defineTable } from "convex/server";
import { StockSchema } from "./domain/stock.model";

export const inventorySchema = {
  stocks: defineTable(StockSchema.fields).index("by_product", ["product"]),
};
