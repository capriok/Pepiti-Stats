"use client"

import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import { SWRConfig } from "swr"
import { fetcher } from "~/api/fetcher"
import UserProvider from "../providers/UserProvider"
import OverlayProvider from "../providers/OverlayProvider"

export function Providers({ user, children }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider>
        <UserProvider user={user}>
          <OverlayProvider>
            {children}
            <Analytics />
          </OverlayProvider>
        </UserProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}
