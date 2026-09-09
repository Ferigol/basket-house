import { useState } from "react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "../lib/whatsapp";
import ShinyButton from "./ShinyButton";

const NAV_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Gira 2027", href: "#gira" },
  { label: "Programas", href: "#programas" },
  { label: "Profes", href: "#coach" },
  { label: "Sedes", href: "#sedes" },
];

export default function FloatingNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`flex items-center gap-2 overflow-hidden rounded-[20px] bg-white/20 p-2 backdrop-blur-md transition-[max-width] duration-500 ease-out ${
          open ? "max-w-[900px]" : "max-w-[128px]"
        }`}
      >
        <a
          href="#top"
          aria-label="Ir al inicio"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-bh-white/90"
        >
          <img src="/Favico.png" alt="Basket House" className="h-8 w-8 rounded-full object-cover" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className={`flex shrink-0 flex-col items-center justify-center gap-1.5 transition-[width,opacity] duration-500 hover:opacity-70 ${
            open ? "h-14 w-0 overflow-hidden" : "h-14 w-14"
          }`}
        >
          {!open && (
            <>
              <span className="block h-0.5 w-6 bg-bh-white" />
              <span className="block h-0.5 w-6 bg-bh-white" />
              <span className="block h-0.5 w-6 bg-bh-white" />
            </>
          )}
        </button>

        <nav className="flex items-center gap-2 whitespace-nowrap pr-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-bh-white/75 transition-colors hover:bg-white/5 hover:text-bh-white"
            >
              {link.label}
            </a>
          ))}
          <ShinyButton
            href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="ml-1 shrink-0 !px-5 !py-2.5 !text-sm"
          >
            Contacto
          </ShinyButton>
        </nav>
      </div>
    </div>
  );
}
