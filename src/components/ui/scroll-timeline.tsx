'use client';

/**
 * ScrollTimeline — adapted from Aceternity UI Timeline (free tier), https://ui.aceternity.com
 * Changes: generic (no built-in heading), brand crimson beam and sand palette, Fraunces titles,
 * scroll progress comes from a passive scroll listener batched into one rAF, so the component needs
 * no animation library. The beam is a scaleY() on a CSS variable over a track that spans the list,
 * which gives it a real height in the server HTML (no 0px wrapper, no CLS) and keeps it visible
 * under prefers-reduced-motion, where it is drawn in full.
 */
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface ScrollTimelineEntry {
  title: string;
  content: ReactNode;
}

interface ScrollTimelineProps {
  data: ScrollTimelineEntry[];
  className?: string;
}

// Measure before the first paint so the beam never shows a frame at the wrong length.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ScrollTimeline({ data, className }: ScrollTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const beamRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current;
    const beam = beamRef.current;
    if (!list || !beam) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      if (mq.matches) {
        beam.style.setProperty('--tl-progress', '1');
        beam.style.setProperty('--tl-opacity', '1');
        return;
      }
      // Same window the previous `offset: ['start 10%', 'end 50%']` used: progress 0 once the list
      // top reaches 10% of the viewport, 1 once its bottom reaches 50%.
      const rect = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = rect.height - vh * 0.4;
      const p = travel > 0 ? Math.min(1, Math.max(0, (vh * 0.1 - rect.top) / travel)) : 1;
      beam.style.setProperty('--tl-progress', p.toFixed(4));
      beam.style.setProperty('--tl-opacity', Math.min(1, p / 0.1).toFixed(4));
    };
    const onChange = () => {
      if (scheduled) return;
      scheduled = true;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);
    mq.addEventListener('change', onChange);
    // Reflow (font swap, content change) moves the list without firing scroll or resize.
    const ro = new ResizeObserver(onChange);
    ro.observe(list);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <div className={cn('relative w-full font-sans', className)}>
      <ol ref={listRef} className="relative pb-4">
        {data.map((item) => (
          <li
            key={item.title}
            className="flex justify-start pt-8 first:pt-0 md:gap-8 md:pt-16 md:first:pt-0"
          >
            <div className="sticky top-28 z-10 flex flex-col items-center self-start md:w-full md:max-w-[15rem] md:flex-row lg:max-w-xs">
              <span
                aria-hidden="true"
                className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-off-white"
              >
                <span className="h-4 w-4 rounded-full border-2 border-accent bg-paper" />
              </span>
              <h3 className="hidden font-display text-accent md:block md:pl-16 md:text-3xl lg:text-4xl leading-tight">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-14 pr-2 md:pl-2">
              <h3 className="mb-3 block font-display text-2xl leading-tight text-accent md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </li>
        ))}
      </ol>

      {/* Beam track: a sibling of <ol> so the list only ever holds <li> children. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[17px] w-[2px] overflow-hidden bg-concrete/20 [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)]"
      >
        <span
          ref={beamRef}
          className="absolute inset-x-0 top-0 h-full w-[2px] origin-top rounded-full bg-gradient-to-b from-accent-light via-accent to-accent"
          style={{ transform: 'scaleY(var(--tl-progress, 1))', opacity: 'var(--tl-opacity, 1)' }}
        />
      </div>
    </div>
  );
}
