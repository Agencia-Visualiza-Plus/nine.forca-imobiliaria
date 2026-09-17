import { LeadNotesForm } from "@/components/admin/LeadNotesForm";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { getVisitLeads, leadStatusLabels } from "@/lib/leads";
import { customerWhatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default function AdminVisitsPage() {
  const visits = getVisitLeads().sort((a, b) => `${a.visitDate}${a.visitTime}`.localeCompare(`${b.visitDate}${b.visitTime}`));

  return (
    <div>
      <p className="eyebrow">Agenda</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">Visitas</h1>
      <p className="mt-1 text-sm text-ink-500">Pedidos feitos no site para ver um imóvel.</p>

      <div className="mt-6 space-y-4">
        {visits.map((lead) => (
          <article key={lead.id} className="rounded-2xl border border-paper-line bg-white p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold text-ink">{lead.name}</p>
                <p className="mt-1 text-sm text-ink-500">
                  {lead.visitDate || "Data a confirmar"} {lead.visitTime ? `às ${lead.visitTime}` : ""}
                </p>
                <p className="mt-1 text-sm text-ink-600">{lead.propertyTitle || "Imóvel não indicado"}</p>
              </div>
              <LeadStatusSelect id={lead.id} value={lead.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <a href={`tel:${lead.phone}`} className="font-semibold text-ink">
                {lead.phone}
              </a>
              <a
                href={customerWhatsappLink(
                  lead.phone,
                  `Olá ${lead.name}, Nine Força Imobiliária. Confirmamos a visita${lead.propertyTitle ? ` a ${lead.propertyTitle}` : ""}${lead.visitDate ? ` no dia ${lead.visitDate}` : ""}${lead.visitTime ? ` às ${lead.visitTime}` : ""}.`,
                )}
                className="font-semibold text-[#12803E]"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <span className="text-ink-500">{leadStatusLabels[lead.status]}</span>
            </div>
            {lead.message && <p className="mt-3 text-[13px] text-ink-600">{lead.message}</p>}
            <LeadNotesForm id={lead.id} notes={lead.notes} />
          </article>
        ))}
        {visits.length === 0 && (
          <p className="rounded-2xl border border-paper-line bg-white p-8 text-sm text-ink-500">
            Ainda não há visitas. Quando um cliente pedir uma visita na página do imóvel, o pedido aparece aqui.
          </p>
        )}
      </div>
    </div>
  );
}
