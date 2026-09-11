import { motion } from "framer-motion";
import { whatsappLink } from "../lib/whatsapp";
import ShinyButton from "./ShinyButton";

const TITLE_SIZE = "clamp(2.4rem, calc(9.032vw - 14.454px), 20rem)";
const NUMBER_SIZE = "clamp(7.75rem, 55.31cqw, 14.75rem)";
const MONTH_SIZE = "clamp(3.9rem, 22.03cqw, 5.875rem)";
const YEAR_SIZE = "clamp(2.6rem, 11.5cqw, 2.7rem)";

// Easing suave tipo "cubic ease-out" pronunciado, igual al usado en
// IntroCTA.tsx, para que el movimiento se sienta fluido y consistente
// con el resto del sitio.
const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const imageReveal = {
  hidden: { opacity: 0, scale: 1.04 },
  show: { opacity: 1, scale: 1, transition: { duration: 1, ease: SMOOTH_EASE } },
};

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SMOOTH_EASE } },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: SMOOTH_EASE } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: SMOOTH_EASE } },
};

const fadeButton = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: SMOOTH_EASE },
  },
};

const numberRow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function GiraArgentina() {
  return (
    <section id="gira" className="relative bg-bh-black py-16 md:py-20">
      <div className="mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageReveal}
            className="relative aspect-[16/11] overflow-hidden rounded-2xl md:col-span-2"
          >
            <div className="gira-kenburns absolute inset-0">
              <img
                src="/Obelisco-1.jpg"
                alt="El Obelisco de Buenos Aires, destino de la gira"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <img
                src="/Obelisco-2.jpg"
                alt=""
                aria-hidden="true"
                className="gira-icon absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div
              className="absolute -left-16 top-8 z-30 w-56 -rotate-45 bg-[#2864b4] py-[3px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              aria-hidden="true"
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-bh-white">
                Gira 2027
              </span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={textContainer}
            className="@container flex flex-col justify-center text-left"
          >
            <motion.h2
              variants={fadeUp}
              className="gira-title font-display whitespace-nowrap leading-[0.9] text-bh-white"
              style={{ fontFamily: "var(--font-display)", fontSize: TITLE_SIZE }}
            >
              GIRA A LA ARGENTINA
            </motion.h2>

            <motion.div variants={numberRow} className="mt-8 flex items-center justify-between">
              <motion.span
                variants={slideFromLeft}
                className="gira-number font-display leading-none text-bh-white"
                style={{ fontFamily: "var(--font-display)", fontSize: NUMBER_SIZE }}
              >
                01
              </motion.span>

              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-2 text-center"
              >
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
                  className="font-bold leading-none text-bh-white"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: YEAR_SIZE,
                    marginTop: "-10px",
                  }}
                >
                  2027
                </span>
              </motion.div>

              <motion.span
                variants={slideFromRight}
                className="gira-number font-display leading-none text-bh-white"
                style={{ fontFamily: "var(--font-display)", fontSize: NUMBER_SIZE }}
              >
                06
              </motion.span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 border-t border-bh-white/25 py-4">
              <p className="text-center text-sm uppercase tracking-wide text-bh-white/80 sm:text-base">
                <span className="font-bold text-bh-white">Categorías:</span> Sub -13 | Sub -15
              </p>
            </motion.div>
            <div className="border-t border-bh-white/25" />

            <motion.p
              variants={fadeUp}
              className="mt-8 text-center text-base uppercase leading-relaxed text-bh-white/70 sm:text-lg"
            >
              Vive una experiencia
              <br />
              deportiva inolvidable
            </motion.p>

            <motion.div variants={fadeButton} className="mt-8 self-center">
              <ShinyButton
                href={whatsappLink(
                  "Hola Basket House! Quiero reservar mi cupo para la gira a Argentina."
                )}
                target="_blank"
                rel="noreferrer"
                className="!px-[55px] text-[21px]"
              >
                Reserva tu cupo
              </ShinyButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
