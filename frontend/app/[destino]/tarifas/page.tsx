'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getNombre } from '@/lib/destinos'

interface Plan {
  programa: string
  icono: string
  contado: number
  cuotas: Record<string, number>
}

const API = process.env.NEXT_PUBLIC_API_URL ?? ''

function formatARS(n: number) {
  return '$' + n.toLocaleString('es-AR')
}

export default function TarifasPage() {
  const { destino } = useParams<{ destino: string }>()
  const nombre = getNombre(destino)

  const esSP = destino === 'san-pedro'
  const [temporada, setTemporada] = useState('2026')
  const [planes, setPlanes] = useState<Plan[]>([])
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [cuotaSel, setCuotaSel] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!nombre) return
    setLoading(true)
    setError('')
    const url = esSP
      ? `${API}/api/tarifas/${destino}?temporada=${temporada}`
      : `${API}/api/tarifas/${destino}`

    fetch(url)
      .then((r) => { if (!r.ok) throw new Error('Error al cargar tarifas'); return r.json() })
      .then((data) => {
        setPlanes(data.planes)
        setSelectedIdx(0)
        const primero = data.planes[0]
        if (primero) {
          const primerasCuotas = Object.keys(primero.cuotas)
          setCuotaSel(primerasCuotas[0] ?? '1 Pago')
        }
        setLoading(false)
      })
      .catch((e) => { setError(e.message); setLoading(false) })
  }, [destino, temporada, nombre, esSP])

  if (!nombre) return <p>Destino no encontrado.</p>

  const plan = planes[selectedIdx]

  const opcionesPago: string[] = plan ? ['1 Pago', ...Object.keys(plan.cuotas)] : []

  const valorActual = plan
    ? cuotaSel === '1 Pago'
      ? plan.contado
      : plan.cuotas[cuotaSel] ?? 0
    : 0

  const labelCuota = cuotaSel === '1 Pago' ? 'Pago Único' : `Cuota (${cuotaSel})`

  const headerImg = esSP ? '/assets/tarifariosanpedro.jpeg' : '/assets/tarifas_y_formas_header.png'

  return (
    <>
      <style>{`
        .plan-card {
          border-radius: 12px; padding: 10px; background: #E8E8E8; border: 1px solid #d1d1d1;
          text-align: center; min-height: 110px; display: flex; flex-direction: column;
          justify-content: center; align-items: center; cursor: pointer; transition: all 0.3s ease;
        }
        .plan-card.active { border: 2px solid #4A90E2 !important; background-color: #fff !important; box-shadow: 0px 2px 8px rgba(0,0,0,0.08); }
        .plan-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .day-number { color: #4A90E2; font-size: 2.2rem; font-weight: 900; line-height: 1; }
        .day-text { color: #495057; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; margin-top: 5px; }

        .hero-card {
          background: linear-gradient(145deg, #fff, #f0f2f6); border-radius: 20px;
          padding: 20px 30px; text-align: center; border: 1px solid #e0e4e8;
          box-shadow: 10px 10px 30px #d9dbe0; max-width: 400px; margin: 15px auto;
          transition: all 0.5s ease;
        }
        .hero-card:hover { transform: translateY(-5px); }
        .hero-label { color: #6c757d; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 5px; }
        .hero-value { font-size: 2.8rem; font-weight: 900; margin: 0; line-height: 1; background: linear-gradient(#1a1c1e, #4A90E2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-subtitle { color: #4A90E2; font-size: 1rem; font-weight: 600; margin-top: 5px; }

        .pills-wrap { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 12px 0; }
        .pill {
          padding: 6px 16px; border-radius: 20px; border: 2px solid #4A90E2;
          background: white; color: #4A90E2; font-weight: 700; font-size: 0.85rem;
          cursor: pointer; transition: all 0.2s;
        }
        .pill.active { background: #4A90E2; color: white; }
        .pill:hover { opacity: 0.85; }

        .beneficio-box { max-width: 600px; margin: 15px auto; padding: 12px; background-color: #f0f7ff; border-radius: 10px; border: 1px dashed #4A90E2; }

        .plans-grid { display: grid; gap: 12px; }

        details summary { cursor: pointer; font-weight: 700; padding: 10px 0; user-select: none; }
        .tabla-wrap { overflow-x: auto; margin-top: 10px; }
        .styled-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .styled-table th { background-color: #333; color: white; padding: 8px; text-align: center; }
        .styled-table td { padding: 8px; text-align: center; border-bottom: 1px solid #eee; }

        @media (prefers-color-scheme: dark) {
          .hero-card { background: linear-gradient(145deg, #1e1e1e, #2a2a2a) !important; border-color: #444 !important; }
          .hero-value { background: linear-gradient(#fff, #4A90E2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .plan-card { background: #2a2a2a !important; border-color: #444 !important; }
          .plan-card.active { background-color: #1e1e1e !important; border-color: #ff4b4b !important; }
          .beneficio-box { background-color: #1e1e1e !important; border-color: #ff4b4b !important; }
          .pill { background: #1e1e1e; border-color: #4A90E2; }
        }
      `}</style>

      {/* HEADER IMAGE */}
      <div style={{ maxWidth: 700, margin: '0 auto 20px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={headerImg} alt="Tarifas" style={{ width: '100%', borderRadius: 10, marginTop: -20 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      </div>

      {/* SELECTOR TEMPORADA (solo San Pedro) */}
      {esSP && (
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <h4 style={{ marginBottom: 10 }}>🗓️ Temporada del viaje</h4>
          <div className="pills-wrap">
            {['2026', '2027'].map((t) => (
              <button key={t} className={`pill${temporada === t ? ' active' : ''}`} onClick={() => setTemporada(t)}>
                Temporada {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <p style={{ textAlign: 'center', padding: 40 }}>Cargando tarifas...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red', padding: 20 }}>⚠️ {error}</p>}

      {!loading && !error && plan && (
        <>
          {/* ITINERARIO */}
          <h4 style={{ marginBottom: 10 }}>📅 Itinerario</h4>
          <div className="plans-grid" style={{ gridTemplateColumns: `repeat(${planes.length}, 1fr)` }}>
            {planes.map((p, i) => {
              const parts = p.programa.split(' ')
              const num = parts[0]
              const resto = parts.slice(1).join(' ')
              return (
                <div key={i} className={`plan-card${selectedIdx === i ? ' active' : ''}`} onClick={() => setSelectedIdx(i)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="day-number">{num}</span>
                    <span style={{ fontSize: '1.5rem' }}>{p.icono}</span>
                  </div>
                  <div className="day-text">{resto}</div>
                </div>
              )
            })}
          </div>

          {/* PLAN DE PAGO */}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ fontWeight: 700, color: '#495057', marginBottom: 8 }}>Plan de pago:</p>
            <div className="pills-wrap">
              {opcionesPago.map((op) => (
                <button key={op} className={`pill${cuotaSel === op ? ' active' : ''}`} onClick={() => setCuotaSel(op)}>
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* HERO PRECIO */}
          <div className="hero-card">
            <p className="hero-label">A abonar</p>
            <p className="hero-value">{formatARS(valorActual)}</p>
            <p className="hero-subtitle">💳 {labelCuota}</p>
          </div>

          {/* BENEFICIO */}
          <div className="beneficio-box">
            <p style={{ fontSize: '0.85rem', color: '#333', textAlign: 'center', margin: 0 }}>
              🎁 <strong>¡10% OFF Serrano!</strong> Pagando del 1 al 10 en efectivo (aplicado en última cuota).
            </p>
          </div>

          {/* TABLA COMPARATIVA */}
          <details style={{ marginTop: 24 }}>
            <summary>Comparativa de tarifas</summary>
            <div className="tabla-wrap">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Programa</th>
                    <th>1 Pago</th>
                    {Object.keys(plan.cuotas).map((c) => <th key={c}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {planes.map((p) => (
                    <tr key={p.programa}>
                      <td>{p.programa}</td>
                      <td>{formatARS(p.contado)}</td>
                      {Object.values(p.cuotas).map((v, i) => <td key={i}>{formatARS(v)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          {/* SERVICIOS INCLUIDOS */}
          <h5 style={{ marginTop: 24, marginBottom: 10 }}>🛡️ Servicios Incluidos</h5>
          <div className="two-col">
            {[
              'Liberados para niños.',
              'Descuentos por pago.',
              'Opciones personalizadas.',
              'Ayudas incluidas.',
              'Fiesta de Egresados.',
              'Descuentos Camperas.',
            ].map((b) => (
              <p key={b} style={{ fontSize: '0.8rem', marginBottom: 4, color: '#495057' }}>✓ {b}</p>
            ))}
          </div>
        </>
      )}
    </>
  )
}
