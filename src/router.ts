import { createBrowserRouter } from "react-router"

import { ChatPage } from "@/routes/chat-page"
import { NotFoundPage } from "@/routes/not-found-page"
import { RootLayout } from "@/routes/root-layout"
import { RouteErrorPage } from "@/routes/route-error-page"
import { SignInPage } from "@/routes/sign-in-page"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RouteErrorPage,
    children: [
      { index: true, Component: ChatPage },
      { path: "sign-in", Component: SignInPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
