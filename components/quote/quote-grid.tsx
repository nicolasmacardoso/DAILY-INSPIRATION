"use client"

import type { Quote } from "@/contexts/quote-context"
import { useQuotes } from "@/contexts/quote-context"
import QuoteCard from "./quote-card"
import QuoteSkeleton from "./quote-skeleton"

interface QuoteGridProps {
  quotes: Quote[]
}

export default function QuoteGrid({ quotes }: QuoteGridProps) {
  const { loading } = useQuotes()

  if (loading && quotes.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <QuoteSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (quotes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Nenhuma citação encontrada.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
      {loading && (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <QuoteSkeleton key={`loading-${index}`} />
          ))}
        </>
      )}
    </div>
  )
}
