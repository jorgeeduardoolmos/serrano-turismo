import { notFound } from 'next/navigation'
import { getNombre } from '@/lib/destinos'

interface Props { params: { destino: string } }

const FEATURES = [
  { bold: 'Pensión completa:', text: 'desayuno, almuerzo, merienda, cena y quinta comida.' },
  { bold: 'Menú buffet libre:', text: 'Variedad y calidad garantizada.' },
  { bold: 'Hidratación:', text: 'Provisión de agua mineral libre las 24hs.' },
  { bold: 'Sistema Todo Incluido:', text: 'Sándwiches, alfajores, bizcochuelos, frutas, helados, gaseosas y jugos libre todos los días.' },
  { bold: 'Servicio en Ruta:', text: 'Desayuno y almuerzo en el viaje de ida. Almuerzo y merienda en el regreso en nuestros paradores exclusivos.' },
  { bold: 'Estaciones Saludables:', text: 'Disponibles en excursiones y hotel.' },
  { bold: 'Menú Diferenciado:', text: 'Atención especial a dietas médicas, celíacos, vegetarianos, veganos, etc.' },
]

export default function ComidasPage({ params }: Props) {
  const nombre = getNombre(params.destino)
  if (!nombre) notFound()
  const esVCP = params.destino === 'villa-carlos-paz'

  const fotos = esVCP
    ? ['desayuno.jpg', 'almuerzo.jpg', 'refrigerio.jpg', 'dietas.png']
    : ['desayuno san pedro.jpg', 'comida san pedro 1.jpeg', 'comida san pedro.jpeg', 'dietas.png']

  return (
    <>
      <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: 20 }}>
        🍽️ RÉGIMEN DE COMIDAS - {nombre.toUpperCase()}
      </h1>
      <hr className="divider" />

      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 20 }}>
        {/* Galería 2x2 */}
        <div style={{ flex: '1.2', minWidth: 260 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {fotos.map((f) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={f} src={`/assets/${f}`} alt={f} style={{ borderRadius: 10, width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ background: '#f8f9fa', padding: 25, borderRadius: 15, borderLeft: '5px solid #1E3A8A', lineHeight: 1.4 }}>
            {FEATURES.map((f) => (
              <p key={f.bold} style={{ marginBottom: 12, fontSize: '1.05rem' }}>
                ✔️ <strong>{f.bold}</strong> {f.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
