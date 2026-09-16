"use client";

import { useState } from "react";
import { CheckIcon, WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

type Interest = "comprar" | "arrendar" | "vender" | "outro";

const interests: { value: Interest; label: string }[] = [
  { value: "comprar", label: "Quero comprar" },
  { value: "arrendar", label: "Quero arrendar" },
  { value: "vender", label: "Quero vender" },
  { value: "outro", label: "Outro assunto" },
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  interest: Interest;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  interest: "comprar",
  message: "",
};

type ContactFormProps = {
  className?: string;
  defaultInterest?: Interest;
};

export function ContactForm({ className = "", defaultInterest = "comprar" }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({ ...initialState, interest: defaultInterest });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Indique o seu nome.";
    if (form.phone.trim().length < 9) nextErrors.phone = "Indique um número de telefone válido.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "O email indicado não parece válido.";
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const interestLabel = interests.find((item) => item.value === form.interest)?.label ?? "Contacto";
    const lines = [
      "Olá, Nine Força Imobiliária.",
      `Nome: ${form.name.trim()}`,
      `Telefone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      `Interesse: ${interestLabel}`,
      `Mensagem: ${form.message.trim()}`,
    ].filter(Boolean);

    const link = whatsappLink(lines.join("\n"));
    setSentLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="contact-name">
            Nome *
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="field"
            placeholder="O seu nome"
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1 text-[12px] font-medium text-brand-700">
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="contact-phone">
            Telefone / WhatsApp *
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className="field"
            placeholder="+258 84 000 0000"
          />
          {errors.phone && (
            <p id="contact-phone-error" className="mt-1 text-[12px] font-medium text-brand-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="contact-email">
            Email (opcional)
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="field"
            placeholder="nome@email.com"
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1 text-[12px] font-medium text-brand-700">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="contact-interest">
            Interesse
          </label>
          <select
            id="contact-interest"
            name="interest"
            value={form.interest}
            onChange={(event) => update("interest", event.target.value as Interest)}
            className="field"
          >
            {interests.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="contact-message">
            Mensagem *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className="field resize-y"
            placeholder="Diga-nos o que procura: tipo de imóvel, zona, quartos e orçamento."
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1 text-[12px] font-medium text-brand-700">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="btn-whatsapp mt-5 w-full sm:w-auto">
        <WhatsAppIcon className="h-5 w-5" />
        Enviar pelo WhatsApp
      </button>
      <p className="mt-2 text-[12px] text-ink-500">
        Ao enviar, abrimos o WhatsApp com a sua mensagem já preenchida. Não guardamos os seus dados
        neste website.
      </p>

      {sentLink && (
        <div
          role="status"
          className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#1FB15A]/30 bg-[#1FB15A]/5 p-3.5 text-[13px] text-ink-600"
        >
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#12803E]" />
          <p>
            Mensagem preparada. Se o WhatsApp não abriu automaticamente,{" "}
            <a
              href={sentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#12803E] underline underline-offset-2"
            >
              clique aqui para abrir
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
