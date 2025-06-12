import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getHelloMessage = query({
  args: {},
  returns: v.object({
    message: v.string(),
    isAuthenticated: v.boolean(),
  }),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return {
        message: "Hello! Please sign in to see your personalized message.",
        isAuthenticated: false,
      };
    }

    const user = await ctx.db.get(userId);
    const userEmail = user?.email ?? "Anonymous User";

    return {
      message: `Hello ${userEmail}! This message comes from the Convex server.`,
      isAuthenticated: true,
    };
  },
});
