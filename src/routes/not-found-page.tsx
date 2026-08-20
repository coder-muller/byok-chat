import { FileQuestionIcon } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function NotFoundPage() {
  return (
    <main className="flex min-h-0 flex-1 items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestionIcon />
          </EmptyMedia>
          <EmptyTitle>This page is not here</EmptyTitle>
          <EmptyDescription>
            That URL does not match Chat or Sign in. Go back and pick up where
            you left off.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="lg" render={<Link to="/" />} nativeButton={false}>
            Go to Chat
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
