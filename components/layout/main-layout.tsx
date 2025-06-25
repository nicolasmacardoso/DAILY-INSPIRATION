"use client"

import type { ReactNode } from "react"
import Header from "./header"
import Navigation from "./navigation"
import { ToastContainer } from "@/components/ui/toast"

interface MainLayoutProps {
  children: ReactNode
  onTabChange?: (tab: string) => void
}

export default function MainLayout({ children, onTabChange }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      <Navigation onTabChange={onTabChange} />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <ToastContainer />
    </div>
  )
}
