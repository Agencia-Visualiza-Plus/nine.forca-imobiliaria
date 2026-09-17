import { LeadNotesForm } from "@/components/admin/LeadNotesForm";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { crmStats, getAllLeads, leadSourceLabels, leadStatusLabels } from "@/lib/leads";
import { site } from "@/lib/site";
import { customerWhatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default function AdminLeadsPage() {
  const leads = getAllLeads();
  const stats = crmStats();

  return (
    <div>
      <p className="eyebrow">CRM</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">Leads</h1>
      <p className="mt-1 text-sm text-ink-500">
        Contactos, pedidos de visita e mensagens do formulário.
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-[13px]">
        <span className="chip">Total {stats.total}</span>
        <span className="chip">Novos {stats.novos}</span>
        <span className="chip">Visitas {stats.visitas}</span>
        <span className="chip">Ganhos {stats.ganhos}</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-paper-line bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-paper-soft text-[12px] uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Contacto</th>
                <th className="px-4 py-3 font-semibold">Origem</th>
                <th className="px-4 py-3 font-semibold">Imóvel / visita</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold">Notas</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-paper-line align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{lead.name}</p>
                    <a href={`tel:${lead.phone}`} className="text-[13px] text-ink-500">
                      {lead.phone}
                    </a>
                    {lead.email ? <p className="text-[12px] text-ink-500">{lead.email}</p> : null}
                    <a
                      href={customerWhatsappLink(lead.phone, `Olá ${lead.name}, Nine Força Imobiliária.`)}
                      className="mt-1 inline-block text-[12px] font-semibold text-[#12803E]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{leadSourceLabels[lead.source]}</td>
                  <td className="px-4 py-3 text-ink-600">
                    <p>{lead.propertyTitle || "—"}</p>
                    {lead.visitDate ? (
                      <p className="text-[12px] text-ink-500">
                        {lead.visitDate} {lead.visitTime}
                      </p>
                    ) : null}
                    {lead.message ? <p className="mt-1 max-w-xs text-[12px] text-ink-500">{lead.message}</p> : null}
                  </td>
                  <td className="px-4 py-3">
                    <LeadStatusSelect id={lead.id} value={lead.status} />
                    <p className="mt-1 text-[11px] text-ink-500">{leadStatusLabels[lead.status]}</p>
                  </td>
                  <td className="px-4 py-3 min-w-[220px]">
                    <LeadNotesForm id={lead.id} notes={lead.notes} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {leads.length === 0 && (
          <p className="px-4 py-8 text-sm text-ink-500">Ainda não há leads. Os pedidos do site entram automaticamente.</p>
        )}
      </div>
      <p className="mt-3 text-[12px] text-ink-500">WhatsApp da agência: {site.phoneDisplay}</p>
    </div>
  );
}
