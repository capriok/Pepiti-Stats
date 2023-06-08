"use client"

import { ThemeProvider } from "next-themes"
import { Analytics } from '@vercel/analytics/react'
import { SWRConfig } from "swr"
import { fetcher } from "~/api/fetcher"

export function Providers({ user, children }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider>
        {children}
        <Analytics />
      </ThemeProvider>
    </SWRConfig>
  )
}
