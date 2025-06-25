"use client"

import { useEffect } from "react"
import { useQuotes } from "@/contexts/quote-context"
import { useFavorites } from "@/contexts/favorites-context"
import QuoteCard from "@/components/quote/quote-card"
import QuoteGrid from "@/components/quote/quote-grid"
import QuoteSkeleton from "@/components/quote/quote-skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw, Heart } from "lucide-react"
import MyQuotesPage from "./my-quotes-page"

interface HomePageProps {
  activeTab?: string
}

export default function HomePage({ activeTab = "home" }: HomePageProps) {
  const { currentQuote, quotes, loading, error, fetchRandomQuote, resetToDefault } = useQuotes()
  const { favorites } = useFavorites()

  useEffect(() => {
    // Só carregar dados iniciais se não houver citações e estiver na home
    if (quotes.length === 0 && activeTab === "home") {
      resetToDefault()
    }
  }, [quotes.length, resetToDefault, activeTab])

  // Renderizar página de citações pessoais
  if (activeTab === "my-quotes") {
    return <MyQuotesPage />
  }

  // Renderizar página de favoritos
  if (activeTab === "favorites") {
    return (
      <div className="space-y-8">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Suas Citações Favoritas</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Todas as citações que você salvou como favoritas</p>
        </section>

        <section>
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">Você ainda não tem citações favoritas.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Clique no ❤️ em qualquer citação para adicioná-la aos favoritos!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-600 dark:text-gray-400">
                {favorites.length} citação{favorites.length !== 1 ? "ões" : ""} favorita
                {favorites.length !== 1 ? "s" : ""}
              </p>
              <QuoteGrid quotes={favorites} />
            </div>
          )}
        </section>
      </div>
    )
  }

  // Renderizar erro se houver
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button onClick={resetToDefault}>Voltar ao Início</Button>
      </div>
    )
  }

  // Renderizar página principal (home, search, category)
  return (
    <div className="space-y-8">
      {/* Seção da citação em destaque - apenas na home */}
      {activeTab === "home" && (
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Citação do Momento</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Encontre inspiração para o seu dia com nossas citações cuidadosamente selecionadas
          </p>

          <div className="max-w-2xl mx-auto mb-6">
            {loading && !currentQuote ? (
              <QuoteSkeleton featured />
            ) : currentQuote ? (
              <QuoteCard quote={currentQuote} featured />
            ) : null}
          </div>

          <Button
            onClick={fetchRandomQuote}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Carregando...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Nova Citação
              </>
            )}
          </Button>
        </section>
      )}

      {/* Seção de citações filtradas/pesquisadas */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {activeTab === "search" && "Resultados da Busca"}
          {activeTab === "category" && "Citações por Categoria"}
          {activeTab === "home" && "Explore Mais Citações"}
        </h3>

        {loading && quotes.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <QuoteSkeleton key={index} />
            ))}
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Nenhuma citação encontrada.</p>
          </div>
        ) : (
          <QuoteGrid quotes={quotes} />
        )}
      </section>
    </div>
  )
}
