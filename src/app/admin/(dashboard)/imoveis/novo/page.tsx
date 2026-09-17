import { PropertyForm } from "@/components/admin/PropertyForm";

export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">Inventário</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">Adicionar imóvel</h1>
      <p className="mt-2 text-sm text-ink-500">
        O anúncio fica visível no site assim que for publicado.
      </p>
      <div className="mt-6 rounded-2xl border border-paper-line bg-white p-5 shadow-card sm:p-8">
        <PropertyForm />
      </div>
    </div>
  );
}
