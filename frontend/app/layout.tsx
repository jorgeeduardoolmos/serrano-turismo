import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Serrano Turismo — Viajes de Egresados',
  description:
    'Viajes de egresados y educativos con 29 años de trayectoria. Pensión completa, médico 24 h y coordinadores propios. San Pedro de Jujuy y Villa Carlos Paz.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Montserrat (headings) + Source Sans 3 (body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="app-root">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
