import Link from 'next/link';
import { hotlineHref, site } from '@/lib/site';

export default function FinalCTA() {
  return (
    <section
      id="dang-ky"
      className="py-20 sm:py-28 lg:py-32 bg-accent text-paper relative overflow-hidden"
      aria-labelledby="final-cta-title"
    >
      {/* The page is "signed" at the close — Scriptina appears only here, and only in unaccented Latin */}
      <div
        aria-hidden="true"
        data-parallax="0.08"
        className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] flex select-none justify-center"
      >
        <span
          className="-rotate-3 whitespace-nowrap font-signature leading-none text-paper/[0.13]"
          style={{ fontSize: 'clamp(5.5rem, 17vw, 17rem)' }}
        >
          Phan Rang Center
        </span>
      </div>
      <div className="section-wrapper relative">
        <div className="section-inner max-w-4xl text-center">
          <div className="reveal">
            <p className="flex items-center justify-center gap-3 text-paper/80 font-semibold tracking-[0.18em] uppercase text-xs mb-4">
              Phan Rang Center
            </p>
            <h2 id="final-cta-title" className="display-lg text-paper mb-6">
              Nhận đủ hồ sơ, tự đối chiếu trước khi quyết định.
            </h2>
            <p className="body-lg text-paper/85 max-w-2xl mx-auto mb-10">
              34 nhà phố thương mại · Đã hoàn công · Sổ hồng riêng từng căn · Bàn giao ngay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-stagger>
              <Link href="#tai-lieu" className="inline-flex items-center justify-center rounded-md bg-paper text-accent font-semibold text-lg px-8 py-4 transition-colors duration-arch ease-arch hover:bg-warm-white focus-visible:ring-paper focus-visible:ring-offset-accent" data-analytics="final_cta_primary">
                Nhận brochure &amp; hồ sơ pháp lý
              </Link>
              <a href={hotlineHref} className="inline-flex items-center justify-center rounded-md border-2 border-paper text-paper font-medium text-lg px-8 py-4 transition-colors duration-arch ease-arch hover:bg-paper/10 focus-visible:ring-paper focus-visible:ring-offset-accent" data-analytics="final_cta_phone">
                Gọi Hotline
              </a>
              <a href={site.zaloLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-paper font-medium text-lg px-6 py-3 hover:underline focus-visible:ring-paper focus-visible:ring-offset-accent" data-analytics="final_cta_zalo">
                <svg className="inline h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.6 3.4 6.1L4.5 21l4.2-2.1c1 .3 2.1.4 3.3.4 5.5 0 10-3.6 10-8.3S17.5 3 12 3z" />
                </svg>
                Chat Zalo
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}