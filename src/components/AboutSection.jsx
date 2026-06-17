import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Code, Sparkles, Users } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const STAT_ICONS = [Sparkles, Code, Users, MapPin];

export default function AboutSection() {
  const { translations } = useLanguage();
  const about = translations?.about;
  if (!about) return null;

  return (
    <section id="about" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="font-mono-kaba text-xs text-[#64748B] tracking-widest uppercase">About</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white font-black leading-tight tracking-tighter mb-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {about.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-gradient font-semibold text-lg mb-6"
            >
              {about.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#94A3B8] leading-relaxed mb-5"
            >
              {about.body1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[#94A3B8] leading-relaxed mb-8"
            >
              {about.body2}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gradient rounded-full px-7 py-3.5 text-white font-semibold inline-flex items-center gap-2 group"
              >
                <span>{about.cta}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-5">
            {about.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 lg:p-8 flex flex-col gap-4 group hover:border-blue-500/20 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/8 flex items-center justify-center">
                    <Icon size={18} className="text-[#3B82F6]" />
                  </div>
                  <div>
                    <div className="text-gradient font-black text-4xl leading-none mb-1">{stat.value}</div>
                    <div className="text-[#64748B] text-sm font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}