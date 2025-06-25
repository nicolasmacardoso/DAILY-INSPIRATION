"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Heart, Home, Filter, RefreshCw, X, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuotes } from "@/contexts/quote-context"
import { useUserQuotes } from "@/contexts/user-quotes-context"

interface NavigationProps {
  onTabChange?: (tab: string) => void
}

export default function Navigation({ onTabChange }: NavigationProps = {}) {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { categories, searchQuotes, fetchQuotesByCategory, resetToDefault } = useQuotes()
  const { userQuotes } = useUserQuotes()

  // Observar mudanças no campo de busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() === "" && activeTab === "search") {
        // Se o campo de busca estiver vazio, resetar para o estado inicial
        handleReset()
      }
    }, 1000) // Aumentado para 1 segundo devido à API externa

    return () => clearTimeout(timeoutId)
  }, [searchQuery, activeTab])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setLoading(true)
      setSelectedCategory(null)
      await searchQuotes(searchQuery)
      setActiveTab("search")
      setLoading(false)
    }
  }

  const handleCategoryFilter = async (category: string) => {
    setLoading(true)
    setSearchQuery("")
    setSelectedCategory(category)
    await fetchQuotesByCategory(category)
    setActiveTab("category")
    setLoading(false)
  }

  const handleReset = async () => {
    setLoading(true)
    setSearchQuery("")
    setSelectedCategory(null)
    setActiveTab("home")
    onTabChange?.("home")
    await resetToDefault()
    setLoading(false)
  }

  const clearSearch = () => {
    setSearchQuery("")
    if (activeTab === "search") {
      handleReset()
    }
  }

  const handleMyQuotes = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setActiveTab("my-quotes")
    onTabChange?.("my-quotes")
    // Não precisa de loading aqui pois são dados locais
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Primeira linha: Navegação + Campo de Busca */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={activeTab === "home" ? "default" : "outline"}
                size="sm"
                onClick={handleReset}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Início
              </Button>
              <Button
                variant={activeTab === "favorites" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveTab("favorites")
                  onTabChange?.("favorites")
                }}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                Favoritos
              </Button>
              <Button
                variant={activeTab === "my-quotes" ? "default" : "outline"}
                size="sm"
                onClick={handleMyQuotes}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Minhas Citações ({userQuotes.length})
              </Button>
            </div>

            {/* Campo de busca maior */}
            <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto sm:min-w-[400px] relative">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Buscar por autor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 pr-8 h-10"
                  disabled={loading}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <Button type="submit" size="sm" disabled={loading || !searchQuery.trim()} className="h-10 px-4">
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </form>
          </div>

          {/* Segunda linha: Filtros por categoria */}
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => (selectedCategory === category ? null : handleCategoryFilter(category))}
                disabled={loading}
                className={`text-xs disabled:opacity-50 transition-colors capitalize ${
                  selectedCategory === category
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    : ""
                }`}
              >
                <Filter className="h-3 w-3 mr-1" />
                {category}
                {selectedCategory === category && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReset()
                    }}
                    className="ml-1 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded-full p-0.5 transition-colors"
                    disabled={loading}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Button>
            ))}
          </div>

          {/* Indicador de filtro ativo */}
          {(selectedCategory || searchQuery) && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 justify-center sm:justify-start">
              <Filter className="h-4 w-4" />
              {selectedCategory && (
                <span>
                  Categoria: <strong className="capitalize">{selectedCategory}</strong>
                </span>
              )}
              {searchQuery && (
                <span>
                  Busca por autor: <strong>"{searchQuery}"</strong>
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs h-6 px-2 ml-2">
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
