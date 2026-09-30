/**
 * Marquee — adapted from Magic UI (MIT License), https://magicui.design
 * Changes: Tailwind v3 arbitrary-value syntax, reduced-motion pause.
 * Keyframes/animations `marquee` and `marquee-vertical` live in tailwind.config.ts.
 */
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  /** Reverse the animation direction. */
  reverse?: boolean;
  /** Pause the animation on hover. */
  pauseOnHover?: boolean;
  children: ReactNode;
  /** Animate vertically instead of horizontally. */
  vertical?: boolean;
  /** Number of times to repeat the content. */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex gap-[var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]',
        vertical ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          // Only the first copy is exposed to assistive tech; callers label the wrapper.
          aria-hidden={i > 0 ? true : undefined}
          className={cn(
            'flex shrink-0 justify-around gap-[var(--gap)] motion-reduce:[animation-play-state:paused]',
            vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
