import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-medium tracking-tight">byok-chat</h1>
        <p className="text-muted-foreground">
          Vite + React + Tailwind + shadcn/ui (base-rhea)
        </p>
      </div>
      <Button>Get started</Button>
    </div>
  )
}
