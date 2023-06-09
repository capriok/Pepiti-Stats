"use client"

import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import { SWRConfig } from "swr"
import { fetcher } from "~/api/fetcher"
import { createContext, useContext } from "react"

const UserContext = createContext({} as User)
export const useUserContext = () => useContext(UserContext)

export function Providers({ user, children }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider>
        <UserContext.Provider value={user}>
          {children}
          <Analytics />
        </UserContext.Provider>
      </ThemeProvider>
    </SWRConfig>
  )
}
