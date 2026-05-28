'use client'

import { useState } from 'react'

const LOGO_URL = 'https://serranoturismo.com.ar/assets/images/logoserrano-facebook.png'

const PLANES = ['PLAN 1', 'PLAN 2', 'PLAN 3', 'PLAN 4', 'PLAN 5', 'OTRO']

export default function AdhesionPage() {
  const [planSel, setPlanSel] = useState('PLAN 4')
  const [sexo, setSexo] = useState('M')

  const handlePrint = () => {
    const elemToHide = ['.navbar', '.navbar-mobile', '.wa-float', '.footer-container', 'iframe']
    const snapshot: { el: HTMLElement; prev: string }[] = []
    elemToHide.forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        snapshot.push({ el, prev: el.style.display })
        el.style.display = 'none'
      })
    })
    const wrapper = document.querySelector<HTMLElement>('.content-wrapper')
    const prevMargin = wrapper?.style.marginTop ?? null
    if (wrapper) wrapper.style.marginTop = '0px'

    const style = document.createElement('style')
    style.id = 'print-overrides'
    style.textContent = `
      @page { size: A4 portrait; margin: 1cm; }
      body { background: white !important; }
      .content-wrapper { margin-top: 0 !important; padding: 0 !important; }
    `
    document.head.appendChild(style)

    setTimeout(() => {
      window.print()
      const restore = () => {
        document.getElementById('print-overrides')?.remove()
        snapshot.forEach(({ el, prev }) => { el.style.display = prev })
        if (wrapper && prevMargin !== null) wrapper.style.marginTop = prevMargin
      }
      const fallback = setTimeout(restore, 2000)
      window.addEventListener('afterprint', () => { clearTimeout(fallback); restore() }, { once: true })
    }, 300)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', border: 'none', borderBottom: '1px solid #999',
    padding: '4px 2px', fontSize: '0.85rem', background: '#f8f9fa',
    borderRadius: 4, outline: 'none', height: 30,
  }
  const labelStyle: React.CSSProperties = { fontWeight: 700, fontSize: '0.8rem', color: 'black', display: 'block', marginBottom: 2 }
  const fieldWrap: React.CSSProperties = { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 120 }
  const row: React.CSSProperties = { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }
  const hr: React.CSSProperties = { border: 'none', borderTop: '1px solid #ddd', margin: '12px 0' }

  return (
    <>
      <style>{`
        @media (prefers-color-scheme: dark) {
          .adhesion-form { background: white !important; color: black !important; padding: 20px; border-radius: 12px; }
        }
        @media print {
          .no-print { display: none !important; }
          .content-wrapper { margin-top: 0 !important; }
        }
      `}</style>

      <div className="adhesion-form" style={{ background: 'white', color: 'black', maxWidth: 900, margin: '0 auto', padding: '0 10px' }}>

        {/* CABECERA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_URL} alt="Serrano Turismo" style={{ height: 65, width: 'auto' }} />
          <div>
            <h1 style={{ color: 'black', fontSize: '1.6rem', lineHeight: 1.2 }}>SOLICITUD DE INGRESO</h1>
            <span style={{ fontWeight: 600, color: '#444', fontSize: '1rem' }}>Serrano Turismo - Ficha de Adhesión</span>
          </div>
        </div>
        <hr style={hr} />

        {/* DATOS DE CONTROL */}
        <h3 style={{ marginBottom: 8, color: 'black' }}>📋 DATOS DE CONTROL</h3>
        <div style={row}>
          <div style={fieldWrap}><label style={labelStyle}>Fecha de Solicitud</label><input type="date" style={inputStyle} defaultValue={new Date().toISOString().split('T')[0]} /></div>
          <div style={fieldWrap}><label style={labelStyle}>N° de Cliente</label><input style={inputStyle} /></div>
          <div style={fieldWrap}><label style={labelStyle}>N° de Contrato</label><input style={inputStyle} /></div>
          <div style={fieldWrap}><label style={labelStyle}>% Localidad</label><input style={inputStyle} /></div>
        </div>
        <div style={row}>
          <div style={{ ...fieldWrap, flex: 2 }}><label style={labelStyle}>Establecimiento Educativo</label><input style={inputStyle} /></div>
          <div style={fieldWrap}><label style={labelStyle}>Año / División</label><input style={inputStyle} /></div>
        </div>
        <hr style={hr} />

        {/* DATOS DEL PASAJERO */}
        <h3 style={{ marginBottom: 8, color: 'black' }}>🧒 DATOS DEL PASAJERO</h3>
        <div style={row}>
          <div style={{ ...fieldWrap, flex: 1 }}><label style={labelStyle}>Apellido/s</label><input style={inputStyle} /></div>
          <div style={{ ...fieldWrap, flex: 1 }}><label style={labelStyle}>Nombre/s</label><input style={inputStyle} /></div>
        </div>
        <div style={row}>
          <div style={fieldWrap}><label style={labelStyle}>DNI / CUIL</label><input style={inputStyle} /></div>
          <div style={fieldWrap}><label style={labelStyle}>Vencimiento DNI</label><input style={inputStyle} /></div>
          <div style={fieldWrap}><label style={labelStyle}>Fecha de Nacimiento</label><input type="date" style={inputStyle} /></div>
        </div>
        <div style={row}>
          <div style={{ minWidth: 140 }}>
            <label style={labelStyle}>Sexo</label>
            <div style={{ display: 'flex', gap: 12, fontSize: '0.85rem', color: 'black', marginTop: 4 }}>
              {['M', 'F', 'X'].map((v) => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                  <input type="radio" name="sexo" value={v} checked={sexo === v} onChange={() => setSexo(v)} style={{ accentColor: '#e25454' }} />
                  {v === 'M' ? 'Masculino' : v === 'F' ? 'Femenino' : 'X'}
                </label>
              ))}
            </div>
          </div>
          <div style={{ ...fieldWrap, flex: 2 }}><label style={labelStyle}>Domicilio Particular</label><input style={inputStyle} /></div>
          <div style={fieldWrap}><label style={labelStyle}>Localidad / CP</label><input style={inputStyle} /></div>
        </div>
        <hr style={hr} />

        {/* TUTORES */}
        <h3 style={{ marginBottom: 8, color: 'black' }}>👥 DATOS DE LOS PADRES / TUTORES</h3>
        {['1', '2'].map((n) => (
          <div key={n}>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 6, color: 'black' }}>DATOS TUTOR {n}</p>
            <div style={row}>
              <div style={{ ...fieldWrap, flex: 2 }}><label style={labelStyle}>Nombre y Apellido</label><input style={inputStyle} /></div>
              <div style={fieldWrap}><label style={labelStyle}>CUIL</label><input style={inputStyle} /></div>
              <div style={fieldWrap}><label style={labelStyle}>Teléfono</label><input style={inputStyle} /></div>
            </div>
          </div>
        ))}
        <div style={fieldWrap}><label style={labelStyle}>Correo Electrónico</label><input type="email" style={inputStyle} /></div>
        <hr style={hr} />

        {/* PLAN DE PAGO + DISCLAIMER */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 8 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={labelStyle}>Seleccione su Plan de Pago:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {PLANES.map((p) => (
                <button key={p} onClick={() => setPlanSel(p)}
                  style={{ padding: '6px 12px', borderRadius: 16, border: '2px solid #1E3A8A', background: planSel === p ? '#1E3A8A' : 'white', color: planSel === p ? 'white' : '#1E3A8A', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200, fontSize: '0.65rem', textAlign: 'justify', border: '1px solid #ccc', padding: 8, background: '#f9f9f9', color: 'black', borderRadius: 5, lineHeight: 1.3 }}>
            Declaro bajo juramento que los datos aquí volcados son absolutamente exactos y acepto, para la cancelación de los servicios a prestar por <strong>SERRANO TURISMO</strong>, el plan de pagos que figura en la solicitud de reserva.
            Los planes al contado deberán abonarse dentro de los 30 días de firmado el contrato. Además declaro conocer todas y cada una de las condiciones del contrato suscripto.<br />
            <strong>NOTA: De no marcar ningún plan de pago, su chequera se emitirá como PLAN CUOTAS (PLAN 4).</strong>
          </div>
        </div>

        {/* FIRMAS */}
        <div style={{ marginTop: 60, display: 'flex', gap: 40 }}>
          <div style={{ flex: 1 }}>
            <hr style={{ border: '0.5px solid black' }} />
            <p style={{ textAlign: 'center', fontSize: '8pt', color: 'black' }}>Firma Responsable</p>
          </div>
          <div style={{ flex: 1 }}>
            <hr style={{ border: '0.5px solid black' }} />
            <p style={{ textAlign: 'center', fontSize: '7pt', color: 'black' }}>Aclaración y N° de C.U.I.L.</p>
          </div>
        </div>

        {/* BOTÓN IMPRIMIR */}
        <div style={{ marginTop: 20 }} className="no-print">
          <button onClick={handlePrint}
            style={{ background: '#2E7D32', color: 'white', padding: '12px 20px', border: 'none', borderRadius: 8, cursor: 'pointer', width: '100%', fontSize: 16, fontWeight: 'bold' }}>
            🖨️ GENERAR COMPROBANTE PDF
          </button>
        </div>
      </div>
    </>
  )
}
