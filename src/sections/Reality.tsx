import Image from 'next/image';
import type { CSSProperties } from 'react';
import SectionHeader from '@/components/SectionHeader';

// The cadastral map above, now as reality: one aerial shot from the 16 Tháng 4 side, annotated with the
// streets the owner identified on it (30/09/2026): 16 Tháng 4 along the bottom, Đoàn Thị Điểm on the left,
// Hồ Xuân Hương on the right. Trần Quang Diệu is behind the block (not in frame) — orientation from the plan.
// Coordinates are % of the 1500×1080 frame; the wrapper keeps that aspect ratio so they never drift.

const AERIAL = {
  src: '/images/flycam/9.webp',
  alt: 'Ảnh flycam dãy 34 nhà phố Phan Rang Center nhìn từ phía đường 16 Tháng 4, công viên phía trước, khu dân cư trung tâm và núi phía xa',
};

type Label = { text: string; x: number; y: number; rotate?: number; muted?: boolean };

const streets: Label[] = [
  { text: 'Đường 16 Tháng 4', x: 50, y: 95.5 },
  { text: 'Đường Đoàn Thị Điểm', x: 14.5, y: 77, rotate: -52 },
  { text: 'Đường Hồ Xuân Hương', x: 83, y: 79, rotate: 74 },
  { text: 'Trần Quang Diệu — phía sau dãy nhà', x: 50, y: 47, muted: true },
];

const others = [
  { n: 3, alt: 'Ảnh flycam nhìn dọc đường 16 Tháng 4 về phía khu phố, sông và trung tâm thành phố phía xa' },
  { n: 5, alt: 'Ảnh flycam góc chéo dãy nhà phố và công viên phía trước' },
  { n: 1, alt: 'Ảnh flycam cận cảnh căn góc và vỉa hè nội khu' },
  { n: 2, alt: 'Ảnh flycam nhìn thẳng từ trên xuống công viên và đường phía trước' },
  { n: 8, alt: 'Ảnh flycam dãy nhà phố nhìn từ góc đường' },
  { n: 6, alt: 'Ảnh flycam cận cảnh mặt tiền căn góc' },
];

export default function Reality() {
  return (
    <section
      id="thuc-te"
      className="py-20 sm:py-28 lg:py-32 bg-warm-white"
      aria-labelledby="reality-title"
    >
      <div className="section-wrapper">
        <div className="section-inner">
          <SectionHeader
            id="reality-title"
            eyebrow="Thực tế"
            title="Bản vẽ ấy, nhìn từ trên cao."
            lead="Cùng hướng với sơ đồ phân lô: đứng từ đường 16 Tháng 4 nhìn vào, công viên phía trước, dãy nhà phố đã hoàn công phía sau, hai bên là Đoàn Thị Điểm và Hồ Xuân Hương."
          />

          {/* Annotated aerial */}
          <figure className="reveal-clip relative aspect-[25/18] overflow-hidden bg-off-white">
            <Image src={AERIAL.src} alt={AERIAL.alt} fill sizes="(min-width: 1440px) 1344px, 100vw" className="object-cover" />

            {/* street names laid on the roads, same lettering as the cadastral map */}
            <div aria-hidden="true">
              {streets.map((s) => (
                <span
                  key={s.text}
                  className={`absolute whitespace-nowrap ${s.muted ? 'hidden sm:block' : ''}`}
                  style={{ left: `${s.x}%`, top: `${s.y}%`, transform: `translate(-50%, -50%) rotate(${s.rotate ?? 0}deg)` } as CSSProperties}
                >
                  <span
                    className={`block rounded-sm px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.22em] sm:px-2.5 sm:py-1 sm:text-[10px] lg:text-xs ${
                      s.muted ? 'bg-charcoal/55 text-paper/90' : 'bg-paper/90 text-charcoal shadow-sm'
                    }`}
                  >
                    {s.muted ? '↑ ' : ''}
                    {s.text.startsWith('Đường ') ? (
                      <>
                        <span className="hidden sm:inline">Đường </span>
                        {s.text.slice(6)}
                      </>
                    ) : (
                      s.text
                    )}
                  </span>
                </span>
              ))}

              {/* pin on the block */}
              <span className="absolute" style={{ left: '38%', top: '58%' }}>
                <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-paper/70" />
                <span className="absolute left-0 top-0 hidden h-px w-16 origin-left -rotate-[35deg] bg-paper sm:block" />
                <span className="absolute -top-[2.8rem] left-12 hidden whitespace-nowrap bg-accent sm:block px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-paper sm:-top-[2.8rem] sm:left-12 sm:px-3 sm:text-[11px]">
                  34 nhà phố · The Galleria
                </span>
              </span>
            </div>

            <figcaption className="sr-only">
              Ảnh flycam nhìn từ phía đường 16 Tháng 4: phía trước là công viên, sau đó là dãy 34 nhà phố; bên trái là đường Đoàn Thị
              Điểm, bên phải là đường Hồ Xuân Hương; đường Trần Quang Diệu nằm phía sau dãy nhà.
            </figcaption>
          </figure>
          <p className="caption mt-3 text-concrete">
            Ảnh flycam thực tế. Tên đường trên ảnh do chủ dự án xác nhận; Trần Quang Diệu nằm ngoài khung hình.
          </p>

          {/* Other angles */}
          <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4" data-stagger aria-label="Các góc flycam khác">
            {others.map((p, i) => (
              <li key={p.n} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-off-white">
                  <Image
                    src={`/images/flycam/${p.n}.webp`}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 font-display text-sm text-accent">{String(i + 2).padStart(2, '0')}</p>
              </li>
            ))}
          </ol>

          <a href="#tai-lieu" className="btn-primary reveal mt-12 inline-flex" data-analytics="reality_cta">
            Nhận hình ảnh thực tế mới nhất
          </a>
        </div>
      </div>
    </section>
  );
}
