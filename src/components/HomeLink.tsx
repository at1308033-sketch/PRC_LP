'use client';

import type { MouseEvent, ReactNode } from 'react';

// Logo link: a full, fresh load of the home page — top of the page, no hash, no nav item active —
// instead of a client-side soft navigation that keeps scroll-spy / reveal state from where the user was.
export default function HomeLink({
  className,
  children,
  onNavigate,
}: {
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // let modified clicks (new tab / window) behave like a normal link
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate?.();
    try {
      history.scrollRestoration = 'manual';
    } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    window.location.assign('/');
  };

  return (
    <a href="/" className={className} aria-label="Phan Rang Center - Trang chủ" onClick={handleClick}>
      {children}
    </a>
  );
}
