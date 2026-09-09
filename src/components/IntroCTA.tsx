import { motion } from "framer-motion";

// Escala con el ancho real del navegador (no del contenedor ni por saltos
// de breakpoint): crece de forma continua en todo el rango, como el resto
// del sitio.
const PARAGRAPH_SIZE = "clamp(1.7rem, calc(4.962vw - 3.176px), 6rem)";
const PILLAR_TITLE_SIZE = "clamp(1.2rem, 1rem + 0.5vw, 1.7rem)";
const PILLAR_TEXT_SIZE = "clamp(1rem, 0.9rem + 0.3vw, 1.25rem)";

const PILLARS = [
  {
    title: "Aprendo",
    lines: ["Adquiero los fundamentos", "técnicos y físicos del juego.", "Me conozco a mí misma."],
  },
  {
    title: "Supero",
    lines: ["Enfrento mis límites, me", "frustro, me esfuerzo y los", "rompo. Crezco."],
  },
  {
    title: "Aporto",
    lines: ["Soy parte del equipo y mis", "acciones impactan a otras.", "Me responsabilizo."],
  },
];

const PARAGRAPH_LINES = [
  "Somos una escuela formativa de basket y",
  "técnica individual. Acompañamos a cada",
  "alumna en su proceso de evolución, con el",
  "objetivo puesto en el desarrollo personal a",
  "través del basketball.",
];

// Easing suave tipo "cubic ease-out" pronunciado, para que el
// movimiento se sienta fluido y no mecánico.
const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const paragraphContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const paragraphLine = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: SMOOTH_EASE },
  },
};

const pillarContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const pillarItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SMOOTH_EASE } },
};

const pillarLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: SMOOTH_EASE } },
};

export default function IntroCTA() {
  return (
    <section id="nosotros" className="relative bg-bh-black py-20 md:py-28">
      {/* Texto principal: grande, a todo el ancho de la ventana, casi a sangre */}
      <div className="px-5 md:px-8">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={paragraphContainer}
          className="mx-auto w-fit text-left leading-[1.05] text-bh-white/90"
          style={{ fontSize: PARAGRAPH_SIZE }}
        >
          {PARAGRAPH_LINES.map((line, li) => (
            <motion.span
              key={li}
              variants={paragraphLine}
              className="sm:block sm:whitespace-nowrap"
            >
              {line}
              {li < PARAGRAPH_LINES.length - 1 && " "}
            </motion.span>
          ))}
        </motion.p>
      </div>

      <div className="mx-auto px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={pillarContainer}
          className="mt-16 md:mt-24"
        >
          {/* Línea simétrica: se parte en 3 tramos, uno por columna */}
          <div className="grid grid-cols-1 gap-10 sm:gap-8 md:grid-cols-3 md:gap-12">
            {PILLARS.map((pillar) => (
              <motion.div key={pillar.title} variants={pillarItem} className="pt-6">
                <motion.div
                  variants={pillarLine}
                  style={{ transformOrigin: "left" }}
                  className="mb-6 h-px w-full bg-bh-white"
                />
                <h3
                  className="font-bold uppercase tracking-wide text-bh-white"
                  style={{ fontSize: PILLAR_TITLE_SIZE }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="mt-4 text-left leading-relaxed text-bh-white/70"
                  style={{ fontSize: PILLAR_TEXT_SIZE }}
                >
                  {pillar.lines.map((line, li) => (
                    <span key={li}>
                      {line}
                      {li < pillar.lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
