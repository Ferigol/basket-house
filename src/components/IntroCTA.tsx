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

export default function IntroCTA() {
  return (
    <section id="nosotros" className="relative bg-bh-black py-20 md:py-28">
      {/* Texto principal: grande, a todo el ancho de la ventana, casi a sangre */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-5 md:px-8"
      >
        <p
          className="mx-auto w-fit text-left leading-[1.05] text-bh-white/90 sm:whitespace-nowrap"
          style={{ fontSize: PARAGRAPH_SIZE }}
        >
          Somos una escuela formativa de basket y{" "}
          <br className="hidden sm:block" />
          técnica individual. Acompañamos a cada{" "}
          <br className="hidden sm:block" />
          alumna en su proceso de evolución, con el{" "}
          <br className="hidden sm:block" />
          objetivo puesto en el desarrollo personal a{" "}
          <br className="hidden sm:block" />
          través del basketball.
        </p>
      </motion.div>

      <div className="mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-16 md:mt-24"
        >
          {/* Línea simétrica: se parte en 3 tramos, uno por columna */}
          <div className="grid grid-cols-1 gap-10 sm:gap-8 md:grid-cols-3 md:gap-12">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t border-bh-white pt-6">
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
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
