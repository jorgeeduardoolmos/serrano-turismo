'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

const LOGO_URL = 'https://serranoturismo.com.ar/assets/images/logoserrano-facebook.png'

export default function Footer() {
  return (
    <>
      <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,.72)' }}>
        <div className="wrap wrap-wide" style={{ paddingBlock: '76px 40px' }}>
          <div
            className="footer-grid"
            style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr', gap: 48 }}
          >
            {/* Col 1 — brand */}
            <div>
              <img src={LOGO_URL} alt="Serrano Turismo" style={{ height: 48, width: 'auto' }} />
              <p style={{ marginTop: 22, maxWidth: '30ch', lineHeight: 1.65, fontSize: 15.5 }}>
                Viajes de egresados y educativos con 29 años de trayectoria.
                Experiencias inolvidables, cuidadas de principio a fin.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                {[
                  { label: 'Ig', title: 'Instagram', href: 'https://instagram.com/serrano_turismo' },
                  { label: 'Fb', title: 'Facebook', href: 'https://facebook.com/serranoturismo' },
                  { label: 'Yt', title: 'YouTube', href: '#' },
                ].map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.title}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,.18)',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--font-head)',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#fff',
                      transition: 'background .2s, border-color .2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.12)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,.4)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,.18)'
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Explorar */}
            <div>
              <h4
                style={{
                  color: '#fff',
                  fontSize: 14,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-head)',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Explorar
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '18px 0 0',
                  display: 'grid',
                  gap: 12,
                  fontSize: 15.5,
                }}
              >
                {[
                  { href: '/', label: 'Inicio' },
                  { href: '/la-empresa', label: 'La Empresa' },
                  { href: '/destinos', label: 'Destinos' },
                  { href: '/tarifas', label: 'Tarifas' },
                  { href: '/recursos', label: 'Recursos' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="foot-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Recursos */}
            <div>
              <h4
                style={{
                  color: '#fff',
                  fontSize: 14,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-head)',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Recursos
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '18px 0 0',
                  display: 'grid',
                  gap: 12,
                  fontSize: 15.5,
                }}
              >
                {[
                  'Informe de pago',
                  'Ficha médica',
                  'Solicitud de adhesión',
                  'Preguntas frecuentes',
                ].map((l) => (
                  <li key={l}>
                    <Link href="/recursos" className="foot-link">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contacto */}
            <div>
              <h4
                style={{
                  color: '#fff',
                  fontSize: 14,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-head)',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Contacto
              </h4>
              <div
                style={{
                  marginTop: 18,
                  display: 'grid',
                  gap: 16,
                  fontSize: 14.5,
                  lineHeight: 1.5,
                }}
              >
                <div style={{ display: 'flex', gap: 11 }}>
                  <MapPin
                    size={18}
                    style={{ color: 'var(--gold-soft)', flexShrink: 0, marginTop: 2 }}
                  />
                  <span>
                    Av. Rivadavia 4532 — Galería Alefa (local 10)
                    <br />
                    C1042AAP · C.A.B.A.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 11 }}>
                  <Phone
                    size={18}
                    style={{ color: 'var(--gold-soft)', flexShrink: 0, marginTop: 2 }}
                  />
                  <span>
                    (011) 4847-6467 · Rotativas
                    <br />
                    (011) 5609-6283 · WhatsApp
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 11 }}>
                  <Mail
                    size={18}
                    style={{ color: 'var(--gold-soft)', flexShrink: 0, marginTop: 2 }}
                  />
                  <a
                    href="mailto:info@serranoturismo.com.ar"
                    className="foot-link"
                    style={{ wordBreak: 'break-word' }}
                  >
                    info@serranoturismo.com.ar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              marginTop: 56,
              paddingTop: 26,
              borderTop: '1px solid rgba(255,255,255,.12)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              fontSize: 13.5,
              color: 'rgba(255,255,255,.5)',
            }}
          >
            <span>© 2026 Serrano Turismo · Todos los derechos reservados.</span>
            <span style={{ display: 'flex', gap: 22 }}>
              <a href="#" className="foot-link">
                Términos
              </a>
              <a href="#" className="foot-link">
                Privacidad
              </a>
              <span>Legajo EVT</span>
            </span>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/5491156096283"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        style={{
          position: 'fixed',
          right: 22,
          bottom: 22,
          zIndex: 70,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#25D366',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 12px 30px rgba(37,211,102,.5)',
          color: '#fff',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
        </svg>
      </a>
    </>
  )
}
