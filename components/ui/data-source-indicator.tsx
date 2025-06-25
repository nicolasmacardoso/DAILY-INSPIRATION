"use client"

import { useQuotes } from "@/contexts/quote-context"

export function DataSourceIndicator() {
  const { dataSource, loading } = useQuotes()

  if (loading) return null

  const getStatusText = () => {
    switch (dataSource) {
      case "api":
        return "API Online"
      case "local":
        return "Dados Locais"
      case "mixed":
        return "Modo Híbrido"
      default:
        return "Dados Locais"
    }
  }

  const getStatusColor = () => {
    switch (dataSource) {
      case "api":
        return "text-green-600 dark:text-green-400"
      case "local":
        return "text-blue-600 dark:text-blue-400"
      case "mixed":
        return "text-yellow-600 dark:text-yellow-400"
      default:
        return "text-blue-600 dark:text-blue-400"
    }
  }

  return <span className={`text-xs font-medium ${getStatusColor()}`}>{getStatusText()}</span>
}
