'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export interface LightboxItem {
  src: string;
  alt: string;
  caption: string;
  thumbSizes?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null; // null = closed
  onIndex: (i: number) => void;
  onClose: () => void;
}

// Native <dialog>: showModal() gives the focus trap, inert page and Esc; we add arrows, scroll lock and
// hand focus back to the card that opened it.
export default function Lightbox({ items, index, onIndex, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  // which src finished loading — keyed by src, not a reset effect: a cached image fires onLoad during mount,
  // before any effect could reset a boolean, and would stay hidden behind the soft underlay
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    [],
  );

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
    opener.current?.focus();
  };

  const go = (step: number) => {
    if (index === null) return;
    onIndex((index + step + items.length) % items.length);
  };

  const item = index !== null ? items[index] : null;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <dialog
      ref={ref}
      aria-label="Xem ảnh phối cảnh"
      className="lightbox"
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(-1);
        }
      }}
    >
      {item && index !== null && (
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center justify-between px-4 py-3 text-paper sm:px-6">
            <span className="font-display text-lg tracking-tight" aria-live="polite">
              {pad(index + 1)} / {pad(items.length)}
            </span>
            <button type="button" onClick={() => ref.current?.close()} className="lightbox-btn" aria-label="Đóng">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            {item.thumbSizes && (
              <Image src={item.src} alt="" aria-hidden="true" fill sizes={item.thumbSizes} className="object-contain" />
            )}
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              onLoad={() => setLoadedSrc(item.src)}
              className={`object-contain transition-opacity duration-300 ${loadedSrc === item.src ? 'opacity-100' : 'opacity-0'}`}
            />
            <button type="button" onClick={() => go(-1)} className="lightbox-btn absolute left-2 top-1/2 -translate-y-1/2 sm:left-4" aria-label="Ảnh trước">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} className="lightbox-btn absolute right-2 top-1/2 -translate-y-1/2 sm:right-4" aria-label="Ảnh sau">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 text-paper sm:px-6">
            <p className="text-sm leading-relaxed">{item.caption}</p>
            <span className="render-tag">Phối cảnh minh họa</span>
          </div>
        </div>
      )}
    </dialog>
  );
}
