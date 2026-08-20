import { createBrowserRouter } from "react-router"

import { ChatPage } from "@/routes/chat-page"
import { NotFoundPage } from "@/routes/not-found-page"
import { RootLayout } from "@/routes/root-layout"
import { RouteErrorPage } from "@/routes/route-error-page"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RouteErrorPage,
    children: [
      { index: true, Component: ChatPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
