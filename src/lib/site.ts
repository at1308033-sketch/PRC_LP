export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://phanrangcenter.vn',
  hotline: process.env.NEXT_PUBLIC_HOTLINE || '0900000000',
  zaloLink: process.env.NEXT_PUBLIC_ZALO_LINK || 'https://zalo.me/0900000000',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@phanrangcenter.vn',
  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '',
} as const;

/** Format a phone number for display, e.g. 0900000000 -> 0900 000 000. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  if (digits.length === 11) return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
  return raw;
}

export const hotlineDisplay = formatPhone(site.hotline);
export const hotlineHref = `tel:${site.hotline.replace(/[^\d+]/g, '')}`;
export const emailHref = `mailto:${site.email}`;
