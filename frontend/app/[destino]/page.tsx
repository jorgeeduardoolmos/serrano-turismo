import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNombre, COLOR } from '@/lib/destinos'

interface Props { params: { destino: string } }

const VIDEOS = {
  'san-pedro': 'https://www.youtube.com/embed/xBDqSrNB8Ro?autoplay=0&rel=0',
  'villa-carlos-paz': 'https://www.youtube.com/embed/ZG_3Bc8wkx8?start=31&autoplay=0&rel=0',
}

const CARDS = {
  'san-pedro': [
    { emoji: '🚣', title: 'Aventura y Naturaleza', desc: 'Navegación grupal por las islas, actividades al aire libre y mucha diversión en contacto con el río.' },
    { emoji: '🥐', title: 'Momentos Compartidos', desc: 'Comidas pensadas para el grupo, asados al aire libre y el clásico circuito para probar la ensaimada local.' },
    { emoji: '🏛️', title: 'Descubriendo la Historia', desc: 'Recorridos dinámicos y entretenidos por la Vuelta de Obligado para aprender y disfrutar al mismo tiempo.' },
  ],
  'villa-carlos-paz': [
    { emoji: '📍', title: 'Cercanía Estratégica', desc: 'Menos tiempo viajando y más tiempo disfrutando. Nuestros hoteles están ubicados a minutos de los principales complejos y excursiones.' },
    { emoji: '🏞️', title: 'Entorno Único', desc: 'Rodeados por las sierras cordobesas y el imponente Lago San Roque, el escenario perfecto para vivir aventuras al aire libre.' },
    { emoji: '🎉', title: 'Actividades Exclusivas', desc: 'Desde parques acuáticos y multiparques de diversiones durante el día, hasta actividades recreativas y cenas inolvidables.' },
  ],
}

const SUBTITLES = {
  'san-pedro': 'Un destino que abrimos hace 17 años, cercano y con la estructura para realizar el viaje de egresados de una manera divertida y segura.',
  'villa-carlos-paz': 'El destino por excelencia para tu viaje de egresados. Una experiencia completa que combina las sierras, diversión asegurada y la mejor infraestructura.',
}

const SECTION_SUBTITLES = {
  'san-pedro': 'El equilibrio perfecto entre diversión para los chicos y tranquilidad para las familias.',
  'villa-carlos-paz': 'Todo está diseñado para que disfruten al máximo de manera segura y dinámica.',
}

export default function DestinoPage({ params }: Props) {
  const nombre = getNombre(params.destino)
  if (!nombre) notFound()

  const slug = params.destino as 'san-pedro' | 'villa-carlos-paz'
  const color = COLOR[slug]
  const cards = CARDS[slug]
  const subtitle = SUBTITLES[slug]
  const sectionSubtitle = SECTION_SUBTITLES[slug]
  const videoSrc = VIDEOS[slug]
  const displayName = slug === 'san-pedro' ? 'SAN PEDRO' : 'CARLOS PAZ'

  return (
    <>
      <style>{`
        .dest-hero { display: flex; align-items: center; gap: 40px; flex-wrap: wrap; margin-bottom: 30px; }
        .dest-hero-text { flex: 1.1; min-width: 250px; }
        .dest-title { font-size: 60px; font-weight: 900; color: ${color}; line-height: 1.1; margin-bottom: 20px; text-transform: uppercase; }
        .dest-subtitle { font-size: 1.2rem; color: #444; margin-bottom: 30px; line-height: 1.5; }
        .dest-btn { display: inline-block; background-color: ${color}; color: white; border-radius: 30px; padding: 12px 40px; font-weight: bold; border: none; text-decoration: none; font-size: 1rem; cursor: pointer; }
        .dest-img { flex: 0.9; min-width: 250px; }
        .dest-img img { width: 100%; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .activity-card { background-color: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 5px solid ${color}; }
        @media (prefers-color-scheme: dark) {
          .dest-title { color: #fff !important; }
          .dest-subtitle { color: #ddd !important; }
          .activity-card { background-color: #1e1e1e !important; }
        }
        @media (max-width: 768px) {
          .dest-title { font-size: 40px !important; }
          .dest-hero { flex-direction: column; }
        }
      `}</style>

      {/* HERO */}
      <div className="dest-hero">
        <div className="dest-hero-text">
          <h1 className="dest-title">{displayName}</h1>
          <p className="dest-subtitle">{subtitle}</p>
          <Link href={`/${slug}/hoteleria`} className="dest-btn">Ver opciones de Hotelería</Link>
        </div>
        <div className="dest-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slug === 'san-pedro' ? '/assets/landing_sanPedro_imagen.png' : '/assets/landingcarlospazimagen.png'}
            alt={nombre}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </div>

      <hr className="divider" />

      {/* VIDEO */}
      <div className="tv-wrapper">
        <h3 style={{ textAlign: 'center', color, marginBottom: 20 }}>
          Conocé nuestra experiencia en {nombre}
        </h3>
        <div className="tv-frame">
          <div className="tv-screen">
            <iframe src={videoSrc} allowFullScreen title={`Video ${nombre}`} />
          </div>
        </div>
        <div className="tv-stand" />
        <div className="tv-base" />
      </div>

      <hr className="divider" />

      {/* EXPERIENCIAS */}
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <h2 style={{ color }}>Tu Viaje de Egresados Inolvidable</h2>
        <p style={{ color: '#666' }}>{sectionSubtitle}</p>
      </div>
      <div className="three-col" style={{ marginBottom: 40 }}>
        {cards.map((c) => (
          <div key={c.title} className="activity-card">
            <h3>{c.emoji} {c.title}</h3>
            <p style={{ marginTop: 10 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </>
  )
}
