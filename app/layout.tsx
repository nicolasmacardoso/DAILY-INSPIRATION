import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Daily Inspiration - Citações Motivacionais",
  description:
    "Descubra citações inspiradoras, crie suas próprias mensagens motivacionais e encontre inspiração diária. Desenvolvido por Nícolas Machado Cardoso e Marlon Pasini.",
  keywords: ["citações", "inspiração", "motivação", "frases", "bem-estar", "desenvolvimento pessoal"],
  authors: [{ name: "Nícolas Machado Cardoso" }, { name: "Marlon Pasini" }],
  creator: "Nícolas Machado Cardoso e Marlon Pasini",
  publisher: "Daily Inspiration Team",
  robots: "index, follow",
  openGraph: {
    title: "Daily Inspiration - Citações Motivacionais",
    description:
      "Descubra citações inspiradoras, crie suas próprias mensagens motivacionais e encontre inspiração diária.",
    type: "website",
    locale: "pt_BR",
    siteName: "Daily Inspiration",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daily Inspiration - Citações Motivacionais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Inspiration - Citações Motivacionais",
    description:
      "Descubra citações inspiradoras, crie suas próprias mensagens motivacionais e encontre inspiração diária.",
    images: ["/og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="application-name" content="Daily Inspiration" />
        <meta name="apple-mobile-web-app-title" content="Daily Inspiration" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body>{children}</body>
    </html>
  )
}
