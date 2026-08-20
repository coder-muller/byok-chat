import * as React from "react"
import { useAuth } from "@clerk/react"
import { useNavigate } from "react-router"

import { type GatewayModel } from "@/lib/models"
import { type ChatUIMessage } from "@/lib/chat-types"
import { PromptForm } from "@/components/prompt-form"
import { Suggestions } from "@/components/suggestions"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export function Chat({ models }: { models: GatewayModel[] }) {
  const [model, setModel] = React.useState(models[0]?.id ?? "")
  const messages: ChatUIMessage[] = []
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  const resolvedModel = models.some((m) => m.id === model)
    ? model
    : (models[0]?.id ?? "")

  function handleSend() {
    if (!isLoaded) return
    if (!isSignedIn) {
      void navigate("/sign-in")
    }
  }

  return (
    <div className="mx-auto flex min-h-0 w-full flex-1 flex-col">
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-6">
          <Empty>
            <EmptyHeader>
              <EmptyTitle>What can I help with?</EmptyTitle>
              <EmptyDescription>
                Pick a model and start chatting. Responses stream through the
                Vercel AI Gateway.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Suggestions onSelect={() => handleSend()} />
            </EmptyContent>
          </Empty>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 px-6 pb-6">
        <PromptForm
          models={models}
          model={resolvedModel}
          onModelChange={setModel}
          isBusy={false}
          onSubmit={() => handleSend()}
          onStop={() => {}}
        />
      </div>
    </div>
  )
}
