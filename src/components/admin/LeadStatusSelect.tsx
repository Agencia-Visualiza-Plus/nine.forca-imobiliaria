"use client";

import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@/components/icons";
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
    <div className="relative min-w-[168px]">
      <select
        value={value}
        onChange={(event) => void handleChange(event.target.value as LeadStatus)}
        className="field py-2 pr-9 text-[13px] font-medium"
        aria-label="Estado do lead"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {leadStatusLabels[status]}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
    </div>
  );
}
