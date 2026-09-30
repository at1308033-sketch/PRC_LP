'use client';

import SectionHeader from '@/components/SectionHeader';

const faqData = [
  {
    category: 'Vị trí',
    items: [
      { q: 'Phan Rang Center ở đâu?', a: 'Tại trung tâm Phan Rang (Nam Khánh Hòa, Ninh Thuận cũ). Trong bán kính khoảng 500 m có quảng trường thành phố, bảo tàng, phố đi bộ và chợ đêm.' },
      { q: 'Dự án có mấy mặt tiền?', a: 'Toàn khu có 4 mặt tiền: đường 16 Tháng 4, Trần Quang Diệu, Đoàn Thị Điểm và Hồ Xuân Hương. 34 căn của phân khu The Galleria · 34 Limited gồm 13 căn mặt tiền Trần Quang Diệu, 13 căn mặt tiền đường nội khu, 4 căn Đoàn Thị Điểm / Hồ Xuân Hương và 4 căn góc 2 mặt đường.' },
    ],
  },
  {
    category: 'Sản phẩm',
    items: [
      { q: 'Sản phẩm là gì?', a: '34 nhà phố thương mại 5 tầng thuộc phân khu The Galleria · 34 Limited, Giai đoạn 1 đã hoàn thành.' },
      { q: 'Diện tích mỗi căn?', a: 'Diện tích đất từ 135 đến 200 m² mỗi căn. Căn chuẩn (mẫu 01 & 02) có mặt tiền 7,5 m, chiều dài 19,5 m. Diện tích từng lô trên sơ đồ chỉ mang tính tham khảo; số liệu chính thức theo hồ sơ dự án.' },
      { q: 'Tổng diện tích đất?', a: 'Khoảng 1,41 ha (14.138,2 m²).' },
      { q: 'Công năng mỗi tầng?', a: 'Định hướng: tầng 1 thương mại/F&B/retail; tầng 2-5 văn phòng, dịch vụ. Chi tiết theo thiết kế chính thức.' },
      { q: 'Có thể làm gì? Có thể chia nhỏ?', a: 'Có thể khai thác cho nhiều mô hình như F&B, retail, văn phòng, dịch vụ (tùy quy định pháp luật và thiết kế được duyệt). Về khả năng phân chia, vui lòng đăng ký để nhận thông tin theo thiết kế chính thức.' },
    ],
  },
  {
    category: 'Pháp lý',
    items: [
      { q: 'Giấy phép nào đã có?', a: 'Chủ trương đầu tư theo Quyết định số 687/QĐ-UBND ngày 20/11/2024 của UBND tỉnh Ninh Thuận (cũ); Giấy phép xây dựng số 01/GPXD ngày 24/01/2025; ngày 10/06/2025 Sở Xây dựng xác nhận 34 căn đủ điều kiện mở bán. Dự án đã hoàn công.' },
      { q: 'Sổ đỏ/Sổ hồng?', a: 'Đã cấp sổ hồng riêng từng căn.' },
      { q: 'Thời hạn sử dụng đất?', a: 'Lâu dài.' },
      { q: 'Chủ đầu tư là ai?', a: 'Công ty Cổ phần Việt Nam Mỹ Nhật.' },
    ],
  },
  {
    category: 'Sở hữu',
    items: [
      { q: 'Hình thức sở hữu?', a: 'Sổ hồng riêng từng căn, thời hạn sử dụng đất lâu dài. Chi tiết theo hợp đồng; vui lòng đăng ký để được tư vấn.' },
      { q: 'Có thể chuyển nhượng?', a: 'Theo quy định pháp luật về chuyển nhượng quyền sử dụng đất và tài sản gắn liền đất.' },
    ],
  },
  {
    category: 'Tiến độ & bàn giao',
    items: [
      { q: 'Tiến độ hiện tại?', a: 'Giai đoạn 1 đã khánh thành ngày 28/01/2026 và đã hoàn công. Quảng trường trung tâm và công viên ánh sáng đã vận hành.' },
      { q: 'Khi nào bàn giao?', a: 'Bàn giao ngay khi thanh toán đủ, không phải chờ xây dựng.' },
      { q: 'Hỗ trợ sau bàn giao?', a: 'Theo quy định pháp luật và hợp đồng. Vui lòng liên hệ chuyên viên để biết thêm.' },
    ],
  },
  {
    category: 'Chính sách',
    items: [
      { q: 'Giá niêm yết?', a: 'Vui lòng đăng ký để nhận bảng giá mới nhất.' },
      { q: 'Chính sách chiết khấu?', a: 'Chính sách bán hàng được cập nhật theo từng thời điểm. Vui lòng đăng ký để được tư vấn 1-1.' },
      { q: 'Hỗ trợ vay ngân hàng?', a: 'Thông tin về hỗ trợ vay ngân hàng (nếu có) được tư vấn khi đăng ký; điều kiện vay do ngân hàng quyết định.' },
    ],
  },
  {
    category: 'Tư vấn',
    items: [
      { q: 'Làm thế nào để xem thực tế?', a: 'Đăng ký qua form "Nhận thông tin" hoặc gọi Hotline/Zalo để đặt lịch tham quan.' },
      { q: 'Có tư vấn 1-1?', a: 'Có. Chuyên viên tư vấn 1-1 về sản phẩm và hồ sơ dự án.' },
    ],
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-20 sm:py-28 lg:py-32 bg-off-white"
      aria-labelledby="faq-title"
    >
      <div className="section-wrapper">
        <div className="section-inner lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                id="faq-title"
                eyebrow="FAQ"
                title="Câu hỏi thường gặp."
                lead="Tổng hợp 7 nhóm câu hỏi: vị trí, sản phẩm, pháp lý, sở hữu, tiến độ & bàn giao, chính sách, tư vấn."
                layout="stack"
                className="!mb-8"
              />
              {/* CTA */}
              <div className="animate-fade-in delay-300">
                <p className="body text-concrete mb-6">
                  Chưa tìm thấy câu trả lời? Chuyên viên sẵn sàng tư vấn 1-1.
                </p>
                <a href="#tai-lieu" className="btn-primary inline-flex text-lg px-8 py-4" data-analytics="faq_cta">
                  Đăng ký tư vấn
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 mt-12 lg:mt-0 border-t border-concrete/25" data-stagger>
            {faqData.map((category, catIndex) => (
              <div key={category.category}>
              <details className="group relative border-b border-concrete/25 transition-colors duration-300 open:bg-paper/60">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 ease-arch group-open:scale-y-100"
                />
                <summary className="flex items-center justify-between gap-4 py-5 pl-2 pr-2 sm:pl-4 cursor-pointer list-none">
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-base text-accent" aria-hidden="true">
                      {String(catIndex + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-2xl text-charcoal transition-colors group-hover:text-accent group-open:text-accent">{category.category}</h3>
                  </span>
                  <svg
                    className="h-5 w-5 text-concrete transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </summary>
                <div className="faq-body pb-6 pl-2 pr-2 sm:pl-14">
                  <dl className="space-y-5">
                    {category.items.map((item, i) => (
                      <div key={i} className="border-t border-concrete/15 pt-5 first:border-t-0 first:pt-0">
                        <dt className="heading-sm text-charcoal mb-2">{item.q}</dt>
                        <dd className="body text-concrete">{item.a}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
