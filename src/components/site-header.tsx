import { Link } from "react-router"

import { NewChatButton } from "@/components/new-chat-button"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-2 px-6">
      <Link to="/" className="text-sm font-medium">
        Chat
      </Link>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          render={<Link to="/sign-in" />}
          nativeButton={false}
        >
          Sign in
        </Button>
        <NewChatButton />
      </div>
    </header>
  )
}
