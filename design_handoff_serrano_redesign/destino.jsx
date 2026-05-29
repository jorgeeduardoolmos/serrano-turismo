/* global React, Icon */
const { useState: useStateDest } = React;

function Destino({ onNavigate }) {
  const [tab, setTab] = useStateDest("sanpedro");
  const D = {
    sanpedro: { name: "San Pedro de Jujuy", region: "Norte Argentino", days: "8 días · 7 noches" },
    carlospaz: { name: "Villa Carlos Paz", region: "Córdoba", days: "7 días · 6 noches" },
  }[tab];

  return (
    <main>
      {/* ===== HERO ===== */}
      <section style={{ position: "relative", minHeight: "82vh", display: "flex",
        alignItems: "flex-end", overflow: "hidden" }}>
        <image-slot id={`destino-hero-${tab}`} shape="rect"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          placeholder={`Foto panorámica · ${D.name}`}></image-slot>
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(21,34,45,var(--hero-dark)) 0%, rgba(21,34,45,.12) 40%, rgba(21,34,45,.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(120% 80% at 10% 100%, rgba(213,98,10,.34), transparent 55%)" }} />

        <div className="wrap wrap-wide" style={{ position: "relative",
          paddingBottom: "clamp(50px,7vh,90px)", paddingTop: "calc(var(--nav-h) + 30px)" }}>
          {/* destination switch */}
          <div style={{ display: "inline-flex", gap: 6, padding: 6, borderRadius: "var(--r-pill)",
            background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", marginBottom: 26 }}>
            {[["sanpedro","San Pedro"],["carlospaz","Carlos Paz"]].map(([id,l])=>(
              <button key={id} onClick={()=>setTab(id)} style={{
                padding: "9px 22px", borderRadius: "var(--r-pill)", border: "none",
                fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14.5,
                background: tab===id ? "#fff" : "transparent",
                color: tab===id ? "var(--ink)" : "rgba(255,255,255,.85)", transition: "all .2s" }}>{l}</button>
            ))}
          </div>
          <div style={{ color: "var(--gold-soft)", fontFamily: "var(--font-head)", fontWeight: 600,
            fontSize: 14, letterSpacing: ".18em", textTransform: "uppercase" }}>{D.region}</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(44px,7vw,88px)", marginTop: 12, lineHeight: 0.98 }}>{D.name}</h1>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <span className="chip glass"><Icon name="calendar" size={14} /> {D.days}</span>
            <span className="chip glass"><Icon name="utensils" size={14} /> Pensión completa</span>
            <span className="chip glass"><Icon name="shield" size={14} /> Médico 24 h</span>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={()=>onNavigate("tarifas")}>
              Ver tarifas <Icon name="arrow" size={19} />
            </button>
            <button className="btn btn-ghost-light btn-lg" onClick={()=>onNavigate("contacto")}>Consultar disponibilidad</button>
          </div>
        </div>
      </section>

      {/* ===== INTRO + QUICK FACTS ===== */}
      <section className="section-tight">
        <div className="wrap wrap-wide">
          <div className="intro-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span className="eyebrow">El destino</span>
              <h2 className="sec-title">Naturaleza, aventura y noches inolvidables</h2>
              <p className="sec-lead">
                Un programa completo pensado para grupos de egresados: hotelería seleccionada,
                excursiones de día completo con todos los accesos incluidos y noches temáticas en
                complejos exclusivos, siempre con coordinadores de Serrano y atención médica 24 h.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["bus","Traslados","Ida y vuelta + excursiones"],
                ["utensils","Comidas","Desayuno, almuerzo, merienda y cena"],
                ["music","Noches","Boliches y fiestas exclusivas"],
                ["wifi","Conectividad","App + WiFi en el hotel"]].map(([ic,t,s])=>(
                <div key={t} style={{ background: "var(--surface)", borderRadius: "var(--r-md)",
                  padding: 22, border: "1px solid var(--line-soft)", boxShadow: "var(--sh-sm)" }}>
                  <Icon name={ic} size={24} style={{ color: "var(--accent-strong)" }} />
                  <div style={{ marginTop: 14, fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 16 }}>{t}</div>
                  <div style={{ marginTop: 4, fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOTELES ===== */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="wrap wrap-wide">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            gap: 20, flexWrap: "wrap" }}>
            <div>
              <span className="eyebrow">Dónde se hospedan</span>
              <h2 className="sec-title">Hotelería seleccionada</h2>
            </div>
            <span className="chip gold">Todas con pensión completa</span>
          </div>
          <div className="hotel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: 24, marginTop: 46 }}>
            {[["Hotel Serrano Central","A pasos del centro","WiFi · Pileta · Comedor propio"],
              ["Complejo Las Sierras","Vista a las sierras","Salón de eventos · Quincho · Seguridad"],
              ["Hostería del Valle","Entorno natural","Áreas verdes · Fogón · Refrigerios"]].map(([n,loc,am],i)=>(
              <div key={n} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <image-slot id={`hotel-${tab}-${i}`} shape="rect" style={{ width: "100%", aspectRatio: "16/10" }}
                  placeholder={`Foto · ${n}`}></image-slot>
                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", gap: 3, color: "var(--gold)" }}>
                    {[0,1,2,3].map(s=><Icon key={s} name="star" size={15} fill />)}
                  </div>
                  <h3 style={{ fontSize: 20, marginTop: 12 }}>{n}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 8,
                    color: "var(--ink-soft)", fontSize: 14 }}>
                    <Icon name="pin" size={15} /> {loc}
                  </div>
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line-soft)",
                    fontSize: 13.5, color: "var(--muted)" }}>{am}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXCURSIONES ===== */}
      <section className="section">
        <div className="wrap wrap-wide">
          <span className="eyebrow">De día</span>
          <h2 className="sec-title">Excursiones de día completo</h2>
          <div className="exc-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr",
            gridTemplateRows: "240px 240px", gap: 20, marginTop: 46 }}>
            {[["Cerros & cascadas","Trekking guiado de día completo","exc-big",{gridRow:"span 2"}],
              ["Aventura extrema","Tirolesa, rafting y más",""],
              ["Circuito cultural","Pueblos y miradores",""],
              ["Día de complejo","Pileta, deportes y juegos",""],
              ["Excursión lacustre","Náutica y aerosilla",""]].map(([t,s,key,style],i)=>(
              <a key={i} href="#" onClick={(e)=>e.preventDefault()} className="exc-card"
                style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden",
                  boxShadow: "var(--sh-sm)", ...(style||{}) }}>
                <image-slot id={`exc-${tab}-${i}`} class="exc-img" shape="rect"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                    transition: "transform .6s cubic-bezier(.2,.7,.3,1)" }}
                  placeholder={`Foto · ${t}`}></image-slot>
                <div style={{ position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(21,34,45,.85) 100%)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 22, color: "#fff" }}>
                  <h3 style={{ color: "#fff", fontSize: i===0?26:19 }}>{t}</h3>
                  <p style={{ marginTop: 6, fontSize: 14, color: "rgba(255,255,255,.82)" }}>{s}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NOCHES ===== */}
      <section className="section" style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(90% 120% at 90% 10%, rgba(213,98,10,.32), transparent 55%)" }} />
        <div className="wrap wrap-wide" style={{ position: "relative" }}>
          <span className="eyebrow on-dark">De noche</span>
          <h2 className="sec-title" style={{ color: "#fff" }}>Las noches que no se olvidan</h2>
          <p className="sec-lead" style={{ color: "rgba(255,255,255,.78)" }}>
            Fiestas temáticas y boliches exclusivos para egresados, siempre con coordinadores y seguridad propia.
          </p>
          <div className="noche-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: 20, marginTop: 46 }}>
            {[["Fiesta de bienvenida","La primera noche que rompe el hielo de toda la promo."],
              ["Noche temática","Disfraces, shows y la mejor música en complejo privado."],
              ["Gran cierre","La fiesta final que corona el viaje, para recordar siempre."]].map(([t,s],i)=>(
              <div key={i} style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden",
                aspectRatio: "4/5" }}>
                <image-slot id={`noche-${tab}-${i}`} shape="rect"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  placeholder={`Foto noche · ${t}`}></image-slot>
                <div style={{ position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(21,34,45,.1) 30%, rgba(21,34,45,.9) 100%)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 26, color: "#fff" }}>
                  <Icon name="music" size={24} style={{ color: "var(--gold-soft)" }} />
                  <h3 style={{ color: "#fff", fontSize: 22, marginTop: 12 }}>{t}</h3>
                  <p style={{ marginTop: 8, fontSize: 14.5, color: "rgba(255,255,255,.82)", lineHeight: 1.5 }}>{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="wrap wrap-wide" style={{ textAlign: "center", display: "flex",
          flexDirection: "column", alignItems: "center" }}>
          <span className="eyebrow centered">¿Listos para viajar?</span>
          <h2 className="sec-title" style={{ maxWidth: "22ch", textAlign: "center" }}>
            Pedí la cotización para {D.name} y armá el viaje de tu promo
          </h2>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn btn-primary btn-lg" onClick={()=>onNavigate("tarifas")}>
              Ver tarifas y planes <Icon name="arrow" size={19} />
            </button>
            <button className="btn btn-outline btn-lg" onClick={()=>onNavigate("contacto")}>Hablar con un asesor</button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Destino });
