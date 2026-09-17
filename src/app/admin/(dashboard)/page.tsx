import Link from "next/link";
import { crmStats, getAllLeads, getVisitLeads, leadStatusLabels } from "@/lib/leads";
import { getAllProperties } from "@/lib/properties";
import { formatPrice, propertyTypeLabels, statusLabels } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  const properties = getAllProperties();
  const leads = getAllLeads();
  const visits = getVisitLeads();
  const stats = crmStats();

  const cards = [
    { label: "Imóveis", value: properties.length, href: "/admin/imoveis" },
    { label: "Leads", value: stats.total, href: "/admin/leads" },
    { label: "Novos", value: stats.novos, href: "/admin/leads" },
    { label: "Visitas agendadas", value: stats.visitas, href: "/admin/visitas" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Painel</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">Resumo</h1>
        </div>
        <Link href="/admin/imoveis/novo" className="btn-primary">
          Adicionar imóvel
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-paper-line bg-white p-5 shadow-card transition-shadow hover:shadow-lift"
          >
            <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-500">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-ink">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-paper-line bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Últimos leads</h2>
            <Link href="/admin/leads" className="text-sm font-semibold text-brand-600">
              Ver CRM
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-paper-line">
            {leads.slice(0, 6).map((lead) => (
              <li key={lead.id} className="py-3">
                <p className="font-semibold text-ink">{lead.name}</p>
                <p className="text-[13px] text-ink-500">
                  {lead.phone} · {leadStatusLabels[lead.status]}
                  {lead.propertyTitle ? ` · ${lead.propertyTitle}` : ""}
                </p>
              </li>
            ))}
            {leads.length === 0 && (
              <li className="py-6 text-sm text-ink-500">Ainda não há contactos. Os pedidos de visita e o formulário aparecem aqui.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-paper-line bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Próximas visitas</h2>
            <Link href="/admin/visitas" className="text-sm font-semibold text-brand-600">
              Ver visitas
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-paper-line">
            {visits.slice(0, 6).map((lead) => (
              <li key={lead.id} className="py-3">
                <p className="font-semibold text-ink">{lead.name}</p>
                <p className="text-[13px] text-ink-500">
                  {lead.visitDate} {lead.visitTime} · {lead.propertyTitle || "Sem imóvel"}
                </p>
              </li>
            ))}
            {visits.length === 0 && (
              <li className="py-6 text-sm text-ink-500">Sem visitas agendadas.</li>
            )}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-paper-line bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">Imóveis recentes</h2>
          <Link href="/admin/imoveis" className="text-sm font-semibold text-brand-600">
            Gerir imóveis
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-[12px] uppercase tracking-wide text-ink-500">
              <tr>
                <th className="pb-2 font-semibold">Imóvel</th>
                <th className="pb-2 font-semibold">Tipo</th>
                <th className="pb-2 font-semibold">Preço</th>
                <th className="pb-2 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {properties.slice(0, 6).map((property) => (
                <tr key={property.id} className="border-t border-paper-line">
                  <td className="py-3 font-medium text-ink">{property.title}</td>
                  <td className="py-3 text-ink-500">{propertyTypeLabels[property.type]}</td>
                  <td className="py-3 text-ink-600">{formatPrice(property)}</td>
                  <td className="py-3 text-ink-500">{statusLabels[property.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
