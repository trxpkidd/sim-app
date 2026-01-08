import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Discord World Map Simulation',
  description: 'A comprehensive geopolitical map dashboard for Discord simulation games',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-stone-900 text-stone-100">{children}</body>
    </html>
  )
}
