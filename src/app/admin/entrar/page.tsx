"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError("Palavra-passe incorrecta.");
        return;
      }
      const next = params.get("next") || "/admin";
      router.push(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label className="field-label" htmlFor="admin-password">
          Palavra-passe
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="field"
          autoComplete="current-password"
        />
      </div>
      {error && <p className="text-[13px] font-medium text-brand-700">{error}</p>}
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "A entrar…" : "Entrar"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-paper-line bg-white p-8 shadow-card">
        <Logo />
        <h1 className="mt-6 font-display text-2xl font-extrabold text-ink">Painel administrativo</h1>
        <p className="mt-2 text-[14px] text-ink-500">
          Entre para gerir imóveis, visitas e contactos.
        </p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
