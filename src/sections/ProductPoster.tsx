import Image from 'next/image';
import CompletionSeal from '@/components/CompletionSeal';

// Product poster: the corner house as one full-bleed render, with the four lot groups beside it.
// Figures are the owner-verified ones (34 lots, 7,5 m frontage, 4 m ground-floor ceiling); areas are the
// developer's dossier values. The render is illustrative and says so on the image.

const specs = [
  { label: 'Mặt Trần Quang Diệu', value: '13 căn · 135 m²' },
  { label: 'Mặt đường nội khu', value: '13 căn · 135 m²' },
  { label: 'Đoàn Thị Điểm · Hồ Xuân Hương', value: '4 căn · ~147,7 m²' },
  { label: 'Căn góc 2 mặt đường', value: '4 căn · ~194,4 m²' },
];

const ALT = 'Phối cảnh minh họa căn góc nhà phố thương mại 5 tầng The Galleria';

export default function ProductPoster() {
  return (
    <section className="relative overflow-hidden bg-charcoal" aria-labelledby="poster-title">
      <div className="lg:flex lg:min-h-[90vh] lg:max-h-[1000px] lg:items-center">
        {/* Image: 16:10 card on small screens, full-bleed stage from lg */}
        <div className="poster-stage relative aspect-[16/10] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
          <div className="poster-zoom reveal-fade absolute inset-0 lg:left-[26%]">
            <div className="poster-frame absolute inset-0 lg:inset-auto lg:left-1/2 lg:top-0 lg:aspect-[16/9] lg:h-full lg:min-w-full lg:-translate-x-[48%]">
              <Image
                src="/images/sections/20.webp"
                alt={ALT}
                fill
                sizes="100vw"
                className="object-cover object-[60%_center]"
              />
              {/* pins sit on the real render (coordinates are % of the 16:9 frame) */}
              <Pin className="left-[38%] top-[80%]" label="Tầng trệt · trần 4 m" />
              <Pin className="left-[50%] top-[19%]" label="Sân thượng tầng mái" />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(30,26,23,0.96) 0%, rgba(30,26,23,0.85) 42%, rgba(30,26,23,0.2) 75%, rgba(30,26,23,0) 100%)',
            }}
          />
          <span className="render-tag absolute bottom-3 right-4 lg:bottom-4 lg:right-6">Phối cảnh minh họa</span>
        </div>

        <div className="section-wrapper relative z-10 py-12 lg:py-24">
          <div className="section-inner">
            <div data-stagger className="max-w-xl lg:max-w-[37rem]">
              <p className="eyebrow eyebrow-on-dark">Sản phẩm · The Galleria</p>
              <p className="font-hand text-3xl leading-tight text-accent-light lg:text-4xl" aria-hidden="true">
                Limited 34
              </p>
              <h2 id="poster-title" className="mt-2 font-display text-3xl font-light leading-[1.15] tracking-tight text-paper lg:text-5xl [text-wrap:balance]">
                Nhà phố thương mại 5 tầng giữa lõi trung tâm Phan Rang.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-off-white lg:text-base">
                Năm tầng trên một mặt tiền ngang 7,5 m (căn chuẩn), tầng trệt trần cao 4 m — đủ cho cửa hàng, văn phòng hay để ở. 34 căn chia theo bốn mặt tiền:
              </p>

              <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {specs.map((s) => (
                  <div key={s.label} className="border-t border-warm-white/20 pt-4">
                    <dt className="text-[11px] font-medium uppercase leading-snug tracking-wider text-warm-white/70">{s.label}</dt>
                    <dd className="mt-2 font-display text-xl tracking-tight text-paper lg:text-2xl">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex items-center gap-5">
                <CompletionSeal className="h-24 w-24 shrink-0 lg:h-28 lg:w-28" />
                <p className="text-xs leading-relaxed text-warm-white/70">
                  Diện tích đất theo hồ sơ chủ đầu tư · Sổ hồng riêng từng căn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pin({ className, label }: { className: string; label: string }) {
  return (
    <span className={`pin absolute hidden items-center gap-2 lg:flex ${className}`}>
      <span className="relative flex h-3.5 w-3.5 shrink-0" aria-hidden="true">
        <span className="pin-ping absolute inset-0 rounded-full bg-accent" />
        <span className="relative h-3.5 w-3.5 rounded-full border-2 border-paper bg-accent" />
      </span>
      <span className="whitespace-nowrap rounded-sm border border-concrete bg-charcoal/90 px-2.5 py-1.5 text-xs font-medium text-paper">
        {label}
      </span>
    </span>
  );
}
