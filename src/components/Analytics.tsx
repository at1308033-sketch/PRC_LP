'use client';

import { useEffect } from 'react';
import { isAnalyticsEnabled, track } from '@/lib/analytics';

function injectScript(src: string, attrs: Record<string, string> = {}): HTMLScriptElement {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
  return script;
}

function setupGoogleTagManager(id: string): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), gtm: id });
  injectScript(`https://www.googletagmanager.com/gtm.js?id=${id}`, { 'data-ntpc': 'gtm' });
}

function setupGoogleAnalytics(id: string): void {
  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
  };
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { send_page_view: true });
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${id}`, { 'data-ntpc': 'ga4' });
}

function resolveEvent(el: Element): string | null {
  const attr = el.getAttribute('data-analytics');
  const href = el.getAttribute('href') || '';

  if (href.startsWith('tel:')) return 'phone_click';
  if (/zalo/i.test(href)) return 'zalo_click';
  if (/\.pdf(\?|#|$)/i.test(href)) return /brochure/i.test(href) ? 'brochure_open' : 'document_open';
  return attr;
}

export default function Analytics() {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (gtmId) setupGoogleTagManager(gtmId);
    else if (gaId) setupGoogleAnalytics(gaId);

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest('a, button, [data-analytics]');
      if (!el) return;
      const event = resolveEvent(el);
      if (!event) return;
      const href = el.getAttribute('href') || undefined;
      track(event, {
        label: el.getAttribute('data-analytics-label') || el.textContent?.trim().slice(0, 80) || '',
        ...(href ? { href } : {}),
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
