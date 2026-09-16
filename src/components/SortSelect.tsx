"use client";

import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "./icons";
import type { PropertySort } from "@/lib/types";

const options: { value: PropertySort; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "recentes", label: "Mais recentes" },
  { value: "preco-asc", label: "Preço: menor primeiro" },
  { value: "preco-desc", label: "Preço: maior primeiro" },
  { value: "area-desc", label: "Área: maior primeiro" },
];

type SortSelectProps = {
  value: PropertySort;
};

export function SortSelect({ value }: SortSelectProps) {
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(window.location.search);
    const next = event.target.value;
    if (next === "relevancia") {
      params.delete("ordenar");
    } else {
      params.set("ordenar", next);
    }
    const query = params.toString();
    router.push(query ? `/imoveis?${query}` : "/imoveis", { scroll: false });
  }

  return (
    <div className="relative">
      <label htmlFor="ordenar" className="sr-only">
        Ordenar resultados
      </label>
      <select
        id="ordenar"
        value={value}
        onChange={handleChange}
        className="field w-auto min-w-[13rem] cursor-pointer pr-9"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            Ordenar: {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
    </div>
  );
}
