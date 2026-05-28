import Link from 'next/link'

const LANDING_IMG = 'https://raw.githubusercontent.com/martinszurman-ux/Serrano-Dashboard/dc30c61e09bc3c22068eb77157a6e63893dd1f63/assets/Landing_image.jpeg'

export default function HomePage() {
  return (
    <>
      <style>{`
        .hero-container { padding: 20px 8% 40px 8%; background-color: white; }
        .hero-flex { display: flex; align-items: center; gap: 60px; flex-wrap: wrap; }
        .hero-text { flex: 1.2; min-width: 280px; }
        .hero-title { font-size: 4.2rem; font-weight: 800; color: #1a1a1a; line-height: 1; margin-bottom: 20px; }
        .hero-subtitle { font-size: 1.2rem; color: #444; line-height: 1.6; text-align: justify; }
        .hero-img-wrap { flex: 0.8; min-width: 260px; text-align: right; }
        .hero-img-wrap img { width: 100%; max-width: 500px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }

        .experiences-outer {
          background-color: #d1d5db;
          padding: 70px 20px;
        }
        .experiences-inner { max-width: 1200px; margin: 0 auto; text-align: center; }
        .experiences-grid { display: flex; justify-content: center; gap: 50px; flex-wrap: wrap; margin-top: 60px; }
        .exp-item { flex: 1; min-width: 250px; text-align: center; }
        .exp-icon {
          width: 115px; height: 115px;
          background: white; border-radius: 50%;
          margin: 0 auto 25px;
          display: flex; align-items: center; justify-content: center;
          font-size: 3rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }
        .exp-item h4 { font-weight: 800; font-size: 1.3rem; margin-bottom: 10px; }
        .exp-item p { color: #4b5563; line-height: 1.5; }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.8rem !important; }
          .hero-flex { flex-direction: column; }
          .hero-img-wrap { text-align: center; }
        }

        @media (prefers-color-scheme: dark) {
          .hero-container { background-color: #121212 !important; }
          .hero-title { color: #f0f0f0 !important; }
          .hero-subtitle { color: #ccc !important; }
          .experiences-outer { background-color: #1e1e1e !important; }
          .exp-item h4, .experiences-inner h2 { color: #f0f0f0 !important; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero-container">
        <div className="hero-flex">
          <div className="hero-text">
            <h1 className="hero-title">Serrano<br />Turismo</h1>
            <p className="hero-subtitle">
              Tu aventura de egresados empieza acá.<br />
              Más de 100.000 egresados de Buenos Aires ya confiaron en nosotros.<br />
              Con 29 años de experiencia, Serrano Turismo es sinónimo de transparencia y cumplimiento,<br />
              transformando cada viaje en una experiencia inolvidable con la seriedad que tu familia busca.
            </p>
          </div>
          <div className="hero-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LANDING_IMG} alt="Serrano Turismo - Egresados" />
          </div>
        </div>
      </div>

      {/* DESTINOS */}
      <div style={{ padding: '40px 8%', background: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Elegí tu destino</h2>
        <p style={{ color: '#666', marginBottom: 30 }}>Dos destinos únicos para vivir el viaje de tu vida</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/san-pedro" style={{
            display: 'block', padding: '20px 40px', background: '#2e7d32',
            color: 'white', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem',
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}>
            🌿 SAN PEDRO
          </Link>
          <Link href="/villa-carlos-paz" style={{
            display: 'block', padding: '20px 40px', background: '#1E3A8A',
            color: 'white', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem',
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}>
            ⛰️ CARLOS PAZ
          </Link>
        </div>
      </div>

      {/* EXPERIENCIAS */}
      <div className="experiences-outer">
        <div className="experiences-inner">
          <h2 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#1a1a1a' }}>Experiencias Inolvidables</h2>
          <div className="experiences-grid">
            <div className="exp-item">
              <div className="exp-icon">🚌</div>
              <h4>Transporte Premium</h4>
              <p>Unidades modernas de última generación con todo el confort para la ruta.</p>
            </div>
            <div className="exp-item">
              <div className="exp-icon">🏨</div>
              <h4>Hoteles Propios</h4>
              <p>Exclusividad y seguridad en los mejores destinos del país.</p>
            </div>
            <div className="exp-item">
              <div className="exp-icon">🛡️</div>
              <h4>Seguridad 24/7</h4>
              <p>Coordinación permanente y asistencia médica integral para tu tranquilidad.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
