import Image from "next/image";
import Link from "next/link";
import { DeletePropertyButton } from "@/components/admin/DeletePropertyButton";
import { PropertyStatusBadge } from "@/components/admin/AdminBadges";
import { PencilIcon, PlusIcon } from "@/components/icons";
import { formatPrice, propertyTypeLabels, transactionLabels } from "@/lib/format";
import { getAllProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default function AdminPropertiesPage() {
  const properties = getAllProperties();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Inventário</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">Imóveis</h1>
          <p className="mt-1 text-sm text-ink-500">
            {properties.length} {properties.length === 1 ? "anúncio" : "anúncios"} no site
          </p>
        </div>
        <Link href="/admin/imoveis/novo" className="btn-primary">
          <PlusIcon className="h-4 w-4" />
          Adicionar casa
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="admin-card mt-6 px-6 py-16 text-center">
          <p className="font-display text-lg font-bold text-ink">Ainda não há imóveis</p>
          <p className="mt-2 text-sm text-ink-500">Publique o primeiro anúncio para o mostrar no site.</p>
          <Link href="/admin/imoveis/novo" className="btn-primary mt-6">
            Adicionar imóvel
          </Link>
        </div>
      ) : (
        <div className="admin-card mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table min-w-[860px]">
              <thead className="bg-paper-soft">
                <tr>
                  <th>Imóvel</th>
                  <th>Tipo</th>
                  <th>Preço</th>
                  <th>Estado</th>
                  <th className="text-right">Acções</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-t border-paper-line align-middle">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-paper-muted">
                          {property.images[0] ? (
                            <Image
                              src={property.images[0]}
                              alt=""
                              fill
                              sizes="72px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-ink">{property.title}</p>
                          <p className="mt-0.5 text-[12px] text-ink-500">
                            {property.reference} · {transactionLabels[property.transactionType]} · {property.location.neighborhood}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-ink-600">{propertyTypeLabels[property.type]}</td>
                    <td className="font-medium text-ink-600">{formatPrice(property)}</td>
                    <td>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <PropertyStatusBadge status={property.status} />
                        {property.isDemo ? (
                          <span className="admin-badge bg-paper-muted text-ink-500">Demo</span>
                        ) : null}
                        {property.featured ? (
                          <span className="admin-badge bg-brand-50 text-brand-700">Destaque</span>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/imovel/${property.slug}`} className="text-[13px] font-semibold text-ink-500 hover:text-ink">
                          Ver
                        </Link>
                        <Link
                          href={`/admin/imoveis/${property.id}`}
                          className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 hover:text-brand-700"
                        >
                          <PencilIcon className="h-3.5 w-3.5" />
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
      )}
    </div>
  );
}
