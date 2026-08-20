import { Outlet, useLocation } from "react-router"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

export function RootLayout() {
  const { pathname } = useLocation()
  const hideHeader = pathname === "/sign-in"

  return (
    <ThemeProvider>
      <div className="flex h-svh flex-col">
        {hideHeader ? null : <SiteHeader />}
        <Outlet />
      </div>
    </ThemeProvider>
  )
}
