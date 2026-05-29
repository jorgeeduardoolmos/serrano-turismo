'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Award,
  Bus,
  Calendar,
  Mountain,
  Music,
  Quote,
  Shield,
  Star,
  Users,
  Utensils,
} from 'lucide-react'

/* ---- Animated count-up stat ---- */
function StatCounter({
  value,
  suffix = '',
  label,
  icon: Icon,
}: {
  value: number
  suffix?: string
  label: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const dur = 1400
            const t0 = performance.now()
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / dur)
              const eased = 1 - Math.pow(1 - p, 3)
              setN(Math.round(value * eased))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 13,
            background: 'var(--accent-tint)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--accent-strong)',
            flexShrink: 0,
          }}
        >
          <Icon size={22} />
        </div>
        <span className="kicker-num" style={{ fontSize: 44, color: 'var(--ink)', lineHeight: 1 }}>
          {n.toLocaleString('es-AR')}
          {suffix}
        </span>
      </div>
      <span style={{ color: 'var(--ink-soft)', fontSize: 15.5, fontWeight: 500, paddingLeft: 56 }}>
        {label}
      </span>
    </div>
  )
}

/* ---- Destination mega-card ---- */
function DestinoCard({
  imageSrc,
  name,
  region,
  tag,
  blurb,
  season,
  tab,
}: {
  imageSrc: string
  name: string
  region: string
  tag: string
  blurb: string
  season: string
  tab: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/destinos?tab=${tab}`}
      style={{
        position: 'relative',
        display: 'block',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--sh-lg)',
        aspectRatio: '4/5',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'transform .4s cubic-bezier(.2,.7,.3,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={imageSrc}
        alt={name}
        fill
        style={{
          objectFit: 'cover',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform .6s cubic-bezier(.2,.7,.3,1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(21,34,45,.05) 0%, rgba(21,34,45,.15) 45%, rgba(21,34,45,.88) 100%)',
        }}
      />
      <div style={{ position: 'absolute', top: 22, left: 22 }}>
        <span className="chip glass">{tag}</span>
      </div>
      <div
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 30, color: '#fff' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '.18em',
            textTransform: 'uppercase',
            color: 'var(--gold-soft)',
          }}
        >
          {region}
        </div>
        <h3 style={{ color: '#fff', fontSize: 34, marginTop: 6 }}>{name}</h3>
        <p
          style={{
            marginTop: 10,
            color: 'rgba(255,255,255,.85)',
            fontSize: 15.5,
            maxWidth: '30ch',
            lineHeight: 1.5,
          }}
        >
          {blurb}
        </p>
        <div
          style={{
            marginTop: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'rgba(255,255,255,.8)',
              fontWeight: 600,
            }}
          >
            <Calendar size={16} /> {season}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-head)',
              fontWeight: 700,
              fontSize: 15,
              color: '#fff',
            }}
          >
            Ver destino <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ---- Strength card ---- */
function StrengthCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ size?: number }>
  title: string
  text: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="reveal"
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        padding: 30,
        border: '1px solid var(--line-soft)',
        boxShadow: hovered ? 'var(--sh-md)' : 'var(--sh-sm)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'transform .3s, box-shadow .3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(145deg, var(--accent), var(--accent-strong))',
          color: '#fff',
          boxShadow: 'var(--sh-brand)',
        }}
      >
        <Icon size={27} />
      </div>
      <h3 style={{ fontSize: 21, marginTop: 22 }}>{title}</h3>
      <p style={{ marginTop: 10, color: 'var(--ink-soft)', fontSize: 15.5, lineHeight: 1.6 }}>
        {text}
      </p>
    </div>
  )
}

/* ---- useReveal hook ---- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

export default function HomePage() {
  useReveal()

  return (
    <main>
      {/* ===== HERO ===== */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/assets/encabezado.jpg"
          alt="Grupo de egresados festejando"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(21,34,45,.55) 0%, rgba(21,34,45,.18) 35%, rgba(21,34,45,.82) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(120% 90% at 15% 100%, rgba(213,98,10,.34), transparent 55%)',
          }}
        />

        <div
          className="wrap wrap-wide"
          style={{
            position: 'relative',
            paddingBottom: 'clamp(70px, 9vh, 120px)',
            paddingTop: 'calc(var(--nav-h) + 40px)',
          }}
        >
          <span className="chip glass" style={{ fontSize: 13 }}>
            <Star size={14} fill="currentColor" /> 29 años de experiencias inolvidables
          </span>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(46px, 8vw, 104px)',
              marginTop: 22,
              lineHeight: 0.98,
              maxWidth: '15ch',
              textShadow: '0 2px 30px rgba(0,0,0,.25)',
            }}
          >
            El viaje que
            <br />
            nunca van a
            <br />
            <span style={{ color: 'var(--gold-soft)' }}>olvidar.</span>
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,.9)',
              fontSize: 'clamp(17px, 1.6vw, 21px)',
              marginTop: 26,
              maxWidth: '48ch',
              lineHeight: 1.55,
            }}
          >
            Viajes de egresados y educativos a San Pedro y Carlos Paz.
            Pensión completa, seguimiento médico 24 h y coordinadores propios en cada salida.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
            <Link href="/destinos" className="btn btn-primary btn-lg">
              Viajes de egresados <ArrowRight size={19} />
            </Link>
            <Link href="/destinos" className="btn btn-ghost-light btn-lg">
              Viajes educativos
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section style={{ background: 'var(--ink)', color: '#fff' }}>
        <div
          className="wrap wrap-wide trust-grid"
          style={{
            paddingBlock: 30,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {(
            [
              [Shield, 'Atención médica 24 h'],
              [Bus, 'Flota propia y habilitada'],
              [Users, 'Coordinadores en cada grupo'],
              [Utensils, 'Pensión completa incluida'],
            ] as [React.ComponentType<{ size?: number; style?: React.CSSProperties }>, string][]
          ).map(([Icon, t]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <Icon size={24} style={{ color: 'var(--gold-soft)', flexShrink: 0 } as React.CSSProperties} />
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 15 }}>
                {t}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DESTINOS ===== */}
      <section className="section">
        <div className="wrap wrap-wide">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 30,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <span className="eyebrow">Elegí tu destino</span>
              <h2 className="sec-title">
                Dos lugares, una
                <br />
                experiencia inolvidable
              </h2>
            </div>
            <p className="sec-lead" style={{ marginBottom: 6 }}>
              Cada destino con su propio itinerario, hotelería seleccionada y excursiones
              diseñadas para grupos de egresados.
            </p>
          </div>

          <div
            className="dest-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 50 }}
          >
            <DestinoCard
              imageSrc="/assets/landing_sanPedro_imagen.png"
              name="San Pedro de Jujuy"
              region="Norte Argentino"
              tag="Aventura & naturaleza"
              season="Temporada Abr — Nov"
              tab="sanpedro"
              blurb="Cerros, cascadas y excursiones de día completo en el corazón del norte."
            />
            <DestinoCard
              imageSrc="/assets/landingcarlospazimagen.png"
              name="Villa Carlos Paz"
              region="Córdoba"
              tag="Clásico de egresados"
              season="Temporada todo el año"
              tab="carlospaz"
              blurb="Sierras, lago y la mejor movida nocturna pensada para egresados."
            />
          </div>
        </div>
      </section>

      {/* ===== POR QUÉ ELEGIRNOS ===== */}
      <section className="section dots" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap wrap-wide">
          <div
            className="why-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '0.95fr 1.05fr',
              gap: 64,
              alignItems: 'center',
            }}
          >
            <div>
              <span className="eyebrow">Por qué elegirnos</span>
              <h2 className="sec-title">
                Casi tres décadas
                <br />
                cuidando cada viaje
              </h2>
              <p className="sec-lead">
                Somos los mismos que empezaron hace 29 años. Esa continuidad es lo que nos permite
                anticipar cada detalle y darle tranquilidad a las familias.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
                <Link href="/la-empresa" className="btn btn-dark">
                  Conocé la empresa
                </Link>
                <Link href="/contacto" className="btn btn-outline">
                  Hablar con un asesor
                </Link>
              </div>
            </div>

            <div
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 38,
                background: 'var(--surface)',
                borderRadius: 'var(--r-xl)',
                padding: 44,
                boxShadow: 'var(--sh-md)',
                border: '1px solid var(--line-soft)',
              }}
            >
              <StatCounter value={29} label="años de trayectoria" icon={Calendar} />
              <StatCounter value={100000} suffix="+" label="egresados que viajaron" icon={Users} />
              <StatCounter value={2} label="destinos para egresados" icon={Mountain} />
              <StatCounter value={471} label="colegios nos eligieron" icon={Award} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FORTALEZAS ===== */}
      <section className="section">
        <div className="wrap wrap-wide">
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span className="eyebrow centered">Qué ofrecemos</span>
            <h2 className="sec-title" style={{ maxWidth: '20ch', textAlign: 'center' }}>
              Todo resuelto, de la inscripción al regreso
            </h2>
          </div>
          <div
            className="strength-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginTop: 52,
            }}
          >
            <StrengthCard
              icon={Utensils}
              title="Plan de alimentación"
              text="Pensión completa con estaciones de refrigerio en hotel y excursiones. Comida casera, sana y a elección de cada pasajero."
            />
            <StrengthCard
              icon={Shield}
              title="Seguridad & app propia"
              text="App exclusiva de seguimiento en tiempo real con pulseras y atención médica 24 h en hoteles, complejos y salidas."
            />
            <StrengthCard
              icon={Bus}
              title="Logística propia"
              text="Flota habilitada y coordinadores de Serrano en cada grupo, desde la partida hasta el regreso a casa."
            />
            <StrengthCard
              icon={Mountain}
              title="Excursiones curadas"
              text="Actividades de día completo seleccionadas para cada destino, con guías y todos los accesos incluidos."
            />
            <StrengthCard
              icon={Music}
              title="Noches temáticas"
              text="Fiestas y actividades nocturnas en complejos exclusivos, pensadas y supervisadas para grupos de egresados."
            />
            <StrengthCard
              icon={Award}
              title="Acompañamiento total"
              text="Asesoría desde la primera reunión: planes de pago, fichas médicas y documentación, todo desde un solo lugar."
            />
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <section className="section-tight" style={{ background: 'var(--ink)', color: '#fff' }}>
        <div className="wrap wrap-wide">
          <div
            className="testi-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '0.8fr 1.2fr',
              gap: 56,
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: 4, color: 'var(--gold)' }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={26} fill="currentColor" />
                ))}
              </div>
              <div className="kicker-num" style={{ fontSize: 64, color: '#fff', marginTop: 14 }}>
                4,6
              </div>
              <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 16 }}>
                Promedio en Google · 253 opiniones verificables
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
                style={{ marginTop: 24, display: 'inline-flex' }}
              >
                Ver opiniones reales
              </a>
            </div>

            <div
              className="testi-cards"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
            >
              {(
                [
                  [
                    '"Volvieron felices y nosotros tranquilos. La app para seguir al grupo nos cambió la cabeza."',
                    'Familia · Promo 2025',
                  ],
                  [
                    '"Coordinadores impecables y comida riquísima. Se nota la experiencia de tantos años."',
                    'Mamá de egresada · San Pedro',
                  ],
                  [
                    '"El viaje superó las expectativas de todos los chicos. 100% recomendable."',
                    'Preceptora · Carlos Paz',
                  ],
                  [
                    '"Todo organizado al detalle, desde los pagos hasta las excursiones."',
                    'Papá · Promo 2024',
                  ],
                ] as [string, string][]
              ).map(([q, a], i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,.06)',
                    borderRadius: 'var(--r-md)',
                    padding: 24,
                    border: '1px solid rgba(255,255,255,.1)',
                  }}
                >
                  <Quote size={26} style={{ color: 'var(--gold-soft)' }} />
                  <p
                    style={{
                      marginTop: 12,
                      fontSize: 15.5,
                      lineHeight: 1.55,
                      color: 'rgba(255,255,255,.92)',
                    }}
                  >
                    {q}
                  </p>
                  <p
                    style={{
                      marginTop: 14,
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: 'var(--gold-soft)',
                      fontFamily: 'var(--font-head)',
                      letterSpacing: '.02em',
                    }}
                  >
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="section">
        <div className="wrap wrap-wide">
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
              background:
                'linear-gradient(120deg, var(--brand-strong), var(--brand) 60%, var(--gold) 130%)',
              padding: 'clamp(44px, 6vw, 80px)',
              color: '#fff',
              boxShadow: 'var(--sh-lg)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.14,
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,.6) 1.4px, transparent 1.4px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 40,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h2
                  style={{
                    color: '#fff',
                    fontSize: 'clamp(30px, 4vw, 46px)',
                    maxWidth: '16ch',
                  }}
                >
                  Armemos el viaje de egresados de tu promo
                </h2>
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 18,
                    color: 'rgba(255,255,255,.92)',
                    maxWidth: '44ch',
                  }}
                >
                  Cotizá sin compromiso y descubrí planes de pago a tu medida.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link
                  href="/tarifas"
                  className="btn btn-lg"
                  style={{ background: '#fff', color: 'var(--brand-strong)' }}
                >
                  Ver tarifas y planes <ArrowRight size={19} />
                </Link>
                <a
                  href="https://wa.me/5491156096283"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-lg"
                  style={{
                    background: 'rgba(255,255,255,.14)',
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,.5)',
                  }}
                >
                  Escribinos por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
