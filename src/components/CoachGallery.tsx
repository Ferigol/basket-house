import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Mismo easing suave usado en el resto del sitio (NOSOTROS, GIRA 2027)
// para que el movimiento se sienta fluido y consistente.
const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const photoContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const photoItem = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: SMOOTH_EASE },
  },
};

const logoContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// En desktop/tablet los logos descansan a 75% de opacidad; en móvil se
// mantiene el 50% ya ajustado antes.
function makeLogoItem(isMobile: boolean) {
  return {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: isMobile ? 0.5 : 0.75,
      y: 0,
      transition: { duration: 0.6, ease: SMOOTH_EASE },
    },
  };
}

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
const ROLE_SIZE = "clamp(3.25rem, 2.9rem + 1.6vw, 4.6rem)";
const DESC_SIZE = "clamp(0.8rem, 0.65rem + 0.35vw, 1.05rem)";

// Tamaño real de cada SVG (su propio viewBox, en px), ajustado con varios
// cambios sucesivos (0.75 * 1.15 * 1.10 * 1.10 * 1.10).
const LOGO_SCALE = 1.1479875 * 0.8 * 1.2 * 1.1;
// Escala aparte para móvil: más chica que antes, con más aire entre
// logos, para que las 2 filas de 3 se vean prolijas y no apretadas.
const MOBILE_LOGO_SCALE = 0.78;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const logoItem = makeLogoItem(isMobile);

  return (
    <section id="coach" className="relative bg-bh-black py-16 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={photoContainer}
        className="mx-auto flex gap-3 px-5 md:px-8"
        style={{ height: HEIGHT_SIZE }}
      >
        {TEAM.map((member, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <motion.div
              key={member.name}
              variants={photoItem}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative min-w-0 shrink-0 grow basis-0 cursor-pointer overflow-hidden rounded-2xl transition-[flex-grow,filter] duration-500 ease-out"
              style={{
                flexGrow: isMobile
                  ? isHovered
                    ? 1
                    : hovered !== null
                      ? 0
                      : 1
                  : isHovered
                    ? 2.2
                    : 1,
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
                      className="whitespace-nowrap font-display text-bh-white"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: ROLE_SIZE,
                        letterSpacing: "1px",
                      }}
                    >
                      {member.role.toUpperCase()}
                    </p>
                    <p
                      className="mt-2 max-w-sm text-bh-white/60 max-md:whitespace-nowrap max-md:tracking-[-1px]"
                      style={{ fontSize: DESC_SIZE }}
                    >
                      {member.description[0]}
                      <br />
                      {member.description[1]}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={logoContainer}
        className="mx-auto mt-10 flex max-w-7xl flex-col gap-y-8 px-5 max-md:gap-y-12 md:mt-14 md:px-8"
      >
        {(isMobile ? [LOGOS.slice(0, 3), LOGOS.slice(3, 6)] : [LOGOS]).map(
          (row, ri) => (
            <div
              key={ri}
              className="flex flex-wrap items-center justify-center gap-x-20 gap-y-6 md:items-start max-md:flex-nowrap max-md:gap-x-7 max-md:gap-y-10"
            >
              {row.map((logo) => (
                <motion.img
                  key={logo.src}
                  variants={logoItem}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={logo.src}
                  alt={logo.alt}
                  className="shrink-0 object-contain"
                  style={{
                    width: logo.w * (isMobile ? MOBILE_LOGO_SCALE : LOGO_SCALE),
                    height: logo.h * (isMobile ? MOBILE_LOGO_SCALE : LOGO_SCALE),
                  }}
                />
              ))}
            </div>
          )
        )}
      </motion.div>
    </section>
  );
}
