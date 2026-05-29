'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import {
  ArrowRight,
  Bus,
  Calendar,
  Music,
  Shield,
  Star,
  Utensils,
  Wifi,
} from 'lucide-react'

type Tab = 'sanpedro' | 'carlospaz'

const DEST_DATA: Record<Tab, {
  name: string
  region: string
  days: string
  heroImg: string
}> = {
  sanpedro: {
    name: 'San Pedro de Jujuy',
    region: 'Norte Argentino',
    days: '8 días · 7 noches',
    heroImg: '/assets/landing_sanPedro_imagen.png',
  },
  carlospaz: {
    name: 'Villa Carlos Paz',
    region: 'Córdoba',
    days: '7 días · 6 noches',
    heroImg: '/assets/landingcarlospazimagen.png',
  },
}

const HOTELS: Record<Tab, { name: string; loc: string; amenities: string; img: string }[]> = {
  sanpedro: [
    { name: 'Hotel Serrano Norte', loc: 'Centro de San Pedro', amenities: 'WiFi · Pileta · Comedor propio', img: '/assets/hotel turismo.jpg' },
    { name: 'Complejo del Cerro', loc: 'Vista a los cerros', amenities: 'Salón de eventos · Quincho · Seguridad', img: '/assets/hotel parque.jpeg' },
    { name: 'Hostería del Valle', loc: 'Entorno natural', amenities: 'Áreas verdes · Fogón · Refrigerios', img: '/assets/fogon.jpg' },
  ],
  carlospaz: [
    { name: 'Hotel Serrano Central', loc: 'A pasos del centro', amenities: 'WiFi · Pileta · Comedor propio', img: '/assets/hotel turismo.jpg' },
    { name: 'Complejo Las Sierras', loc: 'Vista al lago', amenities: 'Salón de eventos · Quincho · Seguridad', img: '/assets/hotel parque.jpeg' },
    { name: 'Hostería del Valle', loc: 'Entorno natural', amenities: 'Áreas verdes · Fogón · Refrigerios', img: '/assets/fogon.jpg' },
  ],
}

const EXCURSIONS: Record<Tab, { title: string; sub: string; img: string }[]> = {
  sanpedro: [
    { title: 'Cerros & cascadas', sub: 'Trekking guiado de día completo', img: '/assets/capilla.jpeg' },
    { title: 'Aventura extrema', sub: 'Tirolesa, rafting y más', img: '/assets/aqua.png' },
    { title: 'Circuito cultural', sub: 'Pueblos y miradores', img: '/assets/imagen1.jpg' },
    { title: 'Día de complejo', sub: 'Pileta, deportes y juegos', img: '/assets/crazy.png' },
    { title: 'Excursión lacustre', sub: 'Náutica y más', img: '/assets/imagen2.jpg' },
  ],
  carlospaz: [
    { title: 'Sierras & lago', sub: 'Excursión de día completo', img: '/assets/imagen2.jpg' },
    { title: 'Aventura extrema', sub: 'Tirolesa y deportes extremos', img: '/assets/aqua.png' },
    { title: 'Aerosilla al cerro', sub: 'Vista panorámica al valle', img: '/assets/imagen1.jpg' },
    { title: 'Día de complejo', sub: 'Pileta, deportes y juegos', img: '/assets/crazy.png' },
    { title: 'City tour nocturno', sub: 'La movida de Carlos Paz', img: '/assets/la rueda.jpeg' },
  ],
}

const NOCHES: Record<Tab, { title: string; text: string; img: string }[]> = {
  sanpedro: [
    { title: 'Fiesta de bienvenida', text: 'La primera noche que rompe el hielo de toda la promo.', img: '/assets/pekos.png' },
    { title: 'Noche temática', text: 'Disfraces, shows y la mejor música en complejo privado.', img: '/assets/crazy.png' },
    { title: 'Gran cierre', text: 'La fiesta final que corona el viaje, para recordar siempre.', img: '/assets/la rueda.jpeg' },
  ],
  carlospaz: [
    { title: 'Fiesta de bienvenida', text: 'La primera noche que rompe el hielo de toda la promo.', img: '/assets/pekos.png' },
    { title: 'Noche temática', text: 'Disfraces, shows y la mejor música en complejo exclusivo.', img: '/assets/crazy.png' },
    { title: 'Gran cierre en Carlos Paz', text: 'La fiesta final en el mejor boliche de la ciudad.', img: '/assets/la rueda.jpeg' },
  ],
}

function DestinosContent() {
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get('tab') as Tab) || 'sanpedro'
  const [tab, setTab] = useState<Tab>(initialTab)
  const D = DEST_DATA[tab]
  const hotels = HOTELS[tab]
  const excursions = EXCURSIONS[tab]
  const noches = NOCHES[tab]

  return (
    <main>
      {/* ===== HERO ===== */}
      <section
        style={{
          position: 'relative',
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <Image
          src={D.heroImg}
          alt={D.name}
          fill
          priority
          style={{ objectFit: 'cover', transition: 'opacity .5s' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(21,34,45,.55) 0%, rgba(21,34,45,.12) 40%, rgba(21,34,45,.85) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(120% 80% at 10% 100%, rgba(213,98,10,.34), transparent 55%)',
          }}
        />

        <div
          className="wrap wrap-wide"
          style={{
            position: 'relative',
            paddingBottom: 'clamp(50px, 7vh, 90px)',
            paddingTop: 'calc(var(--nav-h) + 30px)',
          }}
        >
          {/* Tab switch */}
          <div
            style={{
              display: 'inline-flex',
              gap: 6,
              padding: 6,
              borderRadius: 'var(--r-pill)',
              background: 'rgba(255,255,255,.12)',
              backdropFilter: 'blur(8px)',
              marginBottom: 26,
            }}
          >
            {(
              [
                ['sanpedro', 'San Pedro'],
                ['carlospaz', 'Carlos Paz'],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  padding: '9px 22px',
                  borderRadius: 'var(--r-pill)',
                  border: 'none',
                  fontFamily: 'var(--font-head)',
                  fontWeight: 700,
                  fontSize: 14.5,
                  cursor: 'pointer',
                  background: tab === id ? '#fff' : 'transparent',
                  color: tab === id ? 'var(--ink)' : 'rgba(255,255,255,.85)',
                  transition: 'all .2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            style={{
              color: 'var(--gold-soft)',
              fontFamily: 'var(--font-head)',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
            }}
          >
            {D.region}
          </div>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(44px, 7vw, 88px)',
              marginTop: 12,
              lineHeight: 0.98,
            }}
          >
            {D.name}
          </h1>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <span className="chip glass">
              <Calendar size={14} /> {D.days}
            </span>
            <span className="chip glass">
              <Utensils size={14} /> Pensión completa
            </span>
            <span className="chip glass">
              <Shield size={14} /> Médico 24 h
            </span>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="/tarifas" className="btn btn-primary btn-lg">
              Ver tarifas <ArrowRight size={19} />
            </Link>
            <Link href="/contacto" className="btn btn-ghost-light btn-lg">
              Consultar disponibilidad
            </Link>
          </div>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="section-tight">
        <div className="wrap wrap-wide">
          <div
            className="intro-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 1fr',
              gap: 56,
              alignItems: 'center',
            }}
          >
            <div>
              <span className="eyebrow">El destino</span>
              <h2 className="sec-title">Naturaleza, aventura y noches inolvidables</h2>
              <p className="sec-lead">
                Un programa completo pensado para grupos de egresados: hotelería seleccionada,
                excursiones de día completo con todos los accesos incluidos y noches temáticas en
                complejos exclusivos, siempre con coordinadores de Serrano y atención médica 24 h.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {(
                [
                  [Bus, 'Traslados', 'Ida y vuelta + excursiones'],
                  [Utensils, 'Comidas', 'Desayuno, almuerzo, merienda y cena'],
                  [Music, 'Noches', 'Boliches y fiestas exclusivas'],
                  [Wifi, 'Conectividad', 'App + WiFi en el hotel'],
                ] as [React.ComponentType<{ size?: number; style?: React.CSSProperties }>, string, string][]
              ).map(([Icon, t, s]) => (
                <div
                  key={t}
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--r-md)',
                    padding: 22,
                    border: '1px solid var(--line-soft)',
                    boxShadow: 'var(--sh-sm)',
                  }}
                >
                  <Icon size={24} style={{ color: 'var(--accent-strong)' } as React.CSSProperties} />
                  <div
                    style={{
                      marginTop: 14,
                      fontFamily: 'var(--font-head)',
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {t}
                  </div>
                  <div
                    style={{ marginTop: 4, fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.4 }}
                  >
                    {s}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOTELES ===== */}
      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap wrap-wide">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <span className="eyebrow">Dónde se hospedan</span>
              <h2 className="sec-title">Hotelería seleccionada</h2>
            </div>
            <span className="chip gold">Todas con pensión completa</span>
          </div>
          <div
            className="hotel-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginTop: 46,
            }}
          >
            {hotels.map((h, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                  <Image src={h.img} alt={h.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 3, color: 'var(--gold)' }}>
                    {[0, 1, 2, 3].map((s) => (
                      <Star key={s} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <h3 style={{ fontSize: 20, marginTop: 12 }}>{h.name}</h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      marginTop: 8,
                      color: 'var(--ink-soft)',
                      fontSize: 14,
                    }}
                  >
                    📍 {h.loc}
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: '1px solid var(--line-soft)',
                      fontSize: 13.5,
                      color: 'var(--muted)',
                    }}
                  >
                    {h.amenities}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXCURSIONES ===== */}
      <section className="section">
        <div className="wrap wrap-wide">
          <span className="eyebrow">De día</span>
          <h2 className="sec-title">Excursiones de día completo</h2>
          <div
            className="exc-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.6fr 1fr 1fr',
              gridTemplateRows: '240px 240px',
              gap: 20,
              marginTop: 46,
            }}
          >
            {excursions.map((exc, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--sh-sm)',
                  ...(i === 0 ? { gridRow: 'span 2' } : {}),
                }}
              >
                <Image
                  src={exc.img}
                  alt={exc.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform .6s cubic-bezier(.2,.7,.3,1)' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 40%, rgba(21,34,45,.85) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: 22,
                    color: '#fff',
                  }}
                >
                  <h3 style={{ color: '#fff', fontSize: i === 0 ? 26 : 19 }}>{exc.title}</h3>
                  <p style={{ marginTop: 6, fontSize: 14, color: 'rgba(255,255,255,.82)' }}>
                    {exc.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NOCHES ===== */}
      <section
        className="section"
        style={{ background: 'var(--ink)', color: '#fff', position: 'relative', overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(90% 120% at 90% 10%, rgba(213,98,10,.32), transparent 55%)',
          }}
        />
        <div className="wrap wrap-wide" style={{ position: 'relative' }}>
          <span className="eyebrow on-dark">De noche</span>
          <h2 className="sec-title" style={{ color: '#fff' }}>
            Las noches que no se olvidan
          </h2>
          <p className="sec-lead" style={{ color: 'rgba(255,255,255,.78)' }}>
            Fiestas temáticas y boliches exclusivos para egresados, siempre con coordinadores y
            seguridad propia.
          </p>
          <div
            className="noche-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              marginTop: 46,
            }}
          >
            {noches.map((n, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                }}
              >
                <Image src={n.img} alt={n.title} fill style={{ objectFit: 'cover' }} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(21,34,45,.1) 30%, rgba(21,34,45,.9) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: 26,
                    color: '#fff',
                  }}
                >
                  <Music size={24} style={{ color: 'var(--gold-soft)' }} />
                  <h3 style={{ color: '#fff', fontSize: 22, marginTop: 12 }}>{n.title}</h3>
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: 14.5,
                      color: 'rgba(255,255,255,.82)',
                      lineHeight: 1.5,
                    }}
                  >
                    {n.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div
          className="wrap wrap-wide"
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <span className="eyebrow centered">¿Listos para viajar?</span>
          <h2 className="sec-title" style={{ maxWidth: '22ch', textAlign: 'center' }}>
            Pedí la cotización para {D.name} y armá el viaje de tu promo
          </h2>
          <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/tarifas" className="btn btn-primary btn-lg">
              Ver tarifas y planes <ArrowRight size={19} />
            </Link>
            <Link href="/contacto" className="btn btn-outline btn-lg">
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function DestinosPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }} />}>
      <DestinosContent />
    </Suspense>
  )
}
