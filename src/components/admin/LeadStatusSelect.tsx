"use client";

import { useRouter } from "next/navigation";
import { leadStatusLabels } from "@/lib/lead-labels";
import type { LeadStatus } from "@/lib/types";

const statuses = Object.keys(leadStatusLabels) as LeadStatus[];

export function LeadStatusSelect({ id, value }: { id: string; value: LeadStatus }) {
  const router = useRouter();

  async function handleChange(status: LeadStatus) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <select
      value={value}
      onChange={(event) => void handleChange(event.target.value as LeadStatus)}
      className="field py-1.5 pr-8 text-[13px]"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {leadStatusLabels[status]}
        </option>
      ))}
    </select>
  );
}
