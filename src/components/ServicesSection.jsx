import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code2, Bot, Wrench, PhoneCall, BarChart3, Layers, Palette, FlaskConical } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const ICONS = [Globe, Code2, Layers, Palette, FlaskConical, Bot, Wrench, PhoneCall, BarChart3];
const ICON_COLORS = [
  'from-blue-500 to-blue-600',
  'from-indigo-500 to-purple-600',
  'from-cyan-500 to-blue-600',
  'from-pink-500 to-rose-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-slate-500 to-slate-600',
  'from-blue-400 to-indigo-600',
  'from-purple-500 to-pink-500',
];

function ServiceCard({ item, index, isHotspot }) {
  const Icon = ICONS[index];
  const iconGrad = ICON_COLORS[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card glass-card-hover rounded-2xl p-6 lg:p-7 flex flex-col gap-5 relative overflow-hidden group"
      style={isHotspot ? {
        borderColor: 'rgba(59,130,246,0.25)',
        boxShadow: '0 0 40px rgba(59,130,246,0.08)',
      } : {}}
    >
      {isHotspot && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono-kaba text-xs text-blue-400">Featured</span>
          </div>
        </div>
      )}

      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.06) 0%, transparent 60%)' }}
      />

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconGrad} flex items-center justify-center shrink-0 relative z-10`}>
        <Icon size={22} className="text-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 flex-1">
        <h3 className="text-white font-bold text-xl leading-tight">{item.title}</h3>
        <p className="text-[#94A3B8] text-sm leading-relaxed flex-1">{item.description}</p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2 mt-1">
          {item.features.map((f, i) => (
            <span
              key={i}
              className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/8 text-[#64748B] bg-white/3"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Gradient border on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function ServicesSection() {
  const { translations } = useLanguage();
  const services = translations?.services;
  if (!services) return null;

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="font-mono-kaba text-xs text-[#64748B] tracking-widest uppercase">Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white font-black leading-tight tracking-tighter mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {services.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#94A3B8] text-lg max-w-2xl"
          >
            {services.subtitle}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ gridAutoRows: '1fr' }}>
          {services.items.map((item, i) => (
            <ServiceCard
              key={i}
              item={item}
              index={i}
              isHotspot={item.hotspot}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gradient rounded-full px-8 py-4 text-white font-semibold inline-flex items-center gap-2 group"
          >
            <span>{services.cta}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}