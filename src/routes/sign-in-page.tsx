import * as React from "react"
import { useAuth } from "@clerk/react"
import { useSignIn } from "@clerk/react/legacy"
import { ArrowLeftIcon } from "lucide-react"
import { Link, Navigate } from "react-router"
import { siGithub } from "simple-icons"

import { SignInPreview } from "@/components/sign-in-preview"
import { Button } from "@/components/ui/button"

export function SignInPage() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth()
  const { isLoaded: isSignInLoaded, signIn } = useSignIn()
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const isReady = isAuthLoaded && isSignInLoaded

  async function handleGitHub() {
    if (!signIn) return
    setError(null)
    setPending(true)
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
    } catch (caught) {
      setPending(false)
      setError(
        caught instanceof Error
          ? caught.message
          : "GitHub sign-in failed. Try again.",
      )
    }
  }

  if (!isAuthLoaded) {
    return <main className="min-h-0 flex-1" />
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="grid min-h-0 flex-1 lg:grid-cols-2">
      <section className="relative flex items-center justify-center px-6 py-8 sm:px-10 lg:px-16 lg:py-10">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-8 left-6 sm:left-10 lg:top-10 lg:left-16"
          render={<Link to="/" />}
          nativeButton={false}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Chat
        </Button>

        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-medium tracking-tight">
              Get started
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sign in with GitHub to open Chat.
            </p>
          </div>

          <Button
            size="lg"
            className="w-full"
            type="button"
            disabled={!isReady || pending}
            onClick={() => void handleGitHub()}
          >
            <svg data-icon="inline-start" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d={siGithub.path} />
            </svg>
            Continue with GitHub
          </Button>

          {error ? (
            <p className="text-center text-xs leading-relaxed text-destructive">
              {error}
            </p>
          ) : (
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              We request your public profile and email. Nothing is stored until
              a session is created.
            </p>
          )}
        </div>
      </section>

      <aside className="hidden min-h-0 p-3 lg:flex lg:p-4">
        <SignInPreview />
      </aside>
    </main>
  )
}
