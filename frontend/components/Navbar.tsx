'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, MapPin, Menu, Phone, X } from 'lucide-react'

const LOGO_URL = 'https://serranoturismo.com.ar/assets/images/logoserrano-facebook.png'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/la-empresa', label: 'La Empresa' },
  { href: '/destinos', label: 'Destinos', dropdown: true },
  { href: '/tarifas', label: 'Tarifas' },
  { href: '/recursos', label: 'Recursos' },
  { href: '/contacto', label: 'Contacto' },
]

// Pages with full-bleed hero — navbar starts transparent
const HERO_PAGES = ['/', '/destinos']

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)

  const isHeroPage = HERO_PAGES.includes(pathname)
  const solid = scrolled || !isHeroPage

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          height: 'var(--nav-h)',
          background: solid ? 'rgba(251,248,243,.92)' : 'transparent',
          backdropFilter: solid ? 'saturate(180%) blur(16px)' : 'none',
          borderBottom: solid ? '1px solid var(--line)' : '1px solid transparent',
          boxShadow: solid ? '0 4px 24px rgba(21,34,45,.05)' : 'none',
          transition: 'background .35s, box-shadow .35s, border-color .35s, backdrop-filter .35s',
        }}
      >
        <div
          className="wrap wrap-wide"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img
              src={LOGO_URL}
              alt="Serrano Turismo"
              style={{ height: 44, width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="nav-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <div
                  key={link.href}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => link.dropdown && setDestOpen(true)}
                  onMouseLeave={() => link.dropdown && setDestOpen(false)}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontFamily: 'var(--font-head)',
                      fontWeight: 600,
                      fontSize: 14.5,
                      letterSpacing: '.01em',
                      color: solid ? 'var(--ink-2)' : 'rgba(255,255,255,.92)',
                      padding: '10px 14px',
                      borderRadius: 8,
                      position: 'relative',
                      transition: 'color .2s',
                    }}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={14} />}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 14,
                          right: 14,
                          bottom: 2,
                          height: 2.5,
                          borderRadius: 2,
                          background: 'var(--accent)',
                        }}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && destOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        background: 'var(--surface)',
                        borderRadius: 'var(--r-md)',
                        boxShadow: 'var(--sh-lg)',
                        border: '1px solid var(--line)',
                        padding: 8,
                        minWidth: 230,
                      }}
                    >
                      {[
                        { label: 'San Pedro de Jujuy', q: 'sanpedro' },
                        { label: 'Villa Carlos Paz', q: 'carlospaz' },
                      ].map((d) => (
                        <Link
                          key={d.q}
                          href={`/destinos?tab=${d.q}`}
                          onClick={() => setDestOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '11px 14px',
                            borderRadius: 10,
                            color: 'var(--ink)',
                            fontWeight: 600,
                            fontSize: 14.5,
                            transition: 'background .15s',
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.background = 'var(--paper)')
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.background = 'transparent')
                          }
                        >
                          <MapPin size={16} style={{ color: 'var(--accent-strong)', flexShrink: 0 }} />
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <Link href="/tarifas" className="btn btn-primary btn-sm nav-cta-btn">
              Cotizá tu viaje
            </Link>
            <button
              className="nav-burger"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: solid ? 'var(--ink)' : '#fff',
                padding: 6,
              }}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE OVERLAY ===== */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'var(--ink)',
          color: '#fff',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .42s cubic-bezier(.2,.7,.3,1)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(20px, 5vw, 32px)',
          overflowY: 'auto',
        }}
      >
        {/* Mobile header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={LOGO_URL} alt="Serrano Turismo" style={{ height: 40 }} />
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            style={{
              background: 'rgba(255,255,255,.1)',
              border: 'none',
              color: '#fff',
              width: 46,
              height: 46,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile links */}
        <nav style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#fff',
                fontFamily: 'var(--font-head)',
                fontWeight: 700,
                fontSize: 'clamp(22px, 6vw, 30px)',
                letterSpacing: '-0.02em',
                padding: '16px 0',
                borderBottom: '1px solid rgba(255,255,255,.1)',
                textDecoration: 'none',
              }}
            >
              {link.label}
              <ArrowRight size={22} style={{ color: 'var(--gold-soft)', flexShrink: 0 }} />
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href="/tarifas" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
            Cotizá tu viaje <ArrowRight size={19} />
          </Link>
          <div
            style={{
              color: 'rgba(255,255,255,.6)',
              fontSize: 14,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <Phone size={16} />
            (011) 4847-6467 · Rotativas
          </div>
        </div>
      </div>
    </>
  )
}
