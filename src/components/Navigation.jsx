import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage, LANGUAGES } from '@/lib/LanguageContext';

const NAV_ITEMS = ['home', 'services', 'portfolio', 'about', 'contact'];
const SCROLL_MAP = { 'why-us': 'why-us' };

export default function Navigation() {
  const { t, lang, switchLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const handleLang = (code) => {
    setActiveLang(code);
    switchLanguage(code);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <span className="font-black text-lg tracking-tight text-white group-hover:text-gradient transition-all duration-300">
              Kaba Studio<span className="text-gradient">™</span>
            </span>
          </button>

          {/* Center nav — desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200 relative group"
              >
                {t(`nav.${item}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Language switcher + mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-full p-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLang(l.code)}
                  className={`relative px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                    activeLang === l.code
                      ? 'text-white'
                      : 'text-[#64748B] hover:text-white'
                  }`}
                >
                  {activeLang === l.code && (
                    <motion.span
                      layoutId="lang-pill"
                      className="absolute inset-0 rounded-full btn-gradient"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg glass-card text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(5,5,8,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
              {/* Logo */}
              <button onClick={() => scrollTo('home')} className="mb-4">
                <span className="font-black text-3xl tracking-tight text-white">
                  Kaba Studio<span className="text-gradient">™</span>
                </span>
              </button>

              {/* Nav links */}
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(item)}
                  className="text-2xl font-bold text-[#94A3B8] hover:text-white transition-colors"
                >
                  {t(`nav.${item}`)}
                </motion.button>
              ))}


            </div>

            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center text-white"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}