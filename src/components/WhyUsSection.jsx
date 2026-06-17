import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function WhyUsSection() {
  const { translations } = useLanguage();
  const whyUs = translations?.whyUs;
  if (!whyUs) return null;

  const half = Math.ceil(whyUs.items.length / 2);
  const col1 = whyUs.items.slice(0, half);
  const col2 = whyUs.items.slice(half);

  return (
    <section id="why-us" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.05) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="font-mono-kaba text-xs text-[#64748B] tracking-widest uppercase">Why Us</span>
            <div className="w-8 h-px bg-gradient-to-l from-blue-500 to-purple-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white font-black leading-tight tracking-tighter mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {whyUs.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#94A3B8] text-lg max-w-xl mx-auto"
          >
            {whyUs.subtitle}
          </motion.p>
        </div>

        {/* Checklist card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto"
          style={{ border: '1px solid rgba(59,130,246,0.15)', boxShadow: '0 0 60px rgba(59,130,246,0.05)' }}
        >
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
            {[col1, col2].map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-5">
                {col.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (colIdx * half + i) * 0.06 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-blue-400" />
                    </div>
                    <span className="text-[#CBD5E1] text-base font-medium group-hover:text-white transition-colors duration-200">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}