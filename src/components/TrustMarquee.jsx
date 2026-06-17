import React from 'react';
import { MapPin, Monitor, Cpu, Zap, Globe, Search, Layers, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const ICONS = [MapPin, Monitor, Cpu, Zap, Globe, Search, Layers, TrendingUp];

export default function TrustMarquee() {
  const { translations } = useLanguage();
  const items = translations?.trust || [];
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="py-6 border-y border-white/5 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #050508, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #050508, transparent)' }} />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div key={i} className="inline-flex items-center gap-3 mx-8 shrink-0">
              <Icon size={14} className="text-[#3B82F6] shrink-0" />
              <span className="font-mono-kaba text-xs tracking-widest text-[#64748B] uppercase">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/10 ml-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
}