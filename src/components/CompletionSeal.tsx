import type { CSSProperties } from 'react';

// Red ink seal — the Vietnamese "con dấu đỏ" that closes every approved document.
// It carries the project's real differentiator (completed, individually titled, ready to hand over)
// instead of a row of numbers. Purely typographic: no state emblem, no authority name.
// Stamps down once on load (.seal-press in globals.css); static under reduced motion.

const RING = 'ĐÃ HOÀN CÔNG • SỔ HỒNG RIÊNG TỪNG CĂN • BÀN GIAO NGAY • ';

export default function CompletionSeal({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`seal-press pointer-events-none select-none ${className}`}
      style={style}
      role="img"
      aria-label="Đã hoàn công, sổ hồng riêng từng căn, bàn giao ngay — 34 nhà phố The Galleria, khánh thành 2026"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-[11deg] drop-shadow-[0_1px_0_rgba(251,248,243,0.6)]">
        <defs>
          {/* ink grain: breaks the edges like a rubber stamp on paper */}
          <filter id="seal-ink" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="7" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.45" result="mask" />
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
          </filter>
          <path id="seal-ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        {/* paper disc keeps the ink legible where the seal overlaps the photo */}
        <circle cx="100" cy="100" r="98" fill="#FBF8F3" fillOpacity="0.94" />
        <g filter="url(#seal-ink)" fill="#8f1717" stroke="#8f1717">
          <circle cx="100" cy="100" r="94" fill="none" strokeWidth="5" />
          <circle cx="100" cy="100" r="86" fill="none" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="57" fill="none" strokeWidth="1.5" />
          <text fontSize="11" fontWeight="700" stroke="none" style={{ fontFamily: 'var(--font-sans)' }}>
            {/* textLength = ring circumference (2π·72) so the phrase closes the circle evenly */}
            <textPath href="#seal-ring" startOffset="0" textLength="450" lengthAdjust="spacing">
              {RING}
            </textPath>
          </text>
          <text x="100" y="98" textAnchor="middle" fontSize="54" stroke="none" style={{ fontFamily: 'var(--font-display)' }}>
            34
          </text>
          <text x="100" y="120" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2.4" stroke="none" style={{ fontFamily: 'var(--font-sans)' }}>
            NHÀ PHỐ
          </text>
          <path d="M78 130h44" strokeWidth="1" />
          <text x="100" y="143" textAnchor="middle" fontSize="8.5" fontWeight="600" letterSpacing="1.6" stroke="none" style={{ fontFamily: 'var(--font-sans)' }}>
            GĐ1 · 2026
          </text>
        </g>
      </svg>
    </div>
  );
}
