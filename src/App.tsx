import { MODELS } from "@/lib/models"
import { Chat } from "@/components/chat"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex h-svh flex-col">
        <SiteHeader />
        <Chat models={MODELS} />
      </div>
    </ThemeProvider>
  )
}
