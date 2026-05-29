# Handoff — Rediseño Serrano Turismo

> Paquete de implementación para Claude Code.
> Stack destino: **Next.js 14 (App Router, TypeScript)** + **Tailwind CSS**.

---

## 1. Overview

Refactor visual completo del sitio de **Serrano Turismo** (turismo de egresados, Argentina).
El objetivo es una identidad de marca fuerte, moderna y profesional, manteniendo la
estructura de archivos de Next.js App Router y **sin tocar los endpoints del backend ni la
lógica de fetch**.

El rediseño cubre: sistema de tokens, Navbar con transición al scroll, Footer, cards de
hoteles/excursiones/noches, hero de cada destino, Home, página de Tarifas (la más
interactiva) y consistencia mobile.

---

## 2. Sobre los archivos de diseño (LEER PRIMERO)

Los archivos de esta carpeta (`*.html`, `*.jsx`, `styles.css`) son **referencias de diseño
creadas en HTML** — un prototipo que muestra el aspecto y comportamiento deseados. **No son
código de producción para copiar tal cual.**

La tarea es **recrear estos diseños en el codebase de Next.js existente**, usando sus
patrones y convenciones (App Router, Server/Client Components, TypeScript, Tailwind). El JSX
del prototipo usa React clásico con estilos inline y un par de scaffoldings de prototipo que
**NO van a producción**:

- `tweaks-panel.jsx` → panel de tweaks del prototipo. **Descartar.**
- `image-slot.js` → placeholders de imagen drag-and-drop. **Reemplazar** por `next/image`
  apuntando a `/public/assets/...`.
- Los `Object.assign(window, {...})` y los `useStateXxx` renombrados son artefactos del
  entorno de prototipo. En Next.js usá imports/exports normales.

El prototipo es un **SPA con routing por estado** (`route` en `app.jsx`). En Next.js esto se
traduce a **rutas reales del App Router** (ver §6).

---

## 3. Fidelidad

**Alta fidelidad (hi-fi).** Colores, tipografía, espaciado, sombras y radios son finales y
están en §5. Recrear pixel-perfect con Tailwind. Donde hay placeholders de imagen, usar las
fotos reales de `/public/assets/`.

---

## 4. Tipografía

Cargar con `next/font/google`:

- **Headings:** `Montserrat` — pesos 600, 700, 800. (Tweakable en el proto a Poppins/Archivo;
  para producción usar **Montserrat**.)
- **Body:** `Source Sans 3` — pesos 400, 500, 600, 700.

```ts
// app/layout.tsx
import { Montserrat, Source_Sans_3 } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"], weight: ["600","700","800"], variable: "--font-head" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-body" });
// <html className={`${montserrat.variable} ${sourceSans.variable}`}>
```

Escala tipográfica (todos los headings: `font-weight` segun se indique, `line-height: 1.04`,
`letter-spacing: -0.02em`):

| Rol | Tamaño | Weight |
|---|---|---|
| Hero H1 | `clamp(46px, 8vw, 104px)`, line-height 0.98 | 800 |
| Section title (`.sec-title`) | `clamp(30px, 4.4vw, 52px)` | 800 |
| Page header H1 | `clamp(38px, 5.5vw, 68px)` | 800 |
| Card title H3 | 19–34px segun contexto | 800 |
| Eyebrow | 13px, `letter-spacing: 0.22em`, uppercase | 700 |
| Body / lead | `clamp(17px, 1.4vw, 19px)`, line-height 1.6–1.65 | 400–500 |
| Body base | 17px (16px en mobile) | 400 |

---

## 5. Design tokens

Definir como CSS variables en `globals.css` **y** mapear en `tailwind.config.ts`.

### Colores

| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#15222D` | Navy slate profundo — texto principal, superficies oscuras, footer, navbar scrolled |
| `--ink-2` | `#1E303D` | Hover de superficies oscuras |
| `--ink-3` | `#2B3E4B` | — |
| `--ink-soft` | `#51626D` | Texto secundario |
| `--muted` | `#6E7C86` | Texto terciario / metadatos |
| `--brand` (accent) | `#ED7A1A` | Naranja primario — CTAs, acentos |
| `--brand-strong` | `#D5620A` | Naranja oscuro — hover, gradientes, eyebrow |
| `--brand-deep` | `#B14E05` | Texto sobre tint naranja |
| `--brand-tint` | `#FDEEDD` | Fondo suave de iconos/chips naranja |
| `--gold` | `#C49A3D` | Dorado — CTA secundario, estrellas, detalles |
| `--gold-soft` | `#E7D6AC` | Dorado claro sobre fondo oscuro (eyebrow on-dark, acentos) |
| `--gold-deep` | `#9E7A26` | Texto/gradiente dorado |
| `--paper` | `#FBF8F3` | Off-white cálido — fondo del body |
| `--paper-2` | `#F4EEE4` | Fondo de secciones alternas |
| `--surface` | `#FFFFFF` | Cards |
| `--line` | `rgba(21,34,45,0.10)` | Bordes |
| `--line-soft` | `rgba(21,34,45,0.06)` | Bordes sutiles |

> Nota color: la instrucción original mencionaba "navy + dorado", pero la marca real de
> Serrano es **naranja + gris**. La solución adoptada: **naranja primario + navy slate como
> ancla institucional + dorado para CTAs/detalles**. Confirmar con el cliente si se quiere
> empujar más hacia el navy.

### Radios (`soft`, default)

`--r-xs: 8px` · `--r-sm: 12px` · `--r-md: 18px` · `--r-lg: 26px` · `--r-xl: 36px` · pill: `999px`

### Sombras

| Token | Valor |
|---|---|
| `--sh-sm` | `0 1px 2px rgba(21,34,45,.06), 0 2px 8px rgba(21,34,45,.05)` |
| `--sh-md` | `0 6px 18px rgba(21,34,45,.08), 0 2px 6px rgba(21,34,45,.05)` |
| `--sh-lg` | `0 24px 60px rgba(21,34,45,.16), 0 8px 20px rgba(21,34,45,.08)` |
| `--sh-brand` | `0 14px 34px rgba(213,98,10,.32)` (sombra naranja de botón) |

### Layout

- `--maxw: 1200px` (contenedor estándar `.wrap`), `1340px` para `.wrap-wide`.
- `--gutter: clamp(20px, 5vw, 64px)` (padding lateral del contenedor).
- `--nav-h: 78px` (66px en mobile ≤820px).
- Padding de sección: `clamp(64px, 9vw, 128px)` vertical; tight: `clamp(48px, 6vw, 84px)`.

### Mapeo Tailwind sugerido

```ts
// tailwind.config.ts → theme.extend
colors: {
  ink: { DEFAULT:"#15222D", 2:"#1E303D", 3:"#2B3E4B", soft:"#51626D" },
  brand: { DEFAULT:"#ED7A1A", strong:"#D5620A", deep:"#B14E05", tint:"#FDEEDD" },
  gold: { DEFAULT:"#C49A3D", soft:"#E7D6AC", deep:"#9E7A26" },
  paper: { DEFAULT:"#FBF8F3", 2:"#F4EEE4" },
  muted: "#6E7C86",
},
fontFamily: { head:["var(--font-head)"], body:["var(--font-body)"] },
borderRadius: { xs:"8px", sm:"12px", md:"18px", lg:"26px", xl:"36px" },
boxShadow: {
  sm:"0 1px 2px rgba(21,34,45,.06), 0 2px 8px rgba(21,34,45,.05)",
  md:"0 6px 18px rgba(21,34,45,.08), 0 2px 6px rgba(21,34,45,.05)",
  lg:"0 24px 60px rgba(21,34,45,.16), 0 8px 20px rgba(21,34,45,.08)",
  brand:"0 14px 34px rgba(213,98,10,.32)",
},
maxWidth: { wrap:"1200px", wide:"1340px" },
```

---

## 6. Rutas (App Router)

El prototipo es un SPA; mapear cada `route` a una ruta real:

| `route` en proto | Ruta Next.js | Archivo proto |
|---|---|---|
| `home` | `/` | `home.jsx` |
| `destino` | `/destinos` (con tabs San Pedro / Carlos Paz) | `destino.jsx` |
| `tarifas` | `/tarifas` | `tarifas.jsx` |
| `empresa` | `/la-empresa` | `misc.jsx` → `Empresa` |
| `recursos` | `/recursos` | `misc.jsx` → `Recursos` |
| `contacto` | `/contacto` | `misc.jsx` → `Contacto` |

`Navbar`, `Footer` y `WhatsAppFloat` van en `app/layout.tsx` (envolviendo `{children}`).
El menú de Destinos del navbar abre dropdown con "San Pedro de Jujuy" y "Villa Carlos Paz",
ambos llevan a `/destinos`.

> Los tabs de destino (San Pedro/Carlos Paz) en `/destinos` y `/tarifas` pueden ser estado
> local (`useState`) o query param (`?destino=sanpedro`). Recomiendo query param para que sea
> linkeable y SSR-friendly. **No cambia la lógica de fetch existente.**

---

## 7. Componentes globales

### Navbar (`components.jsx` → `Navbar`) — Client Component
- Fixed top, altura `--nav-h`, `z-index: 80`.
- **Transición al scroll:** transparente sobre el hero; al pasar `scrollY > 40` → fondo
  `rgba(251,248,243,.86)` + `backdrop-filter: saturate(180%) blur(16px)` + borde inferior
  `--line` + sombra `0 4px 24px rgba(21,34,45,.05)`. Transición 0.35s.
- En páginas **sin** hero a sangre (tarifas, empresa, recursos, contacto) el navbar arranca
  sólido (`transparentTop=false`).
- Logo a la izquierda; texto del logo blanco sobre hero, navy cuando es sólido.
- Links centro: Inicio, La Empresa, Destinos (dropdown ▾), Tarifas, Recursos, Contacto.
  Link activo: subrayado naranja 2.5px abajo.
- CTA derecha: botón `btn-primary btn-sm` "Cotizá tu viaje".
- **Mobile (≤820px):** se ocultan links y CTA; aparece botón hamburguesa → overlay full-screen
  navy (`--ink`) deslizando desde la derecha (`translateX`, 0.42s). Links grandes (30px) con
  separadores, CTA abajo + teléfono. Bloquea scroll del body cuando está abierto.

### Footer (`components.jsx` → `Footer`)
- Fondo `--ink`, texto `rgba(255,255,255,.72)`.
- Grid 4 columnas (`1.4fr 1fr 1fr 1.1fr`, gap 48px): (1) logo + tagline + redes,
  (2) Explorar, (3) Recursos, (4) Contacto con iconos.
- En ≤1024px pasa a 2 columnas; redes como círculos de 42px con inicial.
- Barra inferior: copyright + Términos/Privacidad + Legajo EVT.

### WhatsAppFloat (`components.jsx` → `WhatsAppFloat`)
- Fixed `right:22 bottom:22`, `z-index:70`, círculo 60px verde `#25D366`,
  sombra `0 12px 30px rgba(37,211,102,.5)`. **Mantener** (requisito). Linkear a wa.me real.

### BrandLogo (`components.jsx` → `BrandLogo`)
- Badge circular naranja con "ST" + wordmark "SERRANO / TURISMO". **Es un placeholder
  original**, no el logo real. Reemplazar por el SVG/PNG de marca de `/public/assets/`.
- Prop `dark` cambia el color del texto (navy vs blanco).

### Botones (`.btn` en `styles.css`)
Base: `inline-flex`, gap 10px, font-head 700, 15px, `border-radius: pill`, padding `15px 28px`,
transición de transform/shadow. Variantes:
- `btn-primary`: gradiente `--brand → --brand-strong`, texto blanco, `--sh-brand`. Hover: sube 2px.
- `btn-gold`: gradiente `--gold → --gold-deep`, blanco.
- `btn-dark`: `--ink`, blanco.
- `btn-ghost-light`: `rgba(255,255,255,.10)` + borde blanco + blur (sobre hero).
- `btn-outline`: transparente + borde `--line`, texto ink.
- Tamaños: `btn-lg` (18×34, 16px), `btn-sm` (11×20, 13.5px).

### Iconos (`components.jsx` → `Icon`)
Set de line-icons inline (stroke `currentColor`, 1.8). En Next.js reemplazar por
**lucide-react** (mismos nombres aprox: chevron-down, arrow-right, menu, x, phone, mail,
map-pin, star, check, calendar, users, bus, shield, utensils, music, mountain, etc.).

---

## 8. Pantallas

### 8.1 HOME (`/`)
1. **Hero** — full viewport (`min-height: 100vh`), imagen de fondo (`/public/assets` — grupo de
   egresados) con doble overlay: gradiente vertical navy (top `var(--hero-dark)=.55` → 18% →
   bottom .82) + glow radial naranja abajo-izquierda. Contenido alineado abajo: chip "29 años
   de experiencias inolvidables", H1 "El viaje que nunca van a olvidar." (última palabra en
   `--gold-soft`), lead, dos CTAs (`btn-primary` "Viajes de egresados" + `btn-ghost-light`
   "Viajes educativos").
2. **Trust strip** — banda `--ink`, 4 items con icono dorado: Atención médica 24h · Flota
   propia · Coordinadores en cada grupo · Pensión completa. (2 cols en mobile.)
3. **Destinos** — heading "Dos lugares, una experiencia inolvidable" + 2 **mega-cards**
   (`aspect-ratio 4/5`, radio xl): imagen de fondo + overlay navy inferior + chip glass arriba
   + región (dorado) + nombre 34px + blurb + footer con temporada y "Ver destino →". Hover:
   sube 6px y la imagen hace `scale(1.06)`. Llevan a `/destinos`.
4. **Por qué elegirnos** — fondo `--paper-2` con textura de puntos; grid 2 col: izquierda
   copy + 2 botones; derecha card blanca con **4 stats con count-up animado** (Intersection
   Observer, ease-out cubic, 1.4s): 29 años, 100.000+ egresados, 2 destinos, 471 colegios.
5. **Fortalezas** — heading centrado + grid 3×2 de StrengthCards (icono en cuadrado naranja
   con gradiente, título, texto). Hover: sube 4px. 6 items: Plan de alimentación, Seguridad &
   app, Logística propia, Excursiones curadas, Noches temáticas, Acompañamiento total.
6. **Testimonios** — banda `--ink`; izquierda: 5 estrellas doradas + "4,6" 64px + "253
   opiniones" + `btn-gold`; derecha: 4 cards de quote semitransparentes.
7. **CTA band** — bloque con gradiente naranja→dorado, textura de puntos, heading + 2 botones
   (blanco sólido + ghost). Lleva a `/tarifas` y `/contacto`.

### 8.2 DESTINOS (`/destinos`)
- **Hero** (82vh) con **switch de pestañas** San Pedro / Carlos Paz (pill glass, cambia
  `tab`). Región (dorado) + nombre 88px + chips (días/noches, pensión, médico) + 2 CTAs.
- **Intro + quick facts** — grid: copy + 4 mini-cards (Traslados, Comidas, Noches,
  Conectividad).
- **Hotelería** (fondo paper-2) — grid 3 cards: imagen 16/10 + estrellas + nombre + ubicación
  + amenities.
- **Excursiones** — **mosaico bento**: grid `1.6fr 1fr 1fr`, 2 filas de 240px; la primera card
  ocupa 2 filas (`grid-row: span 2`). Cada card: imagen + overlay inferior + título + subtítulo.
  Hover: imagen scale. En mobile colapsa a 1 columna.
- **Noches** — banda `--ink` + glow naranja; grid 3 cards `aspect 4/5`: imagen + overlay +
  icono música dorado + título + texto.
- **CTA** centrado.

> Contenido por destino (nombre, región, días/noches) está en el objeto `D` dentro de
> `destino.jsx`. Hotel/excursión/noche son contenido de ejemplo — reemplazar por data real.

### 8.3 TARIFAS (`/tarifas`) — la más interactiva
- **Header** navy con glow + eyebrow + H1 "Elegí destino, elegí cómo pagarlo".
- **Switch de destino** — barra paper-2 sticky-ish con pills (San Pedro / Carlos Paz).
- **Price builder** — grid 2 col:
  - **Izquierda:** selector de **planes de pago** (grid 2×2 de cards radio): Contado (12% OFF),
    3 cuotas, 6 cuotas (badge POPULAR), 12 cuotas. Card activa: borde naranja 2px + fondo tint
    + sube 2px + radio relleno.
  - **Derecha (sticky):** **price hero card** navy con glow. Muestra región + nombre + chip
    días/noches; precio grande con **count-up animado al cambiar plan/destino** (0.6s ease-out):
    si Contado → precio final + ahorro; si cuotas → "N cuotas de $X" + total. Lista de incluidos
    con checks dorados. CTA `btn-primary` full-width "Reservar este plan".
- **Itinerario** (fondo paper-2) — grid 4 cards día a día: cabecera con gradiente naranja +
  número gigante semitransparente + rango de días; cuerpo con título + texto.

**Lógica de precios** (en `TARIFA_DATA` y `PLANES` de `tarifas.jsx`):
```
total   = base_destino × multiplicador_plan
perCuota= total / nº_cuotas
Contado: mult 0.88 (ahorro = base − total)
3: 1.00 · 6: 1.06 · 12: 1.14
San Pedro base 685000 (8d/7n) · Carlos Paz base 598000 (7d/6n)
```
> Precios de **referencia** del prototipo. Conectar a los valores/endpoint reales sin cambiar
> la lógica de fetch.

### 8.4 LA EMPRESA (`/la-empresa`)
- PageHeader navy + sección: imagen + copy "Una familia que se dedica a cuidar tu viaje" + grid
  de 4 stats (96.418 pasajeros, 3.714 grupos, 15 destinos educativos, 471 colegios) + CtaBand.

### 8.5 RECURSOS (`/recursos`)
- PageHeader + 3 cards de acción (Informe de pago, Ficha médica, Solicitud de adhesión) +
  **acordeón de FAQ** (max-height transition 0.35s, chevron que rota). Linkear cards a los
  flujos reales existentes.

### 8.6 CONTACTO (`/contacto`)
- PageHeader + grid 2 col: izquierda datos (oficinas, teléfonos, mail con iconos) + placeholder
  de mapa; derecha **formulario** (nombre, email, teléfono, colegio/promo, select destino, CTA).
  Cablear submit al flujo real; mantener datos de contacto actuales.

---

## 9. Interacciones y animaciones

| Interacción | Detalle |
|---|---|
| Navbar scroll | listener `scroll` passive; toggle estado en `scrollY > 40`; transición 0.35s |
| Count-up stats | IntersectionObserver (threshold 0.5), ease-out cubic, 1400ms; dispara una vez |
| Precio animado (Tarifas) | rAF 600ms ease-out al cambiar `plan`/`dest`; formato `es-AR` |
| Hover cards destino/excursión | `translateY(-6px)` + imagen `scale(1.06)`, 0.4–0.6s cubic-bezier(.2,.7,.3,1) |
| Hover botones | `translateY(-2px)` + sombra reforzada |
| Menú mobile | overlay `translateX(100%→0)`, 0.42s; bloquea scroll body |
| FAQ acordeón | `max-height` 0→200px, 0.35s; chevron `rotate(180deg)` |
| Reveal on scroll | `.reveal` opacity 0 + `translateY(26px)` → `.in` via IntersectionObserver |
| `prefers-reduced-motion` | desactiva animaciones y reveal |

Easing estándar del proyecto: `cubic-bezier(.2,.7,.3,1)`.

---

## 10. Estado

- `Navbar`: `scrolled` (bool), `open` (mobile menu), `destOpen` (dropdown).
- `/destinos`: `tab` ∈ {`sanpedro`,`carlospaz`}.
- `/tarifas`: `dest` ∈ {`sanpedro`,`carlospaz`}, `plan` ∈ {`contado`,`3`,`6`,`12`}; precio
  derivado.
- `/recursos`: `open` (índice de FAQ abierto).
- **Sin data fetching nuevo.** Reusar los endpoints existentes; los datos hardcodeados del
  proto (precios, hoteles, itinerarios) deben venir del backend actual.

---

## 11. Responsive (breakpoints)

| Breakpoint | Cambios clave |
|---|---|
| ≤1024px | footer 2 col; grids 2-col (why/price/empresa/intro/contacto pasan a 1 col); price card deja de ser sticky; mosaico excursiones 2 col |
| ≤820px | navbar → hamburguesa + overlay; `--nav-h: 66px`; destinos/stats/testimonios 1 col; trust 2 col |
| ≤560px | casi todo 1 col; body 16px; `.sec-title` reducido |

En Tailwind: usar `lg:` / `md:` / `sm:` equivalentes. El proto usa media queries en
`styles.css` (sección RESPONSIVE) como referencia exacta.

---

## 12. Assets

- **Fotos:** usar las existentes en `/public/assets/`. En el proto son placeholders
  (`<image-slot>`); en producción → `next/image` con `fill` + `object-cover` para heros y
  cards. Lugares que piden foto: hero home, 2 cards destino, hero destinos (×2), 3 hoteles,
  5 excursiones, 3 noches, foto equipo (empresa), mapa (contacto).
- **Logo:** reemplazar `BrandLogo` por el logo real de Serrano.
- **Iconos:** migrar `Icon` → `lucide-react`.
- **WhatsApp/redes:** linkear a las URLs reales (mantener WhatsApp flotante).

---

## 13. Restricciones (del brief original)

- Mantener estructura Next.js App Router + TypeScript.
- **No** cambiar endpoints del backend ni la lógica de fetch.
- Imágenes desde `/public/assets/`.
- Mantener WhatsApp flotante y datos de contacto actuales.
- Deployable en Vercel sin cambios de config.

---

## 14. Archivos de esta carpeta

| Archivo | Qué contiene |
|---|---|
| `Serrano Turismo - Rediseño.html` | Punto de entrada del prototipo (carga fuentes + scripts) |
| `styles.css` | **Tokens + estilos base + responsive** — fuente de verdad del diseño |
| `components.jsx` | Icon, BrandLogo, Navbar, Footer, WhatsAppFloat, useReveal |
| `home.jsx` | Home (hero, destinos, stats, fortalezas, testimonios, CTA) |
| `destino.jsx` | Página de destino (hero, hoteles, excursiones, noches) |
| `tarifas.jsx` | Tarifas (selector destino/plan, price card, itinerario) + lógica de precios |
| `misc.jsx` | Empresa, Recursos (FAQ), Contacto (form) |
| `app.jsx` | Router por estado + integración de Tweaks (prototipo) |
| `tweaks-panel.jsx`, `image-slot.js` | Scaffolding de prototipo — **NO a producción** |

---

## 15. Orden de implementación sugerido

1. `globals.css` con tokens + `tailwind.config.ts` (§5) + fuentes (§4).
2. Componentes globales en `app/layout.tsx`: `Navbar`, `Footer`, `WhatsAppFloat` (§7).
3. Botones / cards reutilizables como componentes Tailwind.
4. Home (`/`) — §8.1.
5. Destinos (`/destinos`) + Tarifas (`/tarifas`) — §8.2 / §8.3 (la interactiva).
6. Empresa / Recursos / Contacto — §8.4–8.6.
7. Cablear data real (precios, itinerarios, fotos) a los endpoints existentes.
8. QA responsive (§11) y `prefers-reduced-motion`.
