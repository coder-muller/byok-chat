const STEPS = [
  {
    title: "Create an OpenRouter account",
    body: "Sign up at openrouter.ai with GitHub, Google, or email.",
  },
  {
    title: "Open API keys",
    body: "In the dashboard, go to Keys. You can create as many keys as you need.",
  },
  {
    title: "Create and copy a key",
    body: "Give it a name you will recognize. Copy the secret once. OpenRouter will not show it again.",
  },
  {
    title: "Paste it here",
    body: "We encrypt the key before storing it. Chat uses it only to send your messages.",
  },
] as const

export function ApiKeyGuide() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[2rem] bg-background ring-1 ring-foreground/10">
      <div className="px-6 py-3 text-sm font-medium">How to get a key</div>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
        <ol className="flex max-w-md flex-col gap-8">
          {STEPS.map((step) => (
            <li key={step.title} className="flex flex-col gap-1.5">
              <p className="text-sm font-medium tracking-tight">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <div className="px-6 pb-6">
        <a
          href="https://openrouter.ai/settings/keys"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Open OpenRouter keys
        </a>
      </div>
    </div>
  )
}
