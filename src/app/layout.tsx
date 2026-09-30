import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Fraunces } from 'next/font/google';
import localFont from 'next/font/local';
import Analytics from '@/components/Analytics';
import { site } from '@/lib/site';
import './globals.css';

// Both families ship a Vietnamese subset — Instrument Serif did not, so headings fell back to Georgia per diacritic.
const sans = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
  // 400 = default body text (no class), 700 = seal lettering; 500/600 = font-medium/semibold
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
});

const display = Fraunces({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-display',
  axes: ['opsz', 'SOFT'],
  adjustFontFallback: true,
});

// Hand-lettering accents (user-supplied). Neither font has Vietnamese glyphs — use ONLY for digits and
// unaccented Latin (dimensions, dates, "The Galleria", the closing signature). Not preloaded: decorative.
const hand = localFont({
  src: '../fonts/Parisienne-Regular.ttf', // SIL OFL 1.1 — src/fonts/Parisienne-OFL.txt
  variable: '--font-hand',
  display: 'swap',
  preload: false,
});

const signature = localFont({
  src: '../fonts/Scriptina.ttf', // Apostrophic Labs freeware — src/fonts/Scriptina-license.txt
  variable: '--font-signature',
  display: 'swap',
  preload: false,
});

const fontVars = `${sans.variable} ${display.variable} ${hand.variable} ${signature.variable}`;

const siteUrl = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Phan Rang Center | Tâm điểm thương mại tại lõi trung tâm Phan Rang',
  description: '34 nhà phố thương mại 5 tầng đã hoàn công, sổ hồng riêng từng căn, 4 mặt tiền tại trung tâm Phan Rang. Nhận tài liệu và tư vấn.',
  keywords: ['Phan Rang Center', 'Phan Rang Center Khánh Hòa', 'nhà phố thương mại Phan Rang', 'shophouse Phan Rang', 'bất động sản trung tâm Phan Rang', 'nhà phố có sổ hồng Phan Rang'],
  authors: [{ name: 'Phan Rang Center' }],
  creator: 'Phan Rang Center',
  publisher: 'Phan Rang Center',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: 'Phan Rang Center',
    title: 'Phan Rang Center | Tâm điểm thương mại tại lõi trung tâm Phan Rang',
    description: '34 nhà phố thương mại 5 tầng đã hoàn công, sổ hồng riêng từng căn, 4 mặt tiền tại trung tâm Phan Rang.',
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Phan Rang Center - Tâm điểm thương mại Phan Rang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phan Rang Center | Tâm điểm thương mại tại lõi trung tâm Phan Rang',
    description: '34 nhà phố thương mại 5 tầng đã hoàn công, sổ hồng riêng từng căn, tại trung tâm Phan Rang.',
    images: ['/images/og.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={fontVars} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Arm scroll reveals before first paint; if ScrollMotion never boots, show everything after 4s */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js-reveal');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.add('reveal-all')},4000);",
          }}
        />
      </head>
      <body className={fontVars}>
        <Analytics />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'Phan Rang Center',
                  url: siteUrl,
                  inLanguage: 'vi-VN',
                },
                {
                  '@type': 'Organization',
                  name: 'Công ty Cổ phần Việt Nam Mỹ Nhật',
                },
                {
                  '@type': 'Place',
                  name: 'Phan Rang Center — The Galleria · 34 Limited',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Phan Rang',
                    addressRegion: 'Khánh Hòa',
                    addressCountry: 'VN',
                  },
                  description:
                    '34 nhà phố thương mại 5 tầng đã hoàn công, sổ hồng riêng từng căn tại trung tâm Phan Rang',
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}