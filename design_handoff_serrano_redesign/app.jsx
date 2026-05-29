/* global React, ReactDOM, Navbar, Footer, WhatsAppFloat, Home, Tarifas, Destino, Empresa, Recursos, Contacto, useReveal, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "orange",
  "headFont": "Montserrat",
  "radius": "soft",
  "heroDark": "medio"
}/*EDITMODE-END*/;

const ACCENTS = {
  orange: { a: "#ED7A1A", s: "#D5620A", t: "#FDEEDD" },
  ladrillo: { a: "#E0561F", s: "#BE3F12", t: "#FBE6DC" },
  dorado: { a: "#C49A3D", s: "#9E7A26", t: "#F6EDD6" },
};
const HEAD_FONTS = {
  Montserrat: "'Montserrat', system-ui, sans-serif",
  Poppins: "'Poppins', system-ui, sans-serif",
  Archivo: "'Archivo', system-ui, sans-serif",
};
const RADII = {
  soft: { xs: "8px", sm: "12px", md: "18px", lg: "26px", xl: "36px" },
  sharp: { xs: "3px", sm: "4px", md: "6px", lg: "8px", xl: "10px" },
};
const HERO_DARK = { suave: ".35", medio: ".55", alto: ".72" };

function App() {
  const [route, setRoute] = useStateApp("home");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // apply tweaks to CSS vars
  useEffectApp(() => {
    const r = document.documentElement.style;
    const ac = ACCENTS[t.accent] || ACCENTS.orange;
    r.setProperty("--accent", ac.a);
    r.setProperty("--accent-strong", ac.s);
    r.setProperty("--accent-tint", ac.t);
    r.setProperty("--font-head", HEAD_FONTS[t.headFont] || HEAD_FONTS.Montserrat);
    const rad = RADII[t.radius] || RADII.soft;
    r.setProperty("--r-xs", rad.xs); r.setProperty("--r-sm", rad.sm);
    r.setProperty("--r-md", rad.md); r.setProperty("--r-lg", rad.lg);
    r.setProperty("--r-xl", rad.xl);
    r.setProperty("--hero-dark", HERO_DARK[t.heroDark] || HERO_DARK.medio);
  }, [t]);

  const navigate = (id) => {
    setRoute(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const transparentTop = route === "home" || route === "destino";

  const pages = {
    home: <Home onNavigate={navigate} />,
    destino: <Destino onNavigate={navigate} />,
    tarifas: <Tarifas onNavigate={navigate} />,
    empresa: <Empresa onNavigate={navigate} />,
    recursos: <Recursos onNavigate={navigate} />,
    contacto: <Contacto onNavigate={navigate} />,
  };

  return (
    <div className="app-root">
      <Navbar route={route} onNavigate={navigate} transparentTop={transparentTop} />
      {pages[route] || pages.home}
      <Footer onNavigate={navigate} />
      <WhatsAppFloat />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color de marca" />
        <TweakColor label="Acento" value={ACCENTS[t.accent].a}
          options={[ACCENTS.orange.a, ACCENTS.ladrillo.a, ACCENTS.dorado.a]}
          onChange={(v) => {
            const key = Object.keys(ACCENTS).find((k) => ACCENTS[k].a === v) || "orange";
            setTweak("accent", key);
          }} />
        <TweakSection label="Tipografía de títulos" />
        <TweakRadio label="Fuente" value={t.headFont}
          options={["Montserrat", "Poppins", "Archivo"]}
          onChange={(v) => setTweak("headFont", v)} />
        <TweakSection label="Estilo" />
        <TweakRadio label="Esquinas" value={t.radius}
          options={["soft", "sharp"]} onChange={(v) => setTweak("radius", v)} />
        <TweakRadio label="Oscurecer hero" value={t.heroDark}
          options={["suave", "medio", "alto"]} onChange={(v) => setTweak("heroDark", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
