"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Quote } from "./quote-context"

interface UserQuotesContextType {
  userQuotes: Quote[]
  addUserQuote: (quote: Omit<Quote, "id">) => void
  updateUserQuote: (id: string, quote: Omit<Quote, "id">) => void
  deleteUserQuote: (id: string) => void
  getUserQuote: (id: string) => Quote | undefined
}

const UserQuotesContext = createContext<UserQuotesContextType | undefined>(undefined)

export function UserQuotesProvider({ children }: { children: ReactNode }) {
  const [userQuotes, setUserQuotes] = useState<Quote[]>([])

  useEffect(() => {
    const savedQuotes = localStorage.getItem("userQuotes")
    if (savedQuotes) {
      setUserQuotes(JSON.parse(savedQuotes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("userQuotes", JSON.stringify(userQuotes))
  }, [userQuotes])

  const addUserQuote = (quote: Omit<Quote, "id">) => {
    const newQuote: Quote = {
      ...quote,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    setUserQuotes((prev) => [newQuote, ...prev])
  }

  const updateUserQuote = (id: string, updatedQuote: Omit<Quote, "id">) => {
    setUserQuotes((prev) => prev.map((quote) => (quote.id === id ? { ...updatedQuote, id } : quote)))
  }

  const deleteUserQuote = (id: string) => {
    setUserQuotes((prev) => prev.filter((quote) => quote.id !== id))
  }

  const getUserQuote = (id: string) => {
    return userQuotes.find((quote) => quote.id === id)
  }

  return (
    <UserQuotesContext.Provider
      value={{
        userQuotes,
        addUserQuote,
        updateUserQuote,
        deleteUserQuote,
        getUserQuote,
      }}
    >
      {children}
    </UserQuotesContext.Provider>
  )
}

export function useUserQuotes() {
  const context = useContext(UserQuotesContext)
  if (context === undefined) {
    throw new Error("useUserQuotes must be used within a UserQuotesProvider")
  }
  return context
}
