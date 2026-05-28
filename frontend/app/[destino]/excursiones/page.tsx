import { notFound } from 'next/navigation'
import { getNombre } from '@/lib/destinos'

interface Props { params: { destino: string } }

export default function ExcursionesPage({ params }: Props) {
  const nombre = getNombre(params.destino)
  if (!nombre) notFound()
  const esVCP = params.destino === 'villa-carlos-paz'

  return (
    <>
      <style>{`
        .exc-card { background: white; border-radius: 15px; border: 1px solid #e0e0e0; margin-bottom: 20px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0,0,0,0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .exc-card:hover { transform: translateY(-5px); box-shadow: 0px 10px 20px rgba(0,0,0,0.15); }
        .exc-card img { width: 100%; max-height: 200px; object-fit: cover; }
        .exc-content { padding: 15px; }
        .exc-title { color: #1E3A8A; font-size: 1.2rem; font-weight: 800; margin-bottom: 5px; }
        .exc-desc { color: #555; font-size: 0.9rem; line-height: 1.4; }
        .exc-tag { display: inline-block; background: #e1edff; color: #1E3A8A; font-size: 0.75rem; font-weight: bold; padding: 4px 12px; border-radius: 20px; margin-top: 12px; text-transform: uppercase; }
        .classic-card { border-left: 5px solid #1E3A8A; }
        @media (prefers-color-scheme: dark) {
          .exc-card { background: #1e1e1e !important; border-color: #333 !important; }
          .exc-title { color: #4A90E2 !important; }
          .exc-desc { color: #ccc !important; }
        }
      `}</style>

      {esVCP ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/encabezado.jpg" alt="Excursiones Carlos Paz" style={{ borderRadius: 12, marginBottom: 20, width: '100%' }} />

          <h2 style={{ textAlign: 'center', color: '#1E3A8A', marginTop: 20, marginBottom: 8 }}>🎢 Parques y Aventura en Carlos Paz</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>Los mejores complejos para vivir días a pura adrenalina y diversión con amigos.</p>

          <div className="two-col">
            <div>
              <div className="exc-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/pekos.png" alt="Pekos Multiparque" />
                <div className="exc-content">
                  <div className="exc-title">🎡 Pekos Multiparque</div>
                  <div className="exc-desc">Cine 5D, laberintos de espejos, montañas rusas, shows, la noria más grande de sudamérica y juegos mecánicos en un complejo recreativo inmenso.</div>
                  <span className="exc-tag">Día Completo</span>
                </div>
              </div>
              <div className="exc-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/crazy.png" alt="Crazy Donkey" />
                <div className="exc-content">
                  <div className="exc-title">🧗‍♂️ Crazy Donkey</div>
                  <div className="exc-desc">Aventura en las sierras: tirolesas gigantes, puentes colgantes, parque acuático, y toboganes novedosos.</div>
                  <span className="exc-tag">Aventura</span>
                </div>
              </div>
            </div>
            <div>
              <div className="exc-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/aqua.png" alt="Aquaventure" />
                <div className="exc-content">
                  <div className="exc-title">🌊 Aquaventure</div>
                  <div className="exc-desc">Toboganes, piletas, plaza húmeda y juegos acuáticos increíbles para disfrutar a pleno bajo el sol cordobés.</div>
                  <span className="exc-tag">Parque Acuático</span>
                </div>
              </div>
              <div className="exc-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/wave.png" alt="Wave Zone" />
                <div className="exc-content">
                  <div className="exc-title">🏄‍♀️ Wave Zone</div>
                  <div className="exc-desc">La pileta de olas más grande de la villa, animadores en vivo y mucha música. Rampas, toboganes inflables y mucho más.</div>
                  <span className="exc-tag">Agua &amp; Fiesta</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="divider" />
          <h3 style={{ color: '#1E3A8A', marginBottom: 16 }}>🏙️ Paseos Clásicos</h3>
          <div className="three-col">
            {[
              { emoji: '📸', title: 'City Tour Serrano', desc: 'Recorremos el pintoresco centro, la costanera del Lago San Roque y su nuevo puente.', tag: 'Recorrido' },
              { emoji: '🍫', title: 'Fábrica de Alfajores', desc: 'Visita guiada para conocer los secretos de los alfajores cordobeses. ¡Incluye degustación!', tag: 'Gastronomía' },
              { emoji: '🪐', title: 'Planetario Pekos', desc: 'Un viaje a través del cosmos con tecnología de vanguardia para descubrir los secretos del universo.', tag: 'Educativo' },
            ].map((c) => (
              <div key={c.title} className="exc-card classic-card">
                <div className="exc-content">
                  <div className="exc-title">{c.emoji} {c.title}</div>
                  <div className="exc-desc">{c.desc}</div>
                  <span className="exc-tag">{c.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/sanpedroexc.jpg" alt="Excursiones San Pedro" style={{ borderRadius: 12, marginBottom: 20, width: '100%' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <h2 style={{ marginBottom: 16 }}>🏞️ Excursiones San Pedro</h2>

          <div className="two-col" style={{ marginBottom: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/imagen1.jpg" alt="" style={{ borderRadius: 10 }} onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/imagen2.jpg" alt="" style={{ borderRadius: 10 }} onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
          </div>

          {[
            { title: '🚌 1. El Fuerte de Obligado', desc: 'Aventura extrema: palestra, rappel y tirolesa con asado criollo.', tag: 'Aventura • Asado', img: '/assets/sanpedroexc2.jpg' },
            { title: '🚌 2. Beach Day con Canotaje', desc: 'Día de playa exclusivo con bautismo de canotaje seguro.', tag: 'Playa', img: null },
            { title: '🚌 3. Complejo Las Amalias', desc: 'Laberinto de ligustrinas y deportes recreativos.', tag: 'Recreación', img: null },
            { title: '🚢 4. Sunset Catamarán', desc: 'Navegación por el Paraná con música al atardecer.', tag: 'Navegación', img: null },
            { title: '🏙️ 5. City Tour', desc: 'Recorrido por barrancas y compras regionales.', tag: 'Cultura', img: null },
          ].map((exc) => (
            <div key={exc.title} className="exc-card" style={{ marginBottom: 16 }}>
              {exc.img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={exc.img} alt={exc.title} onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
              )}
              <div className="exc-content">
                <div className="exc-title">{exc.title}</div>
                <div className="exc-desc">{exc.desc}</div>
                <span className="exc-tag">{exc.tag}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}
