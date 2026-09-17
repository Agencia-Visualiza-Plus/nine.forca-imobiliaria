import { createId, readLeads, writeLeads } from "./store";
import type { Lead, LeadSource, LeadStatus } from "./types";

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

export type LeadInput = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: LeadSource;
  propertyId?: string;
  propertyTitle?: string;
  visitDate?: string;
  visitTime?: string;
};

export function getAllLeads(): Lead[] {
  return readLeads().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getLeadById(id: string): Lead | undefined {
  return readLeads().find((lead) => lead.id === id);
}

export function getVisitLeads(): Lead[] {
  return getAllLeads().filter((lead) => lead.source === "visita" || Boolean(lead.visitDate));
}

export function createLead(input: LeadInput): Lead {
  const now = new Date().toISOString();
  const lead: Lead = {
    id: createId("lead"),
    createdAt: now,
    updatedAt: now,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() ?? "",
    message: input.message?.trim() ?? "",
    source: input.source,
    status: input.visitDate ? "visita-agendada" : "novo",
    propertyId: input.propertyId ?? "",
    propertyTitle: input.propertyTitle ?? "",
    visitDate: input.visitDate ?? "",
    visitTime: input.visitTime ?? "",
    notes: "",
  };
  const list = readLeads();
  list.unshift(lead);
  writeLeads(list);
  return lead;
}

export function updateLead(id: string, patch: Partial<Omit<Lead, "id" | "createdAt">>): Lead | undefined {
  const list = readLeads();
  const index = list.findIndex((lead) => lead.id === id);
  if (index < 0) return undefined;
  const next: Lead = {
    ...list[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  list[index] = next;
  writeLeads(list);
  return next;
}

export function crmStats() {
  const leads = getAllLeads();
  const today = new Date().toISOString().slice(0, 10);
  return {
    total: leads.length,
    novos: leads.filter((lead) => lead.status === "novo").length,
    visitas: leads.filter((lead) => lead.status === "visita-agendada").length,
    hoje: leads.filter((lead) => lead.visitDate === today).length,
    ganhos: leads.filter((lead) => lead.status === "ganho").length,
  };
}
