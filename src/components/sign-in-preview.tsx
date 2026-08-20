import { MODELS } from "@/lib/models"
import { SIGN_IN_PREVIEW_MESSAGES } from "@/lib/sign-in-preview-messages"
import { ChatMessage } from "@/components/chat-message"
import { PromptForm } from "@/components/prompt-form"

export function SignInPreview() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[2rem] bg-background ring-1 ring-foreground/10">
      <div className="px-6 py-3 text-sm font-medium">Chat</div>

      <div className="min-h-0 flex-1 overflow-y-auto scroll-fade-b px-6 py-4">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
          {SIGN_IN_PREVIEW_MESSAGES.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none mx-auto w-full max-w-2xl px-6 pb-6">
        <PromptForm
          models={MODELS}
          model={MODELS[0].id}
          onModelChange={() => {}}
          isBusy={false}
          onSubmit={() => {}}
          onStop={() => {}}
        />
      </div>
    </div>
  )
}
