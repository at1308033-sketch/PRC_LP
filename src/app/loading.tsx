import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
          <svg className="h-10 w-10 text-accent animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
        <p className="body-lg text-charcoal">Đang tải Phan Rang Center...</p>
        <p className="body-sm text-concrete/50 mt-2">Vui lòng chờ trong giây lát</p>
      </div>
    </div>
  );
}