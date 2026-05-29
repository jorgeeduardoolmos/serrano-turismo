/* global React, Icon */
const { useState: useStateMisc } = React;

function PageHeader({ eyebrow, title, lead }) {
  return (
    <section style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden",
      paddingTop: "var(--nav-h)" }}>
      <div style={{ position: "absolute", inset: 0,
        background: "radial-gradient(90% 120% at 85% 0%, rgba(213,98,10,.36), transparent 55%)" }} />
      <div className="wrap wrap-wide" style={{ position: "relative", paddingBlock: "clamp(50px,7vw,90px)" }}>
        <span className="eyebrow on-dark">{eyebrow}</span>
        <h1 style={{ color: "#fff", fontSize: "clamp(38px,5.5vw,68px)", marginTop: 16, maxWidth: "16ch" }}>{title}</h1>
        {lead && <p style={{ color: "rgba(255,255,255,.82)", fontSize: 19, marginTop: 18, maxWidth: "54ch" }}>{lead}</p>}
      </div>
    </section>
  );
}

/* ============ EMPRESA ============ */
function Empresa({ onNavigate }) {
  return (
    <main>
      <PageHeader eyebrow="La empresa" title="29 años haciendo viajes inolvidables"
        lead="Somos los mismos que iniciamos Serrano. Esa continuidad es nuestra mayor garantía." />
      <section className="section">
        <div className="wrap wrap-wide">
          <div className="empresa-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <image-slot id="empresa-foto" shape="rounded" radius="26"
              style={{ width: "100%", aspectRatio: "4/3", boxShadow: "var(--sh-lg)" }}
              placeholder="Foto del equipo Serrano"></image-slot>
            <div>
              <span className="eyebrow">Nuestra historia</span>
              <h2 className="sec-title">Una familia que se dedica a cuidar tu viaje</h2>
              <p className="sec-lead">
                Desde nuestras oficinas en CABA y Parque Leloir coordinamos cada salida con equipo propio:
                coordinadores, choferes, médicos y asistentes que conocen cada destino de memoria.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
                {[["96.418","pasajeros transportados"],["3.714","grupos viajaron con Serrano"],
                  ["15","destinos educativos"],["471","colegios nos eligieron"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="kicker-num" style={{ fontSize: 38, color: "var(--accent-strong)" }}>{n}</div>
                    <div style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand onNavigate={onNavigate} />
    </main>
  );
}

/* ============ RECURSOS ============ */
function Recursos({ onNavigate }) {
  const [open, setOpen] = useStateMisc(0);
  const faqs = [
    ["¿Cómo completo mi solicitud de adhesión?", "Ingresás al portal de clientes con los datos del pasajero y completás el formulario en pocos minutos. Te llega una confirmación por mail."],
    ["¿Cómo registro mis pagos?", "Desde la sección Informe de pago cargás el comprobante y queda registrado automáticamente en tu cuenta."],
    ["¿Cómo cargo la ficha médica de mi hijo?", "En la sección Ficha médica completás los datos de salud y cobertura. Es obligatoria antes del viaje."],
    ["¿Qué incluye la pensión completa?", "Desayuno, almuerzo, merienda y cena, más estaciones de refrigerio en hotel y excursiones."],
  ];
  return (
    <main>
      <PageHeader eyebrow="Clientes / Pasajeros" title="Recursos para nuestros clientes"
        lead="Todo lo que necesitás antes, durante y después del viaje, en un solo lugar." />
      <section className="section">
        <div className="wrap wrap-wide">
          <div className="recursos-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {[["mail","Informe de pago","Registrá y consultá tus pagos"],
              ["shield","Ficha médica","Cargá los datos de salud del pasajero"],
              ["check","Solicitud de adhesión","Sumate a un viaje en minutos"]].map(([ic,t,s])=>(
              <a key={t} href="#" onClick={(e)=>e.preventDefault()} className="card"
                style={{ padding: 30, display: "block", transition: "transform .3s" }}
                onMouseOver={(e)=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseOut={(e)=>e.currentTarget.style.transform="none"}>
                <div style={{ width: 54, height: 54, borderRadius: 15, background: "var(--accent-tint)",
                  display: "grid", placeItems: "center", color: "var(--accent-strong)" }}>
                  <Icon name={ic} size={26} />
                </div>
                <h3 style={{ fontSize: 20, marginTop: 20 }}>{t}</h3>
                <p style={{ marginTop: 8, color: "var(--ink-soft)", fontSize: 15 }}>{s}</p>
                <div style={{ marginTop: 18, color: "var(--accent-strong)", fontFamily: "var(--font-head)",
                  fontWeight: 700, fontSize: 14.5, display: "flex", alignItems: "center", gap: 8 }}>
                  Acceder <Icon name="arrow" size={17} />
                </div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 72, maxWidth: 820, marginInline: "auto" }}>
            <h2 className="sec-title" style={{ textAlign: "center", marginInline: "auto" }}>Preguntas frecuentes</h2>
            <div style={{ marginTop: 36, display: "grid", gap: 12 }}>
              {faqs.map(([q,a],i)=>(
                <div key={i} className="card" style={{ boxShadow: "var(--sh-sm)" }}>
                  <button onClick={()=>setOpen(open===i?-1:i)} style={{ width: "100%", background: "none",
                    border: "none", padding: "22px 26px", display: "flex", justifyContent: "space-between",
                    alignItems: "center", gap: 16, textAlign: "left" }}>
                    <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>{q}</span>
                    <span style={{ flex: "none", color: "var(--accent-strong)", transform: open===i?"rotate(180deg)":"none",
                      transition: "transform .3s" }}><Icon name="chevron" size={22} /></span>
                  </button>
                  <div style={{ maxHeight: open===i?200:0, overflow: "hidden", transition: "max-height .35s ease" }}>
                    <p style={{ padding: "0 26px 24px", color: "var(--ink-soft)", fontSize: 15.5, lineHeight: 1.6 }}>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand onNavigate={onNavigate} />
    </main>
  );
}

/* ============ CONTACTO ============ */
function Contacto() {
  return (
    <main>
      <PageHeader eyebrow="Contacto" title="Hablemos del viaje de tu promo"
        lead="Escribinos y un asesor te arma una propuesta a medida, sin compromiso." />
      <section className="section">
        <div className="wrap wrap-wide">
          <div className="contacto-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56 }}>
            <div>
              <div style={{ display: "grid", gap: 24 }}>
                {[["pin","Oficinas","Av. Rivadavia 4532 — Galería Alefa (local 10), C.A.B.A. · Del Cimarrón 1846, Parque Leloir"],
                  ["phone","Teléfonos","(011) 4847-6467 (Rotativas) · (011) 5609-6283 (WhatsApp)"],
                  ["mail","Mail","info@serranoturismo.com.ar"]].map(([ic,t,s])=>(
                  <div key={t} style={{ display: "flex", gap: 16 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, flex: "none", background: "var(--accent-tint)",
                      display: "grid", placeItems: "center", color: "var(--accent-strong)" }}>
                      <Icon name={ic} size={24} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 17 }}>{t}</div>
                      <div style={{ marginTop: 5, color: "var(--ink-soft)", fontSize: 15.5, lineHeight: 1.55 }}>{s}</div>
                    </div>
                  </div>
                ))}
              </div>
              <image-slot id="contacto-mapa" shape="rounded" radius="20"
                style={{ width: "100%", aspectRatio: "16/10", marginTop: 30 }}
                placeholder="Mapa de ubicación"></image-slot>
            </div>

            <form className="card" onSubmit={(e)=>e.preventDefault()} style={{ padding: 36 }}>
              <h3 style={{ fontSize: 24 }}>Pedí tu cotización</h3>
              <p style={{ marginTop: 8, color: "var(--ink-soft)", fontSize: 15 }}>Te respondemos dentro de las 24 h hábiles.</p>
              <div style={{ display: "grid", gap: 16, marginTop: 26 }}>
                {[["Nombre y apellido","text"],["Email","email"],["Teléfono / WhatsApp","tel"],["Colegio / Promo","text"]].map(([l,t])=>(
                  <label key={l} style={{ display: "block" }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-soft)" }}>{l}</span>
                    <input type={t} style={{ width: "100%", marginTop: 7, padding: "13px 16px",
                      borderRadius: "var(--r-sm)", border: "1.5px solid var(--line)", fontSize: 15.5,
                      fontFamily: "var(--font-body)", background: "var(--paper)", outline: "none" }}
                      onFocus={(e)=>e.target.style.borderColor="var(--accent)"}
                      onBlur={(e)=>e.target.style.borderColor="var(--line)"} />
                  </label>
                ))}
                <label style={{ display: "block" }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-soft)" }}>Destino de interés</span>
                  <select style={{ width: "100%", marginTop: 7, padding: "13px 16px", borderRadius: "var(--r-sm)",
                    border: "1.5px solid var(--line)", fontSize: 15.5, fontFamily: "var(--font-body)",
                    background: "var(--paper)", outline: "none" }}>
                    <option>San Pedro de Jujuy</option>
                    <option>Villa Carlos Paz</option>
                    <option>Aún no lo decidí</option>
                  </select>
                </label>
              </div>
              <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 24 }}>
                Enviar consulta <Icon name="arrow" size={19} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function CtaBand({ onNavigate }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap wrap-wide">
        <div style={{ borderRadius: "var(--r-xl)", background: "linear-gradient(120deg, var(--brand-strong), var(--brand) 60%, var(--gold) 130%)",
          padding: "clamp(40px,5vw,64px)", color: "#fff", textAlign: "center", boxShadow: "var(--sh-lg)" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(28px,3.6vw,42px)", maxWidth: "20ch", marginInline: "auto" }}>
            ¿Querés empezar a planear el viaje?
          </h2>
          <div style={{ display: "flex", gap: 14, marginTop: 28, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-lg" style={{ background: "#fff", color: "var(--brand-strong)" }}
              onClick={()=>onNavigate("tarifas")}>Ver tarifas</button>
            <button className="btn btn-lg" style={{ background: "rgba(255,255,255,.14)", color: "#fff",
              border: "1.5px solid rgba(255,255,255,.5)" }} onClick={()=>onNavigate("contacto")}>Contactar</button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Empresa, Recursos, Contacto });
