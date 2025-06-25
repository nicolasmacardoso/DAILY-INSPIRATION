import { Card, CardContent } from "@/components/ui/card"

interface QuoteSkeletonProps {
  featured?: boolean
}

export default function QuoteSkeleton({ featured = false }: QuoteSkeletonProps) {
  return (
    <Card
      className={`animate-pulse ${
        featured
          ? "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
          : "bg-gray-100 dark:bg-gray-800"
      }`}
    >
      <CardContent className={`p-6 ${featured ? "p-8" : ""}`}>
        <div className="space-y-4">
          {/* Texto da citação */}
          <div className="space-y-3">
            <div className={`h-6 bg-gray-300 dark:bg-gray-600 rounded ${featured ? "w-full" : "w-5/6"}`}></div>
            <div className={`h-6 bg-gray-300 dark:bg-gray-600 rounded ${featured ? "w-4/5" : "w-3/4"}`}></div>
            {featured && <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>}
          </div>

          {/* Autor e categoria */}
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-14"></div>
          </div>

          {/* Botões */}
          <div className="flex gap-2 pt-2">
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
