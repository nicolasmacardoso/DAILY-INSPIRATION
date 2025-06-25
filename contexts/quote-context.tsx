"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Quote {
  id: string
  text: string
  author: string
  category: string
  tags: string[]
}

interface QuoteContextType {
  quotes: Quote[]
  currentQuote: Quote | null
  categories: string[]
  loading: boolean
  searchLoading: boolean
  error: string | null
  dataSource: "local" | "api" | "mixed"
  fetchRandomQuote: () => Promise<void>
  fetchQuotesByCategory: (category: string) => Promise<void>
  searchQuotes: (query: string) => Promise<void>
  resetToDefault: () => Promise<void>
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

// Categorias disponíveis
const availableCategories = [
  "Motivacional",
  "Inspiracional",
  "Sucesso",
  "Felicidade",
  "Amor",
  "Sabedoria",
  "Vida",
  "Amizade",
]

// Base de dados local robusta para fallback
const localQuotes: Quote[] = [
  // Motivacional
  {
    id: "mot-1",
    text: "A vida é 10% do que acontece com você e 90% de como você reage a isso.",
    author: "Charles R. Swindoll",
    category: "Motivacional",
    tags: ["vida", "atitude", "reação"],
  },
  {
    id: "mot-2",
    text: "Acredite que você pode e você já está no meio do caminho.",
    author: "Theodore Roosevelt",
    category: "Motivacional",
    tags: ["crença", "confiança", "determinação"],
  },
  {
    id: "mot-3",
    text: "O único modo de fazer um excelente trabalho é amar o que você faz.",
    author: "Steve Jobs",
    category: "Motivacional",
    tags: ["trabalho", "paixão", "excelência"],
  },
  {
    id: "mot-4",
    text: "Não espere por oportunidades extraordinárias. Agarre ocasiões comuns e as torne grandiosas.",
    author: "Orison Swett Marden",
    category: "Motivacional",
    tags: ["oportunidade", "ação", "grandeza"],
  },

  // Sucesso
  {
    id: "suc-1",
    text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    author: "Robert Collier",
    category: "Sucesso",
    tags: ["sucesso", "esforço", "persistência"],
  },
  {
    id: "suc-2",
    text: "O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta.",
    author: "Winston Churchill",
    category: "Sucesso",
    tags: ["sucesso", "fracasso", "coragem"],
  },
  {
    id: "suc-3",
    text: "Não meça o sucesso pelo que você conquistou, mas pelos obstáculos que superou.",
    author: "Booker T. Washington",
    category: "Sucesso",
    tags: ["sucesso", "obstáculos", "superação"],
  },

  // Felicidade
  {
    id: "fel-1",
    text: "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
    author: "Dalai Lama",
    category: "Felicidade",
    tags: ["felicidade", "ações", "bem-estar"],
  },
  {
    id: "fel-2",
    text: "A felicidade é quando o que você pensa, o que você diz e o que você faz estão em harmonia.",
    author: "Mahatma Gandhi",
    category: "Felicidade",
    tags: ["felicidade", "harmonia", "coerência"],
  },
  {
    id: "fel-3",
    text: "Seja feliz pelo momento. Este momento é a sua vida.",
    author: "Omar Khayyam",
    category: "Felicidade",
    tags: ["felicidade", "presente", "vida"],
  },

  // Amor
  {
    id: "amo-1",
    text: "O amor é a única força capaz de transformar um inimigo em amigo.",
    author: "Martin Luther King Jr.",
    category: "Amor",
    tags: ["amor", "transformação", "paz"],
  },
  {
    id: "amo-2",
    text: "Onde há amor há vida.",
    author: "Mahatma Gandhi",
    category: "Amor",
    tags: ["amor", "vida", "essência"],
  },
  {
    id: "amo-3",
    text: "O amor não consiste em olhar um para o outro, mas sim em olhar juntos na mesma direção.",
    author: "Antoine de Saint-Exupéry",
    category: "Amor",
    tags: ["amor", "parceria", "direção"],
  },

  // Sabedoria
  {
    id: "sab-1",
    text: "A sabedoria não vem da idade, mas da educação e do aprendizado.",
    author: "Anton Chekhov",
    category: "Sabedoria",
    tags: ["sabedoria", "educação", "aprendizado"],
  },
  {
    id: "sab-2",
    text: "Conhece-te a ti mesmo.",
    author: "Sócrates",
    category: "Sabedoria",
    tags: ["sabedoria", "autoconhecimento", "filosofia"],
  },
  {
    id: "sab-3",
    text: "A experiência é o nome que damos aos nossos erros.",
    author: "Oscar Wilde",
    category: "Sabedoria",
    tags: ["sabedoria", "experiência", "erros"],
  },

  // Vida
  {
    id: "vid-1",
    text: "A vida é o que acontece enquanto você está ocupado fazendo outros planos.",
    author: "John Lennon",
    category: "Vida",
    tags: ["vida", "presente", "planos"],
  },
  {
    id: "vid-2",
    text: "Viva como se fosse morrer amanhã. Aprenda como se fosse viver para sempre.",
    author: "Mahatma Gandhi",
    category: "Vida",
    tags: ["vida", "aprendizado", "intensidade"],
  },
  {
    id: "vid-3",
    text: "A vida não é medida pelo número de respirações que tomamos, mas pelos momentos que nos tiram o fôlego.",
    author: "Maya Angelou",
    category: "Vida",
    tags: ["vida", "momentos", "intensidade"],
  },

  // Inspiracional
  {
    id: "ins-1",
    text: "Seja a mudança que você quer ver no mundo.",
    author: "Mahatma Gandhi",
    category: "Inspiracional",
    tags: ["mudança", "mundo", "ação"],
  },
  {
    id: "ins-2",
    text: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    author: "Eleanor Roosevelt",
    category: "Inspiracional",
    tags: ["futuro", "sonhos", "beleza"],
  },
  {
    id: "ins-3",
    text: "Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças.",
    author: "Charles Darwin",
    category: "Inspiracional",
    tags: ["adaptação", "mudança", "sobrevivência"],
  },

  // Amizade
  {
    id: "ami-1",
    text: "A amizade é o único cimento que manterá o mundo unido.",
    author: "Woodrow Wilson",
    category: "Amizade",
    tags: ["amizade", "união", "mundo"],
  },
  {
    id: "ami-2",
    text: "Um amigo é alguém que conhece a canção do seu coração e pode cantá-la de volta quando você esqueceu a letra.",
    author: "Donna Roberts",
    category: "Amizade",
    tags: ["amizade", "coração", "apoio"],
  },
]

// API para tentar usar quando disponível
const QUOTABLE_API = "https://api.quotable.io"

// Função para traduzir texto usando API gratuita
const translateText = async (text: string, fromLang = "en", toLang = "pt"): Promise<string> => {
  try {
    // Usando a API MyMemory (gratuita, sem necessidade de chave)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`,
    )

    if (!response.ok) {
      throw new Error("Translation API error")
    }

    const data = await response.json()

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText
    }

    throw new Error("Translation failed")
  } catch (error) {
    console.log("Erro na tradução, mantendo texto original:", error)
    return text // Retorna o texto original se a tradução falhar
  }
}

// Função para traduzir uma citação completa PRESERVANDO a categoria original
const translateQuote = async (quote: Quote, preserveCategory?: string): Promise<Quote> => {
  try {
    const translatedText = await translateText(quote.text)

    return {
      ...quote,
      text: translatedText,
      category: preserveCategory || quote.category, // Preservar categoria se fornecida
      tags: preserveCategory ? [preserveCategory.toLowerCase(), "traduzida"] : quote.tags,
    }
  } catch (error) {
    console.log("Erro ao traduzir citação:", error)
    return quote // Retorna a citação original se a tradução falhar
  }
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>(localQuotes) // Inicializar com todas as citações locais
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<"local" | "api" | "mixed">("local")

  const categories = availableCategories

  const fetchRandomQuote = async () => {
    setLoading(true)
    setError(null)

    try {
      // Tentar API primeiro, fallback para dados locais
      let selectedQuote: Quote

      try {
        const response = await fetch(`${QUOTABLE_API}/random`)
        if (!response.ok) throw new Error("API error")
        const data = await response.json()

        const originalQuote: Quote = {
          id: data._id,
          text: data.content,
          author: data.author,
          category: "Inspiracional",
          tags: data.tags || ["inspiracional"],
        }

        // Traduzir a citação
        console.log("Traduzindo citação da API...")
        selectedQuote = await translateQuote(originalQuote, "Inspiracional")
        console.log("Citação traduzida:", selectedQuote.text)
        setDataSource("api")
      } catch (err) {
        console.log("API indisponível, usando dados locais")
        const randomIndex = Math.floor(Math.random() * localQuotes.length)
        selectedQuote = localQuotes[randomIndex]
        setDataSource("local")
      }

      setCurrentQuote(selectedQuote)
    } catch (err) {
      console.error("Erro geral:", err)
      const randomIndex = Math.floor(Math.random() * localQuotes.length)
      setCurrentQuote(localQuotes[randomIndex])
      setDataSource("local")
    } finally {
      setLoading(false)
    }
  }

  const fetchQuotesByCategory = async (category: string) => {
    setLoading(true)
    setError(null)

    try {
      // SEMPRE usar dados locais primeiro para garantir que a categoria funcione
      const localFiltered = localQuotes.filter((q) => q.category === category)

      if (localFiltered.length > 0) {
        console.log(`Encontradas ${localFiltered.length} citações locais da categoria ${category}`)
        setQuotes(localFiltered)
        const randomIndex = Math.floor(Math.random() * localFiltered.length)
        setCurrentQuote(localFiltered[randomIndex])
        setDataSource("local")
        setError(null)
      } else {
        // Se não há citações locais, tentar API
        try {
          const categoryMap: { [key: string]: string } = {
            Motivacional: "motivational",
            Inspiracional: "inspirational",
            Sucesso: "success",
            Felicidade: "happiness",
            Amor: "love",
            Sabedoria: "wisdom",
            Vida: "life",
            Amizade: "friendship",
          }

          const englishTag = categoryMap[category] || "inspirational"
          const response = await fetch(`${QUOTABLE_API}/quotes?tags=${englishTag}&limit=6`)

          if (!response.ok) throw new Error("API error")
          const data = await response.json()

          if (!data.results || data.results.length === 0) {
            throw new Error("No results")
          }

          // Traduzir todas as citações PRESERVANDO a categoria
          console.log(`Traduzindo ${data.results.length} citações da categoria ${category}...`)
          const translatedQuotes = await Promise.all(
            data.results.map(async (apiQuote: any) => {
              const originalQuote: Quote = {
                id: apiQuote._id,
                text: apiQuote.content,
                author: apiQuote.author,
                category: "Inspiracional", // Temporário
                tags: apiQuote.tags || [],
              }

              return await translateQuote(originalQuote, category) // PRESERVAR categoria
            }),
          )

          console.log("Citações traduzidas com sucesso!")
          setQuotes(translatedQuotes)
          const randomIndex = Math.floor(Math.random() * translatedQuotes.length)
          setCurrentQuote(translatedQuotes[randomIndex])
          setDataSource("api")
          setError(null)
        } catch (apiErr) {
          console.log("API falhou, nenhuma citação local encontrada")
          setError(`Nenhuma citação encontrada para a categoria "${category}".`)
          setQuotes([])
          setCurrentQuote(null)
          setDataSource("local")
        }
      }
    } catch (err) {
      console.error("Erro ao filtrar por categoria:", err)
      setError("Erro ao filtrar citações")
      setQuotes([])
      setCurrentQuote(null)
    } finally {
      setLoading(false)
    }
  }

  const searchQuotes = async (query: string) => {
    setSearchLoading(true)
    setError(null)

    try {
      // Buscar primeiro nos dados locais
      const localResults = localQuotes.filter(
        (q) =>
          q.text.toLowerCase().includes(query.toLowerCase()) ||
          q.author.toLowerCase().includes(query.toLowerCase()) ||
          q.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )

      if (localResults.length > 0) {
        console.log(`Encontradas ${localResults.length} citações locais para "${query}"`)
        setQuotes(localResults)
        setDataSource("local")
        setError(null)
      } else {
        // Tentar API se não encontrou localmente
        try {
          const response = await fetch(`${QUOTABLE_API}/quotes?author=${encodeURIComponent(query)}&limit=6`)

          if (!response.ok) throw new Error("API error")
          const data = await response.json()

          if (!data.results || data.results.length === 0) {
            throw new Error("No results")
          }

          // Traduzir todas as citações encontradas
          console.log(`Traduzindo ${data.results.length} citações do autor ${query}...`)
          const translatedQuotes = await Promise.all(
            data.results.map(async (apiQuote: any) => {
              const originalQuote: Quote = {
                id: apiQuote._id,
                text: apiQuote.content,
                author: apiQuote.author,
                category: "Inspiracional",
                tags: ["busca", "traduzida"],
              }

              return await translateQuote(originalQuote, "Inspiracional")
            }),
          )

          console.log("Citações de busca traduzidas com sucesso!")
          setQuotes(translatedQuotes)
          setDataSource("api")
          setError(null)
        } catch (apiErr) {
          console.log("API falhou e nenhum resultado local")
          setError(`Nenhuma citação encontrada para "${query}".`)
          setQuotes([])
          setDataSource("local")
        }
      }
    } catch (err) {
      console.error("Erro ao buscar citações:", err)
      setError("Erro ao buscar citações")
      setQuotes([])
    } finally {
      setSearchLoading(false)
    }
  }

  const resetToDefault = async () => {
    setLoading(true)
    setError(null)

    try {
      // Sempre começar com dados locais para garantir que funcione
      setQuotes(localQuotes)
      const randomIndex = Math.floor(Math.random() * localQuotes.length)
      setCurrentQuote(localQuotes[randomIndex])
      setDataSource("local")
      setError(null)

      // Tentar carregar da API em background
      try {
        const response = await fetch(`${QUOTABLE_API}/quotes?page=1&limit=8`)
        if (!response.ok) throw new Error("API error")
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          // Traduzir todas as citações
          console.log(`Traduzindo ${data.results.length} citações padrão...`)
          const translatedQuotes = await Promise.all(
            data.results.map(async (apiQuote: any) => {
              const originalQuote: Quote = {
                id: apiQuote._id,
                text: apiQuote.content,
                author: apiQuote.author,
                category: "Inspiracional",
                tags: ["inspiracional", "traduzida"],
              }

              return await translateQuote(originalQuote, "Inspiracional")
            }),
          )

          console.log("Citações padrão traduzidas com sucesso!")
          // Combinar com dados locais
          const allQuotes = [...localQuotes, ...translatedQuotes]
          setQuotes(allQuotes)
          setDataSource("mixed")
        }
      } catch (apiErr) {
        console.log("API indisponível, mantendo dados locais")
        // Manter dados locais que já foram definidos
      }
    } catch (err) {
      console.error("Erro ao resetar:", err)
      // Garantir que sempre há dados
      setQuotes(localQuotes)
      const randomIndex = Math.floor(Math.random() * localQuotes.length)
      setCurrentQuote(localQuotes[randomIndex])
      setDataSource("local")
    } finally {
      setLoading(false)
    }
  }

  return (
    <QuoteContext.Provider
      value={{
        quotes,
        currentQuote,
        categories,
        loading,
        searchLoading,
        error,
        dataSource,
        fetchRandomQuote,
        fetchQuotesByCategory,
        searchQuotes,
        resetToDefault,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuotes() {
  const context = useContext(QuoteContext)
  if (context === undefined) {
    throw new Error("useQuotes must be used within a QuoteProvider")
  }
  return context
}
