'use client';

/**
 * TextReveal — adapted from Magic UI (MIT License), https://magicui.design
 * Changes: brand typography/colours, left-aligned in the 1440 container, shorter on mobile,
 * both variants are rendered and swapped by motion-safe:/motion-reduce: — a reduced-motion visitor
 * never sees the greyed-out words nor a 130vh layout jump, and the tall block only exists when
 * motion is allowed. ResizeObserver + document.fonts.ready re-measure after reflow/font swap, and
 * screen-reader text is rendered once.
 * Word opacity is driven by one CSS variable (--p, 0→1 scroll progress) + clamp() instead of a
 * motion value per word: motion's native ScrollTimeline path left already-passed words half-faded.
 */
import { useEffect, useRef, type CSSProperties } from 'react';

import { cn } from '@/lib/utils';

export interface TextRevealProps {
  children: string;
  className?: string;
}

const textClass =
  'font-display font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] tracking-[-0.01em]';

export function TextReveal({ children, className }: TextRevealProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;
    // The animated block is display:none under reduced motion, so there is nothing to drive.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let scheduled = false;
    const update = () => {
      scheduled = false;
      // progress 0 when the section top reaches the viewport top, 1 when its bottom reaches the viewport bottom
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
      text.style.setProperty('--p', p.toFixed(4));
    };
    const onChange = () => {
      if (scheduled) return;
      scheduled = true;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);

    // A font swap (Fraunces) or any reflow changes rect.height, hence `travel` — without this the
    // words stay stuck at a stale position until the next scroll event.
    const ro = new ResizeObserver(onChange);
    ro.observe(section);
    ro.observe(text);
    document.fonts?.ready.then(onChange).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);

  const words = children.split(' ');

  // Leave the last 15% of the scroll as a hold where the full sentence stays lit.
  const span = 0.85 / words.length;

  return (
    <>
      {/* Static variant — the default, and the only one rendered under prefers-reduced-motion. */}
      <div className={cn('section-wrapper motion-safe:hidden', className)}>
        <div className="section-inner py-12 lg:py-20">
          <p className={cn(textClass, 'max-w-6xl text-charcoal')}>{children}</p>
        </div>
      </div>

      {/* Animated variant — the 130vh/170vh block is dropped entirely when motion is reduced. */}
      <div
        ref={sectionRef}
        className={cn('relative z-0 h-[130vh] lg:h-[170vh] motion-reduce:hidden', className)}
      >
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center">
          <div className="section-wrapper">
            <div className="section-inner">
              <p className="sr-only">{children}</p>
              <p
                ref={textRef}
                aria-hidden="true"
                className={cn(textClass, 'flex max-w-6xl flex-wrap gap-x-[0.28em]')}
                style={{ '--p': 0 } as CSSProperties}
              >
                {words.map((word, i) => (
                  <span key={i} className="relative">
                    <span className="text-concrete/20">{word}</span>
                    <span
                      className="absolute inset-0 text-charcoal"
                      style={{ opacity: `clamp(0, calc((var(--p) - ${(i * span).toFixed(4)}) / ${span.toFixed(4)}), 1)` }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
