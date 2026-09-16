import { AreaIcon, BathIcon, BedIcon, CarIcon, CheckIcon } from "./icons";
import { formatArea, propertyTypeLabels } from "@/lib/format";
import type { Property } from "@/lib/types";

type PropertyFeaturesProps = {
  property: Property;
  className?: string;
};

export function PropertyFeatures({ property, className = "" }: PropertyFeaturesProps) {
  const specs = [
    { key: "tipo", icon: <BedIcon className="h-5 w-5" />, label: "Tipo", value: propertyTypeLabels[property.type] },
    ...(property.bedrooms > 0
      ? [{ key: "quartos", icon: <BedIcon className="h-5 w-5" />, label: "Quartos", value: String(property.bedrooms) }]
      : []),
    ...(property.bathrooms > 0
      ? [{ key: "banhos", icon: <BathIcon className="h-5 w-5" />, label: "Casas de banho", value: String(property.bathrooms) }]
      : []),
    { key: "area", icon: <AreaIcon className="h-5 w-5" />, label: "Área", value: formatArea(property.area) },
    ...(property.parking > 0
      ? [{ key: "parking", icon: <CarIcon className="h-5 w-5" />, label: "Estacionamento", value: `${property.parking} lugares` }]
      : []),
  ];

  return (
    <div className={className}>
      <h2 className="section-title text-xl">Características</h2>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {specs.map((spec) => (
          <div key={spec.key} className="rounded-xl border border-paper-line bg-white p-3.5">
            <span className="inline-flex items-center gap-2 text-ink-500">
              {spec.icon}
              <dt className="text-[12px] font-medium uppercase tracking-wide">{spec.label}</dt>
            </span>
            <dd className="mt-1.5 font-display text-[15px] font-bold text-ink">{spec.value}</dd>
          </div>
        ))}
      </dl>

      {property.features.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {property.features.map((feature) => (
            <li
              key={feature}
              className="inline-flex items-center gap-1.5 rounded-full border border-paper-line bg-white px-3 py-1.5 text-[13px] text-ink-600"
            >
              <CheckIcon className="h-3.5 w-3.5 text-brand" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
