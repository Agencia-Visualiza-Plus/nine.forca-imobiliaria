"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LeadNotesForm({
  id,
  notes,
  compact = false,
}: {
  id: string;
  notes: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(notes);
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  async function save() {
    setPending(true);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: value }),
      });
      setSaved(true);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={compact ? "" : "mt-4 border-t border-paper-line pt-4"}>
      <textarea
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setSaved(false);
        }}
        rows={compact ? 3 : 2}
        className="field resize-y text-[13px]"
        placeholder="Notas internas"
      />
      <button
        type="button"
        onClick={() => void save()}
        disabled={pending}
        className={`mt-2 text-[12px] font-semibold ${saved ? "text-[#0F6A38]" : "text-brand-600 hover:text-brand-700"}`}
      >
        {pending ? "A guardar…" : saved ? "Notas guardadas" : "Guardar notas"}
      </button>
    </div>
  );
}
