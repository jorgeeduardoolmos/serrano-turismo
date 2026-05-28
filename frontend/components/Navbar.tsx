'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LOGO_URL = 'https://serranoturismo.com.ar/assets/images/logoserrano-facebook.png'

export default function Navbar() {
  const pathname = usePathname()

  // Detect if we're on a destino page
  const match = pathname.match(/^\/(san-pedro|villa-carlos-paz)/)
  const destinoSlug = match ? match[1] : null

  const menuLinks = destinoSlug ? (
    <>
      <div className="dropdown">
        <button className="dropbtn">CONOCÉ TU VIAJE ▼</button>
        <div className="dropdown-content">
          <Link href={`/${destinoSlug}/transporte`}>Transporte</Link>
          <Link href={`/${destinoSlug}/hoteleria`}>Hotelería</Link>
          <Link href={`/${destinoSlug}/comidas`}>Comidas</Link>
          <Link href={`/${destinoSlug}/excursiones`}>Excursiones</Link>
          <Link href={`/${destinoSlug}/actividades`}>Actividades Nocturnas</Link>
          <Link href={`/${destinoSlug}/seguro`}>Seguro / Coordinación</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">ARMÁ TU VIAJE ▼</button>
        <div className="dropdown-content">
          <Link href={`/${destinoSlug}/tarifas`}>Tarifas</Link>
          <Link href={`/${destinoSlug}/adhesion`}>Ficha de Adhesión</Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <span className="eleccion-texto">Elegí tu destino:</span>
      <Link href="/san-pedro" className="btn-destino">SAN PEDRO</Link>
      <Link href="/villa-carlos-paz" className="btn-destino">CARLOS PAZ</Link>
    </>
  )

  const menuLinksCollapsed = destinoSlug ? (
    <>
      <div className="dropdown">
        <button className="dropbtn">CONOCÉ TU VIAJE ▼</button>
        <div className="dropdown-content">
          <Link href={`/${destinoSlug}/transporte`}>Transporte</Link>
          <Link href={`/${destinoSlug}/hoteleria`}>Hotelería</Link>
          <Link href={`/${destinoSlug}/comidas`}>Comidas</Link>
          <Link href={`/${destinoSlug}/excursiones`}>Excursiones</Link>
          <Link href={`/${destinoSlug}/actividades`}>Actividades Nocturnas</Link>
          <Link href={`/${destinoSlug}/seguro`}>Seguro / Coordinación</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">ARMÁ TU VIAJE ▼</button>
        <div className="dropdown-content">
          <Link href={`/${destinoSlug}/tarifas`}>Tarifas</Link>
          <Link href={`/${destinoSlug}/adhesion`}>Ficha de Adhesión</Link>
        </div>
      </div>
      <Link href="/" className="nav-item">VOLVER A ELEGIR DESTINO</Link>
    </>
  ) : (
    <>
      <span className="eleccion-texto">Elegí tu destino:</span>
      <Link href="/san-pedro" className="btn-destino">SAN PEDRO</Link>
      <Link href="/villa-carlos-paz" className="btn-destino">CARLOS PAZ</Link>
    </>
  )

  return (
    <>
      {/* DESKTOP */}
      <nav className="navbar">
        <div className="logo-box">
          <Link href="/"><img src={LOGO_URL} alt="Serrano Turismo" /></Link>
        </div>
        <div className="nav-links">
          {destinoSlug && <Link href="/" className="nav-item">HOME</Link>}
          {menuLinks}
        </div>
        <div style={{ width: 110 }} />
      </nav>

      {/* MOBILE */}
      <nav className="navbar-mobile mobile-only">
        {!destinoSlug ? (
          <>
            <div className="logo-box-mobile-home">
              <img src={LOGO_URL} alt="Serrano Turismo" />
            </div>
            <div className="nav-links-visible">
              {menuLinksCollapsed}
            </div>
          </>
        ) : (
          <details className="menu-desplegable">
            <summary className="logo-box-summary">
              <img src={LOGO_URL} alt="Serrano Turismo" />
              <span className="menu-label">MENÚ ☰</span>
            </summary>
            <div className="nav-links-collapsed">
              {menuLinksCollapsed}
            </div>
          </details>
        )}
      </nav>
    </>
  )
}
