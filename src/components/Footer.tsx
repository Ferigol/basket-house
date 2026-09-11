export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-bh-black px-5 py-10 md:px-8 md:py-14">
      <div className="@container w-full translate-y-[20px] overflow-hidden rounded-[28px] bg-bh-orange px-6 py-[10px] sm:px-10 sm:py-[26px] md:px-14 md:py-[34px]">
        <div className="flex -translate-y-[10px] flex-wrap items-center justify-end gap-x-8 gap-y-2 max-md:translate-y-0">
          <a
            href="https://instagram.com/baskethouseperu"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[16px] font-semibold uppercase tracking-wide text-bh-cream transition-opacity hover:opacity-70"
          >
            Instagram <span aria-hidden>→</span>
          </a>
          <a
            href="https://www.tiktok.com/@baskethouseperu"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[16px] font-semibold uppercase tracking-wide text-bh-cream transition-opacity hover:opacity-70"
          >
            Tik Tok <span aria-hidden>→</span>
          </a>
        </div>

        <h2
          className="font-display mt-6 w-full translate-y-[30px] whitespace-nowrap text-center leading-[0.85] tracking-normal text-bh-cream"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.3625rem, 24.15cqw, 31.5rem)",
          }}
        >
          ESCUELA BASKET HOUSE
        </h2>

        <div className="mt-12 flex -translate-y-[20px] flex-col gap-3 text-xs text-bh-cream/80 sm:flex-row sm:items-center sm:justify-between">
          <span className="max-md:translate-y-[5px]">© {year} Basket House │ Aviso legal</span>
          <span>Creado por: hostIA</span>
        </div>
      </div>
    </footer>
  );
}
