import { motion } from "framer-motion";

const LOCATIONS = [
  {
    name: "Magdalena del Mar",
    lines: ["Colegio Reina del Carmelo.", "Entrenamos todo el año."],
    bg: "#e38134",
  },
  {
    name: "Playa Blanca · Asia",
    lines: ["Campo Club Playa Blanca.", "Próxima apertura verano 2027."],
    bg: "#2864b4",
  },
];

// Escala con el ancho real de cada bloque (@container), igual que el
// Footer: crece de forma continua en vez de saltar entre tamaños fijos.
const TITLE_SIZE = "clamp(1.925rem, 13cqw, 4.625rem)";
const DETAIL_SIZE = "clamp(0.85rem, 3cqw, 1.05rem)";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function Sedes() {
  return (
    <section id="sedes" className="relative bg-bh-black px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {LOCATIONS.map((loc, i) => (
          <motion.div
            key={loc.name}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            variants={fadeUp}
            className="@container w-full overflow-hidden rounded-[28px] px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16"
            style={{ backgroundColor: loc.bg }}
          >
            <h3
              className="font-display whitespace-nowrap leading-none text-bh-black"
              style={{ fontFamily: "var(--font-display)", fontSize: TITLE_SIZE }}
            >
              {loc.name.toUpperCase()}
            </h3>

            <p
              className="mt-6 font-semibold uppercase leading-snug text-bh-black"
              style={{ fontSize: DETAIL_SIZE }}
            >
              {loc.lines[0]}
              <br />
              {loc.lines[1]}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
