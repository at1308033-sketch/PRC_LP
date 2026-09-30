'use client';

import { useEffect, useRef } from 'react';

// Scroll-driven motion for the whole page, driven by classes/attributes in the markup:
//   .reveal / .reveal-fade / .reveal-clip / .reveal-line  → animate in once when scrolled into view
//   (legacy .animate-slide-up / .animate-fade-in / .animate-clip-reveal map to the same system)
//   [data-stagger]        → children reveal one after another
//   [data-countup]        → numbers count up from 0 when visible (keeps "~" prefix and "," decimals)
//   [data-parallax="0.15"] → element drifts at a fraction of scroll speed
// Hidden-until-revealed styles only apply under html.js-reveal (set by an inline script in layout),
// so content stays visible without JS; prefers-reduced-motion disables all of it in CSS and here.

const REVEAL_SELECTOR =
  '.reveal, .reveal-fade, .reveal-clip, .reveal-line, .reveal-line-y, .animate-slide-up, .animate-fade-in, .animate-clip-reveal';

// A running count-up, so unmount can cancel the frame instead of leaving it writing to a detached node.
type Counter = { frame: number };

function countUp(el: HTMLElement, live: Set<Counter>) {
  // `data-countup` is frequently present but empty (<span data-countup>{num}</span>), so `||` has to
  // fall through to the rendered text — `??` would keep '' and kill the animation for every such node.
  const raw = el.dataset.countup || el.textContent || '';
  const match = raw.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return;
  const [, prefix, num, suffix] = match;
  const decimals = (num.split(',')[1] || '').length;
  if (decimals > 20) return;
  // vi-VN: '.' groups thousands, ',' is the decimal mark — "~1,41" and "3.200" both round-trip.
  const target = parseFloat(num.replace(/\./g, '').replace(',', '.'));
  if (!Number.isFinite(target)) return;
  const format = new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const counter: Counter = { frame: 0 };
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + format.format(target * eased) + suffix;
    if (t < 1) {
      counter.frame = requestAnimationFrame(tick);
    } else {
      live.delete(counter);
    }
  };
  live.add(counter);
  counter.frame = requestAnimationFrame(tick);
}

export default function ScrollMotion() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    (window as unknown as { __revealReady?: boolean }).__revealReady = true;

    if (reduce || !('IntersectionObserver' in window)) {
      root.classList.remove('js-reveal');
      return;
    }

    const liveCounters = new Set<Counter>();
    const counted = new WeakSet<HTMLElement>();

    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('is-visible');
          // Run at most once per element: re-reading textContent mid-animation would parse the
          // half-finished value as the target and freeze the count.
          if (el.dataset.countup !== undefined && !counted.has(el)) {
            counted.add(el);
            countUp(el, liveCounters);
          }
          revealIO.unobserve(el);
        }
      },
      // threshold [0, 0.12]: a block taller than ~8 viewports can never reach 12% visibility, so a
      // single 0.12 threshold left it at opacity 0 permanently.
      { rootMargin: '0px 0px -8% 0px', threshold: [0, 0.12] },
    );

    const setup = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          const c = child as HTMLElement;
          if (!c.matches(REVEAL_SELECTOR)) c.classList.add('reveal');
          c.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 90}ms`);
        });
      });
      scope.querySelectorAll<HTMLElement>(`${REVEAL_SELECTOR}, [data-countup]`).forEach((el) => {
        if (!el.classList.contains('is-visible')) revealIO.observe(el);
      });
    };
    setup(document);

    // Elements mounted later (form alerts, lot detail panel, FAQ answers) must be observed too,
    // otherwise they would stay at opacity 0.
    // Keyboard users can Tab into content that hasn't been scrolled to yet (e.g. map lots):
    // reveal every hidden ancestor of the focused element immediately.
    const onFocusIn = (e: FocusEvent) => {
      let el = e.target instanceof HTMLElement || e.target instanceof SVGElement ? (e.target as Element) : null;
      while (el) {
        if (el.matches(REVEAL_SELECTOR) && !el.classList.contains('is-visible')) {
          el.classList.add('is-visible');
          revealIO.unobserve(el);
        }
        el = el.parentElement;
      }
    };
    document.addEventListener('focusin', onFocusIn);

    // Parallax nodes, collected as they appear. Querying once at mount missed anything mounted later
    // (lazy sections, accordions), and a resize never refreshed the list.
    const parallaxEls = new Set<HTMLElement>();
    const collectParallax = (scope: ParentNode) => {
      const el = scope as Element;
      if (typeof el.matches === 'function' && el.matches('[data-parallax]')) {
        parallaxEls.add(el as HTMLElement);
      }
      scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((found) => parallaxEls.add(found));
    };
    collectParallax(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        // count-up rewrites textContent on every frame; those mutations must not re-enter this loop.
        if (r.target instanceof Element && r.target.closest('[data-countup]')) continue;
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches(`${REVEAL_SELECTOR}, [data-countup]`)) revealIO.observe(n);
          setup(n);
          collectParallax(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Parallax + scroll progress, batched in one rAF per frame.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const vh = window.innerHeight;
        parallaxEls.forEach((el) => {
          const rect = el.parentElement?.getBoundingClientRect();
          if (!rect || rect.bottom < 0 || rect.top > vh) return;
          const factor = parseFloat(el.dataset.parallax || '0.15');
          el.style.transform = `translate3d(0, ${(-rect.top * factor).toFixed(1)}px, 0)`;
        });
        const max = root.scrollHeight - vh;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      revealIO.disconnect();
      mo.disconnect();
      document.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      liveCounters.forEach((counter) => cancelAnimationFrame(counter.frame));
      liveCounters.clear();
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-accent motion-reduce:hidden"
    />
  );
}
