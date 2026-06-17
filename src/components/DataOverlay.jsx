import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function DataOverlay() {
  const [time, setTime] = useState('');
  const [scroll, setScroll] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const sthlm = now.toLocaleTimeString('sv-SE', {
        timeZone: 'Europe/Stockholm',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(sthlm);
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      setScroll(max > 0 ? Math.round((scrolled / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Left overlay */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 items-center">
        <div className="data-overlay writing-mode-vertical" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          STH — {time}
        </div>
        <div className="w-px h-16 bg-white/10" />
        <div className="data-overlay" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {lang.toUpperCase()}
        </div>
      </div>

      {/* Right overlay */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 items-center">
        <div className="data-overlay" style={{ writingMode: 'vertical-rl' }}>
          SCROLL — {scroll}%
        </div>
        <div className="w-px h-16 bg-white/10" />
        <div className="data-overlay" style={{ writingMode: 'vertical-rl' }}>
          KABA STUDIO™
        </div>
      </div>
    </>
  );
}