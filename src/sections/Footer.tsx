import Image from 'next/image';
import Link from 'next/link';
import HomeLink from '@/components/HomeLink';
import { emailHref, hotlineDisplay, hotlineHref, site } from '@/lib/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    project: [
      { label: 'Vị trí', href: '#vi-tri' },
      { label: 'Dự án', href: '#du-an' },
      { label: 'Sản phẩm', href: '#san-pham' },
      { label: 'Pháp lý', href: '#phap-ly' },
    ],
    support: [
      { label: 'Tài liệu', href: '#tai-lieu' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Tư vấn', href: '#dang-ky' },
      { label: 'Liên hệ', href: '#dang-ky' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )},
    { name: 'Zalo', href: '#', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.6 3.4 6.1L4.5 21l4.2-2.1c1 .3 2.1.4 3.3.4 5.5 0 10-3.6 10-8.3S17.5 3 12 3z" />
      </svg>
    )},
    { name: 'YouTube', href: '#', icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.166 3.166 0 0 0-.479-1.069 49.5 49.5 0 0 0-5.508-1.54 3.16 3.16 0 0 0-2.18.07 48.6 48.6 0 0 0-5.37 1.46 3.16 3.16 0 0 0-.5.07c-1.8.2-5.1.6-7.1.6s-5.3-.4-7.1-.6a3.16 3.16 0 0 1-.5-.07 48.6 48.6 0 0 1-5.37-1.46 3.17 3.17 0 0 1-2.18-.07 49.5 49.5 0 0 1-5.5.1.54.54 0 0 1-.48-1.06c.2-1.8.6-5.1.6-7.1s-.4-5.3-.6-7.1a.54.54 0 0 1 .48-1.06c1.8-.2 5.1-.6 7.1-.6s5.3.4 7.1.6a.54.54 0 0 1 .48 1.06c1.8.2 5.1.6 7.1.6s5.3-.4 7.1-.6a.54.54 0 0 1 .48-1.06 48.6 48.6 0 0 0 5.508 1.54 3.16 3.16 0 0 0 2.18-.07 48.6 48.6 0 0 0 5.37-1.46 3.16 3.16 0 0 0 .5-.07c1.8-.2 5.1-.6 7.1-.6s5.3.4 7.1.6a.54.54 0 0 1 .48 1.06c1.8.2 5.1.6 7.1.6zM9.54 17.23l6.29-3.63-6.3 3.64zm0-7.14l6.3 3.63-6.3-3.64z" />
      </svg>
    )},
  ];

  return (
    <footer className="relative bg-charcoal text-warm-white/80 pb-24 lg:pb-0" role="contentinfo">
      <div aria-hidden="true" className="reveal-line absolute inset-x-0 top-0 h-px bg-accent-light/60" />
      <div className="section-wrapper py-16 lg:py-24">
        <div className="section-inner">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 mb-12">
            {/* Brand */}
            <div className="lg:col-span-4 mb-10 lg:mb-0 reveal">
              <HomeLink className="mb-6 inline-block">
                {/* official wordmark, gold variant — gold is reserved for the logo */}
                <Image src="/logos/prc-gold.png" alt="Phan Rang Center" width={304} height={200} className="h-20 w-auto lg:h-24" />
              </HomeLink>
              <p className="body text-warm-white/70 max-w-sm">
                Nhà phố thương mại 5 tầng tại lõi trung tâm Phan Rang. Toàn khu 4 mặt tiền, diện tích
                ~1,41 ha.
              </p>
              <div className="mt-6 flex gap-4">
                {socialLinks.filter((social) => social.href !== '#').map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-full bg-warm-white/10 hover:bg-warm-white/20 transition-colors duration-200 text-warm-white/70 hover:text-gold"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 lg:pl-8 lg:border-l lg:border-warm-white/10" data-stagger>
              <div>
                <h4 className="eyebrow !text-warm-white/60 before:!bg-warm-white/30 !mb-5">Dự án</h4>
                <ul className="space-y-3">
                  {footerLinks.project.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="body text-warm-white/70 hover:text-gold transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="eyebrow !text-warm-white/60 before:!bg-warm-white/30 !mb-5">Hỗ trợ</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="body text-warm-white/70 hover:text-gold transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="eyebrow !text-warm-white/60 before:!bg-warm-white/30 !mb-5">Liên hệ</h4>
                <address className="body text-warm-white/70 not-italic space-y-2">
                  <p>Khu đất trung tâm Phan Rang</p>
                  <p>Phan Rang, Nam Khánh Hòa (Ninh Thuận cũ)</p>
                  <p>
                    <a href={hotlineHref} className="hover:text-warm-white transition-colors">Hotline: {hotlineDisplay}</a>
                  </p>
                  <p>
                    <a href={emailHref} className="hover:text-warm-white transition-colors">{site.email}</a>
                  </p>
                  <p>
                    <a href={site.zaloLink} target="_blank" rel="noopener noreferrer" className="hover:text-warm-white transition-colors">Zalo: {hotlineDisplay}</a>
                  </p>
                </address>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-warm-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="body-sm text-warm-white/50">
                © {new Date().getFullYear()} Phan Rang Center. Bảo lưu mọi quyền.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}