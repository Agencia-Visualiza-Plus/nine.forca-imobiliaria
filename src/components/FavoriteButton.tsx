"use client";

import { useEffect, useState } from "react";
import { HeartIcon } from "./icons";

const STORAGE_KEY = "nine-favoritos";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

type FavoriteButtonProps = {
  propertyId: string;
  propertyTitle: string;
  className?: string;
};

export function FavoriteButton({ propertyId, propertyTitle, className = "" }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsFavorite(readFavorites().includes(propertyId));
  }, [propertyId]);

  function toggle() {
    const current = readFavorites();
    const next = current.includes(propertyId)
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("nine-favoritos-change"));
    } catch {
      // Armazenamento indisponível (modo privado) — a ação é ignorada.
    }
    setIsFavorite(next.includes(propertyId));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mounted ? isFavorite : undefined}
      aria-label={
        isFavorite
          ? `Remover ${propertyTitle} dos favoritos`
          : `Guardar ${propertyTitle} nos favoritos`
      }
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/95 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white ${
        isFavorite ? "text-brand" : "text-ink-600"
      } ${className}`}
    >
      <HeartIcon filled={isFavorite} className="h-[18px] w-[18px]" />
    </button>
  );
}
