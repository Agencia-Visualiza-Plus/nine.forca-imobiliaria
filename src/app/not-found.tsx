import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalWhatsappMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <p className="eyebrow">Erro 404</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Página não encontrada
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-500">
            O imóvel ou a página que procura pode ter sido removido ou o endereço está incorreto.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/imoveis" className="btn-primary">
              Ver imóveis disponíveis
            </Link>
            <WhatsAppButton message={generalWhatsappMessage} label="Falar no WhatsApp" variant="outline" />
          </div>
        </div>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
