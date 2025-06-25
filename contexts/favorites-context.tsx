"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Quote } from "./quote-context"

interface FavoritesContextType {
  favorites: Quote[]
  addToFavorites: (quote: Quote) => void
  removeFromFavorites: (quoteId: string) => void
  isFavorite: (quoteId: string) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Quote[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (quote: Quote) => {
    setFavorites((prev) => [...prev, quote])
  }

  const removeFromFavorites = (quoteId: string) => {
    setFavorites((prev) => prev.filter((q) => q.id !== quoteId))
  }

  const isFavorite = (quoteId: string) => {
    return favorites.some((q) => q.id === quoteId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
