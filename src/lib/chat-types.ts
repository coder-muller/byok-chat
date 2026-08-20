export type TextMessagePart = {
  type: "text"
  text: string
}

export type SourceUrlPart = {
  type: "source-url"
  sourceId: string
  url: string
  title?: string
}

type ToolCallBase<TType extends string, TInput> = {
  type: TType
  toolCallId: string
  input?: TInput
}

export type GithubRepoToolPart =
  | (ToolCallBase<"tool-github_repo", { repo?: string }> & {
      state: "input-streaming" | "input-available"
    })
  | (ToolCallBase<"tool-github_repo", { repo?: string }> & {
      state: "output-available"
      output:
        | {
            repo: string
            url: string
            stars: number
            forks: number
            language: string
          }
        | { error: string }
    })
  | (ToolCallBase<"tool-github_repo", { repo?: string }> & {
      state: "output-error"
      errorText: string
    })

export type AskUserToolPart =
  | (ToolCallBase<
      "tool-ask_user",
      { questions: { question: string; choices: string[] }[] }
    > & {
      state: "input-streaming"
    })
  | {
      type: "tool-ask_user"
      toolCallId: string
      state: "input-available"
      input: { questions: { question: string; choices: string[] }[] }
    }
  | (ToolCallBase<
      "tool-ask_user",
      { questions: { question: string; choices: string[] }[] }
    > & {
      state: "output-available"
      output: { question: string; answer: string }[]
    })
  | (ToolCallBase<
      "tool-ask_user",
      { questions: { question: string; choices: string[] }[] }
    > & {
      state: "output-error"
      errorText: string
    })

export type WebSearchToolPart =
  | (ToolCallBase<"tool-web_search", { query?: string }> & {
      state: "input-streaming" | "input-available"
    })
  | (ToolCallBase<"tool-web_search", { query?: string }> & {
      state: "output-available"
      output: unknown
    })
  | (ToolCallBase<"tool-web_search", { query?: string }> & {
      state: "output-error"
      errorText: string
    })

export type ChatMessagePart =
  | TextMessagePart
  | SourceUrlPart
  | GithubRepoToolPart
  | AskUserToolPart
  | WebSearchToolPart

export type ChatUIMessage = {
  id: string
  role: "user" | "assistant"
  parts: ChatMessagePart[]
}
