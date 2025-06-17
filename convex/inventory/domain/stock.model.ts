import { Doc, Id } from "@/_generated/dataModel";
import { WithoutSystemFields } from "convex/server";
import { v } from "convex/values";

export const StockSchema = v.object({
  product: v.id("products"),
  quantity: v.number(),
});

export type Stock = Doc<"stocks">;
export type StockId = Id<"stocks">;
export type NewStock = WithoutSystemFields<Doc<"stocks">>;
