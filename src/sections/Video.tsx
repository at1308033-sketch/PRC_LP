'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader';
import { track } from '@/lib/analytics';

const clips = [
  {
    id: 'main',
    src: '/video/clips/event-2026-07-24-1.mp4',
    poster: '/video/posters/event-2026-07-24-1.jpg',
    label: 'Toàn cảnh sự kiện',
    duration: '00:41',
  },
  {
    id: 'sales',
    src: '/video/clips/event-2026-07-24-sales.mp4',
    poster: '/video/posters/event-2026-07-24-sales.jpg',
    label: 'Khu vực bán hàng',
    duration: '01:25',
  },
];

export default function Video() {
  const [activeClip, setActiveClip] = useState(clips[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    track('video_play', { clip: activeClip.id, label: activeClip.label });
  };

  const handleSelect = (clip: (typeof clips)[number]) => {
    setActiveClip(clip);
    setIsPlaying(false);
  };

  return (
    <section
      id="video"
      className="py-20 sm:py-28 lg:py-32 bg-off-white"
      aria-labelledby="video-title"
    >
      <div className="section-wrapper">
        <div className="section-inner">
          <SectionHeader
            id="video-title"
            eyebrow="Sự kiện tại Đà Lạt"
            title="Sự kiện mở bán tại Đà Lạt · 24.07.2026."
            lead="Hai video ghi lại sự kiện mở bán Phan Rang Center tổ chức tại Đà Lạt — ghi hình tại địa điểm sự kiện, không phải tại công trình."
          />

          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
            <div className="reveal-clip relative aspect-video overflow-hidden bg-charcoal">
              {isPlaying ? (
                <video
                  key={activeClip.src}
                  className="h-full w-full"
                  controls
                  autoPlay
                  preload="metadata"
                  poster={activeClip.poster}
                  playsInline
                >
                  <source src={activeClip.src} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ phát video.
                </video>
              ) : (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="group absolute inset-0 h-full w-full text-left"
                  data-analytics="video_play"
                  data-analytics-label={activeClip.label}
                  aria-label={`Phát video: ${activeClip.label}`}
                >
                  <Image
                    src={activeClip.poster}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover transition-opacity duration-arch group-hover:opacity-90"
                    loading="eager"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-charcoal/30 transition-colors duration-arch group-hover:bg-charcoal/40">
                    <svg className="h-20 w-20 text-warm-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>

            </div>

            {/* Clip list */}
            <div className="lg:col-span-4 mt-6 lg:mt-0 flex flex-col">
              <p className="eyebrow reveal">Danh sách clip</p>
              <div className="flex flex-col border-t border-concrete/20" data-stagger>
                {clips.map((clip, i) => (
                  <div key={clip.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(clip)}
                    className={`relative flex w-full items-center justify-between gap-4 border-b border-concrete/20 px-5 py-5 text-left transition-colors duration-arch
                      ${activeClip.id === clip.id ? 'bg-paper' : 'hover:bg-paper/60'}`}
                    aria-pressed={activeClip.id === clip.id}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 h-full w-0.5 origin-top bg-accent transition-transform duration-500 ease-arch ${
                        activeClip.id === clip.id ? 'scale-y-100' : 'scale-y-0'
                      }`}
                    />
                    <span className="flex items-baseline gap-4">
                      <span className={`font-display text-2xl ${activeClip.id === clip.id ? 'text-accent' : 'text-concrete-light'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`body font-medium ${activeClip.id === clip.id ? 'text-accent' : 'text-charcoal'}`}>{clip.label}</span>
                    </span>
                    <span className="caption text-concrete">{clip.duration}</span>
                  </button>
                  </div>
                ))}
              </div>
              <p className="caption text-concrete mt-6 reveal delay-300">
                Nhấn để phát. Video không tự động phát và chỉ tải khi bạn chọn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
