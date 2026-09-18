import { leadStatusLabels } from "@/lib/lead-labels";
import { statusLabels } from "@/lib/format";
import type { LeadStatus, PropertyStatus } from "@/lib/types";

const propertyStatusClass: Record<PropertyStatus, string> = {
  disponivel: "bg-emerald-50 text-emerald-800",
  reservado: "bg-brand-50 text-brand-700",
  vendido: "bg-ink/10 text-ink-600",
  arrendado: "bg-ink/10 text-ink-600",
};

const leadStatusClass: Record<LeadStatus, string> = {
  novo: "bg-brand-50 text-brand-700",
  "em-contacto": "bg-[#FFF4D6] text-[#8A5A00]",
  "visita-agendada": "bg-emerald-50 text-emerald-800",
  "visita-realizada": "bg-[#E8F1FF] text-[#1D4F91]",
  ganho: "bg-[#E8F7EE] text-[#0F6A38]",
  perdido: "bg-paper-muted text-ink-500",
};

export function PropertyStatusBadge({ status }: { status: PropertyStatus }) {
  return <span className={`admin-badge ${propertyStatusClass[status]}`}>{statusLabels[status]}</span>;
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <span className={`admin-badge ${leadStatusClass[status]}`}>{leadStatusLabels[status]}</span>;
}
