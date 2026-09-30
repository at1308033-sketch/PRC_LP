'use client';

import { useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { track } from '@/lib/analytics';
import { formatArea, lotStats, lots } from '@/lib/lots';
import type { Lot } from '@/lib/lots';

// Schematic geometry (viewBox units). Block = rounded rectangle, streets on all four sides.
const BX = 90;
const BY = 90;
const BW = 1020;
const BH = 410;
const SIDE_W = 120; // west / east block lot width
const ROW_X0 = BX + SIDE_W; // 210
const ROW_W = (BW - SIDE_W * 2) / 13; // 60
const ROW_H = BH / 2; // 205
const SIDE_H = BH / 4; // 102.5
const VB_W = 1200;
const VB_H = 640;

const rectOf = (lot: Lot) => {
  switch (lot.edge) {
    case 'west':
      return { x: BX, y: BY + SIDE_H * lot.order, w: SIDE_W, h: SIDE_H };
    case 'east':
      return { x: BX + BW - SIDE_W, y: BY + SIDE_H * lot.order, w: SIDE_W, h: SIDE_H };
    case 'north':
      return { x: ROW_X0 + ROW_W * lot.order, y: BY, w: ROW_W, h: ROW_H };
    default:
      return { x: ROW_X0 + ROW_W * lot.order, y: BY + ROW_H, w: ROW_W, h: ROW_H };
  }
};

type FilterKey = 'all' | 'corner' | 'north' | 'south' | 'sides';

const FILTERS: { key: FilterKey; label: string; match: (l: Lot) => boolean }[] = [
  { key: 'all', label: 'Tất cả', match: () => true },
  { key: 'corner', label: 'Lô góc', match: (l) => l.corner },
  { key: 'north', label: 'Mặt tiền Trần Quang Diệu', match: (l) => l.frontage.includes('Trần Quang Diệu') },
  {
    key: 'south',
    label: 'Mặt tiền đường nội khu Phan Rang Center',
    match: (l) => l.frontage.includes('Đường nội khu Phan Rang Center'),
  },
  {
    key: 'sides',
    label: 'Mặt tiền Hồ Xuân Hương / Đoàn Thị Điểm',
    match: (l) => l.frontage.includes('Hồ Xuân Hương') || l.frontage.includes('Đoàn Thị Điểm'),
  },
];

// Lot count per filter, read from the same data the filter matches on, so the number can never drift
// from the result. Corner lots front two streets, hence 15 / 15 / 8 rather than 13 / 13 / 4.
const FILTER_COUNTS: Record<FilterKey, number> = FILTERS.reduce(
  (acc, f) => ({ ...acc, [f.key]: lots.filter(f.match).length }),
  {} as Record<FilterKey, number>
);

// Approved range (135–200 m²/căn), not min/max of the per-lot figures — see lotStats.
const fmtMinMax = `${lotStats.approvedMinArea}–${lotStats.approvedMaxArea} m²`;

// Thin crimson corner ticks (architectural frame)
function Ticks() {
  const c = 'pointer-events-none absolute h-3 w-3 border-accent';
  return (
    <>
      <span aria-hidden="true" className={`${c} -left-px -top-px border-l border-t`} />
      <span aria-hidden="true" className={`${c} -right-px -top-px border-r border-t`} />
      <span aria-hidden="true" className={`${c} -bottom-px -left-px border-b border-l`} />
      <span aria-hidden="true" className={`${c} -bottom-px -right-px border-b border-r`} />
    </>
  );
}

export default function LotMap() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number>(lots[0].id);
  const lotRefs = useRef<Record<number, SVGGElement | null>>({});

  const match = useMemo(() => FILTERS.find((f) => f.key === filter)!.match, [filter]);
  const selected = useMemo(() => lots.find((l) => l.id === selectedId) ?? null, [selectedId]);

  // Dimmed-but-still-selected was confusing: the detail panel described a lot the map had greyed out.
  // Driven by the filter click only, so clicking a dimmed lot still opens it.
  const applyFilter = (next: FilterKey) => {
    setFilter(next);
    const nextMatch = FILTERS.find((f) => f.key === next)!.match;
    if (selected && !nextMatch(selected)) setSelectedId(null);
  };

  const select = (lot: Lot) => {
    setSelectedId(lot.id);
    setActiveId(lot.id);
    track('lot_select', { lot: lot.id });
  };

  const onKey = (e: KeyboardEvent<SVGGElement>, lot: Lot) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(lot);
      return;
    }
    const index = lots.findIndex((l) => l.id === lot.id);
    let targetIndex: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        targetIndex = index + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        targetIndex = index - 1;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = lots.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const next = lots[Math.min(lots.length - 1, Math.max(0, targetIndex))];
    setActiveId(next.id);
    lotRefs.current[next.id]?.focus();
  };

  const requestInfo = () => {
    if (!selected) return;
    window.dispatchEvent(new CustomEvent('prc:lot-select', { detail: { lotId: selected.id } }));
    const target = document.getElementById('tai-lieu');
    if (target) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Stats */}
      <dl className="flex flex-wrap gap-x-12 gap-y-4 mb-8 border-t border-concrete/20 pt-6" data-stagger>
        {[
          { v: String(lotStats.total), l: 'lô', count: true },
          { v: String(lotStats.corner), l: 'lô góc', count: true },
          { v: fmtMinMax, l: 'diện tích', count: false },
        ].map((s) => (
          <div key={s.l} className="flex items-baseline gap-2">
            <dt className="sr-only">{s.l}</dt>
            <dd
              className="font-display text-3xl lg:text-4xl text-accent"
              {...(s.count ? { 'data-countup': s.v } : {})}
            >
              {s.v}
            </dd>
            <span className="text-sm text-concrete" aria-hidden="true">
              {s.l}
            </span>
          </div>
        ))}
      </dl>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Lọc lô theo mặt tiền" data-stagger>
        {FILTERS.map((f) => {
          const active = f.key === filter;
          return (
            <div key={f.key}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => applyFilter(f.key)}
                className={`px-4 py-2 rounded-full border text-sm transition-colors duration-300 ${
                  active
                    ? 'bg-accent text-paper border-accent'
                    : 'bg-paper text-charcoal border-concrete/25 hover:border-accent hover:text-accent'
                }`}
              >
                {f.label} · {FILTER_COUNTS[f.key]}
              </button>
            </div>
          );
        })}
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
        {/* Map */}
        <div className="lg:col-span-8 min-w-0">
          <div className="relative border border-concrete/20 bg-off-white/70">
            <Ticks />
            <div className="overflow-x-auto overscroll-x-contain">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="block w-full min-w-[900px] h-auto"
                role="group"
                aria-label="Bản đồ phân lô 34 thửa nhà phố thương mại"
              >
                {/* Cadastral sheet: tracing-paper grid, roads with kerb + sidewalk + dashed centre line,
                    dash-dot crimson boundary (chỉ giới), plot number + area in each lot, hatched corner plots. */}
                <defs>
                  <clipPath id="lotmap-block">
                    <rect x={BX} y={BY} width={BW} height={BH} rx={22} />
                  </clipPath>
                  <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0V20" fill="none" stroke="#1E1A17" strokeOpacity="0.06" strokeWidth="1" />
                  </pattern>
                  <pattern id="cad-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="7" stroke="#907860" strokeOpacity="0.55" strokeWidth="1.2" />
                  </pattern>
                  <pattern id="cad-park" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="1.1" fill="#6F7F58" fillOpacity="0.55" />
                    <circle cx="9" cy="9" r="1.1" fill="#6F7F58" fillOpacity="0.55" />
                  </pattern>
                </defs>

                {/* sheet */}
                <rect x={0} y={0} width={VB_W} height={VB_H} className="fill-paper" />
                <rect x={0} y={0} width={VB_W} height={VB_H} fill="url(#cad-grid)" />

                {/* far kerbs of the four roads */}
                <rect x={18} y={18} width={VB_W - 36} height={556} rx={58} fill="none" className="stroke-charcoal/25" strokeWidth={1} />
                {/* sidewalk ring around the block (vỉa hè) */}
                <rect x={BX - 18} y={BY - 18} width={BW + 36} height={BH + 36} rx={36} className="fill-off-white stroke-charcoal/35" strokeWidth={1} />

                {/* road centre lines */}
                <g className="stroke-charcoal/35" strokeWidth={1} strokeDasharray="14 10" fill="none" aria-hidden="true">
                  <path d={`M110 45 H${VB_W - 110}`} />
                  <path d={`M110 545 H${VB_W - 110}`} />
                  <path d="M45 120 V470" />
                  <path d={`M${VB_W - 45} 120 V470`} />
                </g>

                {/* street names written along the centre line, knocked out of it */}
                <g
                  className="fill-charcoal/70"
                  fontSize={12}
                  letterSpacing={4}
                  fontWeight={600}
                  textAnchor="middle"
                  style={{ paintOrder: 'stroke', stroke: '#FBF8F3', strokeWidth: 8, strokeLinejoin: 'round' }}
                  aria-hidden="true"
                >
                  <text x={VB_W / 2} y={49}>ĐƯỜNG TRẦN QUANG DIỆU</text>
                  <text x={VB_W / 2} y={549}>ĐƯỜNG NỘI KHU PHAN RANG CENTER</text>
                  <text transform={`translate(49 ${BY + BH / 2}) rotate(-90)`}>ĐƯỜNG ĐOÀN THỊ ĐIỂM</text>
                  <text transform={`translate(${VB_W - 49} ${BY + BH / 2}) rotate(90)`}>ĐƯỜNG HỒ XUÂN HƯƠNG</text>
                </g>

                {/* park south of the internal road */}
                <rect x={18} y={586} width={VB_W - 36} height={46} rx={10} fill="url(#cad-park)" className="stroke-charcoal/20" strokeWidth={1} />
                <text x={VB_W / 2} y={614} textAnchor="middle" fontSize={11} letterSpacing={4} fontWeight={600} fill="#4F5B3D" style={{ paintOrder: 'stroke', stroke: '#FBF8F3', strokeWidth: 6 }} aria-hidden="true">
                  CÔNG VIÊN
                </text>

                {/* sheet title + north arrow */}
                <g aria-hidden="true">
                  <text x={34} y={614} fontSize={10} letterSpacing={2.5} fontWeight={600} className="fill-concrete" style={{ paintOrder: 'stroke', stroke: '#FBF8F3', strokeWidth: 6 }}>
                    MẶT BẰNG PHÂN LÔ · THAM KHẢO
                  </text>
                  <g transform={`translate(${VB_W - 44} 598)`} className="fill-charcoal">
                    <path d="M0 -12 L7 8 L0 3 L-7 8 Z" />
                    <text y={24} textAnchor="middle" fontSize={10} fontWeight={700} style={{ paintOrder: 'stroke', stroke: '#FBF8F3', strokeWidth: 5 }}>B</text>
                  </g>
                </g>

                {/* block ground */}
                <rect x={BX} y={BY} width={BW} height={BH} rx={22} className="fill-paper" />

                <g clipPath="url(#lotmap-block)">
                  {lots.map((lot) => {
                    const r = rectOf(lot);
                    const isSel = lot.id === selectedId;
                    const dim = !match(lot);
                    const cx = r.x + r.w / 2;
                    // number + area stacked, pushed towards the lot's street frontage
                    const numY =
                      lot.edge === 'north' ? r.y + 42 : lot.edge === 'south' ? r.y + r.h - 34 : r.y + r.h / 2 + 2;
                    const sweep = Math.round(((cx - BX) / BW) * 560 + (lot.edge === 'south' ? 90 : 0));
                    return (
                      <g
                        key={lot.id}
                        className="reveal-fade"
                        style={{ ['--reveal-delay' as string]: `${sweep}ms` }}
                      >
                      <g
                        ref={(node) => {
                          lotRefs.current[lot.id] = node;
                        }}
                        tabIndex={lot.id === activeId ? 0 : -1}
                        role="button"
                        aria-pressed={isSel}
                        aria-label={`Lô ODT ${lot.id}, ${formatArea(lot.area)}${lot.corner ? ', lô góc' : ''}`}
                        onClick={() => select(lot)}
                        onFocus={() => setActiveId(lot.id)}
                        onKeyDown={(e) => onKey(e, lot)}
                        className="group cursor-pointer outline-none"
                        style={{ opacity: dim ? 0.3 : 1, transition: 'opacity 400ms ease' }}
                      >
                        <rect
                          x={r.x}
                          y={r.y}
                          width={r.w}
                          height={r.h}
                          className={`transition-colors duration-300 ${
                            isSel ? 'fill-accent' : 'fill-paper group-hover:fill-accent-light/60 group-focus-visible:fill-accent-light/60'
                          }`}
                        />
                        {lot.corner && !isSel && (
                          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="url(#cad-hatch)" pointerEvents="none" />
                        )}
                        {/* plot boundary: ink hairline */}
                        <rect
                          x={r.x}
                          y={r.y}
                          width={r.w}
                          height={r.h}
                          fill="none"
                          className="stroke-charcoal/60"
                          strokeWidth={0.9}
                          pointerEvents="none"
                        />
                        <rect
                          x={r.x + 2}
                          y={r.y + 2}
                          width={r.w - 4}
                          height={r.h - 4}
                          fill="none"
                          strokeWidth={3}
                          className="stroke-transparent group-focus-visible:stroke-accent"
                          pointerEvents="none"
                        />
                        <g textAnchor="middle" pointerEvents="none" aria-hidden="true">
                          <text
                            x={cx}
                            y={numY}
                            fontSize={19}
                            className={isSel ? 'fill-paper' : 'fill-charcoal'}
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {lot.id}
                          </text>
                          <text
                            x={cx}
                            y={numY + 16}
                            fontSize={9.5}
                            letterSpacing={0.4}
                            className={isSel ? 'fill-paper/80' : 'fill-concrete'}
                          >
                            {formatArea(lot.area)}
                          </text>
                        </g>
                      </g>
                      </g>
                    );
                  })}
                </g>

                {/* boundary (chỉ giới) — dash-dot crimson, drawn over the plots */}
                <rect
                  x={BX}
                  y={BY}
                  width={BW}
                  height={BH}
                  rx={22}
                  fill="none"
                  className="stroke-accent"
                  strokeWidth={1.8}
                  strokeDasharray="16 5 3 5"
                  pointerEvents="none"
                />
              </svg>
            </div>
          </div>
          <p className="sm:hidden caption text-concrete mt-2 text-center" aria-hidden="true">
            ← Vuốt để xem →
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-concrete">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-3.5 w-3.5 border border-charcoal/60 bg-[repeating-linear-gradient(45deg,rgba(144,120,96,0.6)_0_1px,transparent_1px_5px)]" aria-hidden="true" />
              Lô góc (2 mặt tiền)
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-3.5 w-3.5 bg-accent" aria-hidden="true" />
              Đang chọn
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="h-2 w-8" viewBox="0 0 32 8" aria-hidden="true"><path d="M0 4H32" className="stroke-accent" strokeWidth="1.8" strokeDasharray="8 3 2 3" /></svg>
              Chỉ giới khu đất
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="font-display text-charcoal">17</span>
              <span className="text-xs">số thửa · diện tích</span>
            </span>
          </div>
        </div>

        {/* Detail panel */}
        <aside
          className="relative lg:col-span-4 mt-6 lg:mt-0 bg-paper border border-concrete/20 p-6 lg:p-8 lg:sticky lg:top-24"
          aria-live="polite"
        >
          <Ticks />
          {selected ? (
            <div className="reveal-fade">
              <p className="eyebrow">Lô đã chọn</p>
              <h3 className="display-md text-charcoal mb-4">Lô ODT {selected.id}</h3>
              {selected.corner && (
                <span className="inline-block mb-5 px-3 py-1 rounded-full bg-wood/20 text-charcoal text-sm font-medium">
                  Lô góc 2 mặt tiền
                </span>
              )}
              <dl className="space-y-4 mb-6">
                <div>
                  <dt className="text-sm text-concrete">Diện tích</dt>
                  <dd className="text-lg text-charcoal font-medium">{formatArea(selected.area)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-concrete">Mặt tiền</dt>
                  <dd className="text-charcoal">{selected.frontage.join(' · ')}</dd>
                </div>
              </dl>
              <button type="button" onClick={requestInfo} className="btn-primary w-full">
                Nhận thông tin lô này
              </button>
            </div>
          ) : (
            <div className="reveal-fade">
              <p className="eyebrow">Chi tiết lô</p>
              <div className="flex flex-col items-center text-center py-6">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-accent/50 text-accent">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 3l12 7-5.5 1.5L10 17 6 3z" />
                  </svg>
                </span>
                <p className="font-display text-xl text-charcoal mb-2">Chọn một lô trên sơ đồ</p>
                <p className="body-sm text-concrete">Xem diện tích và mặt tiền của từng lô.</p>
              </div>
            </div>
          )}
        </aside>
      </div>

      <p className="caption text-concrete mt-8">
        Số hiệu và diện tích theo mặt bằng tổng thể, chỉ mang tính tham khảo. Thông tin chính thức theo hồ sơ dự án.
      </p>
    </div>
  );
}
