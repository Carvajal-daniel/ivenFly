import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

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
      <body className={`${inter.className} ${spaceGrotesk.variable} bg-[#FcFcFc] text-foreground antialiased`}>
        <Providers>  
          {children}
           <Toaster position="top-right"  />
        </Providers>
      </body>
    </html>
  )
}
