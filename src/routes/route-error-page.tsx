import { CircleAlertIcon } from "lucide-react"
import { isRouteErrorResponse, useRouteError } from "react-router"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { NotFoundPage } from "@/routes/not-found-page"

export function RouteErrorPage() {
  const error = useRouteError()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <ThemeProvider>
      <div className="flex h-svh flex-col">
        <SiteHeader />
        {isNotFound ? <NotFoundPage /> : <UnexpectedErrorPage />}
      </div>
    </ThemeProvider>
  )
}

function UnexpectedErrorPage() {
  return (
    <main className="flex min-h-0 flex-1 items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleAlertIcon />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            Reload the page. If it keeps happening, start a new chat.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="lg" onClick={() => window.location.assign("/")}>
            Go to Chat
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
