import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: ' Cinematic Fashion Page',
  description: 'Created by Kenzy',
  generator: 'Kentech',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
