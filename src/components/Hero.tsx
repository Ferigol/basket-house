import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const SEQUENCE = [
  { word: "FORMAMOS", image: "/hero-ima-1.jpg", position: "60% 15%" },
  { word: "PERSONAS", image: "/hero-ima-2.jpg", position: "50% 10%" },
  { word: "CON TALENTO", image: "/hero-ima-3.jpg", position: "50% 15%" },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide");
      const words = gsap.utils.toArray<HTMLElement>(".hero-slide-word");

      gsap.set(slides[0], { opacity: 1 });
      gsap.set(slides.slice(1), { opacity: 0 });

      const loop = gsap.timeline({ defaults: { ease: "power3.out" }, repeat: -1 });

      slides.forEach((slide, i) => {
        const next = slides[(i + 1) % slides.length];
        loop
          .fromTo(words[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2 })
          .to({}, { duration: 0.5 })
          .to(words[i], { opacity: 0, y: -20, duration: 2 })
          .to(slide, { opacity: 0, duration: 2, ease: "power1.inOut" }, "<")
          .to(next, { opacity: 1, duration: 2, ease: "power1.inOut" }, "<");
      });

      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: 0.8 })
        .from(".hero-scroll", { opacity: 0, duration: 2 });

      gsap.to(".hero-slide-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-scroll-arrow", {
        y: 8,
        opacity: 0.3,
        duration: 1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex h-[100dvh] items-center justify-center overflow-hidden bg-bh-black"
    >
      {SEQUENCE.map((slide, i) => (
        <div key={slide.word} className="hero-slide absolute inset-0 opacity-0" style={{ zIndex: i }}>
          <div
            className="hero-slide-img absolute inset-0 -top-[8%] h-[116%] bg-cover"
            style={{ backgroundImage: `url(${slide.image})`, backgroundPosition: slide.position }}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-5">
            <span
              className="hero-slide-word font-display text-center text-[20vw] leading-none text-bh-white [text-shadow:0_4px_30px_rgba(0,0,0,0.65)] sm:text-[16.5vw] md:text-[13vw] lg:text-[11rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {slide.word}
            </span>
          </div>
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end pb-8">
        <p className="absolute inset-x-0 top-[58%] translate-y-[30px] px-5 text-center text-[12px] tracking-[0.15em] text-bh-white/80 [text-shadow:0_2px_10px_rgba(0,0,0,0.7)] sm:text-[14px]">
          CENTRO ELITE DE ALTO RENDIMIENTO
        </p>

        <div className="hero-scroll flex -translate-y-[200px] flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bh-white/50 [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]">
            Desliza
          </span>
          <span className="hero-scroll-arrow block h-6 w-px bg-bh-white/40" />
        </div>
      </div>
    </section>
  );
}
