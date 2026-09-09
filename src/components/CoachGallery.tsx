import { useState } from "react";

const TEAM = [
  {
    src: "/coach-1-1.jpg",
    hoverSrc: "/coach-1-2.jpg",
    name: "Renzo Loayza",
    role: "Head Coach",
    description: ["Fundador y entrenador principal, es", "quien dirige nuestro cuerpo técnico."],
  },
  {
    src: "/coach-2-1.jpg",
    hoverSrc: "/coach-2-2.jpg",
    name: "Daniel Hutchinson",
    role: "Entrenador",
    description: ["Seguimiento individual, evolución", "y progreso técnico en cada sesión."],
  },
  {
    src: "/coach-3-1.jpg",
    hoverSrc: "/coach-3-2.jpg",
    name: "Josnne Mariño",
    role: "Preparador Físico",
    description: ["Acondicionamiento físico y prevención", "de lesiones para cada categoría."],
  },
];

// Escala con el ancho real del navegador (no del contenedor), igual que el
// Footer: crece de forma continua en todo el rango de escritorio en vez de
// saltar entre 2-3 tamaños fijos.
const HEIGHT_SIZE = "clamp(427.6px, 227.6px + 22vw, 667.6px)";
const NAME_SIZE = "clamp(0.8rem, 0.7rem + 0.3vw, 1.05rem)";
const ROLE_SIZE = "clamp(3.4375rem, 3.0875rem + 1.6vw, 4.7875rem)";
const DESC_SIZE = "clamp(0.8rem, 0.65rem + 0.35vw, 1.05rem)";

// Tamaño real de cada SVG (su propio viewBox, en px), ajustado con varios
// cambios sucesivos (0.75 * 1.15 * 1.10 * 1.10 * 1.10).
const LOGO_SCALE = 1.1479875;
const LOGOS = [
  { src: "/logo-nivela.svg", alt: "Colegio Nivela", w: 68.57, h: 80 },
  { src: "/logo-mariareina.svg", alt: "Colegio Maria Reina", w: 50.35, h: 68.03 },
  { src: "/logo-real.svg", alt: "Colegio Real", w: 96.59, h: 80 },
  { src: "/logo-regatas.svg", alt: "Club Regatas", w: 46.21, h: 97.22 },
  { src: "/logo-sansilvestre.svg", alt: "Colegio San Silvestre", w: 68.57, h: 86.26 },
  { src: "/logo-villacaritas.svg", alt: "Colegio Villa Caritas", w: 150.24, h: 59.22 },
];

export default function CoachGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="coach" className="relative bg-bh-black py-16 md:py-20">
      <div
        className="mx-auto flex gap-3 px-5 md:px-8"
        style={{ height: HEIGHT_SIZE }}
      >
        {TEAM.map((member, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <div
              key={member.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative shrink-0 grow basis-0 cursor-pointer overflow-hidden rounded-2xl transition-[flex-grow,filter] duration-500 ease-out"
              style={{
                flexGrow: isHovered ? 2.2 : 1,
                filter: isDimmed ? "blur(3px) brightness(0.5)" : "none",
              }}
            >
              <img
                src={isHovered ? member.hoverSrc : member.src}
                alt={member.name}
                className="h-full w-full object-cover object-top"
              />
              {isHovered && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-bh-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p
                      className="text-bh-white"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        fontSize: NAME_SIZE,
                      }}
                    >
                      {member.name}
                    </p>
                    <p
                      className="font-display text-bh-white"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: ROLE_SIZE,
                        letterSpacing: "1px",
                      }}
                    >
                      {member.role.toUpperCase()}
                    </p>
                    <p
                      className="mt-2 max-w-sm text-bh-white/60"
                      style={{ fontSize: DESC_SIZE }}
                    >
                      {member.description[0]}
                      <br />
                      {member.description[1]}
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-x-10 gap-y-6 px-5 md:mt-14 md:px-8">
        {LOGOS.map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            className="shrink-0 object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
            style={{ width: logo.w * LOGO_SCALE, height: logo.h * LOGO_SCALE }}
          />
        ))}
      </div>
    </section>
  );
}
