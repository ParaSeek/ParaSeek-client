"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"


export function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => { if (theme == "light") setTheme("dark"); else setTheme("light"); }}>
      <div className="rounded-full relative hover:bg-muted cursor-pointer p-1">
        <Sun strokeWidth="1.5px" className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon strokeWidth="1.5px" className="absolute h-[1.2rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </div>
    </button>

  )
}
