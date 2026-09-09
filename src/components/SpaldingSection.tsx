import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export default function SpaldingSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-bh-black"
      style={{ aspectRatio: "1920 / 1080" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/Spalding-web.jpg)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bh-orange/10 blur-[150px]"
        aria-hidden
      />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUp}
            className="@container flex translate-y-[300px] flex-col items-center justify-center gap-6 md:flex-row md:items-center md:gap-10"
          >
            <img
              src="/logo-Spalding.svg"
              alt="Spalding Academia Elite"
              className="w-full shrink-0"
              style={{ maxWidth: "clamp(14rem, 10rem + 12vw, 22rem)" }}
            />

            <p
              className="max-w-lg text-center text-bh-white/70 md:text-left"
              style={{ fontSize: "clamp(1rem, 0.87rem + 0.4vw, 1.35rem)" }}
            >
              Somos una escuela certificada por Spalding.{" "}
              <br className="hidden sm:block" />
              Nuestras alumnas entrenan con los mismos{" "}
              <br className="hidden sm:block" />
              balones oficiales de basketball profesional.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
