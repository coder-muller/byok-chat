import { AuthenticateWithRedirectCallback } from "@clerk/react"

export function SsoCallbackPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl="/"
        signUpForceRedirectUrl="/"
      />
    </main>
  )
}
