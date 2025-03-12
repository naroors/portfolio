import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'

export const metadata: Metadata = {
  title: 'Oliwer Noga | Portfolio',
  description: 'Portfolio Oliwera Nogi - fullstack web developer',
  icons: {
    icon: '/profile.png',
    apple: '/profile.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
