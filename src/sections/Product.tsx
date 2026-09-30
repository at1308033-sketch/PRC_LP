import SectionHeader from '@/components/SectionHeader';
import FloorCutaway from '@/components/FloorCutaway';

// Product: one standard shophouse read as a vertical section — pick a floor group to see the
// suggested use and the developer's interior renders (clearly labelled as illustrative).
export default function Product() {
  return (
    <section
      id="san-pham"
      className="py-20 sm:py-28 lg:py-32 bg-warm-white"
      aria-labelledby="product-title"
    >
      <div className="section-wrapper">
        <div className="section-inner">
          <SectionHeader
            id="product-title"
            eyebrow="Sản phẩm"
            title={
              <>
                Mỗi căn là một mặt bằng
                <br />
                kinh doanh 5 tầng.
              </>
            }
            lead="Bóc từng tầng của một căn chuẩn: tầng trệt trần 4 m cho mặt bằng kinh doanh, các tầng trên linh hoạt để ở hoặc làm việc. Chọn tầng để xem phối cảnh gợi ý."
          />

          <FloorCutaway />

          <a
            href="#tai-lieu"
            className="btn-primary reveal mt-12 inline-flex"
            data-analytics="product_cta"
          >
            Nhận thông số &amp; hồ sơ căn
          </a>
        </div>
      </div>
    </section>
  );
}
