import LotMap from '@/components/LotMap';
import SectionHeader from '@/components/SectionHeader';

export default function Location() {
  return (
    <section
      id="vi-tri"
      className="py-20 sm:py-28 lg:py-32 bg-warm-white"
      aria-labelledby="location-title"
    >
      <div className="section-wrapper">
        <div className="section-inner">
          <SectionHeader
            id="location-title"
            eyebrow="Vị trí & mặt bằng"
            title={
              <>
                Bốn mặt tiền,
                <br />
                giữa trung tâm Phan Rang.
              </>
            }
            lead="Toàn khu 4 mặt tiền: 16 Tháng 4, Trần Quang Diệu, Đoàn Thị Điểm, Hồ Xuân Hương. Chọn một lô trên sơ đồ để xem diện tích và mặt tiền của lô đó."
          />

          <LotMap />

          <p className="body text-concrete mt-8 max-w-3xl reveal">
            Trong bán kính khoảng 500 m có quảng trường thành phố, bảo tàng, phố đi bộ và chợ đêm. Nội khu có quảng trường trung tâm "Nhịp Điệu Sóng" rộng 3.200 m².
          </p>

          <p className="mt-6 reveal delay-100">
            <a
              href="/images/sections/TONG%20MAT%20BANG.webp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent underline underline-offset-4 hover:text-accent-dark"
            >
              Xem bản vẽ mặt bằng gốc
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
