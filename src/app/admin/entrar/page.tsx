"use client";

import Link from "next/link";
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
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
          autoFocus
          required
        />
      </div>
      {error && (
        <p className="rounded-xl bg-brand-50 px-3 py-2 text-[13px] font-medium text-brand-700" role="alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "A entrar…" : "Entrar no painel"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-ink/10 blur-3xl" />
      </div>
      <div className="relative w-full max-w-md rounded-2xl border border-paper-line bg-white p-8 shadow-lift sm:p-10">
        <Logo />
        <p className="eyebrow mt-7">Área reservada</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold text-ink">Painel administrativo</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
          Entre para gerir imóveis, visitas e contactos da Nine Força.
        </p>
        <Suspense>
          <LoginForm />
        </Suspense>
        <Link href="/" className="mt-6 block text-center text-[13px] font-medium text-ink-500 hover:text-ink">
          Voltar ao site
        </Link>
      </div>
    </div>
  );
}
