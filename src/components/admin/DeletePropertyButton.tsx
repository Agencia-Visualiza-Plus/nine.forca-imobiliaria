"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeletePropertyButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!window.confirm(`Remover o anúncio “${title}” do site?`)) return;
    setPending(true);
    try {
      await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" onClick={() => void handleClick()} disabled={pending} className="text-[13px] font-semibold text-brand-700">
      {pending ? "A remover…" : "Remover"}
    </button>
  );
}
