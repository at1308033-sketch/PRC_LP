import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import CompletionSeal from '@/components/CompletionSeal';

interface HeroProps {
  heroImage?: string;
}

// Street label drawn like a dimension line along one edge of the framed photo.
// Orientation matches the lot map: Trần Quang Diệu north, Hồ Xuân Hương east, Đoàn Thị Điểm west;
// 16 Tháng 4 closes the fourth side of the whole site (docs/VERIFIED_FACTS_2026-09-30.md).
function Street({ children, side }: { children: ReactNode; side: 'top' | 'right' | 'bottom' | 'left' }) {
  const vertical = side === 'left' || side === 'right';
  const pos = {
    top: 'inset-x-0 -top-7',
    bottom: 'inset-x-0 -bottom-7',
    left: 'inset-y-0 -left-7 [writing-mode:vertical-rl] rotate-180',
    right: 'inset-y-0 -right-7 [writing-mode:vertical-rl]',
  }[side];
  return (
    <div
      className={`absolute ${pos} ${vertical ? 'hidden sm:flex' : 'flex'} items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-concrete`}
    >
      <span className={`${vertical ? 'reveal-line-y w-px' : 'reveal-line h-px'} flex-1 bg-concrete/40`} aria-hidden="true" />
      <span className="whitespace-nowrap">{children}</span>
      <span className={`${vertical ? 'reveal-line-y w-px' : 'reveal-line h-px'} flex-1 bg-concrete/40`} aria-hidden="true" />
    </div>
  );
}

export default function Hero({ heroImage = '/images/heroes/hero-shophouse.avif' }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-warm-white pt-24 pb-20 lg:min-h-screen lg:pt-28 lg:pb-24"
      aria-labelledby="hero-title"
    >
      <div className="section-wrapper">
        <div className="section-inner grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-12">
          {/* Copy */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="eyebrow reveal">
              <span>
                The Galleria · 34 Limited<span className="hidden sm:inline">&nbsp;— Giai đoạn 1</span>
              </span>
            </p>
            <h1 id="hero-title" className="display-xl text-charcoal">
              <span className="reveal block" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
                Tâm điểm
              </span>
              <span className="reveal block" style={{ '--reveal-delay': '240ms' } as CSSProperties}>
                thương mại
              </span>
              <span className="reveal block text-accent" style={{ '--reveal-delay': '360ms' } as CSSProperties}>
                giữa bốn mặt tiền.
              </span>
            </h1>
            <p className="body-lg reveal delay-400 mt-8 max-w-md text-concrete">
              34 nhà phố thương mại 5 tầng tại lõi trung tâm Phan&nbsp;Rang — đã hoàn công, sổ hồng riêng từng
              căn, nhận nhà ngay khi thanh toán đủ.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row" data-stagger>
              <Link
                href="#tai-lieu"
                className="btn-primary px-8 py-4 text-lg"
                data-analytics="hero_cta_click"
                data-analytics-label="Nhận thông tin dự án"
              >
                Nhận thông tin dự án
              </Link>
              <Link
                href="#vi-tri"
                className="btn-secondary px-8 py-4 text-lg"
                data-analytics="hero_cta_secondary"
                data-analytics-label="Xem sơ đồ 34 lô"
              >
                Xem sơ đồ 34 lô
              </Link>
            </div>
          </div>

          {/* The block, framed by its four streets, stamped as completed */}
          <figure className="relative order-1 mx-7 mt-4 sm:mx-10 lg:order-2 lg:col-span-7 lg:mx-8">
            <Street side="top">Trần Quang Diệu</Street>
            <Street side="right">Hồ Xuân Hương</Street>
            <Street side="bottom">16 Tháng 4</Street>
            <Street side="left">Đoàn Thị Điểm</Street>

            <div className="reveal-clip relative aspect-[4/3] overflow-hidden bg-off-white lg:aspect-[5/4]">
              <div className="absolute inset-x-0 -inset-y-[6%]" data-parallax="0.06">
                <Image
                  src={heroImage}
                  alt="Phối cảnh dãy nhà phố thương mại 5 tầng Phan Rang Center"
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-[62%_50%]"
                />
              </div>
            </div>

            {/* north arrow, as on a site plan */}
            <div
              className="absolute -top-7 right-0 hidden translate-x-full items-center pl-3 text-concrete lg:flex"
              aria-hidden="true"
            >
              <svg viewBox="0 0 16 24" className="h-6 w-4">
                <path d="M8 2 13 16 8 12 3 16z" fill="currentColor" />
                <text x="8" y="23" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor">
                  B
                </text>
              </svg>
            </div>

            {/* mobile/tablet: hangs off the lower-right edge between photo and headline, clear of the shop fronts and street labels; desktop: lower-left over the street */}
            <CompletionSeal className="absolute -bottom-14 -right-3 h-28 w-28 sm:-bottom-16 sm:-right-8 sm:h-40 sm:w-40 lg:right-auto lg:-bottom-20 lg:-left-24 lg:h-60 lg:w-60" />

            <figcaption className="sr-only">
              Khu đất tiếp giáp bốn tuyến đường: Trần Quang Diệu, Hồ Xuân Hương, 16 Tháng 4 và Đoàn Thị Điểm.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
