import { useUser } from "@clerk/react"
import { useConvexAuth, useMutation } from "convex/react"
import { useEffect, useState } from "react"

import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

const MAX_ATTEMPTS = 3

export function useEnsureUser() {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const { user } = useUser()
  const [userId, setUserId] = useState<Id<"users"> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ensureUser = useMutation(api.users.ensureUser)

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    let cancelled = false

    async function createUser() {
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          const id = await ensureUser()
          if (!cancelled) {
            setUserId(id)
            setError(null)
          }
          return
        } catch (cause) {
          if (cancelled) {
            return
          }
          if (attempt === MAX_ATTEMPTS) {
            console.error("Failed to provision Convex user", cause)
            setError("Couldn't sync your account. Refresh to try again.")
            return
          }
          await new Promise((resolve) => setTimeout(resolve, 400 * attempt))
        }
      }
    }

    void createUser()
    return () => {
      cancelled = true
      setUserId(null)
      setError(null)
    }
  }, [isAuthenticated, ensureUser, user?.id])

  return {
    isLoading:
      isLoading || (isAuthenticated && userId === null && error === null),
    isAuthenticated: isAuthenticated && userId !== null,
    error,
  }
}
