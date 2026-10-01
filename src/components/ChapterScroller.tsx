'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

// Drives the sticky "chapters" stage. Markup is server-rendered by SpacesChapters; this only owns the section
// element: one passive scroll listener + rAF writes progress to CSS variables (the wipes are pure CSS), and
// toggles .is-active on the current chapter (text/pin animate by class, not per frame).
//   p = clamp(-top / (height - innerHeight), 0, 1)
//   t_k = clamp((p - (k-1)/3 - DWELL) / (1/3 - DWELL - SETTLE), 0, 1)   k = 1..3
// An IntersectionObserver gate keeps it idle while the section is off-screen. Reduced motion: CSS renders
// static panels and this does nothing.

const COUNT = 4;
const SEG = 1 / (COUNT - 1);
const DWELL = 0.12;
const SETTLE = 0.04;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function ChapterScroller({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const panels = Array.from(el.querySelectorAll<HTMLElement>('.ch'));
    let active = 0;
    let onScreen = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const p = distance > 0 ? clamp(-rect.top / distance) : 0;
      el.style.setProperty('--p', p.toFixed(4));
      let next = 0;
      for (let k = 1; k < COUNT; k++) {
        const t = clamp((p - (k - 1) * SEG - DWELL) / (SEG - DWELL - SETTLE));
        el.style.setProperty(`--t${k}`, t.toFixed(4));
        if (t >= 0.5) next = k;
      }
      if (next !== active) {
        active = next;
        panels.forEach((panel, i) => panel.classList.toggle('is-active', i === active));
      }
    };
    const schedule = () => {
      if (!onScreen || frame) return;
      frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        schedule();
      },
      { rootMargin: '100px 0px' },
    );
    io.observe(el);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} id="khong-gian-noi-khu" className={className} aria-labelledby="chapters-title">
      {children}
    </section>
  );
}
