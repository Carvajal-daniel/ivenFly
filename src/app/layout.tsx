import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ivenfly - Soluções de Crescimento com IA',
  description: 'Soluções de crescimento para seu negócio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}} bg-[#FcFcFc] text-foreground antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
