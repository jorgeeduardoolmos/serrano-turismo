import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Serrano Turismo',
  description: 'Tu viaje de egresados con 29 años de trayectoria. Más de 100.000 egresados de Buenos Aires ya confiaron en nosotros.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="content-wrapper">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
