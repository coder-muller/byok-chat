import { type ChatUIMessage } from "@/lib/chat-types"

export const SIGN_IN_PREVIEW_MESSAGES: ChatUIMessage[] = [
  {
    id: "preview-user-search",
    role: "user",
    parts: [
      {
        type: "text",
        text: "What changed in the AI SDK this week?",
      },
    ],
  },
  {
    id: "preview-assistant-search",
    role: "assistant",
    parts: [
      {
        type: "tool-web_search",
        toolCallId: "preview-web-search",
        state: "output-available",
        input: { query: "Vercel AI SDK changelog this week" },
        output: {},
      },
      {
        type: "source-url",
        sourceId: "preview-src-docs",
        url: "https://sdk.vercel.ai/docs",
        title: "AI SDK documentation",
      },
      {
        type: "source-url",
        sourceId: "preview-src-github",
        url: "https://github.com/vercel/ai/releases",
        title: "vercel/ai releases",
      },
      {
        type: "source-url",
        sourceId: "preview-src-blog",
        url: "https://vercel.com/blog",
        title: "Vercel blog",
      },
      {
        type: "text",
        text: "Gateway streaming is tighter, and tool parts now land as first-class UI. Web search attaches source URLs you can open from the thread.",
      },
    ],
  },
  {
    id: "preview-user-repo",
    role: "user",
    parts: [{ type: "text", text: "Pull up vercel/ai on GitHub." }],
  },
  {
    id: "preview-assistant-repo",
    role: "assistant",
    parts: [
      {
        type: "tool-github_repo",
        toolCallId: "preview-github-repo",
        state: "output-available",
        input: { repo: "vercel/ai" },
        output: {
          repo: "vercel/ai",
          url: "https://github.com/vercel/ai",
          stars: 18420,
          forks: 2410,
          language: "TypeScript",
        },
      },
      {
        type: "text",
        text: "TypeScript throughout. The repo is the source of truth for the tools you see here: web search, repo lookup, and follow-up questions.",
      },
    ],
  },
  {
    id: "preview-user-ask",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Should we pin the Gateway to the latest Claude?",
      },
    ],
  },
  {
    id: "preview-assistant-ask",
    role: "assistant",
    parts: [
      {
        type: "tool-ask_user",
        toolCallId: "preview-ask-user",
        state: "output-available",
        input: {
          questions: [
            {
              question: "Pin Claude on the Gateway?",
              choices: ["Yes, pin latest", "Keep the current model"],
            },
          ],
        },
        output: [
          {
            question: "Pin Claude on the Gateway?",
            answer: "Yes, pin latest",
          },
        ],
      },
      {
        type: "text",
        text: "Pinned. Next replies will use that model unless you change it in the composer.",
      },
    ],
  },
]
