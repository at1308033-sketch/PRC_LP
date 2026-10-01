'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { hotlineHref, site } from '@/lib/site';

export default function StickyCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  // Slide in only after the user has scrolled past ~80% of the viewport (the hero)
  useEffect(() => {
    let frame = 0;
    const update = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Hide while the lead form, the final CTA, the lot map (it has its own per-lot CTA that the bar would cover)
  // or the full-screen space chapters (the bar would sit over their titles and chapter index) is on screen
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const inView = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inView.add(e.target.id);
        else inView.delete(e.target.id);
      }
      setCtaInView(inView.size > 0);
    });
    ['vi-tri', 'khong-gian-noi-khu', 'tai-lieu', 'dang-ky'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const isVisible = pastHero && !ctaInView;
  const hiddenClass = isVisible ? 'translate-y-0' : 'translate-y-full invisible';

  return (
    <>
      {/* Desktop Sticky CTA */}
      <div className={`hidden lg:block sticky-cta !bg-paper/95 transition-[transform,visibility] duration-500 ease-arch ${hiddenClass}`} role="region" aria-label="Sticky CTA">
        <div className="section-inner flex items-center justify-between gap-4">
          <div className="flex-1 hidden sm:block">
            <p className="caption text-concrete">PHAN RANG CENTER</p>
            <p className="heading-sm text-charcoal font-display">Tâm điểm thương mại tại lõi trung tâm Phan Rang</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="#tai-lieu" className="btn-primary px-6 py-3">
              Nhận tài liệu
            </Link>
            <a href={hotlineHref} className="btn-secondary px-5 py-3">
              Gọi Hotline
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className={`lg:hidden sticky-cta-mobile !bg-paper/95 transition-[transform,visibility] duration-500 ease-arch ${hiddenClass}`} role="region" aria-label="Mobile Sticky CTA">
        <div className="flex items-center justify-between gap-3">
          <Link href="#tai-lieu" className="btn-primary flex-1 text-center py-3">
            Nhận tài liệu
          </Link>
          <a href={hotlineHref} className="btn-secondary px-5 py-3">
            Gọi
          </a>
          <a href={site.zaloLink} target="_blank" rel="noopener noreferrer" className="btn-tertiary px-4 py-3 flex items-center justify-center gap-1">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.6 3.4 6.1L4.5 21l4.2-2.1c1 .3 2.1.4 3.3.4 5.5 0 10-3.6 10-8.3S17.5 3 12 3z" />
            </svg>
            <span className="hidden sm:inline">Zalo</span>
          </a>
        </div>
      </div>
    </>
  );
}