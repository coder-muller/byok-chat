import { useAuth } from "@clerk/react"
import { useConvexAuth, useQuery } from "convex/react"

import { api } from "../../convex/_generated/api"

export function useSignedInDestination() {
  const { isLoaded, isSignedIn } = useAuth()
  const { isLoading: isConvexAuthLoading, isAuthenticated } = useConvexAuth()
  const hasOpenRouterKey = useQuery(
    api.users.hasOpenRouterKey,
    isAuthenticated ? {} : "skip",
  )

  const isDestinationReady =
    Boolean(isLoaded) &&
    Boolean(isSignedIn) &&
    !isConvexAuthLoading &&
    isAuthenticated &&
    hasOpenRouterKey !== undefined

  const to = isDestinationReady ? (hasOpenRouterKey ? "/" : "/api-key") : null

  return {
    isLoaded: Boolean(isLoaded),
    isSignedIn: Boolean(isSignedIn),
    isAuthenticated,
    hasOpenRouterKey,
    isDestinationReady,
    to,
  }
}
