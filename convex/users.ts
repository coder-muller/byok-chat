import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import type { MutationCtx } from "./_generated/server"
import {
  assertOpenRouterKeyFormat,
  decryptOpenRouterKey,
  encryptOpenRouterKey,
} from "./lib/openrouterKey"

async function requireIdentity(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) {
    throw new Error("Called a user function without authentication present")
  }
  return identity
}

async function getOrCreateUser(ctx: MutationCtx) {
  const identity = await requireIdentity(ctx)

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
    return existing
  }

  const id = await ctx.db.insert("users", {
    tokenIdentifier: identity.tokenIdentifier,
    clerkUserId,
    name,
    email,
    imageUrl,
  })
  const created = await ctx.db.get(id)
  if (!created) {
    throw new Error("Failed to create user")
  }
  return created
}

export const ensureUser = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getOrCreateUser(ctx)
    return user._id
  },
})

export const hasOpenRouterKey = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return false
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique()

    return Boolean(user?.openRouterKeyCiphertext && user.openRouterKeyIv)
  },
})

export const saveOpenRouterKey = mutation({
  args: {
    key: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getOrCreateUser(ctx)
    const plaintext = assertOpenRouterKeyFormat(args.key)
    const encrypted = await encryptOpenRouterKey(plaintext)
    const roundTrip = await decryptOpenRouterKey(
      encrypted.ciphertext,
      encrypted.iv,
    )
    if (roundTrip !== plaintext) {
      throw new Error("Failed to encrypt API key")
    }

    await ctx.db.patch(user._id, {
      openRouterKeyCiphertext: encrypted.ciphertext,
      openRouterKeyIv: encrypted.iv,
      openRouterKeyVersion: encrypted.version,
    })
  },
})
