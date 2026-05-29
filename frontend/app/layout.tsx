import type { Metadata } from 'next'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-head',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Serrano Turismo — Viajes de Egresados',
  description:
    'Viajes de egresados y educativos con 29 años de trayectoria. Pensión completa, médico 24 h y coordinadores propios. San Pedro de Jujuy y Villa Carlos Paz.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${sourceSans.variable}`}>
      <body className="app-root">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
