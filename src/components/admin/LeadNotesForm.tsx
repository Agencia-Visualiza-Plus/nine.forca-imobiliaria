"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LeadNotesForm({ id, notes }: { id: string; notes: string }) {
  const router = useRouter();
  const [value, setValue] = useState(notes);
  const [saved, setSaved] = useState(false);

  async function save() {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: value }),
    });
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="mt-2">
      <textarea
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setSaved(false);
        }}
        rows={2}
        className="field resize-y text-[13px]"
        placeholder="Notas internas"
      />
      <button type="button" onClick={() => void save()} className="mt-2 text-[12px] font-semibold text-brand-600">
        {saved ? "Notas guardadas" : "Guardar notas"}
      </button>
    </div>
  );
}
