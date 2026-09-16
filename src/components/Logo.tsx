"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type LogoProps = {
  /** dark = sobre fundo claro (header) | light = sobre fundo escuro (footer) */
  variant?: "dark" | "light";
  className?: string;
};

const LOGO_SRC = "/logo.png";

/**
 * Teste de existência do logótipo partilhado por todas as instâncias do
 * componente, para não repetir o pedido no header e no footer.
 */
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

/**
 * Mostra o logótipo oficial em public/logo.png.
 * O logótipo não é redesenhado, recolorido nem distorcido.
 *
 * Se o ficheiro ainda não existir, é mostrada uma marca de texto simples
 * para que o layout não quebre. A verificação é feita por teste de carregamento
 * (e não apenas por onError) porque, em SSR, a imagem pode falhar antes de o
 * React hidratar e o evento de erro nunca chegar ao handler.
 */
export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    probeLogo().then((exists) => {
      if (!cancelled) setMissing(!exists);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (missing) {
    return (
      <span
        className={`block max-w-[170px] font-display text-sm font-extrabold uppercase leading-tight tracking-tight ${
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
      onError={() => setMissing(true)}
      className={`block h-11 w-auto max-w-[170px] object-contain sm:h-12 sm:max-w-[200px] ${className}`}
    />
  );
}
