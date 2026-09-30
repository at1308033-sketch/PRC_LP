'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="vi">
      <body className="min-h-screen flex items-center justify-center bg-warm-white px-4">
        <div className="text-center max-w-md p-8">
          <svg className="mx-auto h-16 w-16 text-red-500 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <h1 className="display-md text-charcoal mb-4">Đã xảy ra lỗi</h1>
          <p className="body-lg text-concrete mb-8">
            Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại sau.
          </p>
          <button
            onClick={reset}
            className="btn-primary inline-flex"
          >
            Thử lại
          </button>
        </div>
      </body>
    </html>
  );
}