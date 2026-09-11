import { useEffect, useState } from "react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "../lib/whatsapp";

const MOBILE_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Gira 2027", href: "#gira" },
  { label: "Programas", href: "#programas" },
  { label: "Profes", href: "#coach" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="fixed right-5 top-5 z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-2xl bg-white/20 backdrop-blur-md"
        >
          <span className="block h-0.5 w-6 bg-bh-white" />
          <span className="block h-0.5 w-6 bg-bh-white" />
          <span className="block h-0.5 w-6 bg-bh-white" />
        </button>
      )}

      <div
        className={`fixed inset-0 z-50 flex flex-col bg-bh-black/98 backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex justify-end p-5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="relative flex h-12 w-12 items-center justify-center"
          >
            <span className="absolute h-px w-6 rotate-45 bg-bh-white" />
            <span className="absolute h-px w-6 -rotate-45 bg-bh-white" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-start justify-start gap-[3px] px-8 pt-20">
          {MOBILE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-left uppercase leading-[0.85] text-bh-white"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 16vw, 5.5rem)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="font-display text-left uppercase leading-[0.85] text-bh-orange"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 16vw, 5.5rem)" }}
          >
            Contacto
          </a>
        </nav>
      </div>
    </div>
  );
}
