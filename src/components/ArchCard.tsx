import type { ElementType, ReactNode } from 'react';

interface ArchCardProps {
  /** Optional index label rendered top-right in the display serif, e.g. \"01\". */
  index?: string;
  className?: string;
  children: ReactNode;
  as?: ElementType;
  /** 'dark' for charcoal sections. */
  tone?: 'light' | 'dark';
}

// Architectural card: crimson drawing-style corner ticks, a top hairline that extends on hover,
// border darkening and a subtle lift. The lift lives on an inner frame so the outer element can
// safely carry reveal classes (a revealed element gets transform: none).
export default function ArchCard({
  index,
  className = '',
  children,
  as: Tag = 'div',
  tone = 'light',
}: ArchCardProps) {
  const dark = tone === 'dark';
  const tick = dark ? 'border-accent-light' : 'border-accent';
  const tickBase = `pointer-events-none absolute h-3 w-3 transition-all duration-arch ease-arch group-hover/arch:h-5 group-hover/arch:w-5 ${tick}`;

  return (
    <Tag className={`group/arch relative ${className}`}>
      <div
        className={`relative h-full border transition-all duration-arch ease-arch group-hover/arch:-translate-y-0.5 group-hover/arch:shadow-md ${
          dark
            ? 'border-warm-white/15 bg-warm-white/5 group-hover/arch:border-accent-light group-hover/arch:bg-accent/15'
            : 'border-concrete/15 bg-paper shadow-sm group-hover/arch:border-concrete/40'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 h-px w-10 transition-all duration-arch ease-arch group-hover/arch:w-full ${
            dark ? 'bg-accent-light' : 'bg-accent'
          }`}
        />
        <span aria-hidden="true" className={`${tickBase} -left-px -top-px border-l-2 border-t-2`} />
        <span aria-hidden="true" className={`${tickBase} -right-px -top-px border-r-2 border-t-2`} />
        <span aria-hidden="true" className={`${tickBase} -bottom-px -left-px border-b-2 border-l-2`} />
        <span aria-hidden="true" className={`${tickBase} -bottom-px -right-px border-b-2 border-r-2`} />
        {index && (
          <span
            aria-hidden="true"
            className={`absolute right-5 top-4 font-display text-sm tracking-widest ${
              dark ? 'text-accent-light' : 'text-accent'
            }`}
          >
            {index}
          </span>
        )}
        {children}
      </div>
    </Tag>
  );
}
