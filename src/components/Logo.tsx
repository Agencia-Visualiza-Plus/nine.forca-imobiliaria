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

  useEffect(() => {
    let cancelled = false;
    probeLogo().then((exists) => {
      if (!cancelled) setReady(exists);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <span
        className={`block whitespace-nowrap font-display text-[13px] font-extrabold uppercase leading-none tracking-tight sm:text-sm ${
          variant === "dark" ? "text-ink" : "text-white"
        } ${className}`}
      >
        {site.name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt={`Logótipo da ${site.name}`}
      onError={() => setReady(false)}
      className={`block h-11 w-auto max-w-[170px] object-contain sm:h-12 sm:max-w-[200px] ${className}`}
    />
  );
}
