import { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /_next/ must stay crawlable: Google needs its JS/CSS and /_next/image to render the page.
      disallow: ['/api/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
