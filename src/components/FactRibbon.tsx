'use client';

import { useState } from 'react';
import { Marquee } from '@/components/ui/marquee';

const facts = [
  'Đã hoàn công',
  'Sổ hồng riêng từng căn',
  'Bàn giao ngay',
  '4 mặt tiền',
  '34 nhà phố thương mại',
  'The Galleria · 34 Limited',
];

// Thin full-bleed crimson ribbon of verified facts. The list is exposed once via aria-label;
// Marquee marks its repeated copies aria-hidden. The pause button satisfies WCAG 2.2.2
// (auto-moving content > 5s must be stoppable without a mouse).
export default function FactRibbon() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`relative bg-accent text-paper ${paused ? '[&_.animate-marquee]:[animation-play-state:paused]' : ''}`}
      role="group"
      aria-label={`Thông tin nổi bật: ${facts.join(', ')}`}
    >
      <Marquee pauseOnHover repeat={4} className="py-3 pr-14 [--duration:45s] [--gap:0rem]">
        {facts.map((f) => (
          <span
            key={f}
            className="flex items-center whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em]"
          >
            <span>{f}</span>
            <span
              aria-hidden="true"
              className="mx-6 inline-block h-1.5 w-1.5 rotate-45 bg-paper/80"
            />
          </span>
        ))}
      </Marquee>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? 'Tiếp tục chạy dải thông tin' : 'Tạm dừng dải thông tin'}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center bg-accent-dark text-paper/90 transition-colors hover:text-paper focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-inset"
      >
        {paused ? (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        )}
      </button>
    </div>
  );
}
