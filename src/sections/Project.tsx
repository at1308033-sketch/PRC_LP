import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader';

const facts = [
  { label: 'Quy mô đất', num: '~1,41', unit: ' ha' },
  { label: 'The Galleria · 34 Limited', num: '34', unit: ' căn' },
  { label: 'Số tầng', num: '5', unit: ' tầng' },
  { label: 'Tiếp giáp', num: '4', unit: ' mặt tiền' },
];

export default function Project() {
  return (
    <section
      id="du-an"
      className="py-20 sm:py-28 lg:py-32 bg-off-white"
      aria-labelledby="project-title"
    >
      <div className="section-wrapper">
        <div className="section-inner">
          <SectionHeader
            id="project-title"
            eyebrow="Dự án"
            title={
              <>
                34 nhà phố thương mại.
                <br />
                Toàn khu ~1,41 ha.
              </>
            }
            lead="The Galleria · 34 Limited: 34 căn nhà phố thương mại cao 5 tầng, đã hoàn công. Bốn mô hình F&B, Retail, Office, Service chỉ mang tính minh họa, không cam kết công năng từng căn."
          />

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-stretch">
            {/* Image */}
            <div className="lg:col-span-8">
              <div className="reveal-clip relative aspect-[4/3] lg:aspect-[16/11] rounded-lg overflow-hidden bg-concrete/10">
                <Image
                  src="/images/heroes/KV%201.avif"
                  alt="Key visual Phan Rang Center — phối cảnh dãy nhà phố thương mại"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
              <p className="caption text-concrete/60 mt-3 reveal delay-300">Phối cảnh minh họa dự án</p>
            </div>

            {/* Facts */}
            <div className="mt-10 lg:mt-0 lg:col-span-4 flex flex-col justify-between">
              <dl
                className="relative grid grid-cols-2 lg:grid-cols-1 gap-x-6 lg:gap-0"
                data-stagger
              >
                {facts.map(f => (
                  <div key={f.label} className="relative py-5 lg:py-6">
                    <span
                      className="reveal-line absolute inset-x-0 top-0 h-px bg-concrete/25"
                      aria-hidden="true"
                    />
                    <dt className="caption text-concrete/70 uppercase tracking-wider">{f.label}</dt>
                    <dd className="font-display text-accent text-4xl lg:text-5xl mt-1 leading-none">
                      <span data-countup>{f.num}</span>
                      <span className="text-2xl lg:text-3xl">{f.unit}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="#tai-lieu"
                className="btn-primary inline-flex self-start mt-8 reveal delay-400"
                data-analytics="project_cta"
              >
                Nhận tài liệu dự án
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
