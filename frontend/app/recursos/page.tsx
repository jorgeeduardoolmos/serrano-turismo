'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ChevronDown, FileText, Mail, Shield } from 'lucide-react'

const FAQS = [
  {
    q: '¿Cómo completo mi solicitud de adhesión?',
    a: 'Ingresás al portal de clientes con los datos del pasajero y completás el formulario en pocos minutos. Te llega una confirmación por mail.',
  },
  {
    q: '¿Cómo registro mis pagos?',
    a: 'Desde la sección Informe de pago cargás el comprobante y queda registrado automáticamente en tu cuenta.',
  },
  {
    q: '¿Cómo cargo la ficha médica de mi hijo?',
    a: 'En la sección Ficha médica completás los datos de salud y cobertura. Es obligatoria antes del viaje.',
  },
  {
    q: '¿Qué incluye la pensión completa?',
    a: 'Desayuno, almuerzo, merienda y cena, más estaciones de refrigerio en hotel y excursiones.',
  },
  {
    q: '¿Con cuánta anticipación hay que reservar?',
    a: 'Recomendamos reservar con al menos 6 meses de anticipación para asegurar cupo y congelar el precio.',
  },
]

const RECURSOS_CARDS = [
  {
    icon: Mail,
    title: 'Informe de pago',
    sub: 'Registrá y consultá tus pagos',
    href: '#',
  },
  {
    icon: Shield,
    title: 'Ficha médica',
    sub: 'Cargá los datos de salud del pasajero',
    href: '#',
  },
  {
    icon: FileText,
    title: 'Solicitud de adhesión',
    sub: 'Sumate a un viaje en minutos',
    href: '#',
  },
]

export default function RecursosPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
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
              'radial-gradient(90% 120% at 85% 0%, rgba(213,98,10,.36), transparent 55%)',
          }}
        />
        <div
          className="wrap wrap-wide"
          style={{ position: 'relative', paddingBlock: 'clamp(50px,7vw,90px)' }}
        >
          <span className="eyebrow on-dark">Clientes / Pasajeros</span>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(38px,5.5vw,68px)',
              marginTop: 16,
              maxWidth: '16ch',
            }}
          >
            Recursos para nuestros clientes
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,.82)',
              fontSize: 19,
              marginTop: 18,
              maxWidth: '54ch',
            }}
          >
            Todo lo que necesitás antes, durante y después del viaje, en un solo lugar.
          </p>
        </div>
      </section>

      {/* Cards + FAQ */}
      <section className="section">
        <div className="wrap wrap-wide">
          {/* Action cards */}
          <div
            className="recursos-cards"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}
          >
            {RECURSOS_CARDS.map(({ icon: Icon, title, sub, href }) => (
              <a
                key={title}
                href={href}
                className="card"
                style={{
                  padding: 30,
                  display: 'block',
                  transition: 'transform .3s',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)')
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = 'none')
                }
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 15,
                    background: 'var(--accent-tint)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--accent-strong)',
                  }}
                >
                  <Icon size={26} />
                </div>
                <h3 style={{ fontSize: 20, marginTop: 20 }}>{title}</h3>
                <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: 15 }}>{sub}</p>
                <div
                  style={{
                    marginTop: 18,
                    color: 'var(--accent-strong)',
                    fontFamily: 'var(--font-head)',
                    fontWeight: 700,
                    fontSize: 14.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  Acceder <ArrowRight size={17} />
                </div>
              </a>
            ))}
          </div>

          {/* FAQ accordion */}
          <div style={{ marginTop: 72, maxWidth: 820, marginInline: 'auto' }}>
            <h2 className="sec-title" style={{ textAlign: 'center', marginInline: 'auto' }}>
              Preguntas frecuentes
            </h2>
            <div style={{ marginTop: 36, display: 'grid', gap: 12 }}>
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="card" style={{ boxShadow: 'var(--sh-sm)' }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '22px 26px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-head)',
                        fontWeight: 700,
                        fontSize: 17,
                        color: 'var(--ink)',
                      }}
                    >
                      {q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        color: 'var(--accent-strong)',
                        transform: open === i ? 'rotate(180deg)' : 'none',
                        transition: 'transform .3s',
                      }}
                    >
                      <ChevronDown size={22} />
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: open === i ? 200 : 0,
                      overflow: 'hidden',
                      transition: 'max-height .35s ease',
                    }}
                  >
                    <p
                      style={{
                        padding: '0 26px 24px',
                        color: 'var(--ink-soft)',
                        fontSize: 15.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap wrap-wide">
          <div
            style={{
              borderRadius: 'var(--r-xl)',
              background:
                'linear-gradient(120deg, var(--brand-strong), var(--brand) 60%, var(--gold) 130%)',
              padding: 'clamp(40px,5vw,64px)',
              color: '#fff',
              textAlign: 'center',
              boxShadow: 'var(--sh-lg)',
            }}
          >
            <h2
              style={{
                color: '#fff',
                fontSize: 'clamp(28px,3.6vw,42px)',
                maxWidth: '20ch',
                marginInline: 'auto',
              }}
            >
              ¿Querés empezar a planear el viaje?
            </h2>
            <div
              style={{
                display: 'flex',
                gap: 14,
                marginTop: 28,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/tarifas"
                className="btn btn-lg"
                style={{ background: '#fff', color: 'var(--brand-strong)' }}
              >
                Ver tarifas <ArrowRight size={19} />
              </Link>
              <Link
                href="/contacto"
                className="btn btn-lg"
                style={{
                  background: 'rgba(255,255,255,.14)',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,.5)',
                }}
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
