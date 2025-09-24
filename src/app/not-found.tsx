import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold gradient-primary bg-clip-text text-transparent">404</h1>
          <h2 className="text-3xl font-bold text-foreground">Página não encontrada</h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button asChild className="gradient-primary border-0 shadow-elegant">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
