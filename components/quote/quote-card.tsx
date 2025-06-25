"use client"

import { useState } from "react"
import { Heart, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Quote } from "@/contexts/quote-context"
import { useFavorites } from "@/contexts/favorites-context"

interface QuoteCardProps {
  quote: Quote
  featured?: boolean
}

export default function QuoteCard({ quote, featured = false }: QuoteCardProps) {
  const [copied, setCopied] = useState(false)
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const isQuoteFavorite = isFavorite(quote.id)

  const handleFavorite = () => {
    if (isQuoteFavorite) {
      removeFromFavorites(quote.id)
    } else {
      addToFavorites(quote)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Citação Inspiradora",
          text: `"${quote.text}" - ${quote.author}`,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Erro ao compartilhar:", err)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-lg ${
        featured
          ? "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700"
          : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      <CardContent className={`p-6 ${featured ? "p-8" : ""}`}>
        <div className="space-y-4">
          <blockquote
            className={`${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            } font-medium text-gray-900 dark:text-white leading-relaxed`}
          >
            "{quote.text}"
          </blockquote>

          <div className="flex items-center justify-between">
            <cite
              className={`${
                featured ? "text-lg" : "text-base"
              } text-gray-600 dark:text-gray-300 not-italic font-medium`}
            >
              — {quote.author}
            </cite>

            <Badge
              variant="secondary"
              className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {quote.category}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {quote.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavorite}
              className={
                isQuoteFavorite
                  ? "text-red-600 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-600 dark:bg-red-900/20"
                  : ""
              }
            >
              <Heart className={`h-4 w-4 ${isQuoteFavorite ? "fill-current" : ""}`} />
            </Button>

            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
