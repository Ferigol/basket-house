import type { AnchorHTMLAttributes } from "react";

type ShinyButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ShinyButton({ className = "", children, ...props }: ShinyButtonProps) {
  return (
    <a className={`shiny-cta ${className}`} {...props}>
      {children}
    </a>
  );
}
