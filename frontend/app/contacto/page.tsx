'use client'

import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

export default function ContactoPage() {
  const [fields, setFields] = useState({
    nombre: '',
    email: '',
    telefono: '',
    colegio: '',
    destino: 'San Pedro de Jujuy',
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Could wire up to a real endpoint here
    setSent(true)
  }

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
          <span className="eyebrow on-dark">Contacto</span>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(38px,5.5vw,68px)',
              marginTop: 16,
              maxWidth: '16ch',
            }}
          >
            Hablemos del viaje de tu promo
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,.82)',
              fontSize: 19,
              marginTop: 18,
              maxWidth: '54ch',
            }}
          >
            Escribinos y un asesor te arma una propuesta a medida, sin compromiso.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="wrap wrap-wide">
          <div
            className="contacto-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56 }}
          >
            {/* Left — contact info */}
            <div>
              <div style={{ display: 'grid', gap: 24 }}>
                {[
                  {
                    icon: MapPin,
                    title: 'Oficinas',
                    text: 'Av. Rivadavia 4532 — Galería Alefa (local 10), C.A.B.A.\nDel Cimarrón 1846, Parque Leloir',
                  },
                  {
                    icon: Phone,
                    title: 'Teléfonos',
                    text: '(011) 4847-6467 (Rotativas)\n(011) 5609-6283 (WhatsApp)',
                  },
                  {
                    icon: Mail,
                    title: 'Mail',
                    text: 'info@serranoturismo.com.ar',
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} style={{ display: 'flex', gap: 16 }}>
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 14,
                        flexShrink: 0,
                        background: 'var(--accent-tint)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--accent-strong)',
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-head)',
                          fontWeight: 700,
                          fontSize: 17,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          color: 'var(--ink-soft)',
                          fontSize: 15.5,
                          lineHeight: 1.55,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  marginTop: 30,
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden',
                  background: 'var(--paper-2)',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <iframe
                  title="Mapa Serrano Turismo"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9877578984126!2d-58.43398862341068!3d-34.61468635776716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab42e9e1585%3A0x7e7a0d3b2da46547!2sAv.%20Rivadavia%204532%2C%20C1419AAO%20CABA!5e0!3m2!1ses!2sar!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right — form */}
            <form
              className="card"
              onSubmit={handleSubmit}
              style={{ padding: 36, alignSelf: 'start' }}
            >
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'var(--accent-tint)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--accent-strong)',
                      margin: '0 auto',
                    }}
                  >
                    <ArrowRight size={28} />
                  </div>
                  <h3 style={{ fontSize: 24, marginTop: 20 }}>¡Consulta enviada!</h3>
                  <p style={{ marginTop: 10, color: 'var(--ink-soft)', fontSize: 15 }}>
                    Te respondemos dentro de las 24 h hábiles.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 24 }}>Pedí tu cotización</h3>
                  <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: 15 }}>
                    Te respondemos dentro de las 24 h hábiles.
                  </p>
                  <div style={{ display: 'grid', gap: 16, marginTop: 26 }}>
                    {[
                      { label: 'Nombre y apellido', key: 'nombre', type: 'text' },
                      { label: 'Email', key: 'email', type: 'email' },
                      { label: 'Teléfono / WhatsApp', key: 'telefono', type: 'tel' },
                      { label: 'Colegio / Promo', key: 'colegio', type: 'text' },
                    ].map(({ label, key, type }) => (
                      <label key={key} style={{ display: 'block' }}>
                        <span
                          style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-soft)' }}
                        >
                          {label}
                        </span>
                        <input
                          type={type}
                          value={fields[key as keyof typeof fields]}
                          onChange={(e) =>
                            setFields((f) => ({ ...f, [key]: e.target.value }))
                          }
                          style={{
                            width: '100%',
                            marginTop: 7,
                            padding: '13px 16px',
                            borderRadius: 'var(--r-sm)',
                            border: '1.5px solid var(--line)',
                            fontSize: 15.5,
                            fontFamily: 'var(--font-body)',
                            background: 'var(--paper)',
                            outline: 'none',
                            transition: 'border-color .2s',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                          onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
                        />
                      </label>
                    ))}

                    <label style={{ display: 'block' }}>
                      <span
                        style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-soft)' }}
                      >
                        Destino de interés
                      </span>
                      <select
                        value={fields.destino}
                        onChange={(e) => setFields((f) => ({ ...f, destino: e.target.value }))}
                        style={{
                          width: '100%',
                          marginTop: 7,
                          padding: '13px 16px',
                          borderRadius: 'var(--r-sm)',
                          border: '1.5px solid var(--line)',
                          fontSize: 15.5,
                          fontFamily: 'var(--font-body)',
                          background: 'var(--paper)',
                          outline: 'none',
                        }}
                      >
                        <option>San Pedro de Jujuy</option>
                        <option>Villa Carlos Paz</option>
                        <option>Aún no lo decidí</option>
                      </select>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginTop: 24 }}
                  >
                    Enviar consulta <ArrowRight size={19} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
