import { site } from "./site";

/**
 * Constrói um link de WhatsApp com mensagem pré-preenchida.
 * Centralizado para que todas as conversões usem o mesmo número.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.phoneInternational}?text=${encodeURIComponent(message)}`;
}

export function propertyWhatsappMessage(propertyTitle: string): string {
  return `Olá, Nine Força Imobiliária. Tenho interesse neste imóvel: ${propertyTitle}. Gostaria de saber mais informações e marcar uma visita.`;
}

export function propertyWhatsappLink(propertyTitle: string): string {
  return whatsappLink(propertyWhatsappMessage(propertyTitle));
}

export const generalWhatsappMessage =
  "Olá, Nine Força Imobiliária. Estou à procura de um imóvel e gostaria de receber ajuda.";

export const generalWhatsappLink = whatsappLink(generalWhatsappMessage);

export function sellWhatsappMessage(): string {
  return "Olá, Nine Força Imobiliária. Quero vender o meu imóvel e gostaria de falar com um consultor.";
}

export function sellWhatsappLink(): string {
  return whatsappLink(sellWhatsappMessage());
}

export function locationWhatsappMessage(place: string): string {
  return `Olá, Nine Força Imobiliária. Estou à procura de um imóvel em ${place} e gostaria de receber ajuda.`;
}

export function typeWhatsappMessage(typeLabel: string): string {
  return `Olá, Nine Força Imobiliária. Estou à procura de ${typeLabel.toLowerCase()} e gostaria de receber ajuda.`;
}
