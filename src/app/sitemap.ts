import { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Single-page site: in-page anchors (#du-an, …) are not separate URLs, so only the root is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date('2026-09-30'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
