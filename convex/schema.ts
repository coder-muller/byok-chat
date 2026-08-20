import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    clerkUserId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    openRouterKeyCiphertext: v.optional(v.string()),
    openRouterKeyIv: v.optional(v.string()),
    openRouterKeyVersion: v.optional(v.number()),
  }).index("by_token", ["tokenIdentifier"]),
})
