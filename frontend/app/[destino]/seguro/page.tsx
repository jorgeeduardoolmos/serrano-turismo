import { notFound } from 'next/navigation'
import { getNombre } from '@/lib/destinos'

interface Props { params: { destino: string } }

export default function SeguroPage({ params }: Props) {
  const nombre = getNombre(params.destino)
  if (!nombre) notFound()

  return (
    <>
      <style>{`
        .staff-header { background-color: #f8f9fa; border-radius: 15px; padding: 20px; border-left: 5px solid #4A90E2; margin-bottom: 25px; }
        .highlight-text { color: #4A90E2; font-weight: 800; font-size: 1.2rem; margin-bottom: 10px; display: block; }
        .feature-box { background: #ffffff; padding: 18px; border-radius: 12px; border: 1px solid #eef2f6; height: 100%; box-shadow: 0px 2px 4px rgba(0,0,0,0.02); }
        .insurance-partner { background: #f1f5f9; padding: 10px 15px; border-radius: 8px; font-weight: 700; color: #1e293b; font-size: 0.85rem; display: inline-block; margin-right: 10px; margin-bottom: 10px; border: 1px solid #cbd5e1; }
        .experience-badge { background: #1a1a1a; color: #FFD700; padding: 5px 15px; border-radius: 20px; font-weight: bold; display: inline-block; margin-bottom: 15px; font-size: 0.8rem; }
        .viaxlab-card { background: linear-gradient(145deg, #6366f1, #4338ca); color: white; padding: 25px; border-radius: 20px; text-align: center; margin: 20px 0; }
        @media (prefers-color-scheme: dark) {
          .staff-header { background-color: #1e1e1e !important; }
          .feature-box { background-color: #1e1e1e !important; border-color: #333 !important; }
        }
      `}</style>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/Staff.png" alt="Staff Serrano" style={{ borderRadius: 12, width: '100%', marginBottom: 20 }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />

      <span className="experience-badge">🏆 29 AÑOS DE TRAYECTORIA</span>
      <h2 style={{ marginBottom: 16, marginTop: 8 }}>🏥 Coordinación y Seguridad</h2>

      <div className="staff-header">
        <span className="highlight-text">COORDINACIÓN Y PERSONAL ESTABLE</span>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#333' }}>
          Para <strong>Serrano Turismo</strong>, la coordinación es el pilar fundamental del viaje.
          Contamos con un equipo de profesionales apasionados: <strong>Profesores de Educación Física y Técnicos en Recreación</strong>{' '}
          especializados en manejo de grupos estudiantiles y deportivos.
          <br /><br />
          Además, disponemos de <strong>Personal Directivo apostado permanentemente en el destino</strong>,
          supervisando cada detalle y garantizando una ejecución perfecta para la tranquilidad absoluta de las familias.
        </p>
      </div>

      <div className="viaxlab-card">
        <h3 style={{ color: 'white', marginBottom: 10 }}>📱 Seguí el viaje con Viaxlab</h3>
        <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
          Todos los pasajeros están identificados con una <strong>pulsera de seguimiento</strong> vinculada a la App,
          conteniendo sus datos médicos actualizados para una respuesta inmediata.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <a href="https://app.viaxlab.com/" target="_blank" rel="noreferrer"
          style={{ flex: 1, minWidth: 200, padding: '10px 20px', background: '#4338ca', color: 'white', borderRadius: 8, textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}>
          🚀 Acceder a Viaxlab Web
        </a>
        <a href="https://viaxlab.com/descargar" target="_blank" rel="noreferrer"
          style={{ flex: 1, minWidth: 200, padding: '10px 20px', background: '#4338ca', color: 'white', borderRadius: 8, textAlign: 'center', textDecoration: 'none', fontWeight: 700 }}>
          📥 Descargar App
        </a>
      </div>

      <hr className="divider" />

      <h3 style={{ marginBottom: 16 }}>🛡️ Respaldo y Cobertura Total</h3>

      <div style={{ marginBottom: 20 }}>
        <span className="insurance-partner">🛡️ San Cristóbal Seguros</span>
        <span className="insurance-partner">⚕️ Assistravel</span>
      </div>

      <p style={{ marginBottom: 20, color: '#555' }}>
        Contamos con el respaldo de las empresas más importantes del país, con asistencia inmediata y permanente desde el inicio hasta el fin del tour.
      </p>

      <div className="two-col" style={{ marginBottom: 24 }}>
        <div className="feature-box">
          <h4 style={{ color: '#4A90E2', fontSize: '1rem', marginBottom: 10 }}>🏥 Infraestructura Médica</h4>
          <ul style={{ fontSize: '0.85rem', color: '#444', paddingLeft: 20, lineHeight: 2 }}>
            <li><strong>Médico permanente</strong> a disposición 24hs en el hotel.</li>
            <li>Acceso a más de <strong>45 Clínicas y Sanatorios</strong> en todo el trayecto.</li>
            <li>Atención en ruta y destino asegurada.</li>
            <li>Traslados terrestres y aéreos (regulares y sanitarios).</li>
          </ul>
        </div>
        <div className="feature-box">
          <h4 style={{ color: '#4A90E2', fontSize: '1rem', marginBottom: 10 }}>💊 Cobertura Prestacional</h4>
          <ul style={{ fontSize: '0.85rem', color: '#444', paddingLeft: 20, lineHeight: 2 }}>
            <li><strong>Medicamentos en mano</strong> para respuesta eficaz.</li>
            <li>Internaciones, cirugías (mayor y menor) y yesos.</li>
            <li>Odontología de urgencia y material descartable.</li>
            <li>Cobertura de <strong>preexistencias agudizadas</strong>.</li>
            <li>Seguimiento post-viaje hasta el alta médica.</li>
          </ul>
        </div>
      </div>

      <div style={{ background: '#e8f4fd', borderRadius: 10, padding: '14px 18px', borderLeft: '4px solid #4A90E2' }}>
        💡 <strong>Dato Serrano:</strong> La seguridad de nuestros pasajeros no es un opcional, es nuestra prioridad absoluta desde hace 29 años.
      </div>
    </>
  )
}
