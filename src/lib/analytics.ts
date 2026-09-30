export const ANALYTICS_EVENTS = [
  'hero_cta_click',
  'video_play',
  'brochure_open',
  'document_open',
  'lead_form_start',
  'lead_form_submit',
  'lead_form_error',
  'phone_click',
  'zalo_click',
  'map_interaction',
  'lot_select',
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isAnalyticsEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' &&
    Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GTM_ID)
  );
}

export function track(event: string, params?: AnalyticsParams): void {
  if (typeof window === 'undefined' || !isAnalyticsEnabled()) return;
  window.dataLayer = window.dataLayer || [];
  const payload = { event, ...params };
  window.dataLayer.push(payload);
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}
