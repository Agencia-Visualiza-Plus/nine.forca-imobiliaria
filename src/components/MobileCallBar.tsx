import { WhatsAppIcon, PhoneIcon } from "./icons";
import { generalWhatsappMessage, whatsappLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-paper-line bg-white/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-shell items-center gap-2">
        <a
          href={whatsappLink(generalWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn flex-1 bg-[#1FB15A] text-white hover:bg-[#188F49]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
        <a href={site.phoneHref} className="btn-outline flex-1" aria-label={`Ligar para ${site.phoneDisplay}`}>
          <PhoneIcon className="h-4 w-4" />
          Ligar
        </a>
      </div>
    </div>
  );
}
