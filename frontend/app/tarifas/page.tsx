'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Calendar, Check, MapPin, Shield } from 'lucide-react'

type Dest = 'sanpedro' | 'carlospaz'
type PlanId = 'contado' | '3' | '6' | '12'

const TARIFA_DATA: Record<
  Dest,
  {
    name: string
    region: string
    nights: number
    days: number
    base: number
    includes: string[]
    itinerary: [string, string, string][]
  }
> = {
  sanpedro: {
    name: 'San Pedro de Jujuy',
    region: 'Norte Argentino',
    nights: 7,
    days: 8,
    base: 685000,
    includes: [
      'Pensión completa',
      'Excursiones de día completo',
      'Coordinadores propios',
      'App de seguimiento + pulsera',
      'Atención médica 24 h',
    ],
    itinerary: [
      ['Día 1 — 2', 'Llegada & bienvenida', 'Recepción en hotel, asignación de habitaciones y primera noche temática de apertura.'],
      ['Día 3 — 4', 'Cerros & cascadas', 'Excursiones de día completo por los paisajes del norte con guías y refrigerios.'],
      ['Día 5 — 6', 'Aventura & complejos', 'Actividades recreativas, deportes y noches en complejos exclusivos.'],
      ['Día 7 — 8', 'Cierre & regreso', 'Última jornada libre, fiesta de cierre y regreso coordinado a casa.'],
    ],
  },
  carlospaz: {
    name: 'Villa Carlos Paz',
    region: 'Córdoba',
    nights: 6,
    days: 7,
    base: 598000,
    includes: [
      'Pensión completa',
      'Acceso a complejos & lago',
      'Coordinadores propios',
      'App de seguimiento + pulsera',
      'Atención médica 24 h',
    ],
    itinerary: [
      ['Día 1 — 2', 'Llegada & bienvenida', 'Check-in en hotel céntrico y primera noche en boliche exclusivo para egresados.'],
      ['Día 3 — 4', 'Sierras & lago', 'Excursiones por las sierras, actividades náuticas y aerosilla al Cerro de la Cruz.'],
      ['Día 5', 'Día de complejo', 'Jornada completa de pileta, deportes y juegos en complejo privado.'],
      ['Día 6 — 7', 'Gran cierre', 'Fiesta final temática y regreso coordinado con todo el grupo.'],
    ],
  },
}

const PLANES: { id: PlanId; label: string; note: string; mult: number; badge?: string; popular?: boolean }[] = [
  { id: 'contado', label: 'Contado', note: 'Pago único', mult: 0.88, badge: '12% OFF' },
  { id: '3', label: '3 cuotas', note: 'Sin interés', mult: 1.0 },
  { id: '6', label: '6 cuotas', note: 'Plan clásico', mult: 1.06, popular: true },
  { id: '12', label: '12 cuotas', note: 'Cuota baja', mult: 1.14 },
]

function money(n: number) {
  return '$' + Math.round(n).toLocaleString('es-AR')
}

/* ---- Animated price ---- */
function AnimatedPrice({ amount }: { amount: number }) {
  const [shown, setShown] = useState(amount)
  const prev = useRef(amount)

  useEffect(() => {
    const from = prev.current
    const to = amount
    const dur = 600
    const t0 = performance.now()
    let raf: number
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(from + (to - from) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else prev.current = to
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [amount])

  return <span>{money(shown)}</span>
}

export default function TarifasPage() {
  const [dest, setDest] = useState<Dest>('sanpedro')
  const [plan, setPlan] = useState<PlanId>('6')

  const data = TARIFA_DATA[dest]
  const planObj = PLANES.find((p) => p.id === plan)!
  const total = data.base * planObj.mult
  const cuotas = plan === 'contado' ? 1 : parseInt(plan, 10)
  const perCuota = total / cuotas

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* ===== HEADER ===== */}
      <section
        style={{
          background: 'var(--ink)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(100% 120% at 85% 0%, rgba(213,98,10,.4), transparent 55%)',
          }}
        />
        <div
          className="wrap wrap-wide"
          style={{ position: 'relative', paddingBlock: 'clamp(50px,7vw,90px)' }}
        >
          <span className="eyebrow on-dark">Tarifas & planes de pago</span>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(38px,5.5vw,68px)',
              marginTop: 16,
              maxWidth: '16ch',
            }}
          >
            Elegí destino, elegí cómo pagarlo
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,.82)',
              fontSize: 19,
              marginTop: 18,
              maxWidth: '52ch',
            }}
          >
            Precios por pasajero, todo incluido. Sin sorpresas: lo que ves es lo que pagás.
          </p>
        </div>
      </section>

      {/* ===== DESTINATION SWITCH ===== */}
      <section
        style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--line)' }}
      >
        <div
          className="wrap wrap-wide"
          style={{
            paddingBlock: 26,
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-head)',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '.04em',
              color: 'var(--ink-soft)',
              textTransform: 'uppercase',
            }}
          >
            Destino
          </span>
          {(Object.entries(TARIFA_DATA) as [Dest, typeof TARIFA_DATA[Dest]][]).map(([id, d]) => {
            const active = dest === id
            return (
              <button
                key={id}
                onClick={() => setDest(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 22px',
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'var(--font-head)',
                  fontWeight: 700,
                  fontSize: 15.5,
                  border: active ? '1.5px solid var(--accent)' : '1.5px solid var(--line)',
                  background: active ? 'var(--surface)' : 'transparent',
                  color: active ? 'var(--ink)' : 'var(--ink-soft)',
                  boxShadow: active ? 'var(--sh-sm)' : 'none',
                  transition: 'all .2s',
                  cursor: 'pointer',
                }}
              >
                <MapPin size={18} style={{ color: active ? 'var(--accent-strong)' : 'var(--muted)' }} />
                {d.name}
              </button>
            )
          })}
        </div>
      </section>

      {/* ===== PRICE BUILDER ===== */}
      <section className="section">
        <div className="wrap wrap-wide">
          <div
            className="price-layout"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 48 }}
          >
            {/* LEFT — plan picker */}
            <div>
              <span className="eyebrow">Plan de pago</span>
              <h2 className="sec-title" style={{ fontSize: 'clamp(26px,3vw,38px)' }}>
                ¿Cómo querés pagarlo?
              </h2>
              <p className="sec-lead" style={{ marginTop: 14 }}>
                Elegí el plan que mejor se acomode a tu familia. El total se actualiza al instante.
              </p>

              <div
                className="plan-grid"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 30 }}
              >
                {PLANES.map((p) => {
                  const active = plan === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      style={{
                        position: 'relative',
                        textAlign: 'left',
                        padding: '20px 22px',
                        borderRadius: 'var(--r-md)',
                        cursor: 'pointer',
                        border: active ? '2px solid var(--accent)' : '2px solid var(--line)',
                        background: active ? 'var(--accent-tint)' : 'var(--surface)',
                        transition: 'all .22s cubic-bezier(.2,.7,.3,1)',
                        transform: active ? 'translateY(-2px)' : 'none',
                        boxShadow: active ? 'var(--sh-md)' : 'var(--sh-sm)',
                      }}
                    >
                      {p.popular && (
                        <span
                          style={{
                            position: 'absolute',
                            top: -11,
                            right: 16,
                            background: 'var(--gold)',
                            color: '#fff',
                            fontFamily: 'var(--font-head)',
                            fontWeight: 700,
                            fontSize: 11,
                            letterSpacing: '.06em',
                            padding: '4px 11px',
                            borderRadius: 'var(--r-pill)',
                          }}
                        >
                          POPULAR
                        </span>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-head)',
                            fontWeight: 800,
                            fontSize: 19,
                            color: 'var(--ink)',
                          }}
                        >
                          {p.label}
                        </span>
                        <span
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            flexShrink: 0,
                            border: active ? '6px solid var(--accent)' : '2px solid var(--line)',
                            background: active ? 'var(--surface)' : 'transparent',
                            transition: 'all .2s',
                          }}
                        />
                      </div>
                      <div style={{ marginTop: 6, fontSize: 14, color: 'var(--ink-soft)' }}>
                        {p.note}
                      </div>
                      {p.badge && (
                        <span className="chip gold" style={{ marginTop: 12 }}>
                          {p.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div
                style={{
                  marginTop: 26,
                  padding: '18px 22px',
                  borderRadius: 'var(--r-md)',
                  background: 'var(--paper-2)',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                <Shield size={22} style={{ color: 'var(--accent-strong)', flexShrink: 0 }} />
                <span style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}>
                  Reserva con seña y congelá el precio. Cuotas fijas en pesos, sin ajustes sorpresa.
                </span>
              </div>
            </div>

            {/* RIGHT — price hero card */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', alignSelf: 'start' }} className="price-sticky">
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--r-xl)',
                  overflow: 'hidden',
                  background: 'var(--ink)',
                  color: '#fff',
                  boxShadow: 'var(--sh-lg)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(110% 90% at 110% -10%, rgba(213,98,10,.55), transparent 60%)',
                  }}
                />
                <div style={{ position: 'relative', padding: 'clamp(28px,3vw,42px)' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: 'var(--gold-soft)',
                          fontFamily: 'var(--font-head)',
                          fontWeight: 600,
                          fontSize: 13,
                          letterSpacing: '.16em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {data.region}
                      </div>
                      <h3 style={{ color: '#fff', fontSize: 30, marginTop: 6 }}>{data.name}</h3>
                    </div>
                    <span className="chip glass" style={{ background: 'rgba(255,255,255,.14)' }}>
                      <Calendar size={14} /> {data.days} días · {data.nights} noches
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: 30,
                      paddingTop: 26,
                      borderTop: '1px solid rgba(255,255,255,.14)',
                    }}
                  >
                    <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,.7)' }}>
                      {plan === 'contado' ? 'Precio final por pasajero' : `${cuotas} cuotas de`}
                    </div>
                    <div
                      className="kicker-num"
                      style={{ fontSize: 'clamp(46px,6vw,68px)', color: '#fff', lineHeight: 1, marginTop: 6 }}
                    >
                      <AnimatedPrice amount={plan === 'contado' ? total : perCuota} />
                    </div>
                    {plan !== 'contado' && (
                      <div style={{ marginTop: 8, fontSize: 15, color: 'rgba(255,255,255,.6)' }}>
                        Total <AnimatedPrice amount={total} /> · por pasajero
                      </div>
                    )}
                    {plan === 'contado' && (
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 15,
                          color: 'var(--gold-soft)',
                          fontWeight: 600,
                        }}
                      >
                        Ahorrás {money(data.base - total)} pagando al contado
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: 26, display: 'grid', gap: 11 }}>
                    {data.includes.map((inc) => (
                      <div
                        key={inc}
                        style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 15 }}
                      >
                        <span
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            flexShrink: 0,
                            background: 'rgba(196,154,61,.22)',
                            display: 'grid',
                            placeItems: 'center',
                            color: 'var(--gold-soft)',
                          }}
                        >
                          <Check size={14} />
                        </span>
                        {inc}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contacto"
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginTop: 30 }}
                  >
                    Reservar este plan <ArrowRight size={19} />
                  </Link>
                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: 14,
                      fontSize: 13,
                      color: 'rgba(255,255,255,.55)',
                    }}
                  >
                    Precios de referencia · sujetos a confirmación de cupo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ITINERARIO ===== */}
      <section className="section dots" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap wrap-wide">
          <span className="eyebrow">Itinerario · {data.name}</span>
          <h2 className="sec-title">Cómo se vive el viaje, día a día</h2>
          <div
            className="itin-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 46 }}
          >
            {data.itinerary.map(([days, title, text], i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--line-soft)',
                  boxShadow: 'var(--sh-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    height: 110,
                    position: 'relative',
                    background: 'linear-gradient(135deg, var(--accent), var(--brand-strong))',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 18,
                      fontFamily: 'var(--font-head)',
                      fontWeight: 800,
                      fontSize: 56,
                      color: 'rgba(255,255,255,.28)',
                      lineHeight: 1,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 14,
                      left: 18,
                      color: '#fff',
                      fontFamily: 'var(--font-head)',
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: '.04em',
                    }}
                  >
                    {days}
                  </span>
                </div>
                <div style={{ padding: '22px 22px 26px' }}>
                  <h3 style={{ fontSize: 19 }}>{title}</h3>
                  <p
                    style={{
                      marginTop: 10,
                      fontSize: 14.5,
                      color: 'var(--ink-soft)',
                      lineHeight: 1.55,
                    }}
                  >
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 40,
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link href="/destinos" className="btn btn-dark btn-lg">
              Ver todo el destino <ArrowRight size={19} />
            </Link>
            <Link href="/contacto" className="btn btn-outline btn-lg">
              Descargar itinerario completo
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
