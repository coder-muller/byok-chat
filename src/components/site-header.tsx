import { UserButton, useAuth } from "@clerk/react"
import { KeyRoundIcon } from "lucide-react"
import { Link } from "react-router"

import { NewChatButton } from "@/components/new-chat-button"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const { isLoaded, isSignedIn } = useAuth()

  return (
    <header className="flex h-14 items-center justify-between gap-2 px-6">
      <Link to="/" className="text-sm font-medium">
        Chat
      </Link>
      <div className="flex items-center gap-2">
        {isLoaded && !isSignedIn ? (
          <Button
            variant="ghost"
            size="sm"
            render={<Link to="/sign-in" />}
            nativeButton={false}
          >
            Sign in
          </Button>
        ) : null}
        <NewChatButton />
        {isLoaded && isSignedIn ? (
          <Button
            variant="ghost"
            size="icon"
            className="size-10"
            aria-label="API key"
            render={<Link to="/api-key" />}
            nativeButton={false}
          >
            <KeyRoundIcon />
          </Button>
        ) : null}
        {isLoaded && isSignedIn ? <UserButton /> : null}
      </div>
    </header>
  )
}
