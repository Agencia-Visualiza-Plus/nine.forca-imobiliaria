"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDownIcon } from "./icons";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = Math.min(index, total - 1);

  function go(delta: number) {
    setIndex((value) => (value + delta + total) % total);
  }

  return (
    <div>
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-paper-line bg-paper-muted"
        role="group"
        aria-roledescription="galeria de imagens"
        aria-label={`Galeria de ${title}`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          if (event.key === "ArrowLeft") go(-1);
        }}
      >
        <Image
          key={images[current]}
          src={images[current]}
          alt={`${title} — fotografia ${current + 1} de ${total}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="animate-fade-in object-cover"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Fotografia anterior"
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition-opacity hover:bg-white"
            >
              <ChevronDownIcon className="h-5 w-5 rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Fotografia seguinte"
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition-opacity hover:bg-white"
            >
              <ChevronDownIcon className="h-5 w-5 -rotate-90" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
              {current + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <ul className="no-scrollbar mt-3 flex w-full min-w-0 gap-2.5 overflow-x-auto pb-1" aria-label="Miniaturas da galeria">
          {images.map((image, i) => (
            <li key={image} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver fotografia ${i + 1} de ${total}`}
                aria-current={i === current}
                className={`relative block h-16 w-24 overflow-hidden rounded-xl border-2 transition-colors sm:h-20 sm:w-28 ${
                  i === current ? "border-brand" : "border-transparent hover:border-ink/20"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
