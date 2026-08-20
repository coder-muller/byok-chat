import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export function NewChatButton() {
  return (
    <Button variant="secondary" render={<Link to="/" />} nativeButton={false}>
      <PlusIcon data-icon="inline-start" />
      New Chat
    </Button>
  )
}
