import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader';

export default function Partners() {
  return (
    <section
      id="doi-tac"
      className="py-20 sm:py-28 lg:py-32 bg-warm-white"
      aria-labelledby="partners-title"
    >
      <div className="section-wrapper">
        <div className="section-inner lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          <SectionHeader
            id="partners-title"
            eyebrow="CHỦ ĐẦU TƯ & PHÂN KHU"
            title="Chủ đầu tư & phân khu dự án."
            lead="Thông tin đơn vị chủ đầu tư và phân khu Giai đoạn 1 của Phan Rang Center."
            layout="stack"
            className="lg:col-span-5 !mb-12 lg:!mb-0"
          />

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6" data-stagger>
            <div>
              <div className="group relative flex h-full flex-col border border-concrete/20 bg-paper p-8 lg:p-10 transition duration-arch ease-arch hover:-translate-y-1 hover:border-charcoal/40">
                <span aria-hidden="true" className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-accent" />
                <span aria-hidden="true" className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t border-accent" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l border-accent" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent" />
                <span className="mb-6 font-display text-lg text-accent" aria-hidden="true">01</span>
                <div className="mb-6 flex flex-1 items-center min-h-[120px]">
                  <p className="font-display text-charcoal text-3xl lg:text-4xl leading-tight">
                    Công ty Cổ phần Việt Nam Mỹ Nhật
                  </p>
                </div>
                <div className="reveal-line mb-5 h-px w-full bg-concrete/25" aria-hidden="true" />
                <h3 className="eyebrow !mb-2">Chủ đầu tư</h3>
              </div>
            </div>
            <div>
              <div className="group relative flex h-full flex-col border border-concrete/20 bg-paper p-8 lg:p-10 transition duration-arch ease-arch hover:-translate-y-1 hover:border-charcoal/40">
                <span aria-hidden="true" className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-accent" />
                <span aria-hidden="true" className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t border-accent" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l border-accent" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent" />
                <span className="mb-6 font-display text-lg text-accent" aria-hidden="true">02</span>
                <div className="mb-6 flex flex-1 items-center justify-center">
                  <Image
                    src="/logos/LOGO%20THE%20GALLERIA%201.png"
                    alt="Logo The Galleria"
                    width={512}
                    height={512}
                    sizes="(max-width: 640px) 240px, 280px"
                    loading="eager"
                    className="h-auto w-full max-w-[240px] sm:max-w-[280px] transition-transform duration-[900ms] ease-arch group-hover:scale-[1.04]"
                  />
                </div>
                <div className="reveal-line mb-5 h-px w-full bg-concrete/25" aria-hidden="true" />
                <h3 className="eyebrow !mb-2">Phân khu</h3>
                <p className="body text-concrete">The Galleria · 34 Limited — Giai đoạn 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
