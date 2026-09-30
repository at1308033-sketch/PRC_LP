import ArchCard from '@/components/ArchCard';
import SectionHeader from '@/components/SectionHeader';
import { CheckIcon } from '@/components/icons';
import { ScrollTimeline } from '@/components/ui/scroll-timeline';

const milestones = [
  {
    date: '20/11/2024',
    text: 'QĐ số 687/QĐ-UBND chấp thuận chủ trương đầu tư — UBND tỉnh Ninh Thuận',
  },
  { date: '16/01/2025', text: 'Động thổ Giai đoạn 1' },
  { date: '24/01/2025', text: 'Giấy phép xây dựng số 01/GPXD' },
  { date: '10/06/2025', text: 'Sở Xây dựng xác nhận 34 căn đủ điều kiện mở bán' },
  { date: '28/01/2026', text: 'Khánh thành Giai đoạn 1' },
];

const timeline = [
  ...milestones.map((m) => ({
    title: m.date,
    content: <p className="body text-charcoal">{m.text}</p>,
  })),
  {
    title: 'Hiện tại',
    content: (
      <div className="rounded-lg bg-accent text-paper p-5 lg:p-6">
        <p className="body text-paper/90">
          Đã hoàn công · Đã cấp sổ hồng riêng từng căn · Quảng trường &amp; công viên ánh sáng đã
          vận hành
        </p>
      </div>
    ),
  },
];

const documents = [
  'QĐ số 687/QĐ-UBND chấp thuận chủ trương đầu tư',
  'Giấy phép xây dựng số 01/GPXD',
  'Văn bản Sở Xây dựng xác nhận đủ điều kiện mở bán',
  'Sổ hồng riêng của căn quan tâm',
  'Thông số kỹ thuật & hoàn thiện bàn giao',
];

const commitments = [
  'Hồ sơ pháp lý được cung cấp để khách hàng tự kiểm tra, đối chiếu với cơ quan có thẩm quyền.',
  'Khách hàng có thể đề nghị xem hồ sơ pháp lý tại văn phòng bán hàng hoặc nhận qua đăng ký.',
];

export default function Legal() {
  return (
    <section
      id="phap-ly"
      className="py-20 sm:py-28 lg:py-32 bg-off-white"
      aria-labelledby="legal-title"
    >
      <div className="section-wrapper">
        <div className="section-inner">
          <SectionHeader
            id="legal-title"
            eyebrow="Pháp lý"
            title="Đã hoàn công. Sổ hồng riêng từng căn."
            lead="Đã hoàn công, sổ hồng riêng từng căn, thời hạn sử dụng đất lâu dài. Bàn giao ngay khi thanh toán đủ."
          />

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Timeline */}
            <div className="lg:col-span-7 mb-12 lg:mb-0">
              <ScrollTimeline data={timeline} />
            </div>

            {/* Dossier card */}
            <ArchCard as="div" className="lg:col-span-5 h-fit lg:sticky lg:top-28 reveal-fade">
              <div className="p-6 md:p-8">
              <h3 className="heading-sm text-charcoal mb-4">Bộ hồ sơ khách nhận khi đăng ký</h3>
              <ul className="space-y-3 text-charcoal mb-6">
                {documents.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <a href="#tai-lieu" className="btn-primary inline-flex" data-analytics="legal_cta">
                Nhận bộ hồ sơ pháp lý
              </a>

              <h4 className="eyebrow mt-8 !mb-3">Hồ sơ bạn được đối chiếu</h4>
              <ul className="space-y-3 text-concrete text-sm">
                {commitments.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span
                      className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-1.5"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              </div>
            </ArchCard>
          </div>
        </div>
      </div>
    </section>
  );
}
