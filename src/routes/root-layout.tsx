import { Outlet } from "react-router"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

export function RootLayout() {
  return (
    <ThemeProvider>
      <div className="flex h-svh flex-col">
        <SiteHeader />
        <Outlet />
      </div>
    </ThemeProvider>
  )
}
