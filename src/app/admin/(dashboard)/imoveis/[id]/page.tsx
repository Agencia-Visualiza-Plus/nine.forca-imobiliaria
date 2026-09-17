import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { getPropertyById } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);
  if (!property) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">{property.reference}</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">Editar imóvel</h1>
      <div className="mt-6 rounded-2xl border border-paper-line bg-white p-5 shadow-card sm:p-8">
        <PropertyForm property={property} />
      </div>
    </div>
  );
}
