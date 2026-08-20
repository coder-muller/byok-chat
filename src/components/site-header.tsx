import { UserButton, useAuth } from "@clerk/react"
import { KeyRoundIcon } from "lucide-react"
import { Link } from "react-router"

import { NewChatButton } from "@/components/new-chat-button"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

function HeaderAuthSkeleton() {
  return (
    <>
      <span className="sr-only">Loading account</span>
      <Skeleton className="size-8" aria-hidden />
      <Skeleton className="size-8 rounded-full" aria-hidden />
    </>
  )
}

export function SiteHeader() {
  const { isLoaded, isSignedIn } = useAuth()

  return (
    <header className="flex h-14 items-center justify-between gap-2 px-6">
      <Link to="/" className="text-sm font-medium">
        Chat
      </Link>
      <div className="flex items-center gap-2">
        <NewChatButton />
        <div className="flex h-8 min-w-18 shrink-0 items-center justify-end gap-2">
          {!isLoaded ? (
            <HeaderAuthSkeleton />
          ) : isSignedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                aria-label="API key"
                render={<Link to="/api-key" />}
                nativeButton={false}
              >
                <KeyRoundIcon />
              </Button>
              <div className="flex size-8 items-center justify-center overflow-hidden rounded-full">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-8",
                    },
                  }}
                />
              </div>
            </>
          ) : (
            <Button
              variant="ghost"
              render={<Link to="/sign-in" />}
              nativeButton={false}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
