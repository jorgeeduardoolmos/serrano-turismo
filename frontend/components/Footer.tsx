export default function Footer() {
  return (
    <>
      <footer className="footer-container">
        <div className="f-col f-brand">
          <h4>SERRANO TURISMO</h4>
          <p>29 años de trayectoria. © 2026</p>
        </div>
        <div className="f-col f-center">
          <p>📍 Av. Rivadavia 4532 - Galería Alefa (Local 10) - CABA</p>
          <p>📍 Del Cimarrón 1846 - 1er Piso (Of. 4) - Parque Leloir</p>
          <p>📞 11-4847-6467</p>
        </div>
        <div className="f-col f-right">
          <a href="https://instagram.com/serrano_turismo" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://facebook.com/serranoturismo" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f" />
          </a>
        </div>
      </footer>
      <a href="https://wa.me/5491156096283" className="wa-float" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp" />
      </a>
    </>
  )
}
