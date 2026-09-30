import { TextReveal } from '@/components/ui/text-reveal';

export default function Manifesto() {
  return (
    <section className="bg-warm-white pt-16 sm:pt-20 lg:pt-28" aria-label="Phan Rang Center">
      <div className="section-wrapper">
        <div className="section-inner">
          <p className="eyebrow !mb-0">Phan Rang Center</p>
        </div>
      </div>
      <TextReveal>
        34 nhà phố thương mại đã hoàn công, đã có sổ hồng riêng từng căn và bàn giao ngay khi thanh
        toán đủ — giữa bốn mặt tiền trung tâm Phan Rang.
      </TextReveal>
    </section>
  );
}
