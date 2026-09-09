import { motion } from "framer-motion";
import { whatsappLink } from "../lib/whatsapp";
import ShinyButton from "./ShinyButton";

const TITLE_SIZE = "clamp(2.4rem, calc(9.032vw - 14.454px), 20rem)";
const NUMBER_SIZE = "clamp(7.75rem, 55.31cqw, 14.75rem)";
const MONTH_SIZE = "clamp(3.9rem, 22.03cqw, 5.875rem)";
const YEAR_SIZE = "clamp(2.6rem, 11.5cqw, 2.7rem)";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const SLIDESHOW_IMAGES = [
  "/gira-argentina-1.jpg",
  "/gira-argentina-2.jpg",
  "/gira-argentina-3.jpg",
];
const SLIDESHOW_CYCLE = 12; // segundos, debe coincidir con .gira-slide en index.css

export default function GiraArgentina() {
  return (
    <section id="gira" className="relative bg-bh-black py-16 md:py-20">
      <div className="mx-auto px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={fadeUp}
          className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl md:col-span-2">
            {SLIDESHOW_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Equipo de Basket House en su gira a Argentina"
                className="gira-slide absolute inset-0 h-full w-full object-cover"
                style={{ animationDelay: `${i * (SLIDESHOW_CYCLE / SLIDESHOW_IMAGES.length)}s` }}
              />
            ))}
          </div>

          <div className="@container flex flex-col justify-center text-left">
            <h2
              className="font-display whitespace-nowrap leading-[0.9] text-bh-white"
              style={{ fontFamily: "var(--font-display)", fontSize: TITLE_SIZE }}
            >
              GIRA A LA ARGENTINA
            </h2>

            <div className="mt-8 flex items-center justify-between">
              <span
                className="font-display leading-none text-bh-white"
                style={{ fontFamily: "var(--font-display)", fontSize: NUMBER_SIZE }}
              >
                01
              </span>

              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bh-white/60">
                  Buenos Aires
                </span>
                <span
                  className="font-display leading-none text-bh-white"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: MONTH_SIZE,
                    letterSpacing: "2px",
                  }}
                >
                  FEBRERO
                </span>
                <span
                  className="-translate-y-[10px] font-bold leading-none text-bh-white"
                  style={{ fontFamily: "var(--font-body)", fontSize: YEAR_SIZE }}
                >
                  2027
                </span>
              </div>

              <span
                className="font-display leading-none text-bh-white"
                style={{ fontFamily: "var(--font-display)", fontSize: NUMBER_SIZE }}
              >
                06
              </span>
            </div>

            <div className="mt-8 border-t border-bh-white/25 py-4">
              <p className="text-center text-sm uppercase tracking-wide text-bh-white/80 sm:text-base">
                <span className="font-bold text-bh-white">Categorías:</span> Sub -13 | Sub -15
              </p>
            </div>
            <div className="border-t border-bh-white/25" />

            <p className="mt-8 text-center text-base uppercase leading-relaxed text-bh-white/70 sm:text-lg">
              Vive una experiencia
              <br />
              deportiva inolvidable
            </p>

            <ShinyButton
              href={whatsappLink(
                "Hola Basket House! Quiero reservar mi cupo para la gira a Argentina."
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-8 self-center !px-[55px] text-[21px]"
            >
              Reserva tu cupo
            </ShinyButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
