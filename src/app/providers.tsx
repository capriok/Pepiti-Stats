"use client"

import { ThemeProvider } from "next-themes"
import { Analytics } from '@vercel/analytics/react'

export function Providers({ children }) {
  return <ThemeProvider>
    {children}
            <Analytics />
  </ThemeProvider>
}
