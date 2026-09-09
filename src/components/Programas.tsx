import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const TITLE_SIZE = "clamp(3.2rem, 4.9rem + 9.5vw, 17rem)";
const SUBTITLE_SIZE = "clamp(1.8rem, 1.9rem + 6vw, 10.5rem)";
// Mismo tamaño que el cuerpo de texto de los pilares (Aprendo/Supero/Aporto)
// en IntroCTA.tsx, para que ambos escalen igual.
const BODY_SIZE = "clamp(1rem, 0.9rem + 0.3vw, 1.25rem)";
// El título sube su propia caja "-0.16em" (relativo a su letra gigante)
// para que el trazo visible quede pegado a la línea superior. El cuerpo de
// texto necesita subir esa MISMA cantidad en píxeles absolutos (no relativa
// a su propia letra, mucho más chica) para quedar a la misma altura, por
// eso se calcula sobre TITLE_SIZE y no sobre BODY_SIZE.
// CSS var que lee la clase .title-aligned-body (definida en index.css) para
// aplicar esta compensación solo desde md hacia arriba.
const TITLE_SIZE_VAR = { "--title-size": TITLE_SIZE } as CSSProperties;

const PROGRAMS = [
  {
    title: "Grupal",
    align: "left",
    description: ["Formación por categorías de edad, con foco", "en fundamentos, disciplina y trabajo en equipo."],
    features: ["Categorías por edad", "Trabajo en equipo", "Fundamentos técnicos"],
  },
  {
    title: "Personal",
    align: "right",
    description: ["Sesiones 1 a 1 con el entrenador, diseñadas", "según el nivel y objetivos de cada alumna."],
    features: ["Atención individual", "Plan a medida", "Seguimiento cercano"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

// Cuánto scroll (en px) dura el tramo "fijo" en el que el texto ya está
// completo y van apareciendo las imágenes. Más alto = movimiento más lento
// (hace falta más scroll físico para el mismo recorrido visual).
const SCROLL_ROOM = 4600;

// Mismo aspecto real de cada foto (sin recortar), pero tamaños distintos
// entre sí. Cada una entra en una posición horizontal distinta: izquierda,
// centro, más a la derecha, y al extremo derecho.
const GALLERY_IMAGES = [
  { src: "/img-gru-1.jpg", widthPct: 39, leftPct: 20 },
  { src: "/img-gru-2.jpg", widthPct: 30.36, leftPct: 50 },
  { src: "/img-gru-3.jpg", widthPct: 39, leftPct: 68 },
  { src: "/img-gru-4.jpg", widthPct: 26.1, leftPct: 85 },
  { src: "/img-gru-5.jpg", widthPct: 42, leftPct: 40 },
];

// El texto ya está completo (sticky) desde el progreso 0 de este tramo.
// La siguiente imagen empieza a entrar justo cuando la anterior llega a la
// mitad de su recorrido (no cuando termina), por eso STRIDE = DURATION/2.
const REVEAL_START = 0.02;
const WINDOW_DURATION = 0.32; // cuánto dura activa cada imagen (más = más lento)
const WINDOW_STRIDE = WINDOW_DURATION / 2;

type SequentialImgProps = {
  src: string;
  widthPct: number;
  leftPct: number;
  progress: MotionValue<number>;
  index: number;
};

function SequentialImg({ src, widthPct, leftPct, progress, index }: SequentialImgProps) {
  const t0 = REVEAL_START + index * WINDOW_STRIDE;
  const t1 = t0 + WINDOW_DURATION;
  // El fundido es breve, justo abajo (entrada) y justo arriba (salida). El
  // resto del recorrido va a plena opacidad, moviéndose sin pausas, así
  // desaparece recién cuando llega arriba y no a mitad de camino.
  const fadeIn = t0 + WINDOW_DURATION * 0.12;
  const fadeOut = t1 - WINDOW_DURATION * 0.12;

  const opacity = useTransform(progress, [t0, fadeIn, fadeOut, t1], [0, 1, 1, 0]);
  // Recorrido continuo de abajo hacia arriba de la ventana (sin quedarse
  // quieta a mitad de camino), lento y parejo de punta a punta.
  const y = useTransform(progress, [t0, t1], [65, -65]);
  const transform = useMotionTemplate`translateX(-50%) translateY(${y}vh)`;

  return (
    <motion.img
      src={src}
      alt=""
      className="pointer-events-none absolute top-1/2 z-20 h-auto max-h-[50vh] w-auto rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
      style={{ left: `${leftPct}%`, maxWidth: `${widthPct}%`, transform, opacity }}
    />
  );
}

export default function Programas() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // El wrapper mide SCROLL_ROOM + 100vh, pero el contenido solo queda
  // "fijo" (sticky) durante los primeros SCROLL_ROOM px; los últimos 100vh
  // son el propio bloque saliendo de pantalla al liberarse el scroll.
  // Reescalamos el progreso para que 0→1 cubra exactamente esa ventana fija.
  const [viewportHeight, setViewportHeight] = useState(900);
  useEffect(() => {
    const update = () => setViewportHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const pinFraction = SCROLL_ROOM / (SCROLL_ROOM + viewportHeight);
  const pinProgress = useTransform(scrollYProgress, [0, pinFraction], [0, 1]);

  return (
    <section id="programas" className="relative bg-bh-black">
      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: `calc(${SCROLL_ROOM}px + 100vh)` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden py-24 md:py-32">
          <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
            {GALLERY_IMAGES.map((img, i) => (
              <SequentialImg
                key={img.src}
                src={img.src}
                widthPct={img.widthPct}
                leftPct={img.leftPct}
                progress={pinProgress}
                index={i}
              />
            ))}

            <div className="flex flex-col gap-12 md:gap-16">
              {PROGRAMS.map((program, i) => {
                const isLeft = program.align === "left";
                return (
                  <motion.div
                    key={program.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                    variants={fadeUp}
                    className={`@container flex flex-col items-start gap-6 md:items-start md:gap-8 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse translate-y-[50px]"
                    }`}
                  >
                    <h3
                      className={`font-display -mt-[0.16em] whitespace-nowrap leading-[0.8] text-bh-white ${
                        isLeft
                          ? "text-left md:translate-x-[min(0px,640px-50vw)]"
                          : "text-right md:translate-x-[max(0px,50vw-640px)] md:translate-y-[20px]"
                      }`}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isLeft ? TITLE_SIZE : `calc(${TITLE_SIZE} + 50px)`,
                      }}
                    >
                      {program.title.toUpperCase()}
                    </h3>

                    <div
                      className={`w-full shrink-0 -translate-y-[30px] ${isLeft ? "md:ml-[10px]" : "md:translate-x-[50px] md:text-left"}`}
                      style={{ maxWidth: "clamp(24rem, 20rem + 16vw, 46rem)" }}
                    >
                      <p
                        className="title-aligned-body text-bh-white/70 leading-relaxed"
                        style={{ fontSize: BODY_SIZE, ...TITLE_SIZE_VAR }}
                      >
                        {Array.isArray(program.description)
                          ? program.description.map((line, li) => (
                              <span key={li}>
                                {line}
                                {li < program.description.length - 1 && <br />}
                              </span>
                            ))
                          : program.description}
                      </p>
                      <ul className="mt-6 flex flex-col gap-1.5">
                        {program.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-3 text-bh-white/60"
                            style={{ fontSize: BODY_SIZE }}
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bh-orange" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
                variants={fadeUp}
                className="@container mt-[100px] text-center md:mt-[50px]"
              >
                <div
                  className="mx-auto text-center"
                  style={{ maxWidth: "clamp(24rem, 20rem + 16vw, 50rem)" }}
                >
                  <p
                    className="text-bh-white/70 leading-relaxed"
                    style={{ fontSize: BODY_SIZE }}
                  >
                    Nuestras alumnas que hoy juegan en los mejores{" "}
                    <br className="hidden sm:block" />
                    clubes de Lima se forman con nuestra metodología.
                  </p>
                </div>

                <h3
                  className="font-display mt-3 translate-y-[15px] whitespace-nowrap leading-[0.8] text-bh-white md:mt-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: SUBTITLE_SIZE,
                    letterSpacing: "1px",
                  }}
                >
                  BASKETBALL NIVEL ELITE
                </h3>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
