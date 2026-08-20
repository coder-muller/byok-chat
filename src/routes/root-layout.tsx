import { Outlet, useLocation } from "react-router"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { useEnsureUser } from "@/lib/use-ensure-user"

export function RootLayout() {
  const { pathname } = useLocation()
  const hideHeader = pathname === "/sign-in" || pathname === "/sso-callback"
  useEnsureUser()

  return (
    <ThemeProvider>
      <div className="flex h-svh flex-col">
        {hideHeader ? null : <SiteHeader />}
        <Outlet />
      </div>
    </ThemeProvider>
  )
}
