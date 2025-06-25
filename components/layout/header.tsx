"use client"

import { Moon, Sun, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { DataSourceIndicator } from "@/components/ui/data-source-indicator"

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Inspiration</h1>
          </div>
          <DataSourceIndicator />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          aria-label={`Alternar para modo ${theme === "light" ? "escuro" : "claro"}`}
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">{theme === "light" ? "Modo Escuro" : "Modo Claro"}</span>
        </Button>
      </div>
    </header>
  )
}
