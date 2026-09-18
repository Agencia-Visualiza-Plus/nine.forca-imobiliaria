import { LeadNotesForm } from "@/components/admin/LeadNotesForm";
import { LeadStatusBadge } from "@/components/admin/AdminBadges";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { WhatsAppIcon } from "@/components/icons";
import { formatDateShort, formatVisitWhen } from "@/lib/format";
import { leadSourceLabels } from "@/lib/lead-labels";
import { crmStats, getAllLeads } from "@/lib/leads";
import { site } from "@/lib/site";
import { customerWhatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default function AdminLeadsPage() {
  const leads = getAllLeads();
  const stats = crmStats();

  return (
    <div>
      <p className="eyebrow">CRM</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">Leads</h1>
      <p className="mt-1 text-sm text-ink-500">Contactos, pedidos de visita e mensagens do formulário.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total", value: stats.total },
          { label: "Novos", value: stats.novos },
          { label: "Visitas", value: stats.visitas },
          { label: "Ganhos", value: stats.ganhos },
        ].map((item) => (
          <div key={item.label} className="admin-card px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">{item.label}</p>
            <p className="mt-1 font-display text-2xl font-extrabold text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      {leads.length === 0 ? (
        <div className="admin-card mt-6 px-6 py-16 text-center">
          <p className="font-display text-lg font-bold text-ink">Ainda não há leads</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">Os pedidos do site entram automaticamente.</p>
        </div>
      ) : (
        <div className="admin-card mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table min-w-[980px]">
              <thead className="bg-paper-soft">
                <tr>
                  <th>Contacto</th>
                  <th>Origem</th>
                  <th>Imóvel / visita</th>
                  <th>Estado</th>
                  <th>Notas</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-paper-line align-top">
                    <td>
                      <p className="font-medium text-ink">{lead.name}</p>
                      <a href={`tel:${lead.phone}`} className="mt-0.5 block text-[13px] text-ink-500 hover:text-ink">
                        {lead.phone}
                      </a>
                      {lead.email ? <p className="text-[12px] text-ink-500">{lead.email}</p> : null}
                      <p className="mt-1 text-[11px] text-ink-500">{formatDateShort(lead.createdAt)}</p>
                      <a
                        href={customerWhatsappLink(lead.phone, `Olá ${lead.name}, Nine Força Imobiliária.`)}
                        className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[#12803E] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    </td>
                    <td>
                      <span className="chip">{leadSourceLabels[lead.source]}</span>
                    </td>
                    <td className="text-ink-600">
                      <p className="font-medium">{lead.propertyTitle || "—"}</p>
                      {lead.visitDate ? (
                        <p className="mt-1 text-[12px] text-ink-500">{formatVisitWhen(lead.visitDate, lead.visitTime)}</p>
                      ) : null}
                      {lead.message ? <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-ink-500">{lead.message}</p> : null}
                    </td>
                    <td>
                      <LeadStatusSelect id={lead.id} value={lead.status} />
                      <div className="mt-2">
                        <LeadStatusBadge status={lead.status} />
                      </div>
                    </td>
                    <td className="min-w-[240px]">
                      <LeadNotesForm id={lead.id} notes={lead.notes} compact />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="mt-3 text-[12px] text-ink-500">WhatsApp da agência: {site.phoneDisplay}</p>
    </div>
  );
}
