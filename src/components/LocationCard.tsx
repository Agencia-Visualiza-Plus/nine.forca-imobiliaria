import Image from "next/image";
import Link from "next/link";
import type { LocationCategory } from "@/lib/locations";

type LocationCardProps = {
  location: LocationCategory;
  className?: string;
};

export function LocationCard({ location, className = "" }: LocationCardProps) {
  return (
    <Link
      href={`/imoveis?localizacao=${encodeURIComponent(location.name)}`}
      className={`group relative block overflow-hidden rounded-2xl border border-paper-line bg-ink shadow-card transition-shadow duration-200 hover:shadow-lift ${className}`}
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
        <Image
          src={location.image}
          alt={location.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <p className="font-display text-base font-bold leading-tight text-white">{location.name}</p>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-white/75">
          {location.description}
        </p>
      </div>
    </Link>
  );
}
