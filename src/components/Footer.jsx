import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage, LANGUAGES } from '@/lib/LanguageContext';

const NAV_ITEMS = ['home', 'services', 'portfolio', 'about', 'contact'];
// why-us section is accessible via scrolling, not in primary nav

export default function Footer() {
  const { t, translations, lang, switchLanguage } = useLanguage();
  const footer = translations?.footer;
  if (!footer) return null;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t pt-16 pb-8 overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      {/* Gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #3B82F6, #8B5CF6, transparent)' }}
      />

      {/* Background orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse at center bottom, rgba(59,130,246,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Main footer grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <span className="font-black text-lg tracking-tight text-white">
                Kaba Studio<span className="text-gradient">™</span>
              </span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed mb-5 max-w-xs">{footer.tagline}</p>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#3B82F6] shrink-0" />
              <span className="text-[#64748B] text-sm">{footer.location}</span>
            </div>
          </div>

          {/* Col 2 — Nav */}
          <div>
            <h4 className="font-mono-kaba text-xs text-[#64748B] tracking-widest uppercase mb-5">{footer.nav}</h4>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-[#94A3B8] hover:text-white text-sm transition-colors text-left w-fit relative group"
                >
                  {t(`nav.${item}`)}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contact + Language */}
          <div>
            <h4 className="font-mono-kaba text-xs text-[#64748B] tracking-widest uppercase mb-5">{footer.contact}</h4>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href="mailto:info@kabastudio.se"
                className="flex items-center gap-2 text-[#94A3B8] hover:text-white text-sm transition-colors group"
              >
                <Mail size={14} className="text-[#3B82F6] shrink-0" />
                info@kabastudio.se
              </a>
              <a
                href="mailto:kabastudioo@gmail.com"
                className="flex items-center gap-2 text-[#94A3B8] hover:text-white text-sm transition-colors group"
              >
                <Mail size={14} className="text-[#64748B] shrink-0" />
                kabastudioo@gmail.com
              </a>
            </div>

            {/* Language selector */}
            <div className="flex items-center gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLanguage(l.code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                    lang === l.code
                      ? 'btn-gradient text-white border-transparent'
                      : 'text-[#64748B] border-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {l.full}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wordmark */}
        <div className="mb-8 overflow-hidden">
          <div className="wordmark-outline select-none text-center lg:text-left" aria-hidden="true">
            KABA
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-xs font-mono-kaba">{footer.copyright}</p>
          <div className="flex items-center gap-4">
            <a href="mailto:info@kabastudio.se" className="text-[#64748B] hover:text-white text-xs transition-colors">
              info@kabastudio.se
            </a>
            <span className="text-[#64748B] text-xs">·</span>
            <span className="font-mono-kaba text-xs text-[#64748B]">www.kabastudio.se</span>
          </div>
        </div>
      </div>
    </footer>
  );
}