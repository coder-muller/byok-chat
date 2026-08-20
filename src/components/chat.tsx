import * as React from "react"
import { Navigate, useNavigate } from "react-router"

import { type GatewayModel } from "@/lib/models"
import { type ChatUIMessage } from "@/lib/chat-types"
import { useSignedInDestination } from "@/lib/use-signed-in-destination"
import { PromptForm } from "@/components/prompt-form"
import { Suggestions } from "@/components/suggestions"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"

function ChatLayout({
  isBusy = false,
  children,
  composer,
}: {
  isBusy?: boolean
  children: React.ReactNode
  composer: React.ReactNode
}) {
  return (
    <div
      className="mx-auto flex min-h-0 w-full flex-1 flex-col"
      aria-busy={isBusy || undefined}
    >
      <div className="flex flex-1 items-center justify-center p-6">
        {children}
      </div>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 px-6 pb-6">
        {composer}
      </div>
    </div>
  )
}

function ChatEmptySkeleton() {
  return (
    <Empty>
      <span className="sr-only">Loading chat</span>
      <EmptyHeader>
        <Skeleton className="h-7 w-48" aria-hidden />
        <Skeleton className="h-4 w-56" aria-hidden />
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-2" aria-hidden>
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-7 w-24" />
        </div>
      </EmptyContent>
    </Empty>
  )
}

function ComposerSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-input/50 p-3.5 pb-2" aria-hidden>
      <div className="min-h-16" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="size-8" />
      </div>
    </div>
  )
}

export function Chat({ models }: { models: GatewayModel[] }) {
  const [model, setModel] = React.useState(models[0]?.id ?? "")
  const messages: ChatUIMessage[] = []
  const { isSignedIn, isResolved, to } = useSignedInDestination()
  const navigate = useNavigate()

  const resolvedModel = models.some((m) => m.id === model)
    ? model
    : (models[0]?.id ?? "")

  function handleSend() {
    if (!isResolved) return
    if (!isSignedIn) {
      void navigate("/sign-in")
      return
    }
    if (to === "/api-key") return
  }

  if (!isResolved) {
    return (
      <ChatLayout isBusy composer={<ComposerSkeleton />}>
        <ChatEmptySkeleton />
      </ChatLayout>
    )
  }

  if (isSignedIn && to === "/api-key") {
    return <Navigate to="/api-key" replace />
  }

  return (
    <ChatLayout
      composer={
        <PromptForm
          models={models}
          model={resolvedModel}
          onModelChange={setModel}
          isBusy={false}
          onSubmit={() => handleSend()}
          onStop={() => {}}
        />
      }
    >
      {messages.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>What can I help with?</EmptyTitle>
            <EmptyDescription>
              Pick a model and start chatting.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Suggestions onSelect={() => handleSend()} />
          </EmptyContent>
        </Empty>
      ) : null}
    </ChatLayout>
  )
}
