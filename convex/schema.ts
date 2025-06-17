import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { catalogSchema } from "./catalog/schema";
import { inventorySchema } from "./inventory/schema";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  ...catalogSchema,
  ...inventorySchema,
});
