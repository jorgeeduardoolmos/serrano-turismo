import { notFound } from 'next/navigation'
import { getNombre } from '@/lib/destinos'

interface Props { params: { destino: string } }

export default function TransportePage({ params }: Props) {
  const nombre = getNombre(params.destino)
  if (!nombre) notFound()
  const esVCP = params.destino === 'villa-carlos-paz'

  return (
    <>
      <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
        {esVCP ? '✈️ 🚌' : '🚌'} TRANSPORTE A {nombre.toUpperCase()}
      </h2>
      <hr className="divider" />

      {esVCP ? (
        <>
          <h3 style={{ marginBottom: 16, marginTop: 20 }}>✈️ Opción Aérea: Aerolíneas Argentinas</h3>
          <div style={{ maxWidth: 700, margin: '0 auto 10px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/AVION.jpg" alt="Vuelos Aerolíneas Argentinas" style={{ borderRadius: 12 }} />
          </div>
          <p style={{ marginBottom: 24, color: '#555' }}>
            Optimizamos tu tiempo con cupos confirmados en nuestra aerolínea de bandera.
          </p>
          <hr className="divider" />
          <h3 style={{ marginBottom: 16 }}>🚍 Opción Terrestre</h3>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/micros.png" alt="Micros Serrano Turismo" style={{ borderRadius: 12 }} />
          </div>
        </>
      ) : (
        <>
          <h3 style={{ marginBottom: 16, marginTop: 20 }}>🚍 Transporte Terrestre Exclusivo</h3>
          <div style={{ maxWidth: 700, margin: '0 auto 10px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/micros.png" alt="Unidades Serrano Turismo" style={{ borderRadius: 12 }} />
          </div>
          <p style={{ color: '#555' }}>
            Viajá con la tranquilidad de <strong>Serrano Turismo</strong>.
          </p>
        </>
      )}

      <div style={{ background: '#e8f4fd', borderRadius: 12, padding: '16px 20px', marginTop: 30, borderLeft: '4px solid #1E3A8A' }}>
        <h3 style={{ marginBottom: 10 }}>✨ Características de nuestro servicio:</h3>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>✅ <strong>Buses de última generación:</strong> Unidades modernas con máximo confort.</li>
          <li>✅ <strong>Empresas de transporte Charter:</strong> Seguridad y exclusividad garantizada.</li>
          <li>✅ <strong>Exclusividad:</strong> El bus queda a disposición del grupo para los traslados.</li>
        </ul>
      </div>
    </>
  )
}
