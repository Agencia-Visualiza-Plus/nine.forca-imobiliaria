import { WhatsAppButton } from "./WhatsAppButton";
import { InstagramIcon, PhoneIcon } from "./icons";
import { site } from "@/lib/site";
import { propertyWhatsappMessage } from "@/lib/whatsapp";

type PropertyContactCardProps = {
  propertyTitle: string;
  reference: string;
};

export function PropertyContactCard({ propertyTitle, reference }: PropertyContactCardProps) {
  return (
    <div className="rounded-2xl border border-paper-line bg-white p-5 shadow-card">
      <p className="eyebrow">Contacto do imóvel</p>
      <h2 className="mt-1.5 font-display text-lg font-bold text-ink">{site.name}</h2>
      <p className="mt-1 text-[13px] text-ink-500">
        Ref. {reference} — responda-nos no WhatsApp e combinamos a visita.
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

      <dl className="mt-5 space-y-2 border-t border-paper-line pt-4 text-[13px]">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink-500">Zona de atuação</dt>
          <dd className="font-medium text-ink">Maputo e Matola</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink-500">Contacto preferencial</dt>
          <dd className="font-medium text-ink">WhatsApp</dd>
        </div>
      </dl>
    </div>
  );
}
