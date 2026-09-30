import type { ReactNode } from 'react';

interface SectionHeaderProps {
  id: string; // heading id, referenced by the section's aria-labelledby
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** 'split' puts the lead in a right column on lg; 'stack' keeps it under the title. */
  layout?: 'split' | 'stack';
  tone?: 'light' | 'dark';
  className?: string;
}

// Left-aligned editorial header shared by every content section.
export default function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  layout = 'split',
  tone = 'light',
  className = '',
}: SectionHeaderProps) {
  const titleColor = tone === 'dark' ? 'text-warm-white' : 'text-charcoal';
  const leadColor = tone === 'dark' ? 'text-warm-white/75' : 'text-concrete';
  const split = layout === 'split' && lead;

  return (
    <header
      className={`mb-12 lg:mb-16 animate-slide-up ${
        split ? 'lg:grid lg:grid-cols-12 lg:gap-12 lg:items-end' : 'max-w-3xl'
      } ${className}`}
    >
      <div className={split ? 'lg:col-span-7' : ''}>
        <p className={`eyebrow ${tone === 'dark' ? 'eyebrow-on-dark' : ''}`}>{eyebrow}</p>
        <h2 id={id} className={`display-lg ${titleColor}`}>
          {title}
        </h2>
      </div>
      {lead && (
        <p className={`body-lg ${leadColor} mt-6 ${split ? 'lg:col-span-5 lg:mt-0 lg:pb-2' : 'max-w-2xl'}`}>
          {lead}
        </p>
      )}
    </header>
  );
}
