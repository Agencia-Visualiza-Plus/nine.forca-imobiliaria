import Link from "next/link";
import { PropertyForm } from "@/components/admin/PropertyForm";

export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/imoveis" className="text-[13px] font-semibold text-ink-500 hover:text-ink">
        ← Voltar aos imóveis
      </Link>
      <p className="eyebrow mt-4">Inventário</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">Adicionar imóvel</h1>
      <p className="mt-2 text-sm text-ink-500">O anúncio fica visível no site assim que for publicado.</p>
      <div className="admin-card mt-6 p-5 sm:p-8">
        <PropertyForm />
      </div>
    </div>
  );
}
