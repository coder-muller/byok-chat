import { Outlet, useLocation } from "react-router"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEnsureUser } from "@/lib/use-ensure-user"

export function RootLayout() {
  const { pathname } = useLocation()
  const hideHeader =
    pathname === "/sign-in" ||
    pathname === "/sso-callback" ||
    pathname === "/api-key"
  const { error } = useEnsureUser()

  return (
    <ThemeProvider>
      <div className="flex h-svh flex-col">
        {hideHeader ? null : <SiteHeader />}
        {error ? (
          <div className="px-6 pt-2">
            <Alert variant="destructive">
              <AlertTitle>Account sync failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : null}
        <Outlet />
      </div>
    </ThemeProvider>
  )
}
