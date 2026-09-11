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

      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-[81%] mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeUp}
            className="@container flex flex-col items-center justify-center gap-6"
          >
            <p
              className="mx-auto text-center text-bh-white/70 sm:whitespace-nowrap"
              style={{ fontSize: "clamp(1.25rem, calc(1.14rem + 0.4vw), 1.62rem)" }}
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
