import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { getPropertyById } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);
  if (!property) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/imoveis" className="text-[13px] font-semibold text-ink-500 hover:text-ink">
        ← Voltar aos imóveis
      </Link>
      <p className="eyebrow mt-4">{property.reference}</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">Editar imóvel</h1>
      <p className="mt-2 text-sm text-ink-500">{property.title}</p>
      <div className="admin-card mt-6 p-5 sm:p-8">
        <PropertyForm property={property} />
      </div>
    </div>
  );
}
