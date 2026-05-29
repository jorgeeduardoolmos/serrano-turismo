/* global React */
const { useState, useEffect, useRef } = React;

/* ============================================================
   ICONS — line set, stroke = currentColor
   ============================================================ */
function Icon({ name, size = 20, style, fill = false }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round",
    strokeLinejoin: "round", style };
  const paths = {
    chevron: <polyline points="6 9 12 15 18 9" />,
    arrow: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
    close: <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    star: <polygon points="12 2 15.1 8.6 22 9.3 17 14.1 18.2 21 12 17.6 5.8 21 7 14.1 2 9.3 8.9 8.6" fill={fill ? "currentColor" : "none"} />,
    check: <polyline points="20 6 9 17 4 12" />,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    bus: <><path d="M8 6v6M16 6v6M2 12h19.6M18 18h3a1 1 0 0 0 1-1v-5a8 8 0 0 0-8-8H6a4 4 0 0 0-4 4v9a1 1 0 0 0 1 1h2" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    utensils: <><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M5 2v20M16 11V2a4 4 0 0 0 0 9Zm0 0v11" /></>,
    medal: <><circle cx="12" cy="15" r="6" /><path d="M9 9 6.2 2.5M15 9l2.8-6.5M8.4 4.5 12 12l3.6-7.5" /></>,
    award: <><circle cx="12" cy="8" r="6" /><path d="M8.2 13.3 7 22l5-3 5 3-1.2-8.7" /></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" /></>,
    sparkle: <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />,
    wifi: <><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></>,
    music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
    mountain: <path d="m8 3 4 8 5-5 5 14H2L8 3Z" />,
    play: <polygon points="6 3 20 12 6 21 6 3" fill={fill ? "currentColor" : "none"} />,
    quote: <path d="M3 21c3-1 5-4 5-9V3H3v9h4M14 21c3-1 5-4 5-9V3h-5v9h4" />,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
}

function BrandLogo({ dark = false, size = 46 }) {
  // Wordmark "ST" badge — original mark, not a recreation of the client logo
  const ring = dark ? "var(--ink)" : "#fff";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "linear-gradient(145deg, var(--brand), var(--brand-strong))",
        display: "grid", placeItems: "center", flex: "none",
        boxShadow: "0 6px 16px rgba(213,98,10,.36)",
        border: `2.5px solid ${ring}`,
      }}>
        <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, color: "#fff",
          fontSize: size * 0.4, letterSpacing: "-0.04em", lineHeight: 1 }}>ST</span>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 19,
          letterSpacing: "0.04em", color: dark ? "var(--ink)" : "#fff" }}>SERRANO</div>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 11.5,
          letterSpacing: "0.42em", color: dark ? "var(--brand-strong)" : "var(--gold-soft)",
          marginTop: 3 }}>TURISMO</div>
      </div>
    </div>
  );
}

/* ============================================================
   useReveal — IntersectionObserver scroll-in
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ============================================================
   NAVBAR — transparent over hero, solid on scroll
   ============================================================ */
function Navbar({ route, onNavigate, transparentTop = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const solid = scrolled || !transparentTop;
  const links = [
    { id: "home", label: "Inicio" },
    { id: "empresa", label: "La Empresa" },
    { id: "destino", label: "Destinos", dropdown: true },
    { id: "tarifas", label: "Tarifas" },
    { id: "recursos", label: "Recursos" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 80,
        height: "var(--nav-h)",
        background: solid ? "rgba(251,248,243,.86)" : "transparent",
        backdropFilter: solid ? "saturate(180%) blur(16px)" : "none",
        borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
        boxShadow: solid ? "0 4px 24px rgba(21,34,45,.05)" : "none",
        transition: "background .35s, box-shadow .35s, border-color .35s",
      }}>
        <div className="wrap wrap-wide" style={{ height: "100%", display: "flex",
          alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>
            <BrandLogo dark={solid} />
          </a>

          {/* desktop nav */}
          <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {links.map((l) => (
              <button key={l.id}
                onClick={() => onNavigate(l.id)}
                onMouseEnter={() => l.dropdown && setDestOpen(true)}
                onMouseLeave={() => l.dropdown && setDestOpen(false)}
                style={{
                  position: "relative",
                  background: "none", border: "none",
                  fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 14.5,
                  letterSpacing: ".01em",
                  color: solid ? "var(--ink-2)" : "rgba(255,255,255,.92)",
                  padding: "10px 15px", display: "flex", alignItems: "center", gap: 5,
                }}>
                {l.label}
                {l.dropdown && <Icon name="chevron" size={15} />}
                {route === l.id && (
                  <span style={{ position: "absolute", left: 15, right: 15, bottom: 2, height: 2.5,
                    borderRadius: 2, background: "var(--accent)" }} />
                )}
                {l.dropdown && destOpen && (
                  <div onMouseEnter={() => setDestOpen(true)} style={{
                    position: "absolute", top: "calc(100% + 6px)", left: 0,
                    background: "var(--surface)", borderRadius: "var(--r-md)",
                    boxShadow: "var(--sh-lg)", border: "1px solid var(--line)",
                    padding: 8, minWidth: 220, textAlign: "left",
                  }}>
                    {["San Pedro de Jujuy", "Villa Carlos Paz"].map((d) => (
                      <div key={d} onClick={(e) => { e.stopPropagation(); onNavigate("destino"); setDestOpen(false); }}
                        style={{ padding: "11px 14px", borderRadius: 10, display: "flex",
                          alignItems: "center", gap: 10, color: "var(--ink)" }}
                        onMouseOver={(e) => e.currentTarget.style.background = "var(--paper)"}
                        onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                        <Icon name="pin" size={17} style={{ color: "var(--accent-strong)" }} />
                        <span style={{ fontWeight: 600, fontSize: 14.5 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </nav>

          <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate("tarifas")}>Cotizá tu viaje</button>
            <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Menú"
              style={{ display: "none", background: "none", border: "none",
                color: solid ? "var(--ink)" : "#fff" }}>
              <Icon name="menu" size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 90,
        background: "var(--ink)", color: "#fff",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform .42s cubic-bezier(.2,.7,.3,1)",
        display: "flex", flexDirection: "column", padding: "24px var(--gutter)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <BrandLogo />
          <button onClick={() => setOpen(false)} aria-label="Cerrar"
            style={{ background: "rgba(255,255,255,.1)", border: "none", color: "#fff",
              width: 46, height: 46, borderRadius: "50%", display: "grid", placeItems: "center" }}>
            <Icon name="close" size={24} />
          </button>
        </div>
        <nav style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 2 }}>
          {links.map((l, i) => (
            <button key={l.id} onClick={() => { onNavigate(l.id); setOpen(false); }}
              style={{ background: "none", border: "none", color: "#fff", textAlign: "left",
                fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 30,
                letterSpacing: "-0.02em", padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,.1)",
                display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {l.label}
              <Icon name="arrow" size={22} style={{ color: "var(--gold-soft)" }} />
            </button>
          ))}
        </nav>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <button className="btn btn-primary btn-lg" onClick={() => { onNavigate("tarifas"); setOpen(false); }}>Cotizá tu viaje</button>
          <div style={{ color: "rgba(255,255,255,.6)", fontSize: 14, display: "flex", gap: 8, alignItems: "center" }}>
            <Icon name="phone" size={16} /> (011) 4847-6467 · Rotativas
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   WHATSAPP FLOAT
   ============================================================ */
function WhatsAppFloat() {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} aria-label="WhatsApp"
      style={{ position: "fixed", right: 22, bottom: 22, zIndex: 70,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366", display: "grid", placeItems: "center",
        boxShadow: "0 12px 30px rgba(37,211,102,.5)", color: "#fff" }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/>
      </svg>
    </a>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ onNavigate }) {
  return (
    <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,.72)" }}>
      <div className="wrap wrap-wide" style={{ paddingBlock: "76px 40px" }}>
        <div className="footer-grid" style={{ display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.1fr", gap: 48 }}>
          <div>
            <BrandLogo />
            <p style={{ marginTop: 22, maxWidth: "30ch", lineHeight: 1.65, fontSize: 15.5 }}>
              Viajes de egresados y educativos con 29 años de trayectoria.
              Experiencias inolvidables, cuidadas de principio a fin.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {["Facebook", "Instagram", "YouTube"].map((s) => (
                <div key={s} title={s} style={{ width: 42, height: 42, borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,.18)", display: "grid", placeItems: "center",
                  fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 13, color: "#fff" }}>
                  {s[0]}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: 14, letterSpacing: ".14em", textTransform: "uppercase" }}>Explorar</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "grid", gap: 12, fontSize: 15.5 }}>
              {[["home","Inicio"],["empresa","La Empresa"],["destino","Destinos"],["tarifas","Tarifas"],["recursos","Recursos"]].map(([id,l]) => (
                <li key={id}><a href="#" onClick={(e)=>{e.preventDefault();onNavigate(id);}} className="foot-link">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: 14, letterSpacing: ".14em", textTransform: "uppercase" }}>Recursos</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "grid", gap: 12, fontSize: 15.5 }}>
              {["Informe de pago","Ficha médica","Solicitud de adhesión","Preguntas frecuentes"].map((l) => (
                <li key={l}><a href="#" onClick={(e)=>e.preventDefault()} className="foot-link">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: 14, letterSpacing: ".14em", textTransform: "uppercase" }}>Contacto</h4>
            <div style={{ marginTop: 18, display: "grid", gap: 16, fontSize: 14.5, lineHeight: 1.5 }}>
              <div style={{ display: "flex", gap: 11 }}>
                <Icon name="pin" size={18} style={{ color: "var(--gold-soft)", flex: "none", marginTop: 2 }} />
                <span>Av. Rivadavia 4532 — Galería Alefa (local 10)<br/>C1042AAP · C.A.B.A.</span>
              </div>
              <div style={{ display: "flex", gap: 11 }}>
                <Icon name="phone" size={18} style={{ color: "var(--gold-soft)", flex: "none", marginTop: 2 }} />
                <span>(011) 4847-6467 · Rotativas<br/>(011) 5609-6283 · WhatsApp</span>
              </div>
              <div style={{ display: "flex", gap: 11 }}>
                <Icon name="mail" size={18} style={{ color: "var(--gold-soft)", flex: "none", marginTop: 2 }} />
                <span>info@serranoturismo.com.ar</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 56, paddingTop: 26, borderTop: "1px solid rgba(255,255,255,.12)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          fontSize: 13.5, color: "rgba(255,255,255,.5)" }}>
          <span>© 2026 Serrano Turismo · Todos los derechos reservados.</span>
          <span style={{ display: "flex", gap: 22 }}>
            <a href="#" onClick={(e)=>e.preventDefault()} className="foot-link">Términos</a>
            <a href="#" onClick={(e)=>e.preventDefault()} className="foot-link">Privacidad</a>
            <span>Legajo EVT · Disp. 0000</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, BrandLogo, useReveal, Navbar, WhatsAppFloat, Footer });
