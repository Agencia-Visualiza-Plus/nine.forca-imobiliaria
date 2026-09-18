"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

const LOGO_SRC = "/logo.png";

let logoProbe: Promise<boolean> | null = null;

function probeLogo(): Promise<boolean> {
  if (!logoProbe) {
    logoProbe = new Promise<boolean>((resolve) => {
      const image = new window.Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = LOGO_SRC;
    });
  }
  return logoProbe;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const [ready, setReady] = useState(false);
  const textClass = variant === "dark" ? "text-ink" : "text-white";

  useEffect(() => {
    let cancelled = false;
    probeLogo().then((exists) => {
      if (!cancelled) setReady(exists);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {ready ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={LOGO_SRC}
          alt=""
          onError={() => setReady(false)}
          className="block h-10 w-auto shrink-0 object-contain sm:h-11"
        />
      ) : null}
      <span className={`block min-w-0 leading-[1.05] ${textClass}`}>
        <span className="block whitespace-nowrap font-display text-[12px] font-extrabold uppercase tracking-tight sm:text-[13px]">
          Nine Força
        </span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] ${
          variant === "dark" ? "text-ink-500" : "text-white/70"
        }`}>
          Imobiliária
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
