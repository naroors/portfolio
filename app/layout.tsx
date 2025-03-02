import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oliwer Noga | Portfolio',
  description: 'Portfolio Oliwera Nogi - fullstack web developer',
  generator: 'Next.js',
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
      <body>{children}</body>
    </html>
  )
}
