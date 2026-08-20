import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ClerkProvider, useAuth } from "@clerk/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient } from "convex/react"
import { RouterProvider } from "react-router/dom"

import { router } from "@/router"

import "./index.css"

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const convexUrl = import.meta.env.VITE_CONVEX_URL

if (!clerkPublishableKey) {
  throw new Error("Add VITE_CLERK_PUBLISHABLE_KEY to the .env file")
}

if (!convexUrl) {
  throw new Error("Add VITE_CONVEX_URL to the .env file")
}

const convex = new ConvexReactClient(convexUrl)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      afterSignOutUrl="/"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <RouterProvider router={router} />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </StrictMode>
)
