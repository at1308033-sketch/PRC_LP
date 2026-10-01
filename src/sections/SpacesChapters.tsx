import Image from 'next/image';
import ChapterScroller from '@/components/ChapterScroller';

// Four chapters of the outdoor spaces, pinned full-screen while scrolling (stage CSS: .chapters in globals.css).
// All chapters are real, stacked DOM: chapter 1 is what shows before hydration or with no JS, and under
// reduced motion each becomes a plain static panel. Every image is an illustrative render and says so.

const chapters = [
  {
    script: 'Shopfront',
    title: 'Mặt tiền thương mại',
    text: 'Dãy nhà phố 5 tầng, tầng trệt mở ra vỉa hè — mỗi căn là một mặt bằng kinh doanh.',
    main: { n: 3, alt: 'Phối cảnh minh họa dãy nhà phố thương mại và vỉa hè phía trước' },
    pin: { n: 4, alt: 'Phối cảnh minh họa chi tiết mặt tiền tầng trệt' },
  },
  {
    script: 'The Wave Square',
    title: 'Quảng trường Nhịp Điệu Sóng · 3.200 m²',
    text: 'Quảng trường trung tâm với đài phun nước, ngay trước dãy phố.',
    main: { n: 10, alt: 'Phối cảnh minh họa quảng trường Nhịp Điệu Sóng 3.200 m²' },
    pin: { n: 2, alt: 'Phối cảnh minh họa đài phun nước trong quảng trường' },
  },
  {
    script: 'Light Park',
    title: 'Công viên ánh sáng và lối dạo',
    text: 'Mảng xanh, bậc cỏ và lối dạo nối các dãy nhà phố.',
    main: { n: 15, alt: 'Phối cảnh minh họa bậc cỏ và lối dạo trong công viên' },
    pin: { n: 7, alt: 'Phối cảnh minh họa điểm nhấn cảnh quan trong công viên' },
  },
  {
    script: 'Promenade',
    title: 'Khu đi bộ dưới tán cây',
    text: 'Lối đi bộ nội khu dọc mặt tiền, có bóng cây và chỗ ngồi.',
    main: { n: 18, alt: 'Phối cảnh minh họa lối đi bộ nội khu dưới tán cây' },
    pin: { n: 8, alt: 'Phối cảnh minh họa mặt lát lối đi bộ nội khu' },
  },
];

export default function SpacesChapters() {
  return (
    <ChapterScroller className="chapters">
      <h2 id="chapters-title" className="sr-only">
        Không gian dự án qua bốn chương
      </h2>
      <div className="chapters-frame">
        <div className="chapters-eyebrow eyebrow eyebrow-on-dark" aria-hidden="true">
          Không gian nội khu
        </div>
        <span className="render-tag chapters-tag">Phối cảnh minh họa</span>
        <div className="chapters-track" aria-hidden="true">
          <div className="ch-thumb" />
        </div>
        <div className="chapters-scrim-top" aria-hidden="true" />
        <div className="chapters-scrim-bottom" aria-hidden="true" />

        {chapters.map((c, i) => (
          <article key={c.title} className={`ch${i === 0 ? ' is-active' : ''}`} data-i={i}>
            <div className="ch-img">
              <Image src={`/images/sections/${c.main.n}.webp`} alt={c.main.alt} fill sizes="100vw" className="object-cover" />
            </div>

            <div className="ch-text">
              <p className="ch-script font-hand" aria-hidden="true">{c.script}</p>
              <div className="ch-mask">
                <h3 className="ch-title font-display">{c.title}</h3>
              </div>
              <p className="ch-body">{c.text}</p>
            </div>

            <div className="ch-rail" aria-hidden="true">
              <div className="ch-mask">
                <span className="ch-index font-display">{`0${i + 1}`}</span>
              </div>
            </div>

            <figure className="ch-pin">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={`/images/sections/${c.pin.n}.webp`} alt={c.pin.alt} fill sizes="(min-width: 1024px) 240px, 0px" className="object-cover" />
              </div>
              <figcaption className="render-tag">Phối cảnh minh họa</figcaption>
            </figure>
          </article>
        ))}
      </div>
    </ChapterScroller>
  );
}
