"use client"
import { useState, Suspense } from "react"
import { QuoteProvider } from "@/contexts/quote-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { UserQuotesProvider } from "@/contexts/user-quotes-context"
import MainLayout from "@/components/layout/main-layout"
import HomePage from "@/components/pages/home-page"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function Page() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <ThemeProvider>
      <QuoteProvider>
        <FavoritesProvider>
          <UserQuotesProvider>
            <MainLayout onTabChange={setActiveTab}>
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage activeTab={activeTab} />
              </Suspense>
            </MainLayout>
          </UserQuotesProvider>
        </FavoritesProvider>
      </QuoteProvider>
    </ThemeProvider>
  )
}
