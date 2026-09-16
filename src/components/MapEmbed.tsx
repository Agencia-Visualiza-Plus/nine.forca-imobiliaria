type MapEmbedProps = {
  lat: number;
  lng: number;
  label: string;
  /** Amplitude da caixa do mapa em graus (maior = mais afastado) */
  span?: number;
  height?: number;
  className?: string;
};

/**
 * Mapa incorporado via OpenStreetMap (não requer chave de API).
 */
export function MapEmbed({
  lat,
  lng,
  label,
  span = 0.012,
  height = 320,
  className = "",
}: MapEmbedProps) {
  const bbox = [lng - span, lat - span, lng + span, lat + span].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox,
  )}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className={`overflow-hidden rounded-2xl border border-paper-line bg-paper-muted ${className}`}>
      <iframe
        title={`Mapa de ${label}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border-0"
        style={{ height }}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-paper-line bg-white px-3.5 py-2.5">
        <p className="text-[12px] text-ink-500">Localização aproximada — {label}</p>
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-semibold text-brand-600 hover:underline"
        >
          Ver mapa maior
        </a>
      </div>
    </div>
  );
}
