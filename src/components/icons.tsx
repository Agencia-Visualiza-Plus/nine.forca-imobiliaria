import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-3.1 4.13c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.7 2.72 4.16 3.7.58.23 1.03.36 1.39.47.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.31-.73-1.79-.19-.47-.39-.4-.53-.41l-.46-.01Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M6.6 3.5h2.1l1.3 3.3-1.7 1.2a12.5 12.5 0 0 0 5.7 5.7l1.2-1.7 3.3 1.3v2.1a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={className} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function BedIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M3 18v-7m0 0h13a4 4 0 0 1 4 4v3m-17 0v0m0 0h18" />
      <path d="M3 11V7m0 4h3.2a2 2 0 0 0 2-2V8" />
      <circle cx="7.5" cy="8.5" r="1.4" />
    </svg>
  );
}

export function BathIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z" />
      <path d="M6 12V5.8A1.8 1.8 0 0 1 9.6 5" />
      <path d="M8 6h2.5" />
      <path d="M7 21l-1 1m11-1 1 1" />
    </svg>
  );
}

export function AreaIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 3.5v3M3.5 8h3" />
    </svg>
  );
}

export function CarIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M4 16.5h16" />
      <path d="M5.5 16.5v1.8M18.5 16.5v1.8" />
      <path d="M4.6 16.5v-2.9l1.6-4.6A1.7 1.7 0 0 1 7.8 7.8h8.4a1.7 1.7 0 0 1 1.6 1.2l1.6 4.6v2.9" />
      <path d="M5.2 12.6h13.6" />
      <path d="M7.4 9.6h9.2" />
    </svg>
  );
}

export function HeartIcon({ filled = false, className = "h-5 w-5", ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.6c0 5-7 9.4-7 9.4Z" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={className} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={className} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SlidersIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className={className} {...props}>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function BuildingIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M4 21V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M13 21V10h6a1 1 0 0 1 1 1v10M4 21h16" />
      <path d="M7.5 9h2M7.5 13h2M16 14h1M16 17.5h1" />
    </svg>
  );
}

export function HouseIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

export function ApartmentIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M6 21h12M9.5 7h1.5M13 7h1.5M9.5 11h1.5M13 11h1.5M9.5 15h1.5M13 15h1.5" />
    </svg>
  );
}

export function LandIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M3 18.5h18M3 18.5 6 8l6 4 6-6 3 12.5" />
    </svg>
  );
}

export function StoreIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M4 9.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5" />
      <path d="M3.5 9.5 5 4.8A1 1 0 0 1 6 4h12a1 1 0 0 1 1 .8l1.5 4.7a2.6 2.6 0 0 1-5 1 2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5-1Z" />
      <path d="M9.5 20v-5h5v5" />
    </svg>
  );
}

export function OfficeIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M5 21V5a1 1 0 0 1 1-1h7v17M13 10h5a1 1 0 0 1 1 1v10M3 21h18" />
      <path d="M8 8h2M8 12h2M8 16h2M16 14h.01M16 17.5h.01" />
    </svg>
  );
}

export function WarehouseIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M3 21V9l9-4 9 4v12" />
      <path d="M7 21v-6h10v6M7 11h10" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
    </svg>
  );
}

export function UsersIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.2 19a4.5 4.5 0 0 1 5.3-4.2" />
    </svg>
  );
}

export function SparkIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M12 3v4M12 17v4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M3 12h4M17 12h4M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}
