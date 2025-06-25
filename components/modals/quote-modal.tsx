"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Quote } from "@/contexts/quote-context"

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (quote: Omit<Quote, "id">) => void
  editingQuote?: Quote | null
  mode: "create" | "edit"
}

const categories = ["Motivacional", "Sucesso", "Felicidade", "Amor", "Sabedoria", "Inspiração"]

export default function QuoteModal({ isOpen, onClose, onSave, editingQuote, mode }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    text: "",
    author: "",
    category: "Motivacional",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editingQuote) {
      setFormData({
        text: editingQuote.text,
        author: editingQuote.author,
        category: editingQuote.category,
        tags: editingQuote.tags,
      })
    } else {
      setFormData({
        text: "",
        author: "",
        category: "Motivacional",
        tags: [],
      })
    }
    setErrors({})
  }, [editingQuote, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.text.trim()) {
      newErrors.text = "O texto da citação é obrigatório"
    } else if (formData.text.length < 10) {
      newErrors.text = "A citação deve ter pelo menos 10 caracteres"
    }

    if (!formData.author.trim()) {
      newErrors.author = "O autor é obrigatório"
    }

    if (!formData.category) {
      newErrors.category = "A categoria é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            {mode === "create" ? <Plus className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
            {mode === "create" ? "Nova Citação" : "Editar Citação"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">Texto da Citação *</Label>
              <Textarea
                id="text"
                placeholder="Digite o texto da citação..."
                value={formData.text}
                onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
                className={`min-h-[100px] ${errors.text ? "border-red-500" : ""}`}
                maxLength={500}
              />
              {errors.text && <p className="text-red-500 text-sm">{errors.text}</p>}
              <p className="text-gray-500 text-xs">{formData.text.length}/500 caracteres</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Autor *</Label>
              <Input
                id="author"
                placeholder="Nome do autor"
                value={formData.author}
                onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                className={errors.author ? "border-red-500" : ""}
                maxLength={100}
              />
              {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  maxLength={20}
                />
                <Button type="button" onClick={addTag} disabled={!newTag.trim()}>
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                {mode === "create" ? "Criar Citação" : "Salvar Alterações"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
