import * as React from "react"
import { useAuth } from "@clerk/react"
import { useConvexAuth, useMutation, useQuery } from "convex/react"
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { Link, Navigate, useNavigate } from "react-router"

import { api } from "../../convex/_generated/api"
import { ApiKeyGuide } from "@/components/api-key-guide"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function saveKeyErrorMessage(caught: unknown) {
  const message = caught instanceof Error ? caught.message : ""
  if (message.includes("sk-or-")) {
    return "OpenRouter keys start with sk-or-."
  }
  if (message.includes("authentication")) {
    return "Sign in again to save your key."
  }
  return "Couldn't save your API key. Try again."
}

export function ApiKeyPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const { isAuthenticated } = useConvexAuth()
  const hasOpenRouterKey = useQuery(
    api.users.hasOpenRouterKey,
    isAuthenticated ? {} : "skip",
  )
  const saveOpenRouterKey = useMutation(api.users.saveOpenRouterKey)
  const navigate = useNavigate()
  const [key, setKey] = React.useState("")
  const [showKey, setShowKey] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const replacing = hasOpenRouterKey === true

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = key.trim()
    if (!trimmed.startsWith("sk-or-")) {
      setError("OpenRouter keys start with sk-or-.")
      return
    }

    setError(null)
    setPending(true)
    try {
      await saveOpenRouterKey({ key: trimmed })
      void navigate("/", { replace: true })
    } catch (caught) {
      setPending(false)
      setError(saveKeyErrorMessage(caught))
    }
  }

  if (!isLoaded) {
    return <main className="min-h-0 flex-1" />
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <main className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-2 lg:overflow-hidden">
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

        <form
          onSubmit={(event) => void handleSubmit(event)}
          className="flex w-full max-w-sm flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-medium tracking-tight">
              {replacing ? "Replace your API key" : "Add your API key"}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {replacing
                ? "A key is already saved. Paste a new OpenRouter key to overwrite it. We never show the current key."
                : "Chat sends models through OpenRouter with your key. We encrypt it at rest and never show it again."}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="openrouter-key" className="text-sm font-medium">
              OpenRouter API key
            </label>
            <div className="relative">
              <Input
                id="openrouter-key"
                className="h-10 pr-10 font-mono text-sm"
                type={showKey ? "text" : "password"}
                name="openrouter-key"
                autoComplete="off"
                spellCheck={false}
                placeholder="sk-or-v1-"
                value={key}
                aria-invalid={error ? true : undefined}
                onChange={(event) => {
                  setKey(event.target.value)
                  if (error) setError(null)
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1.5 right-1.5 rounded-xl"
                aria-label={showKey ? "Hide API key" : "Show API key"}
                onClick={() => setShowKey((current) => !current)}
              >
                {showKey ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Keys start with sk-or-. Usage is billed on your OpenRouter
              account.
            </p>
          </div>

          <Button
            size="lg"
            className="w-full"
            type="submit"
            disabled={pending || key.trim() === ""}
          >
            {replacing ? "Replace key" : "Save key"}
          </Button>

          {error ? (
            <p className="text-center text-xs leading-relaxed text-destructive">
              {error}
            </p>
          ) : null}
        </form>
      </section>

      <aside className="min-h-0 p-3 pb-8 lg:flex lg:p-4">
        <ApiKeyGuide />
      </aside>
    </main>
  )
}
