import type { ReactNode } from 'react';

interface IconProps {
  className?: string;
}

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function CoffeeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 3v3M12 3v3" />
    </Icon>
  );
}

export function StoreIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 10v10h16V10" />
      <path d="M3 10l1.5-5h15L21 10a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
      <path d="M10 20v-5h4v5" />
    </Icon>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M3 13h18" />
    </Icon>
  );
}

export function ServiceIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M14.5 6.5a4 4 0 0 0 4.9 4.9L20 12l-8 8a2.1 2.1 0 0 1-3-3l8-8a4 4 0 0 0-2.5-3.5z" />
      <path d="M4 4l3 3" />
    </Icon>
  );
}

export function ScrollIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M8 4h10a2 2 0 0 1 2 2v1H10" />
      <path d="M8 4a2 2 0 0 0-2 2v12a2 2 0 0 1-2 2h13a2 2 0 0 0 2-2V7" />
      <path d="M9 11h6M9 15h4" />
    </Icon>
  );
}

export function ClipboardIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 4v2h6V4" />
      <path d="M9 11h6M9 15h4" />
    </Icon>
  );
}

export function MapIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </Icon>
  );
}

export function FileTextIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </Icon>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" />
      <path d="M15 9h3a1 1 0 0 1 1 1v11" />
      <path d="M3 21h18" />
      <path d="M9 7h2M9 11h2M9 15h2" />
    </Icon>
  );
}

export function RulerIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 17L17 3l4 4L7 21l-4-4z" />
      <path d="M7 13l2 2M10 10l2 2M13 7l2 2" />
    </Icon>
  );
}

export function BrochureIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 5l6-1.5L15 5l6-1.5v15L15 20l-6-1.5L3 20V5z" />
      <path d="M9 3.5v15M15 5v15" />
    </Icon>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Icon>
  );
}

export function PriceTagIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z" />
      <circle cx="8" cy="8" r="1.25" />
    </Icon>
  );
}
