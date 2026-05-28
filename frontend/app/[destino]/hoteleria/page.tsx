import { notFound } from 'next/navigation'
import { getNombre } from '@/lib/destinos'

interface Props { params: { destino: string } }

const FEATURES = [
  'Habitaciones triples y cuádruples con sommier, Aire Acondicionado y baño privado.',
  'Comedor restaurante. Cocina casera.',
  'SUM (Salón de Usos Múltiples).',
  'Teatro / Disco.',
  'Canchas de vóley, fútbol y fútbol-tenis.',
  'Piletas con guardavidas permanente.',
  'Amplios parques.',
  'Espacios cubiertos para actividades recreativas.',
  'Servicio de WiFi.',
  'Consultorio médico.',
  'Seguridad las 24 hs.',
]

interface HotelCardProps {
  title: string
  imgSrc: string
  features: string[]
}

function HotelCard({ title, imgSrc, features }: HotelCardProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ marginBottom: 16 }}>{title}</h3>
      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1.2', minWidth: 260 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={title} style={{ borderRadius: 12, width: '100%' }} />
        </div>
        <div style={{ flex: 1, minWidth: 220, fontSize: '0.9rem', lineHeight: 1.8 }}>
          {features.map((f) => <div key={f}>✔️ {f}</div>)}
        </div>
      </div>
    </div>
  )
}

export default function HoteleriaPage({ params }: Props) {
  const nombre = getNombre(params.destino)
  if (!nombre) notFound()
  const esVCP = params.destino === 'villa-carlos-paz'

  return (
    <>
      <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: 20 }}>
        🏨 HOTELERÍA EN {nombre.toUpperCase()}
      </h1>
      <hr className="divider" />

      {esVCP ? (
        <>
          <HotelCard title="🏢 Opción 1: Hotel Parque" imgSrc="/assets/hotel parque.jpeg" features={FEATURES} />
          <hr className="divider" />
          <HotelCard title="🏨 Opción 2: Hotel Capilla del Lago" imgSrc="/assets/capilla.jpeg" features={FEATURES} />
        </>
      ) : (
        <>
          <HotelCard title="🏢 Opción 1: Hotel de Turismo de San Pedro" imgSrc="/assets/hotel turismo.jpg" features={FEATURES} />
          <hr className="divider" />
          <HotelCard title="🏡 Opción 2: Hotel La Rueda" imgSrc="/assets/la rueda.jpeg" features={FEATURES} />
        </>
      )}
    </>
  )
}
