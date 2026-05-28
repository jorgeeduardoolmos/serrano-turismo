import { notFound } from 'next/navigation'
import { getNombre } from '@/lib/destinos'

interface Props { params: { destino: string } }

export default function ActividadesPage({ params }: Props) {
  const nombre = getNombre(params.destino)
  if (!nombre) notFound()
  const esVCP = params.destino === 'villa-carlos-paz'

  return (
    <>
      <style>{`
        .night-card { background: white; border-radius: 15px; border: 1px solid #e0e0e0; margin-bottom: 20px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0,0,0,0.05); transition: transform 0.3s ease; }
        .night-card:hover { transform: translateY(-5px); box-shadow: 0px 10px 20px rgba(0,0,0,0.15); }
        .night-content { padding: 20px; }
        .night-title { color: #1E3A8A; font-size: 1.15rem; font-weight: 800; margin-bottom: 10px; text-transform: uppercase; }
        .night-desc { color: #444; font-size: 0.95rem; line-height: 1.5; }
        @media (prefers-color-scheme: dark) {
          .night-card { background: #1e1e1e !important; border-color: #333 !important; }
          .night-desc { color: #ccc !important; }
        }
      `}</style>

      <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: 20 }}>
        🌙 ACTIVIDADES NOCTURNAS EN {nombre.toUpperCase()}
      </h1>
      <hr className="divider" />

      <div style={{ maxWidth: 600, margin: '0 auto 30px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/fogon.jpg" alt="Fogón" style={{ borderRadius: 12, width: '100%' }} />
      </div>

      {esVCP ? (
        <>
          <h3 style={{ textAlign: 'center', color: '#1E3A8A', marginBottom: 8 }}>🕺 Diversión y Eventos Exclusivos</h3>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>Noches diseñadas para crear recuerdos inolvidables con la máxima seguridad.</p>

          <div className="two-col">
            <div>
              {[
                { title: '🧩 Juegos Nocturnos', desc: 'En el marco del hotel realizaremos actividades como búsqueda del tesoro y juegos por equipos.' },
                { title: '🪩 Matinée Serrano VIP', desc: 'Noche de Fiesta Privada en la Disco MOLINO ROJO, contando con la exclusividad del lugar para nuestros pasajeros.' },
                { title: '🔥 Fogón', desc: 'El grupo se reúne para cerrar la noche y afianzar los lazos de amistad de la primaria, permitiendo la libre expresión y reflexión del viaje.' },
              ].map((c) => (
                <div key={c.title} className="night-card">
                  <div className="night-content">
                    <div className="night-title">{c.title}</div>
                    <div className="night-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {[
                { title: '🕯️ Cena de Velas', desc: 'Noche especial donde tendremos una cena a la luz de las velas llena de sorpresas y emociones.' },
                { title: '💦 Pool Party', desc: 'Comenzamos con una espectacular fiesta de la espuma, seguido de la Fiesta increíble en la pileta climatizada de Crazy Donkey con show de luces y animación en un marco de total diversión y seguridad. Cerramos con una cena con asado tenedor libre y un show espectacular.' },
                { title: '🎭 Fiesta de Disfraces', desc: 'Una noche espectacular donde cada pasajero podrá lucir su mejor disfraz. Se realiza dentro del hotel, contando con un sector especialmente preparado con luces y sonido.' },
              ].map((c) => (
                <div key={c.title} className="night-card" style={{ borderLeft: '5px solid #1E3A8A' }}>
                  <div className="night-content">
                    <div className="night-title">{c.title}</div>
                    <div className="night-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 style={{ textAlign: 'center', color: '#1E3A8A', marginBottom: 8 }}>✨ Noches de Integración y Magia</h3>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>Momentos diseñados para fortalecer los lazos de amistad y la diversión compartida.</p>

          <div className="two-col">
            <div>
              {[
                { title: '🎉 Fiesta de Bienvenida', desc: 'Realizaremos una fiesta de disfraces en el complejo Macoco (exclusivo para los chicos de Serrano) con juegos, desfiles y concursos.' },
                { title: '🧩 Juegos Nocturnos', desc: 'En el marco del hotel realizaremos actividades como búsqueda del tesoro, noche de brujas, luces y sonidos y fiestas temáticas.' },
              ].map((c) => (
                <div key={c.title} className="night-card" style={{ borderLeft: '5px solid #1E3A8A' }}>
                  <div className="night-content">
                    <div className="night-title">{c.title}</div>
                    <div className="night-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="night-card">
                <div className="night-content">
                  <div className="night-title">🔥 Cena de Velas y Fogón</div>
                  <div className="night-desc">El grupo se reúne para cerrar la noche con el Fogón y afianzar los lazos de amistad de la primaria, permitiendo la libre expresión y reflexión del viaje.</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <hr className="divider" />
      <p style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
        ✨ Todas las actividades nocturnas cuentan con la supervisión de nuestro equipo de animación propia y seguridad.
      </p>
    </>
  )
}
