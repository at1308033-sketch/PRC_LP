'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import Lightbox from '@/components/Lightbox';

// Render library, two tabs. Exterior renders are the developer's; the interior ones are suggested layouts
// (no floor numbers: not verified). Every image carries "Phối cảnh minh họa".

type Tab = 'ext' | 'int';

const sets: Record<Tab, { n: number; caption: string }[]> = {
  ext: [
    { n: 9, caption: 'Quảng trường dưới tán cây trước dãy phố' },
    { n: 13, caption: 'Ghế nghỉ dưới tán cây trong công viên' },
    { n: 17, caption: 'Lối dạo bậc cỏ uốn lượn' },
    { n: 19, caption: 'Cụm ghế cảnh quan nhìn từ trên cao' },
    { n: 14, caption: 'Bãi cỏ và chỗ ngồi trong công viên' },
    { n: 11, caption: 'Phố đi bộ trước dãy cửa hàng' },
  ],
  int: [
    { n: 23, caption: 'Phòng khách mở ra ban công' },
    { n: 32, caption: 'Bếp đảo và tủ trưng bày' },
    { n: 41, caption: 'Phòng giải trí' },
    { n: 21, caption: 'Phòng ngủ đón sáng' },
    { n: 44, caption: 'Phòng thay đồ' },
    { n: 22, caption: 'Phòng tắm vách kính' },
  ],
};

const tabs: { id: Tab; label: string }[] = [
  { id: 'ext', label: 'Ngoại thất & cảnh quan (6)' },
  { id: 'int', label: 'Gợi ý nội thất (6)' },
];

// Asymmetric 12-col layout from lg: row 1 = 7+5, row 2 = 4+4+4, row 3 = full-width panorama.
// Card B has no ratio of its own: it stretches to card A's height.
const cell = [
  'lg:col-span-7 aspect-[16/10]',
  'lg:col-span-5 aspect-[16/10] lg:aspect-auto',
  'lg:col-span-4 aspect-[16/10] lg:aspect-[4/3]',
  'lg:col-span-4 aspect-[16/10] lg:aspect-[4/3]',
  'lg:col-span-4 aspect-[16/10] lg:aspect-[4/3]',
  'lg:col-span-12 aspect-[16/10] lg:aspect-[21/9]',
];
const sizes = [
  '(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw',
  '(min-width: 1024px) 41vw, (min-width: 768px) 50vw, 100vw',
  '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  '(min-width: 1024px) 100vw, (min-width: 768px) 50vw, 100vw',
];

export default function SpatialGallery() {
  const [tab, setTab] = useState<Tab>('ext');
  const [open, setOpen] = useState<number | null>(null);
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});

  const items = sets[tab].map((s) => ({
    src: `/images/sections/${s.n}.webp`,
    alt: `Phối cảnh minh họa: ${s.caption}`,
    caption: s.caption,
  }));

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = tab === 'ext' ? 'int' : 'ext';
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="khong-gian" className="bg-paper py-20 sm:py-28 lg:py-32" aria-labelledby="gallery-title">
      <div className="section-wrapper">
        <div className="section-inner">
          <header className="animate-slide-up mx-auto mb-10 max-w-3xl text-center lg:mb-14">
            <p className="eyebrow justify-center">Thư viện phối cảnh</p>
            <p className="font-hand text-3xl leading-tight text-wood lg:text-4xl" aria-hidden="true">
              Phan Rang Center
            </p>
            <h2 id="gallery-title" className="mt-2 font-display text-2xl font-light leading-snug tracking-tight text-charcoal lg:text-4xl">
              Xem kỹ từng góc — ngoài phố và trong nhà.
            </h2>
          </header>

          <div role="tablist" aria-label="Loại phối cảnh" className="mx-auto mb-8 flex max-w-xl border-b border-concrete/20">
            {tabs.map((t) => {
              const selected = tab === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`gallery-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="gallery-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={onTabKey}
                  className={`relative min-h-[44px] flex-1 px-3 py-3 text-sm font-medium transition-colors duration-slow ${
                    selected ? 'text-accent' : 'text-concrete hover:text-charcoal'
                  }`}
                >
                  {t.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-px left-0 h-0.5 w-full origin-center bg-accent transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      selected ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div
            key={tab}
            id="gallery-panel"
            role="tabpanel"
            aria-labelledby={`gallery-tab-${tab}`}
            className="gallery-fade grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12"
          >
            {sets[tab].map((s, i) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Xem ảnh lớn: ${s.caption}`}
                className={`gallery-card group relative block w-full overflow-hidden bg-off-white text-left ${cell[i]}`}
              >
                <Image
                  src={items[i].src}
                  alt={items[i].alt}
                  fill
                  sizes={sizes[i]}
                  className="object-cover transition-transform duration-slow ease-out"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(30, 26, 23, 0.85) 100%)' }}
                />
                <span className="absolute inset-x-4 bottom-4 text-sm leading-snug text-paper">{s.caption}</span>
                <span className="render-tag absolute right-3 top-3">Phối cảnh minh họa</span>
              </button>
            ))}
          </div>

          {tab === 'int' && <p className="mt-6 text-center text-xs text-concrete">Ảnh nội thất là phối cảnh gợi ý bố trí.</p>}
        </div>
      </div>

      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
