'use client';

import { useState } from 'react';
import ArchCard from '@/components/ArchCard';
import SectionHeader from '@/components/SectionHeader';
import { BriefcaseIcon, CoffeeIcon, ServiceIcon, StoreIcon } from '@/components/icons';

const concepts = [
  {
    id: 'fnb',
    label: 'F&B',
    desc: 'Cà phê specialty, nhà hàng, bistro, tiệc cưới nhỏ',
    Icon: CoffeeIcon,
    features: [
      'Mặt tiền rộng',
      'Hệ thống thoát khí',
      'Khu vực nấu nướng riêng',
      'Khu vực khách thoáng đãng',
    ],
  },
  {
    id: 'retail',
    label: 'Retail',
    desc: 'Showroom thời trang, lifestyle, convenience store',
    Icon: StoreIcon,
    features: [
      'Mặt tiền kính lớn',
      'Khu trưng bày linh hoạt',
      'Kho chứa tiện lợi',
      'Đèn chiếu chuyên nghiệp',
    ],
  },
  {
    id: 'office',
    label: 'Office',
    desc: 'Văn phòng dịch vụ, coworking, clinic, trung tâm tư vấn',
    Icon: BriefcaseIcon,
    features: [
      'Phân chia không gian linh hoạt',
      'Hệ thống điều hòa trung tâm',
      'Sàn nâng truy cập dây cáp',
      'Phòng họp/phòng khám',
    ],
  },
  {
    id: 'service',
    label: 'Service',
    desc: 'Spa, gym, trung tâm giáo dục, trung tâm thẩm mỹ',
    Icon: ServiceIcon,
    features: [
      'Khu vực riêng tư',
      'Hệ thống nước/nóng lạnh',
      'Cách âm tốt',
      'Khu tiếp khách sang trọng',
    ],
  },
];

export default function UseCase() {
  const [activeConcept, setActiveConcept] = useState<string | null>(null);

  return (
    <section
      id="use-case"
      className="py-20 sm:py-28 lg:py-32 bg-off-white"
      aria-labelledby="usecase-title"
    >
      <div className="section-wrapper">
        <div className="section-inner">
          <SectionHeader
            id="usecase-title"
            eyebrow="Mô hình kinh doanh"
            title="4 mô hình minh họa: F&B · Retail · Office · Service"
          />

          {/* Concept Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-16"
            data-stagger
          >
            {concepts.map((concept, idx) => (
              <ArchCard key={concept.id} index={String(idx + 1).padStart(2, '0')}>
                <button
                  onClick={() => setActiveConcept(activeConcept === concept.id ? null : concept.id)}
                  className={`block h-full w-full text-left p-6 lg:p-8 pt-10 lg:pt-12 transition-colors duration-arch ease-arch
                    ${activeConcept === concept.id ? 'bg-accent-light/60 ring-1 ring-inset ring-accent' : ''}
                  `}
                >
                  <span className="mb-5 flex h-14 w-14 items-center justify-center border border-accent/40">
                    <concept.Icon className="h-8 w-8 text-accent" />
                  </span>
                  <h3 className="font-display text-3xl text-charcoal mb-2">{concept.label}</h3>
                  <p className="body-sm text-concrete mb-5">{concept.desc}</p>
                  <p className="caption text-concrete mb-2">Có thể bố trí:</p>
                  <ul className="space-y-2 border-t border-concrete/15 pt-5 text-sm text-concrete">
                    {concept.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {activeConcept === concept.id && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent text-warm-white text-xs px-3 py-1 rounded-full">
                      Đang xem chi tiết
                    </span>
                  )}
                </button>
              </ArchCard>
            ))}
          </div>

          {/* Active Concept Detail */}
            {activeConcept && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm animate-fade-in"
                onClick={() => setActiveConcept(null)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="concept-detail-title"
              >
                <div
                  className="bg-warm-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="p-6 border-b border-concrete/10 flex items-center justify-between sticky top-0 bg-warm-white rounded-t-xl">
                    <h3 id="concept-detail-title" className="display-sm text-charcoal">
                      {concepts.find(c => c.id === activeConcept)?.label}
                    </h3>
                    <button
                      onClick={() => setActiveConcept(null)}
                      className="p-2 rounded-full hover:bg-concrete/10 transition-colors"
                      aria-label="Đóng"
                    >
                      <svg
                        className="h-6 w-6 text-concrete"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    {(() => {
                      const ActiveIcon = concepts.find(c => c.id === activeConcept)?.Icon;
                      return ActiveIcon ? <ActiveIcon className="h-12 w-12 mb-4 text-accent" /> : null;
                    })()}
                    <h4 className="display-sm text-charcoal mb-4">
                      Minh họa {concepts.find(c => c.id === activeConcept)?.label}
                    </h4>
                    <p className="body-lg text-concrete mb-6">
                      {concepts.find(c => c.id === activeConcept)?.desc}
                    </p>
                    <h4 className="heading-sm text-charcoal mb-3">Có thể bố trí:</h4>
                    <ul className="space-y-3">
                      {concepts
                        .find(c => c.id === activeConcept)
                        ?.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-3 body text-concrete">
                            <span
                              className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-1.5"
                              aria-hidden="true"
                            />
                            {f}
                          </li>
                        ))}
                    </ul>
                    <button
                      onClick={() => setActiveConcept(null)}
                      className="btn-secondary w-full mt-6"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}

          {/* Disclaimer */}
          <div className="max-w-3xl reveal-fade delay-300">
            <p className="body-sm text-concrete">
              <span className="font-medium text-charcoal">MÔ HÌNH MINH HỌA</span> – Các hình ảnh
              và mô tả ở trên chỉ mang tính chất minh họa các khả năng sử dụng tiềm năng của sản
              phẩm. Không cam kết tenant, thương hiệu hoặc mô hình kinh doanh cụ thể.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
