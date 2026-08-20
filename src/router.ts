import { createBrowserRouter } from "react-router"

import { ChatPage } from "@/routes/chat-page"
import { RootLayout } from "@/routes/root-layout"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: ChatPage }],
  },
])
