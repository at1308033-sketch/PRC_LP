'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { BrochureIcon, ClipboardIcon, PriceTagIcon } from '@/components/icons';
import { track } from '@/lib/analytics';
import { hotlineDisplay, hotlineHref, site } from '@/lib/site';
import { lots } from '@/lib/lots';

const SUBMIT_TIMEOUT_MS = 15000;

/** Vietnamese mobile numbers only: 10 digits starting 03 / 05 / 07 / 08 / 09. */
const VN_MOBILE = /^0[35789]\d{8}$/;

/**
 * Accepts what people actually type or paste ("090.123.4567", "090-123 4567", "+84 90 123 4567"),
 * returns the 10-digit national form, or null when the number cannot be dialled.
 */
const normalizePhone = (raw: string): string | null => {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('84')) digits = `0${digits.slice(2)}`;
  return VN_MOBILE.test(digits) ? digits : null;
};

/** AbortSignal.timeout where available, AbortController + timer as fallback. */
const timeoutSignal = (ms: number): AbortSignal => {
  if (typeof AbortSignal.timeout === 'function') return AbortSignal.timeout(ms);
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
};

// AbortSignal.timeout() rejects with "TimeoutError"; the AbortController fallback with "AbortError".
const isAbortError = (e: unknown) => {
  const name = e instanceof DOMException ? e.name : (e as { name?: string } | null)?.name;
  return name === 'TimeoutError' || name === 'AbortError';
};

type Field = 'fullName' | 'phone' | 'need';

// Frontage of interest — mirrors the lot map filters (docs/VERIFIED_FACTS_2026-09-30.md: 13 / 13 / 4 / 4).
const FRONTAGES = [
  { value: 'tqd', label: 'Trần Quang Diệu' },
  { value: 'noi-khu', label: 'Nội khu · hướng công viên' },
  { value: 'hong', label: 'Đoàn Thị Điểm / Hồ Xuân Hương' },
  { value: 'goc', label: 'Lô góc' },
  { value: 'chua-ro', label: 'Chưa xác định' },
] as const;
type Frontage = (typeof FRONTAGES)[number]['value'];

const frontageOfLot = (id: number): Frontage => {
  const lot = lots.find((l) => l.id === id);
  if (!lot) return 'chua-ro';
  if (lot.corner) return 'goc';
  if (lot.edge === 'north') return 'tqd';
  if (lot.edge === 'south') return 'noi-khu';
  return 'hong';
};

// Ruled-paper input and selectable chip styles for the request slip.
const lineInput =
  'mt-2 w-full border-0 border-b bg-transparent px-0 py-2 text-lg text-charcoal placeholder:text-concrete-light/80 transition-colors focus:outline-none focus:ring-0 disabled:cursor-not-allowed';
const chip =
  'inline-flex items-center border border-charcoal/25 px-3.5 py-2 text-sm text-charcoal transition-colors hover:border-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper';

export default function DocumentDownload() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    need: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [lotId, setLotId] = useState<number | null>(null);
  const [frontage, setFrontage] = useState<Frontage>('chua-ro');
  const [today, setToday] = useState('');
  const startedRef = useRef(false);
  const submittingRef = useRef(false);
  const focusNameRef = useRef(false);

  useEffect(() => {
    const d = new Date();
    setToday(`${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`);
  }, []);

  useEffect(() => {
    const onLotSelect = (e: Event) => {
      const id = (e as CustomEvent<{ lotId?: number }>).detail?.lotId;
      if (typeof id === 'number') {
        setLotId(id);
        setFrontage(frontageOfLot(id));
        focusNameRef.current = true;
      }
    };
    window.addEventListener('prc:lot-select', onLotSelect);
    return () => window.removeEventListener('prc:lot-select', onLotSelect);
  }, []);

  // The lot chip pushes the form down; focus only once it is in the DOM.
  useEffect(() => {
    if (lotId === null || !focusNameRef.current) return;
    focusNameRef.current = false;
    document.getElementById('fullName')?.focus();
  }, [lotId]);

  const handleFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track('lead_form_start', { section: 'document_download' });
  };

  const setField = (field: Field, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (submitStatus === 'success') setSubmitStatus('idle');
  };

  /** Returns the normalised phone to send, or null when the form is not valid. */
  const validate = (): string | null => {
    const newErrors: Record<string, string> = {};
    const phone = normalizePhone(formData.phone);
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!phone) newErrors.phone = 'Số di động gồm 10 số, bắt đầu 03, 05, 07, 08 hoặc 09';
    if (!formData.need) newErrors.need = 'Vui lòng chọn nhu cầu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? phone : null;
  };

  const needs = [
    { value: 'business', label: 'Mua để kinh doanh' },
    { value: 'invest', label: 'Đầu tư' },
    { value: 'learn', label: 'Tìm hiểu' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Synchronous guard: two Enter key repeats or a bfcache restore both fire before React re-renders.
    if (submittingRef.current) return;
    const phone = validate();
    if (!phone) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const endpoint = site.formspreeEndpoint;
    const needLabel = needs.find((n) => n.value === formData.need)?.label ?? formData.need;
    const fail = (reason: string) => {
      submittingRef.current = false;
      setIsSubmitting(false);
      setSubmitStatus('error');
      track('lead_form_error', { section: 'document_download', reason });
    };

    if (!endpoint || endpoint.includes('xxxxxxx')) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[DocumentDownload] NEXT_PUBLIC_FORMSPREE_ENDPOINT is missing or still a placeholder.');
      }
      fail('endpoint_missing');
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone,
          need: needLabel,
          source: 'document_download',
          pageUrl: window.location.href,
          lot: lotId ?? undefined,
          frontage: FRONTAGES.find((x) => x.value === frontage)?.label,
        }),
        signal: timeoutSignal(SUBMIT_TIMEOUT_MS),
      });
      if (!res.ok) {
        fail(`http_${res.status}`);
        return;
      }
    } catch (err) {
      // A hung connection would otherwise keep every field disabled until the user reloads.
      fail(isAbortError(err) ? 'timeout' : 'network');
      return;
    }

    submittingRef.current = false;
    setIsSubmitting(false);
    setSubmittedPhone(phone);
    setSubmitStatus('success');
    track('lead_form_submit', { section: 'document_download', need: formData.need, frontage,
      ...(lotId !== null ? { lot: lotId } : {}),
    });
    setFormData({ fullName: '', phone: '', need: '' });
  };

  return (
    <section
      id="tai-lieu"
      className="py-20 sm:py-28 lg:py-32 bg-warm-white"
      aria-labelledby="download-title"
    >
      <div className="section-wrapper">
        <div className="section-inner lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              layout="stack"
              id="download-title"
              eyebrow="Tài liệu"
              title="Điền phiếu — nhận đủ hồ sơ dự án"
              lead="Bốn dòng thông tin. Chuyên viên gửi brochure, hồ sơ pháp lý và bảng giá theo đúng mặt tiền bạn quan tâm."
              className="!mb-8 lg:!mb-10"
            />

            <div aria-hidden="true" className="reveal-line h-px w-full bg-concrete/25" />
            <ul data-stagger>
              {[
                { Icon: BrochureIcon, title: 'Brochure chi tiết', desc: 'Thông tin sản phẩm, mặt bằng, tiện ích' },
                { Icon: ClipboardIcon, title: 'Hồ sơ pháp lý', desc: 'Sổ hồng, giấy phép xây dựng, xác nhận đủ điều kiện mở bán' },
                { Icon: PriceTagIcon, title: 'Bảng giá & Chính sách', desc: 'Bảng giá và chính sách bán hàng hiện hành' },
              ].map((item) => (
                <li key={item.title} className="group relative flex items-start gap-4 py-5">
                  <span aria-hidden="true" className="reveal-line absolute inset-x-0 bottom-0 h-px bg-concrete/25" />
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 transition-colors duration-arch group-hover:bg-accent/15">
                    <item.Icon className="h-6 w-6 text-accent" />
                  </span>
                  <div>
                    <h3 className="heading-sm text-charcoal mb-1">{item.title}</h3>
                    <p className="body-sm text-concrete">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-7">
          {submitStatus === 'error' && (
            <div className="mb-6 border border-accent/40 bg-accent-light/40 p-5 animate-[faq-in_500ms_ease-out_both]" role="alert">
              <p className="body text-accent-dark font-medium">
                Không gửi được phiếu. Vui lòng gọi hotline{' '}
                <a href={hotlineHref} className="underline">{hotlineDisplay}</a> để được hỗ trợ.
              </p>
            </div>
          )}

          {/* Request slip: a paper form with numbered ruled fields; stamped on success */}
          <form onSubmit={handleSubmit} className="relative overflow-hidden border border-charcoal/20 bg-paper reveal" noValidate>
            <span aria-hidden="true" className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-accent" />
            <span aria-hidden="true" className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t border-accent" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l border-accent" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent" />

            {/* slip header */}
            <div className="flex flex-col gap-3 border-b border-charcoal/20 px-6 py-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4 md:px-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Phiếu yêu cầu hồ sơ</p>
                <p className="mt-1 font-display text-xl text-charcoal md:text-2xl">The Galleria · 34 Limited</p>
              </div>
              <p className="flex items-baseline gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-concrete sm:block sm:text-right">
                Ngày
                {/* client date only — the page is prerendered, a render-time date would be the build date */}
                <span className="-rotate-2 font-hand sm:mt-1 sm:block text-2xl normal-case tracking-normal text-charcoal md:text-3xl" aria-hidden={!today}>
                  {today || ' '}
                </span>
              </p>
            </div>

            <div className="space-y-7 px-6 py-8 md:px-10 md:py-10">
              {/* 01 name */}
              <div>
                <label htmlFor="fullName" className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-concrete">
                  <span className="font-display text-base normal-case tracking-normal text-accent">01</span>
                  Họ và tên <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  onFocus={handleFormStart}
                  autoComplete="name"
                  className={`${lineInput} ${errors.fullName ? 'border-red-600' : 'border-charcoal/30 focus:border-accent'} ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="Nguyễn Văn A"
                  disabled={isSubmitting}
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  required
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1.5 text-sm text-red-700" role="alert">{errors.fullName}</p>
                )}
              </div>

              {/* 02 phone */}
              <div>
                <label htmlFor="phone" className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-concrete">
                  <span className="font-display text-base normal-case tracking-normal text-accent">02</span>
                  Số điện thoại <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  onFocus={handleFormStart}
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={15}
                  className={`${lineInput} ${errors.phone ? 'border-red-600' : 'border-charcoal/30 focus:border-accent'} ${isSubmitting ? 'opacity-50' : ''}`}
                  placeholder="09x xxx xxxx"
                  disabled={isSubmitting}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  required
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1.5 text-sm text-red-700" role="alert">{errors.phone}</p>
                )}
              </div>

              {/* 03 frontage of interest (optional; pre-filled from the lot map) */}
              <fieldset>
                <legend className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-concrete">
                  <span className="font-display text-base normal-case tracking-normal text-accent">03</span>
                  Mặt tiền quan tâm
                </legend>
                {lotId !== null && (
                  <p className="mt-3 inline-flex items-center gap-2 border border-accent/40 bg-accent/5 py-1 pl-3 pr-1 text-sm text-accent-dark">
                    Lô ODT {lotId} trên sơ đồ
                    <button
                      type="button"
                      onClick={() => setLotId(null)}
                      aria-label={`Bỏ chọn Lô ODT ${lotId}`}
                      className="inline-flex h-6 w-6 items-center justify-center hover:bg-accent/15"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {FRONTAGES.map((f) => (
                    <label key={f.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="frontage"
                        value={f.value}
                        checked={frontage === f.value}
                        onChange={() => {
                          setFrontage(f.value);
                          handleFormStart();
                        }}
                        disabled={isSubmitting}
                        className="peer sr-only"
                      />
                      <span className={chip}>{f.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 04 need */}
              <fieldset aria-describedby={errors.need ? 'need-error' : undefined}>
                <legend className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-concrete">
                  <span className="font-display text-base normal-case tracking-normal text-accent">04</span>
                  Nhu cầu <span className="text-accent" aria-hidden="true">*</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {needs.map((n) => (
                    <label key={n.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="need"
                        value={n.value}
                        checked={formData.need === n.value}
                        onChange={() => {
                          setField('need', n.value);
                          handleFormStart();
                        }}
                        disabled={isSubmitting}
                        className="peer sr-only"
                        required
                      />
                      <span className={chip}>{n.label}</span>
                    </label>
                  ))}
                </div>
                {errors.need && (
                  <p id="need-error" className="mt-1.5 text-sm text-red-700" role="alert">{errors.need}</p>
                )}
              </fieldset>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group btn-primary mt-2 w-full py-4 text-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" strokeWidth="2" />
                    </svg>
                    Đang gửi phiếu...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Gửi phiếu yêu cầu
                    <svg
                      className="h-5 w-5 transition-transform duration-arch ease-arch group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 12h16M14 6l6 6-6 6" />
                    </svg>
                  </span>
                )}
              </button>

              <p className="caption text-center text-concrete">
                Bằng cách gửi, bạn đồng ý để chúng tôi liên hệ qua số điện thoại này. Thông tin của bạn được bảo mật.
              </p>
            </div>

            {/* received: stamp the slip, then offer the brochure */}
            {submitStatus === 'success' && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-paper/90 p-8 text-center backdrop-blur-[1px]"
                role="status"
              >
                <svg viewBox="0 0 220 110" className="seal-press w-56 -rotate-6" aria-hidden="true">
                  <rect x="4" y="4" width="212" height="102" rx="10" fill="none" stroke="#8f1717" strokeWidth="4" />
                  <rect x="12" y="12" width="196" height="86" rx="6" fill="none" stroke="#8f1717" strokeWidth="1.2" />
                  <text x="110" y="52" textAnchor="middle" fontSize="22" fontWeight="700" letterSpacing="3" fill="#8f1717" style={{ fontFamily: 'var(--font-sans)' }}>
                    ĐÃ TIẾP NHẬN
                  </text>
                  <text x="110" y="78" textAnchor="middle" fontSize="11" fontWeight="600" letterSpacing="2.5" fill="#8f1717" style={{ fontFamily: 'var(--font-sans)' }}>
                    PHAN RANG CENTER
                  </text>
                </svg>
                <p className="body max-w-sm text-charcoal">
                  Chuyên viên sẽ liên hệ sớm qua số <strong>{submittedPhone}</strong> để gửi hồ sơ.
                </p>
                <a href="/documents/phan-rang-center-brochure.pdf" target="_blank" rel="noopener" className="btn-primary inline-flex text-sm">
                  Tải brochure ngay (PDF, 9,7 MB)
                </a>
                <button type="button" onClick={() => setSubmitStatus('idle')} className="text-sm text-concrete underline underline-offset-4 hover:text-accent">
                  Gửi thêm một phiếu
                </button>
              </div>
            )}
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}