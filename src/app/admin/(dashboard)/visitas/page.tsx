import { LeadNotesForm } from "@/components/admin/LeadNotesForm";
import { LeadStatusBadge } from "@/components/admin/AdminBadges";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { formatVisitWhen } from "@/lib/format";
import { getVisitLeads } from "@/lib/leads";
import { customerWhatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default function AdminVisitsPage() {
  const visits = getVisitLeads().sort((a, b) => `${a.visitDate}${a.visitTime}`.localeCompare(`${b.visitDate}${b.visitTime}`));

  return (
    <div>
      <p className="eyebrow">Agenda</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">Visitas</h1>
      <p className="mt-1 text-sm text-ink-500">Pedidos feitos no site para ver um imóvel.</p>

      <div className="mt-6 space-y-4">
        {visits.map((lead) => (
          <article key={lead.id} className="admin-card p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-lg font-bold text-ink">{lead.name}</p>
                  <LeadStatusBadge status={lead.status} />
                </div>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  <CalendarIcon className="h-4 w-4 text-brand" />
                  {formatVisitWhen(lead.visitDate, lead.visitTime)}
                </p>
                <p className="mt-1 text-sm text-ink-600">{lead.propertyTitle || "Imóvel não indicado"}</p>
              </div>
              <LeadStatusSelect id={lead.id} value={lead.status} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`tel:${lead.phone}`} className="chip hover:border-ink/30">
                <PhoneIcon className="h-3.5 w-3.5" />
                {lead.phone}
              </a>
              <a
                href={customerWhatsappLink(
                  lead.phone,
                  `Olá ${lead.name}, Nine Força Imobiliária. Confirmamos a visita${lead.propertyTitle ? ` a ${lead.propertyTitle}` : ""}${lead.visitDate ? ` no dia ${lead.visitDate}` : ""}${lead.visitTime ? ` às ${lead.visitTime}` : ""}.`,
                )}
                className="chip border-transparent bg-[#E8F7EE] text-[#0F6A38] hover:border-[#0F6A38]/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
            {lead.message && (
              <p className="mt-4 rounded-xl bg-paper-soft px-3 py-2 text-[13px] leading-relaxed text-ink-600">{lead.message}</p>
            )}
            <LeadNotesForm id={lead.id} notes={lead.notes} />
          </article>
        ))}
        {visits.length === 0 && (
          <div className="admin-card px-6 py-16 text-center">
            <p className="font-display text-lg font-bold text-ink">Ainda não há visitas</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
              Quando um cliente pedir uma visita na página do imóvel, o pedido aparece aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
