import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const AILogLines = [
  '> Initializing Kaba AI Engine...',
  '> Connected to client: nordic_retail_ab',
  '> Lead capture workflow: ACTIVE',
  '> Analyzing website traffic patterns...',
  '> SEO score: 94/100 ✓',
  '> AI receptionist: DEPLOYED',
  '> Automation triggers: 12 active',
  '> Monthly leads captured: +340%',
  '> Response time: 0.3s avg',
  '> New inquiry routed to CRM',
  '> Performance report generated',
  '> Client dashboard: LIVE',
];

function AIWindow() {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const addLine = () => {
      setLines(prev => {
        const next = [...prev, AILogLines[i % AILogLines.length]];
        return next.slice(-8);
      });
      i++;
    };
    addLine();
    const interval = setInterval(addLine, 1800);
    const cursorInterval = setInterval(() => setCursor(c => !c), 500);
    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="glass-card rounded-2xl p-5 h-full min-h-[300px] lg:min-h-[380px] flex flex-col"
      style={{ background: 'rgba(5,5,8,0.7)', border: '1px solid rgba(59,130,246,0.2)' }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 font-mono-kaba text-xs text-[#64748B]">kaba-ai-engine — v2.4.1</span>
      </div>

      {/* Log lines */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
        {lines.map((line, i) => (
          <motion.div
            key={`${i}-${line}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`font-mono-kaba text-xs leading-relaxed ${
              i === lines.length - 1 ? 'text-[#3B82F6]' : 'text-[#64748B]'
            }`}
          >
            {line}
            {i === lines.length - 1 && (
              <span style={{ opacity: cursor ? 1 : 0 }} className="ml-0.5">▋</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Status bar */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono-kaba text-xs text-green-400">LIVE</span>
        </div>
        <span className="font-mono-kaba text-xs text-[#64748B]">Stockholm, SE</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const orbRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!orbRef.current) return;
      const { clientX, clientY } = e;
      const xPct = (clientX / window.innerWidth - 0.5) * 40;
      const yPct = (clientY / window.innerHeight - 0.5) * 40;
      orbRef.current.style.transform = `translate(${xPct}px, ${yPct}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const headline1 = t('hero.headline1');
  const headline2 = t('hero.headline2');
  const headline3 = t('hero.headline3');

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={orbRef}
          className="absolute transition-transform duration-1000 ease-out"
          style={{
            top: '10%', left: '20%',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="orb-2 absolute"
          style={{
            top: '30%', right: '15%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — headline */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono-kaba text-xs text-[#94A3B8] tracking-wider">
                KABA STUDIO™ — STOCKHOLM, SWEDEN
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-6">
              {[headline1, headline2, headline3].map((line, i) => (
                <motion.div
                  key={`${lang}-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1
                    className={`font-black leading-none tracking-tighter mb-1 ${
                      i === 1 ? 'text-gradient' : 'text-white'
                    }`}
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                  >
                    {line}
                  </h1>
                </motion.div>
              ))}
            </div>

            {/* Subheadline */}
            <motion.p
              key={lang}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-lg"
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToContact}
                className="btn-gradient glow-pulse rounded-full px-8 py-4 text-white font-semibold text-base flex items-center justify-center gap-2 min-h-[52px] group"
              >
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToServices}
                className="rounded-full px-8 py-4 text-[#94A3B8] font-semibold text-base border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300 min-h-[52px]"
              >
                {t('hero.ctaSecondary')}
              </button>
            </motion.div>
          </div>

          {/* Right — AI Window */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <AIWindow />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="data-overlay">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-[#3B82F6]" />
        </motion.div>
      </motion.div>
    </section>
  );
}