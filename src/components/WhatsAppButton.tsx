import { WhatsAppIcon } from "./icons";
import { generalWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  /** Mensagem pré-preenchida. Por defeito usa o texto de contacto geral. */
  message?: string;
  label?: string;
  variant?: "solid" | "outline" | "dark" | "light";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  className?: string;
};

const variantClasses: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
  solid: "bg-[#1FB15A] text-white hover:bg-[#188F49]",
  outline: "border border-[#1FB15A]/40 bg-white text-[#12803E] hover:border-[#1FB15A] hover:bg-[#1FB15A]/5",
  dark: "bg-ink text-white hover:bg-ink-800",
  light: "bg-white text-ink hover:bg-paper-muted",
};

const sizeClasses: Record<NonNullable<WhatsAppButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

export function WhatsAppButton({
  message = generalWhatsappMessage,
  label = "Falar no WhatsApp",
  variant = "solid",
  size = "md",
  block = false,
  className = "",
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — abre numa nova janela`}
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${
        block ? "w-full" : ""
      } ${className}`}
    >
      <WhatsAppIcon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      <span>{label}</span>
    </a>
  );
}
