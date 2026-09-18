import type { LeadSource, LeadStatus } from "./types";

export const leadStatusLabels: Record<LeadStatus, string> = {
  novo: "Novo",
  "em-contacto": "Em contacto",
  "visita-agendada": "Visita agendada",
  "visita-realizada": "Visita realizada",
  ganho: "Ganho",
  perdido: "Perdido",
};

export const leadSourceLabels: Record<LeadSource, string> = {
  visita: "Pedido de visita",
  contacto: "Formulário de contacto",
  whatsapp: "WhatsApp",
};
