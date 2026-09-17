import { VisitForm } from "./VisitForm";
import { WhatsAppButton } from "./WhatsAppButton";
import { InstagramIcon, PhoneIcon } from "./icons";
import { site } from "@/lib/site";
import { propertyWhatsappMessage } from "@/lib/whatsapp";

type PropertyContactCardProps = {
  propertyId: string;
  propertyTitle: string;
  reference: string;
};

export function PropertyContactCard({
  propertyId,
  propertyTitle,
  reference,
}: PropertyContactCardProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-paper-line bg-white p-5 shadow-card">
        <VisitForm propertyId={propertyId} propertyTitle={propertyTitle} />
      </div>

      <div className="rounded-2xl border border-paper-line bg-white p-5 shadow-card">
        <p className="eyebrow">Contacto do imóvel</p>
        <h2 className="mt-1.5 font-display text-lg font-bold text-ink">{site.name}</h2>
        <p className="mt-1 text-[13px] text-ink-500">
          Ref. {reference} — ou fale connosco agora no WhatsApp.
        </p>

        <div className="mt-4 flex flex-col gap-2.5">
          <WhatsAppButton
            message={propertyWhatsappMessage(propertyTitle)}
            label="Falar no WhatsApp"
            block
          />
          <a href={site.phoneHref} className="btn-outline w-full">
            <PhoneIcon className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full"
          >
            <InstagramIcon className="h-4 w-4" />
            {site.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  );
}
