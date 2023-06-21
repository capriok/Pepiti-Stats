"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/ui/Dropdown"
import { Moon, Sun } from "lucide-react"

export default function ThemeSwitch({ withLabel = false }) {
  const [theme, setTheme] = useThemeSwitcher()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-center gap-2 rounded-md px-4 py-2 hover:bg-base-100">
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          {withLabel && <>{theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"}</>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function useThemeSwitcher(): [string, (theme: string) => void] {
  const [mode, setMode] = useState("")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme) setMode(theme)
  }, [theme])

  return [mode, setTheme]
}
