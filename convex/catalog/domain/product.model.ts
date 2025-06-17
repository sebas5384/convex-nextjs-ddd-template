import { WithoutSystemFields } from "convex/server";
import { v } from "convex/values";
import { Doc, Id } from "@/_generated/dataModel";

// Value Objects
export const MoneySchema = v.object({
  amount: v.number(),
  currency: v.string(),
});

export const ProductSchema = v.object({
  name: v.string(),
  description: v.string(),
  price: MoneySchema,
  category: v.string(),
  sku: v.string(),
  status: v.union(
    v.literal("active"),
    v.literal("inactive"),
    v.literal("outOfStock"),
  ),
});

export type ProductEntity = Doc<"products">;
export type ProductEntityId = Id<"products">;
export type NewProductEntity = WithoutSystemFields<Doc<"products">>;
