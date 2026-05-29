import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function LaEmpresaPage() {
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
          <span className="eyebrow on-dark">La empresa</span>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(38px,5.5vw,68px)',
              marginTop: 16,
              maxWidth: '16ch',
            }}
          >
            29 años haciendo viajes inolvidables
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,.82)',
              fontSize: 19,
              marginTop: 18,
              maxWidth: '54ch',
            }}
          >
            Somos los mismos que iniciamos Serrano. Esa continuidad es nuestra mayor garantía.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="section">
        <div className="wrap wrap-wide">
          <div
            className="empresa-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 56,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--sh-lg)',
              }}
            >
              <Image
                src="/assets/Staff.png"
                alt="Equipo Serrano Turismo"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <span className="eyebrow">Nuestra historia</span>
              <h2 className="sec-title">Una familia que se dedica a cuidar tu viaje</h2>
              <p className="sec-lead">
                Desde nuestras oficinas en CABA y Parque Leloir coordinamos cada salida con equipo
                propio: coordinadores, choferes, médicos y asistentes que conocen cada destino de
                memoria.
              </p>
              <div
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}
              >
                {[
                  ['96.418', 'pasajeros transportados'],
                  ['3.714', 'grupos viajaron con Serrano'],
                  ['15', 'destinos educativos'],
                  ['471', 'colegios nos eligieron'],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div
                      className="kicker-num"
                      style={{ fontSize: 38, color: 'var(--accent-strong)' }}
                    >
                      {n}
                    </div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: 15, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
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
