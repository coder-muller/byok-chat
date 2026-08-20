import { useUser } from "@clerk/react"
import { useConvexAuth, useMutation } from "convex/react"
import { useEffect, useState } from "react"

import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

export function useEnsureUser() {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const { user } = useUser()
  const [userId, setUserId] = useState<Id<"users"> | null>(null)
  const ensureUser = useMutation(api.users.ensureUser)

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    async function createUser() {
      const id = await ensureUser()
      setUserId(id)
    }

    void createUser()
    return () => setUserId(null)
  }, [isAuthenticated, ensureUser, user?.id])

  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  }
}
