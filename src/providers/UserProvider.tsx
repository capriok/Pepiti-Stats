"use client"

import { createContext, useContext } from "react"

const UserContext = createContext({} as User)
export const useUserContext = () => useContext(UserContext)

export default function UserProvider({ user, children }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
