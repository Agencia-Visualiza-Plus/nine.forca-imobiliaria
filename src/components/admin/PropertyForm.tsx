"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { locationOptions } from "@/lib/site";
import { propertyTypeLabels } from "@/lib/format";
import type { Property, PropertyType } from "@/lib/types";
import { ChevronDownIcon } from "@/components/icons";

type PropertyFormProps = {
  property?: Property;
};

const statusOptions = [
  { value: "disponivel", label: "Disponível" },
  { value: "reservado", label: "Reservado" },
  { value: "vendido", label: "Vendido" },
  { value: "arrendado", label: "Arrendado" },
];

function SelectField({
  id,
  name,
  label,
  defaultValue,
  children,
}: {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <select id={id} name={name} defaultValue={defaultValue} className="field pr-9">
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
      </div>
    </div>
  );
}

export function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>(property?.images ?? []);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: data });
      const json = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!response.ok || !json.url) {
        setError(json.error || "Não foi possível carregar a fotografia.");
        return;
      }
      setImages((current) => [...current, json.url as string]);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get("title") ?? ""),
      type: String(form.get("type") ?? "moradia"),
      transactionType: String(form.get("transactionType") ?? "comprar"),
      price: Number(form.get("price") ?? 0),
      neighborhood: String(form.get("neighborhood") ?? ""),
      city: String(form.get("city") ?? ""),
      bedrooms: Number(form.get("bedrooms") ?? 0),
      bathrooms: Number(form.get("bathrooms") ?? 0),
      parking: Number(form.get("parking") ?? 0),
      area: Number(form.get("area") ?? 0),
      description: String(form.get("description") ?? ""),
      features: String(form.get("features") ?? ""),
      status: String(form.get("status") ?? "disponivel"),
      featured: form.get("featured") === "on",
      images,
    };

    const url = property ? `/api/admin/properties/${property.id}` : "/api/admin/properties";
    const method = property ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(json.error || "Não foi possível guardar o imóvel.");
        return;
      }
      router.push("/admin/imoveis");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h2 className="font-display text-base font-bold text-ink">Dados do anúncio</h2>
        <p className="mt-1 text-[13px] text-ink-500">Título, tipo e preço visíveis no site.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="title">
              Título *
            </label>
            <input id="title" name="title" required defaultValue={property?.title} className="field" placeholder="Moradia T3 na Polana" />
          </div>
          <SelectField id="type" name="type" label="Tipo" defaultValue={property?.type ?? "moradia"}>
            {(Object.keys(propertyTypeLabels) as PropertyType[]).map((value) => (
              <option key={value} value={value}>
                {propertyTypeLabels[value]}
              </option>
            ))}
          </SelectField>
          <SelectField id="transactionType" name="transactionType" label="Transação" defaultValue={property?.transactionType ?? "comprar"}>
            <option value="comprar">Venda</option>
            <option value="arrendar">Arrendamento</option>
          </SelectField>
          <div>
            <label className="field-label" htmlFor="price">
              Preço (MT) *
            </label>
            <input id="price" name="price" type="number" min={0} required defaultValue={property?.price} className="field" />
          </div>
          <SelectField id="status" name="status" label="Estado" defaultValue={property?.status ?? "disponivel"}>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
        </div>
      </section>

      <section className="border-t border-paper-line pt-8">
        <h2 className="font-display text-base font-bold text-ink">Localização e características</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <SelectField id="neighborhood" name="neighborhood" label="Zona / bairro" defaultValue={property?.location.neighborhood ?? "Polana"}>
            {locationOptions.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </SelectField>
          <SelectField id="city" name="city" label="Cidade" defaultValue={property?.location.city ?? "Maputo"}>
            <option value="Maputo">Maputo</option>
            <option value="Matola">Matola</option>
            <option value="Marracuene">Marracuene</option>
          </SelectField>
          <div>
            <label className="field-label" htmlFor="bedrooms">
              Quartos
            </label>
            <input id="bedrooms" name="bedrooms" type="number" min={0} defaultValue={property?.bedrooms ?? 0} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor="bathrooms">
              Casas de banho
            </label>
            <input id="bathrooms" name="bathrooms" type="number" min={0} defaultValue={property?.bathrooms ?? 0} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor="parking">
              Estacionamento
            </label>
            <input id="parking" name="parking" type="number" min={0} defaultValue={property?.parking ?? 0} className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor="area">
              Área (m²)
            </label>
            <input id="area" name="area" type="number" min={0} defaultValue={property?.area ?? 0} className="field" />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="description">
              Descrição
            </label>
            <textarea id="description" name="description" rows={5} defaultValue={property?.description} className="field resize-y" />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="features">
              Características (uma por linha)
            </label>
            <textarea
              id="features"
              name="features"
              rows={4}
              defaultValue={property?.features.join("\n")}
              className="field resize-y"
              placeholder={"Piscina\nJardim\nCozinha equipada"}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-paper-line pt-8">
        <h2 className="font-display text-base font-bold text-ink">Fotografias</h2>
        <p className="mt-1 text-[13px] text-ink-500">A primeira imagem é a capa do anúncio.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div key={image} className="relative h-24 w-32 overflow-hidden rounded-xl border border-paper-line bg-paper-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-full w-full object-cover" />
              {index === 0 ? (
                <span className="absolute left-1 top-1 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold text-white">Capa</span>
              ) : null}
              <button
                type="button"
                onClick={() => setImages((current) => current.filter((item) => item !== image))}
                className="absolute right-1 top-1 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold text-white"
              >
                X
              </button>
            </div>
          ))}
          {images.length === 0 ? (
            <p className="w-full rounded-xl border border-dashed border-paper-line bg-paper-soft px-4 py-8 text-center text-sm text-ink-500">
              Ainda não há fotografias neste anúncio.
            </p>
          ) : null}
        </div>
        <label className="btn-outline mt-4 cursor-pointer">
          {uploading ? "A carregar…" : "Adicionar fotografia"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadFile(file);
              event.currentTarget.value = "";
            }}
          />
        </label>
      </section>

      <label className="flex items-center gap-3 rounded-xl border border-paper-line bg-paper-soft px-4 py-3 text-sm text-ink-600">
        <input type="checkbox" name="featured" defaultChecked={property?.featured} className="h-4 w-4 accent-brand" />
        Destacar na página inicial
      </label>

      {error && (
        <p className="rounded-xl bg-brand-50 px-3 py-2 text-[13px] font-medium text-brand-700" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3 border-t border-paper-line pt-6">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "A guardar…" : property ? "Guardar alterações" : "Publicar imóvel"}
        </button>
        <button type="button" onClick={() => router.push("/admin/imoveis")} className="btn-outline">
          Cancelar
        </button>
      </div>
    </form>
  );
}
