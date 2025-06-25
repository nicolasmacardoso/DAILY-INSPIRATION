# Daily Inspiration - SPA com React

Uma aplicação web que traz alegria através de citações inspiradoras e motivacionais, desenvolvida como projeto final da disciplina de Front-End.

## Descrição do Projeto e Integrantes

**Daily Inspiration** é uma Single Page Application (SPA) desenvolvida em React que tem como objetivo trazer alegria por meio de pequenas interações. A aplicação permite aos usuários descobrir, favoritar e criar suas próprias citações inspiradoras, oferecendo uma experiência personalizada e motivacional.

### Integrantes do Grupo
- **Nícolas Machado Cardoso**
- **Marlon Pasini**

## Descrição do Problema

No mundo atual, muitas pessoas enfrentam desafios diários que podem afetar seu bem-estar emocional e motivação. A falta de inspiração e positividade pode impactar significativamente a qualidade de vida e produtividade das pessoas.

**Daily Inspiration** resolve este problema oferecendo:
- Acesso fácil a citações inspiradoras categorizadas, buscadas pela API Quotable
- Tradução automática das citações da API do inglês para o português
- Possibilidade de criar e personalizar citações próprias
- Sistema de favoritos para guardar citações especiais
- Interface intuitiva que promove interações positivas
- Experiência personalizada com temas claro e escuro

## Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca principal para construção da interface
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Linguagem de programação com tipagem estática
- **Tailwind CSS** - Framework CSS para estilização
- **Lucide React** - Biblioteca de ícones

### APIs e Integração
- **Quotable API** - API externa para citações inspiradoras
- **MyMemory Translation API** - Tradução automática inglês-português
- **Fetch API** - Requisições HTTP nativas

### Gerenciamento de Estado
- **Context API** - Gerenciamento de estado global
- **React Hooks** - useState, useEffect, useContext, etc.
- **LocalStorage** - Persistência de dados no navegador

### UI/UX
- **Radix UI** - Componentes acessíveis e customizáveis
- **shadcn/ui** - Sistema de componentes baseado em Radix UI
- **CSS Animations** - Transições e animações suaves
- **Responsive Design** - Layout adaptável para diferentes dispositivos

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS
- **Vercel** - Plataforma de deploy

## Limitações do Projeto

### Limitações Técnicas
- **Dependência de APIs externas**: Projeto depende da Quotable API e MyMemory API
- **Persistência Local**: Dados salvos apenas no localStorage do navegador
- **Sem Autenticação**: Não possui sistema de login/registro de usuários
- **Sem Sincronização**: Dados não são sincronizados entre dispositivos

### Limitações Funcionais
- **Categorias Fixas**: Categorias de citações são predefinidas
- **Qualidade da Tradução**: Dependente da qualidade da API de tradução gratuita
- **Sem Compartilhamento Social**: Não integra com redes sociais
- **Sem Notificações Push**: Não envia lembretes ou notificações
- **Funcionalidade Offline Limitada**: Funciona com dados locais quando APIs estão indisponíveis

### Limitações de Escala
- **Performance**: Não otimizado para grandes volumes de dados
- **Rate Limiting**: APIs externas podem ter limitações de uso
- **Concorrência**: Não suporta múltiplos usuários simultâneos
- **Backup**: Não possui sistema de backup automático

## Descrição das Entidades e Propriedades

### Quote (Citação)
Entidade principal que representa uma citação inspiradora.

```typescript
interface Quote {
  id: string;          // Identificador único da citação
  text: string;        // Texto da citação (obrigatório)
  author: string;      // Autor da citação (obrigatório)
  category: string;    // Categoria da citação
  tags: string[];      // Tags para classificação e busca
}
```

**Propriedades:**
- **id**: String única gerada automaticamente
- **text**: Conteúdo principal da citação (máximo 500 caracteres)
- **author**: Nome do autor da citação (máximo 100 caracteres)
- **category**: Uma das categorias disponíveis (Motivacional, Sucesso, Felicidade, Amor, Sabedoria, Vida, Inspiracional, Amizade)
- **tags**: Array de strings para facilitar buscas e classificação

### Favorite (Favorito)
Representa uma citação favoritada pelo usuário.

```typescript
interface Favorite {
  quoteId: string;     // ID da citação favoritada
  timestamp: number;   // Data/hora quando foi favoritada
}
```

### UserQuote (Citação do Usuário)
Citações criadas pelo próprio usuário, herda de Quote.

```typescript
interface UserQuote extends Quote {
  createdAt: number;   // Timestamp de criação
  updatedAt: number;   // Timestamp da última atualização
}
```

### Context Types

#### QuoteContextType
```typescript
interface QuoteContextType {
  quotes: Quote[]                                    // Lista de citações
  currentQuote: Quote | null                        // Citação em destaque
  categories: string[]                               // Categorias disponíveis
  loading: boolean                                   // Estado de carregamento
  searchLoading: boolean                            // Estado de busca
  error: string | null                              // Mensagens de erro
  dataSource: "local" | "api" | "mixed"            // Fonte dos dados
  fetchRandomQuote: () => Promise<void>             // Buscar citação aleatória
  fetchQuotesByCategory: (category: string) => Promise<void> // Filtrar por categoria
  searchQuotes: (query: string) => Promise<void>    // Buscar citações
  resetToDefault: () => Promise<void>               // Resetar ao estado inicial
}
```

## Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Git**

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/nicolasmacardoso/daily-inspiration.git
   cd daily-inspiration
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação**
   Abra seu navegador e acesse: `http://localhost:3000`

### Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa verificação de código

### Estrutura de Pastas

```
daily-inspiration/
├── app/                    # Páginas e layout principal (Next.js App Router)
├── components/             # Componentes React
│   ├── layout/            # Componentes de layout (Header, Navigation)
│   ├── modals/            # Modais da aplicação (QuoteModal)
│   ├── pages/             # Componentes de páginas (HomePage, MyQuotesPage)
│   ├── quote/             # Componentes relacionados a citações
│   └── ui/                # Componentes de interface (shadcn/ui)
├── contexts/              # Contexts do React (Quote, Theme, Favorites, UserQuotes)
├── hooks/                 # Hooks customizados (use-mobile, use-toast)
├── lib/                   # Utilitários e configurações
├── public/                # Arquivos estáticos
└── styles/                # Arquivos de estilo
```

## Outros Conteúdos Relevantes

### Funcionalidades Principais

1. **Citações Inspiradoras com Tradução**
   - Integração com Quotable API para citações em inglês
   - Tradução automática para português usando MyMemory API
   - Geração de citações aleatórias
   - Categorização por temas
   - Sistema de busca por autor
   - Fallback para dados locais quando APIs estão indisponíveis

2. **Gerenciamento de Favoritos**
   - Adicionar/remover favoritos com um clique
   - Visualização dedicada de citações favoritadas
   - Persistência local dos favoritos
   - Indicadores visuais de status

3. **CRUD de Citações Pessoais**
   - Criar novas citações com formulário validado
   - Editar citações existentes
   - Excluir citações com confirmação
   - Validação em tempo real
   - Contadores de caracteres

4. **Experiência do Usuário Avançada**
   - Interface responsiva e intuitiva
   - Tema claro/escuro com persistência
   - Loading states elegantes com skeleton screens
   - Animações suaves e transições
   - Indicador de fonte de dados (API/Local)
   - Sistema de toast para feedback

### Funcionalidades Técnicas Avançadas

#### Sistema de Tradução Automática
- **API MyMemory**: Tradução gratuita inglês-português
- **Fallback inteligente**: Mantém texto original se tradução falhar
- **Tradução em lote**: Múltiplas citações traduzidas simultaneamente
- **Logs informativos**: Acompanhamento do processo no console

#### Gerenciamento de Estado Robusto
- **Context API**: 4 contexts especializados
- **Persistência**: localStorage para dados do usuário
- **Error Handling**: Tratamento graceful de erros
- **Loading States**: Estados de carregamento granulares

#### Integração com APIs
- **Quotable API**: Citações de qualidade em inglês
- **MyMemory API**: Tradução automática
- **Error Recovery**: Sistema de fallback para indisponibilidade
- **Rate Limiting**: Controle de requisições

### Padrões de Desenvolvimento

- **Componentização**: Componentes pequenos e reutilizáveis
- **Hooks Customizados**: Lógica reutilizável encapsulada
- **Context API**: Gerenciamento de estado global eficiente
- **TypeScript**: Tipagem estática para maior confiabilidade
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Componentes acessíveis com Radix UI

### Métricas do Projeto

- **Componentes**: 20+ componentes React reutilizáveis
- **Contexts**: 4 contexts para gerenciamento de estado
- **Páginas**: 3 páginas principais (Home, Favoritos, Minhas Citações)
- **APIs**: Integração com 2 APIs externas
- **Responsividade**: 100% responsivo (mobile, tablet, desktop)
- **Tradução**: Sistema automático inglês-português
- **Fallbacks**: Sistema robusto de fallback para APIs

### Deploy

A aplicação está disponível online em: **[https://dailyinspiration.vercel.app/](https://dailyinspiration.vercel.app/)**

### Links Importantes

- **Repositório**: [https://github.com/nicolasmacardoso/daily-inspiration](https://github.com/nicolasmacardoso/daily-inspiration)
- **Quotable API**: [https://quotable.io/](https://quotable.io/)
- **MyMemory API**: [https://mymemory.translated.net/](https://mymemory.translated.net/)

### Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de Engenharia de Software.

---

**Desenvolvido por Nícolas Machado Cardoso e Marlon Pasini**
