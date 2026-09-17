"use client";

import { useMemo, useState } from "react";
import { CalendarIcon, CheckIcon } from "./icons";

type VisitFormProps = {
  propertyId: string;
  propertyTitle: string;
  className?: string;
};

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

export function VisitForm({ propertyId, propertyTitle, className = "" }: VisitFormProps) {
  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("10:00");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/visitas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          visitDate,
          visitTime,
          message,
          propertyId,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Não foi possível agendar a visita.");
        return;
      }
      setDone(true);
    } catch {
      setError("Ocorreu um erro de rede. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className={`rounded-2xl border border-[#1FB15A]/30 bg-[#1FB15A]/5 p-5 ${className}`}>
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1FB15A] text-white">
            <CheckIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-base font-bold text-ink">Pedido de visita enviado</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-600">
              Recebemos o seu pedido para visitar {propertyTitle} no dia {visitDate} às {visitTime}.
              A Nine confirma-lhe o horário pelo telefone {phone}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="agendar" className={className} noValidate>
      <div className="mb-4 flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-brand" />
        <h2 className="font-display text-lg font-bold text-ink">Agendar visita</h2>
      </div>
      <p className="mb-4 text-[13px] leading-relaxed text-ink-500">
        Escolha um horário. A equipa confirma a visita e acompanha-o no imóvel.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="visit-name">
            Nome *
          </label>
          <input
            id="visit-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="field"
            autoComplete="name"
            placeholder="O seu nome"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="visit-phone">
            Telefone / WhatsApp *
          </label>
          <input
            id="visit-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+258 84 000 0000"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="visit-email">
            Email (opcional)
          </label>
          <input
            id="visit-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field"
            type="email"
            autoComplete="email"
            placeholder="nome@email.com"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="visit-date">
            Data *
          </label>
          <input
            id="visit-date"
            type="date"
            min={minDate}
            value={visitDate}
            onChange={(event) => setVisitDate(event.target.value)}
            className="field"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="visit-time">
            Hora *
          </label>
          <select
            id="visit-time"
            value={visitTime}
            onChange={(event) => setVisitTime(event.target.value)}
            className="field"
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="visit-message">
            Observações
          </label>
          <textarea
            id="visit-message"
            rows={3}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="field resize-y"
            placeholder="Indique preferências de horário ou quem acompanha a visita."
          />
        </div>
      </div>
      {error && <p className="mt-3 text-[13px] font-medium text-brand-700">{error}</p>}
      <button type="submit" disabled={pending} className="btn-primary mt-4 w-full">
        {pending ? "A enviar…" : "Pedir visita"}
      </button>
    </form>
  );
}
