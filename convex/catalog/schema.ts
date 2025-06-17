import { defineTable } from "convex/server";
import { ProductSchema } from "./domain/product.model";

export const catalogSchema = {
  products: defineTable(ProductSchema.fields)
    .index("by_sku", ["sku"])
    .index("by_category", ["category"]),
};
