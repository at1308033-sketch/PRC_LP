'use client';

import Image from 'next/image';
import { useState } from 'react';

// Vertical section of one standard shophouse, drawn with plain HTML so every floor group is a real <button>.
// Verified: 5 floors, standard lot 7,5 × 19,5 m, ground-floor ceiling 4 m (docs/VERIFIED_FACTS_2026-09-30.md).
// Floor uses and the interior renders are a SUGGESTED layout only — labelled as such in the UI.

type GroupId = 'ground' | 'living' | 'rest' | 'roof';

interface Group {
  id: GroupId;
  floors: string;
  title: string;
  note: string;
  images: { src: string; alt: string }[];
}

const groups: Group[] = [
  {
    id: 'roof',
    floors: 'Sân thượng',
    title: 'Sân thượng',
    note: 'Gợi ý không gian tiếp khách ngoài trời.',
    images: [
      { src: '/images/sections/42.webp', alt: 'Phối cảnh sân thượng có mái pergola và bàn ăn ngoài trời' },
      { src: '/images/sections/43.webp', alt: 'Phối cảnh sân thượng nhìn ra phố' },
    ],
  },
  {
    id: 'rest',
    floors: 'Tầng 4 – 5',
    title: 'Nghỉ ngơi',
    note: 'Gợi ý phòng ngủ, phòng tắm, phòng thay đồ.',
    images: [
      { src: '/images/sections/25.webp', alt: 'Phối cảnh phòng ngủ tông gỗ ấm' },
      { src: '/images/sections/31.webp', alt: 'Phối cảnh phòng tắm đá marble' },
      { src: '/images/sections/35.webp', alt: 'Phối cảnh phòng thay đồ' },
    ],
  },
  {
    id: 'living',
    floors: 'Tầng 2 – 3',
    title: 'Sinh hoạt & làm việc',
    note: 'Gợi ý phòng khách, bếp đảo, góc làm việc.',
    images: [
      { src: '/images/sections/27.webp', alt: 'Phối cảnh phòng khách và bàn ăn' },
      { src: '/images/sections/28.webp', alt: 'Phối cảnh bếp đảo đá marble' },
      { src: '/images/sections/38.webp', alt: 'Phối cảnh góc làm việc' },
    ],
  },
  {
    id: 'ground',
    floors: 'Tầng 1',
    title: 'Mặt bằng kinh doanh',
    note: 'Trần tầng trệt 4 m, mặt tiền 7,5 m (mẫu 01 & 02).',
    images: [
      { src: '/images/sections/1.webp', alt: 'Phối cảnh mặt tiền kinh doanh tầng trệt' },
      { src: '/images/sections/16.webp', alt: 'Phối cảnh dãy cửa hàng dọc vỉa hè' },
      { src: '/images/sections/5.webp', alt: 'Phối cảnh dãy nhà phố thương mại' },
    ],
  },
];

// Window pair drawn inside an upper floor band.
function Windows({ active }: { active: boolean }) {
  const cls = active ? 'border-accent/70 bg-accent/10' : 'border-charcoal/25 bg-paper';
  return (
    <div className="absolute inset-x-[14%] inset-y-[22%] flex gap-[10%]" aria-hidden="true">
      <span className={`flex-1 border ${cls} transition-colors duration-500`} />
      <span className={`flex-1 border ${cls} transition-colors duration-500`} />
    </div>
  );
}

export default function FloorCutaway() {
  const [activeId, setActiveId] = useState<GroupId>('ground');
  const active = groups.find((g) => g.id === activeId)!;

  const bandClass = (id: GroupId) =>
    `relative block w-full text-left border-x border-t transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white ${
      activeId === id ? 'border-accent bg-accent/[0.06]' : 'border-charcoal/30 hover:bg-charcoal/[0.03]'
    }`;

  const select = (id: GroupId) => setActiveId(id);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Section drawing */}
      <div className="lg:col-span-5">
        <div className="reveal mx-auto flex max-w-md gap-4 sm:gap-6">
          <div className="flex-1">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-concrete">
              Mặt cắt căn chuẩn · gợi ý bố trí
            </p>
            <div role="group" aria-label="Chọn tầng để xem phối cảnh gợi ý" className="relative">
              {/* roof terrace with pergola battens */}
              <button
                type="button"
                onClick={() => select('roof')}
                aria-pressed={activeId === 'roof'}
                className={`${bandClass('roof')} h-12 border-t-0 bg-[repeating-linear-gradient(90deg,transparent_0_13px,rgba(30,26,23,0.22)_13px_14px)]`}
              >
                <span className="sr-only">Sân thượng — gợi ý không gian tiếp khách ngoài trời</span>
                <span className="absolute inset-x-0 top-0 h-px bg-charcoal/40" aria-hidden="true" />
              </button>

              {/* floors 5 → 2, grouped 4–5 and 2–3 */}
              {(['rest', 'living'] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => select(id)}
                  aria-pressed={activeId === id}
                  className={bandClass(id)}
                >
                  <span className="sr-only">
                    {groups.find((g) => g.id === id)!.floors} — {groups.find((g) => g.id === id)!.note}
                  </span>
                  {[0, 1].map((k) => (
                    <span key={k} className={`relative block h-16 ${k === 0 ? '' : 'border-t border-charcoal/20'}`}>
                      <Windows active={activeId === id} />
                    </span>
                  ))}
                </button>
              ))}

              {/* ground floor: taller, glazed shop front */}
              <button
                type="button"
                onClick={() => select('ground')}
                aria-pressed={activeId === 'ground'}
                className={`${bandClass('ground')} h-24 border-b`}
              >
                <span className="sr-only">Tầng 1 — mặt bằng kinh doanh, trần 4 m</span>
                <span
                  className={`absolute inset-x-[8%] bottom-0 top-[18%] border-x border-t transition-colors duration-500 ${
                    activeId === 'ground' ? 'border-accent/70 bg-accent/10' : 'border-charcoal/25 bg-paper'
                  }`}
                  aria-hidden="true"
                >
                  <span className="absolute inset-y-0 left-1/2 w-px bg-charcoal/25" />
                </span>
              </button>

              {/* ground line */}
              <span className="absolute -inset-x-4 -bottom-px h-0.5 bg-charcoal" aria-hidden="true" />

              {/* hand-written ceiling height, like an architect's note on the drawing */}
              <span className="absolute -left-9 bottom-0 flex h-24 items-center sm:-left-11" aria-hidden="true">
                <span className="absolute inset-y-0 right-0 w-px bg-accent/60" />
                <span className="absolute right-[-3px] top-0 h-px w-[7px] bg-accent/60" />
                <span className="absolute bottom-0 right-[-3px] h-px w-[7px] bg-accent/60" />
                <span className="-rotate-90 whitespace-nowrap pr-1 font-hand text-2xl leading-none text-accent">4 m</span>
              </span>
            </div>

            {/* width dimension */}
            <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-concrete" aria-hidden="true">
              <span className="h-2 w-px bg-concrete" />
              <span className="h-px flex-1 bg-concrete/60" />
              <span className="-rotate-2 font-hand text-2xl normal-case tracking-normal text-accent">7,5 m</span>
              <span className="h-px flex-1 bg-concrete/60" />
              <span className="h-2 w-px bg-concrete" />
            </div>
          </div>

          {/* floor labels, aligned with the bands */}
          <ol className="mt-[1.95rem] w-28 shrink-0 text-xs sm:w-36" aria-hidden="true">
            <li className="flex h-12 items-center">
              <Label active={activeId === 'roof'} floors="Mái" title="Sân thượng" />
            </li>
            <li className="flex h-32 items-center">
              <Label active={activeId === 'rest'} floors="T4 – T5" title="Nghỉ ngơi" />
            </li>
            <li className="flex h-32 items-center">
              <Label active={activeId === 'living'} floors="T2 – T3" title="Sinh hoạt" />
            </li>
            <li className="flex h-24 items-center">
              <Label active={activeId === 'ground'} floors="T1 · trần 4 m" title="Kinh doanh" />
            </li>
          </ol>
        </div>

        {/* verified specs, read against the drawing */}
        <dl className="reveal mx-auto mt-10 grid max-w-md grid-cols-2 gap-x-6 text-sm" data-stagger>
          {[
            ['Căn chuẩn', '7,5 × 19,5 m'],
            ['Trần tầng trệt', '4 m'],
            ['Diện tích đất', '135 – 200 m²'],
            ['Pháp lý', 'Sổ hồng riêng'],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-charcoal/15 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-concrete">{k}</dt>
              <dd className="mt-1 font-display text-xl text-charcoal">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="caption mx-auto mt-2 max-w-md text-concrete">Kích thước và trần theo căn mẫu 01 &amp; 02.</p>
      </div>

      {/* Renders for the selected floor group */}
      <div className="lg:col-span-7" aria-live="polite">
        <div className="reveal flex items-baseline justify-between gap-4 border-b border-charcoal/15 pb-4">
          <div>
            <p className="eyebrow !mb-2">{active.floors}</p>
            <h3 className="font-display text-3xl text-charcoal lg:text-4xl">{active.title}</h3>
          </div>
          <p className="max-w-[16rem] text-right text-sm text-concrete">{active.note}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {active.images.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden bg-off-white animate-[faq-in_600ms_ease-out_both] ${
                i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              } ${active.images.length === 2 && i === 1 ? 'col-span-2 aspect-[16/7]' : ''}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 28vw, 50vw'} className="object-cover" />
            </div>
          ))}
        </div>
        <p className="caption mt-4 text-concrete">
          Phối cảnh minh họa — gợi ý bố trí, không phải thiết kế bàn giao. Công năng từng tầng theo thiết kế chính thức,
          tư vấn chi tiết khi nhận hồ sơ.
        </p>
      </div>
    </div>
  );
}

function Label({ active, floors, title }: { active: boolean; floors: string; title: string }) {
  return (
    <span className={`flex items-center gap-2 transition-colors duration-500 ${active ? 'text-accent' : 'text-concrete'}`}>
      <span className={`h-px transition-all duration-500 ${active ? 'w-6 bg-accent' : 'w-3 bg-concrete/50'}`} />
      <span className="leading-tight">
        <span className="block font-semibold uppercase tracking-[0.14em]">{floors}</span>
        <span className="block font-display text-sm normal-case tracking-normal">{title}</span>
      </span>
    </span>
  );
}
