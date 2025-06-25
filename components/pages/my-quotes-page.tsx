"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserQuotes } from "@/contexts/user-quotes-context"
import UserQuoteCard from "@/components/quote/user-quote-card"
import QuoteModal from "@/components/modals/quote-modal"
import type { Quote } from "@/contexts/quote-context"

export default function MyQuotesPage() {
  const { userQuotes, addUserQuote, updateUserQuote, deleteUserQuote } = useUserQuotes()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  const handleCreateQuote = () => {
    setEditingQuote(null)
    setModalMode("create")
    setIsModalOpen(true)
  }

  const handleEditQuote = (quote: Quote) => {
    setEditingQuote(quote)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleSaveQuote = (quoteData: Omit<Quote, "id">) => {
    if (modalMode === "create") {
      addUserQuote(quoteData)
    } else if (editingQuote) {
      updateUserQuote(editingQuote.id, quoteData)
    }
  }

  const handleDeleteQuote = (id: string) => {
    deleteUserQuote(id)
  }

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Minhas Citações</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Crie e gerencie suas próprias citações inspiradoras</p>

        <Button
          onClick={handleCreateQuote}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Citação
        </Button>
      </section>

      <section>
        {userQuotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Você ainda não criou nenhuma citação.</p>
            <Button onClick={handleCreateQuote} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Criar sua primeira citação
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userQuotes.map((quote) => (
              <UserQuoteCard key={quote.id} quote={quote} onEdit={handleEditQuote} onDelete={handleDeleteQuote} />
            ))}
          </div>
        )}
      </section>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuote}
        editingQuote={editingQuote}
        mode={modalMode}
      />
    </div>
  )
}
