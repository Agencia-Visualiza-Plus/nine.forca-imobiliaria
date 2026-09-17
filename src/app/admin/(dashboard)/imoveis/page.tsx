import Link from "next/link";
import { DeletePropertyButton } from "@/components/admin/DeletePropertyButton";
import { formatPrice, propertyTypeLabels, statusLabels, transactionLabels } from "@/lib/format";
import { getAllProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default function AdminPropertiesPage() {
  const properties = getAllProperties();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Inventário</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">Imóveis</h1>
          <p className="mt-1 text-sm text-ink-500">{properties.length} anúncios no site</p>
        </div>
        <Link href="/admin/imoveis/novo" className="btn-primary">
          Adicionar casa
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-paper-line bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-paper-soft text-[12px] uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Ref.</th>
                <th className="px-4 py-3 font-semibold">Título</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Preço</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-t border-paper-line">
                  <td className="px-4 py-3 text-ink-500">{property.reference}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{property.title}</p>
                    <p className="text-[12px] text-ink-500">
                      {transactionLabels[property.transactionType]} · {property.location.neighborhood}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{propertyTypeLabels[property.type]}</td>
                  <td className="px-4 py-3 text-ink-600">{formatPrice(property)}</td>
                  <td className="px-4 py-3 text-ink-600">{statusLabels[property.status]}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/imovel/${property.slug}`} className="text-[13px] font-semibold text-ink-500">
                        Ver
                      </Link>
                      <Link href={`/admin/imoveis/${property.id}`} className="text-[13px] font-semibold text-brand-600">
                        Editar
                      </Link>
                      <DeletePropertyButton id={property.id} title={property.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
