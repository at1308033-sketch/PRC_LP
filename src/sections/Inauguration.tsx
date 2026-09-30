import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader';

// Photo essay of the Phase 1 inauguration (28/01/2026, verified milestone) shot on site —
// the visual proof that the block is built. Photos: PRC_Data/Hình sự kiện_/PRC_Khánh thành_.
// Dark ground contains the event's strong blue staging so it doesn't fight the crimson/sand palette.

const lead = {
  src: '/images/events/khanh-thanh-cat-bang.webp',
  alt: 'Đại biểu tại sân khấu lễ khánh thành Phan Rang Center ngày 28/01/2026',
};

const side = [
  { src: '/images/events/khanh-thanh-khuon-vien.webp', alt: 'Khuôn viên công trình trong ngày khánh thành, dãy nhà phố đã hoàn thiện phía sau' },
  { src: '/images/events/khanh-thanh-le-khanh-thanh.webp', alt: 'Sân khấu lễ khánh thành với dãy nhà phố phía sau' },
];

// Day → night, in the order the event unfolded.
const reel = [
  { src: '/images/events/khanh-thanh-cong-chao.webp', alt: 'Cổng chào lễ khánh thành', label: 'Cổng chào', time: 'Ngày' },
  { src: '/images/events/khanh-thanh-khan-dai.webp', alt: 'Khán đài trước dãy nhà phố', label: 'Khán đài', time: 'Ngày' },
  { src: '/images/events/khanh-thanh-dai-bieu.webp', alt: 'Đại biểu chụp ảnh tại backdrop khánh thành', label: 'Đại biểu', time: 'Ngày' },
  { src: '/images/events/khanh-thanh-san-khau-ngay.webp', alt: 'Sân khấu khánh thành ban ngày', label: 'Sân khấu', time: 'Ngày' },
  { src: '/images/events/khanh-thanh-san-khau-dem.webp', alt: 'Sân khấu đêm hội trước dãy nhà phố lên đèn', label: 'Đêm hội', time: 'Đêm' },
  { src: '/images/events/khanh-thanh-trinh-dien.webp', alt: 'Trình diễn ánh sáng trong đêm khánh thành', label: 'Trình diễn', time: 'Đêm' },
  { src: '/images/events/khanh-thanh-khan-gia.webp', alt: 'Khán giả trong đêm hội khánh thành', label: 'Khán giả', time: 'Đêm' },
];

export default function Inauguration() {
  return (
    <section
      id="khanh-thanh"
      className="bg-charcoal py-20 text-warm-white sm:py-28 lg:py-32"
      aria-labelledby="inauguration-title"
    >
      <div className="section-wrapper">
        <div className="section-inner">
          <SectionHeader
            id="inauguration-title"
            tone="dark"
            eyebrow="Khánh thành Giai đoạn 1"
            title={
              <>
                Ngày 28.01.2026,
                <br />
                khu phố khánh thành.
              </>
            }
            lead="Lễ khánh thành diễn ra ngay tại công trình — dãy nhà phố đã hoàn thiện là phông nền của cả ngày hội, từ buổi sáng đến đêm."
          />

          {/* Lead + two supporting frames */}
          <div className="grid gap-3 lg:grid-cols-12 lg:gap-4">
            <figure className="reveal-clip relative aspect-[4/3] overflow-hidden lg:col-span-8 lg:aspect-auto lg:min-h-[34rem]">
              <Image src={lead.src} alt={lead.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              {/* date stamp, like the corner of a press photo */}
              {/* hand-written date on the photo — Parisienne has no Vietnamese glyphs, so only digits here */}
              <figcaption className="absolute bottom-0 left-0 flex items-end gap-4 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-transparent px-5 pb-4 pt-16 lg:px-8 lg:pb-6">
                <span className="-rotate-3 font-hand text-5xl leading-none text-paper lg:text-7xl">28.01.2026</span>
                <span className="pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-warm-white/75">Lễ khánh thành</span>
              </figcaption>
            </figure>
            <div className="grid gap-3 lg:col-span-4 lg:gap-4" data-stagger>
              {side.map((img) => (
                <div key={img.src} className="reveal-clip relative aspect-[4/3] overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Day → night reel */}
          <div className="mt-14 lg:mt-20">
            <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-warm-white/60" aria-hidden="true">
              <span>Ngày</span>
              <span className="reveal-line h-px flex-1 bg-gradient-to-r from-accent-light/70 via-warm-white/30 to-accent" />
              <span>Đêm</span>
            </div>
            <ol
              className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible lg:px-0"
              data-stagger
              aria-label="Diễn biến ngày khánh thành"
            >
              {reel.map((r, i) => (
                <li key={r.src} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-auto">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={r.src} alt={r.alt} fill sizes="(min-width: 1024px) 14vw, 60vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <p className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-lg text-accent-light">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-warm-white/85">{r.label}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-warm-white/45">{r.time}</span>
                  </p>
                </li>
              ))}
            </ol>
            <p className="caption mt-4 text-warm-white/50">Ảnh chụp tại công trình trong lễ khánh thành Giai đoạn 1.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
