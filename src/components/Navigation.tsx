'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HomeLink from './HomeLink';

const navItems = [
  { href: '#vi-tri', label: 'Vị trí' },
  { href: '#du-an', label: 'Dự án' },
  { href: '#san-pham', label: 'Sản phẩm' },
  { href: '#phap-ly', label: 'Pháp lý' },
  { href: '#tai-lieu', label: 'Tài liệu' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => setIsScrolled(window.scrollY > 20);
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

  // Scroll-spy: the section crossing the upper band of the viewport is "current".
  // The observer only tells us *that* the band changed; the choice is recomputed from live rects
  // (rects captured at cross time go stale as the page keeps moving), and the answer is the section
  // that contains the band line — not the one with the largest top.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const els = navItems
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const pick = () => {
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      let lastPassed: string | null = null;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) {
          lastPassed = el.id;
          if (rect.bottom > line) current = el.id;
        }
      }
      // In a gap between sections keep the one just scrolled past; above the first section: none.
      setActiveId(current ?? lastPassed);
    };

    const io = new IntersectionObserver(pick, {
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    });
    els.forEach((el) => io.observe(el));
    // the observer can fire mid-way through a long smooth scroll; settle on the final position too
    window.addEventListener('scrollend', pick);
    pick();
    return () => {
      io.disconnect();
      window.removeEventListener('scrollend', pick);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-arch ease-arch
        ${isScrolled ? 'bg-paper/90 backdrop-blur-sm border-b border-concrete/15' : 'bg-warm-white/70 backdrop-blur-sm'}`}
      role="banner"
    >
      <nav className="section-wrapper" aria-label="Main navigation">
        <div
          className={`section-inner flex items-center justify-between transition-[height] duration-arch ease-arch ${
            isScrolled ? 'h-14' : 'h-16'
          }`}
        >
          {/* Logo */}
          <HomeLink className="flex items-center" onNavigate={() => setIsMobileMenuOpen(false)}>
            {/* official wordmark (black variant for the light bar); 305×200 source for retina */}
            <Image
              src="/logos/prc-black.png"
              alt="Phan Rang Center"
              width={305}
              height={200}
              priority
              className={`w-auto transition-[height] duration-arch ease-arch ${isScrolled ? 'h-10' : 'h-12'}`}
            />
          </HomeLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeId === item.href.slice(1) ? 'location' : undefined}
                className={`relative py-1 text-body-sm font-medium transition-colors duration-200 hover:text-accent ${
                  activeId === item.href.slice(1) ? 'text-accent' : 'text-charcoal'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-[transform,visibility] duration-500 ease-arch ${
                    activeId === item.href.slice(1) ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            ))}
            <Link
              href="#tai-lieu"
              className="btn-primary text-sm px-5 py-2"
            >
              Nhận thông tin
            </Link>
          </div>

          {/* Mobile CTA + Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="#tai-lieu" className="btn-primary text-sm px-4 py-2">
              Nhận thông tin
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-charcoal hover:bg-accent/10 hover:text-accent transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden py-4 border-t border-concrete/10 animate-slide-up">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={activeId === item.href.slice(1) ? 'location' : undefined}
                  className={`text-body font-medium hover:text-accent transition-colors ${
                    activeId === item.href.slice(1) ? 'text-accent' : 'text-charcoal'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#tai-lieu"
                className="btn-primary text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nhận thông tin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}