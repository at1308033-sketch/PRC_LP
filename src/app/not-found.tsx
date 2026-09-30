'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white px-4">
      <div className="text-center max-w-md">
        <h1 className="display-xl font-display font-bold text-charcoal mb-4">404</h1>
        <h2 className="display-sm text-charcoal mb-4">Trang không tìm thấy</h2>
        <p className="body-lg text-concrete mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}