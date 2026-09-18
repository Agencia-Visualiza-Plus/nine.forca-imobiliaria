import Link from "next/link";
import { LeadStatusBadge, PropertyStatusBadge } from "@/components/admin/AdminBadges";
import { ArrowRightIcon, BuildingIcon, CalendarIcon, PlusIcon, UsersIcon } from "@/components/icons";
import { formatPrice, formatVisitWhen, propertyTypeLabels } from "@/lib/format";
import { crmStats, getAllLeads, getVisitLeads } from "@/lib/leads";
import { getAllProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  const properties = getAllProperties();
  const leads = getAllLeads();
  const visits = getVisitLeads();
  const stats = crmStats();

  const cards = [
    { label: "Imóveis", value: properties.length, href: "/admin/imoveis", hint: "Anúncios no site", icon: BuildingIcon },
    { label: "Leads", value: stats.total, href: "/admin/leads", hint: "Contactos no CRM", icon: UsersIcon },
    { label: "Novos", value: stats.novos, href: "/admin/leads", hint: "Ainda por tratar", icon: UsersIcon },
    { label: "Visitas", value: stats.visitas, href: "/admin/visitas", hint: stats.hoje ? `${stats.hoje} para hoje` : "Agendadas", icon: CalendarIcon },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Painel</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">Resumo</h1>
          <p className="mt-1 text-sm text-ink-500">Inventário, visitas e contactos num só sítio.</p>
        </div>
        <Link href="/admin/imoveis/novo" className="btn-primary">
          <PlusIcon className="h-4 w-4" />
          Adicionar imóvel
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group admin-card p-5 transition-shadow hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-500">{card.label}</p>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-paper-muted text-ink-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold text-ink">{card.value}</p>
              <p className="mt-1 text-[13px] text-ink-500">{card.hint}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="admin-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-ink">Últimos leads</h2>
            <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
              Ver CRM
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-paper-line">
            {leads.slice(0, 6).map((lead) => (
              <li key={lead.id} className="flex items-start justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{lead.name}</p>
                  <p className="mt-0.5 truncate text-[13px] text-ink-500">
                    {lead.phone}
                    {lead.propertyTitle ? ` · ${lead.propertyTitle}` : ""}
                  </p>
                </div>
                <LeadStatusBadge status={lead.status} />
              </li>
            ))}
            {leads.length === 0 && (
              <li className="py-8 text-sm text-ink-500">Ainda não há contactos. Os pedidos de visita e o formulário aparecem aqui.</li>
            )}
          </ul>
        </section>

        <section className="admin-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-ink">Próximas visitas</h2>
            <Link href="/admin/visitas" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
              Ver visitas
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-paper-line">
            {visits.slice(0, 6).map((lead) => (
              <li key={lead.id} className="py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-ink">{lead.name}</p>
                  <LeadStatusBadge status={lead.status} />
                </div>
                <p className="mt-1 text-[13px] text-ink-500">
                  {formatVisitWhen(lead.visitDate, lead.visitTime)} · {lead.propertyTitle || "Sem imóvel"}
                </p>
              </li>
            ))}
            {visits.length === 0 && (
              <li className="py-8 text-sm text-ink-500">Sem visitas agendadas.</li>
            )}
          </ul>
        </section>
      </div>

      <section className="admin-card mt-8 overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <h2 className="font-display text-lg font-bold text-ink">Imóveis recentes</h2>
          <Link href="/admin/imoveis" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
            Gerir imóveis
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table min-w-[640px]">
            <thead className="border-y border-paper-line bg-paper-soft">
              <tr>
                <th>Imóvel</th>
                <th>Tipo</th>
                <th>Preço</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {properties.slice(0, 6).map((property) => (
                <tr key={property.id} className="border-b border-paper-line last:border-b-0">
                  <td className="font-medium text-ink">
                    <Link href={`/admin/imoveis/${property.id}`} className="hover:text-brand-700">
                      {property.title}
                    </Link>
                    <p className="mt-0.5 text-[12px] font-normal text-ink-500">
                      {property.location.neighborhood}, {property.location.city}
                    </p>
                  </td>
                  <td className="text-ink-500">{propertyTypeLabels[property.type]}</td>
                  <td className="font-medium text-ink-600">{formatPrice(property)}</td>
                  <td>
                    <PropertyStatusBadge status={property.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
