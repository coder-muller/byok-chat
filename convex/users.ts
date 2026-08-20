import { mutation } from "./_generated/server"

export const ensureUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Called ensureUser without authentication present")
    }

    const name = identity.name ?? "Anonymous"
    const email = identity.email ?? ""
    const imageUrl = identity.pictureUrl ?? ""
    const clerkUserId = identity.subject

    const existing = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique()

    if (existing !== null) {
      if (
        existing.name !== name ||
        existing.email !== email ||
        existing.imageUrl !== imageUrl ||
        existing.clerkUserId !== clerkUserId
      ) {
        await ctx.db.patch(existing._id, {
          name,
          email,
          imageUrl,
          clerkUserId,
        })
      }
      return existing._id
    }

    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      clerkUserId,
      name,
      email,
      imageUrl,
    })
  },
})
