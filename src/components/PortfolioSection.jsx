import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Dumbbell, ChefHat, Building2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const PROJECT_IMAGES = [
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
  'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
];

const PROJECT_ICONS = [Dumbbell, ChefHat, Building2];
const PROJECT_COLORS = [
  { from: '#3B82F6', to: '#8B5CF6' },
  { from: '#8B5CF6', to: '#EC4899' },
  { from: '#3B82F6', to: '#06B6D4' },
];

function ProjectCard({ project, index, viewProject }) {
  const Icon = PROJECT_ICONS[index];
  const colors = PROJECT_COLORS[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group"
      style={{ minWidth: 0 }}
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url(${PROJECT_IMAGES[index]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${colors.from}22, ${colors.to}33, rgba(5,5,8,0.7))` }}
        />
        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className="font-mono-kaba text-xs px-3 py-1.5 rounded-full text-white/90"
            style={{ background: 'rgba(5,5,8,0.6)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
            {project.tag}
          </span>
        </div>
        {/* Icon */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}>
          <Icon size={18} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/8 text-[#64748B]"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Hover link */}
        <div className="flex items-center gap-2 text-sm text-[#64748B] group-hover:text-[#3B82F6] transition-colors duration-300 pt-1 border-t border-white/5">
          <ExternalLink size={14} />
          <span className="font-medium">{viewProject}</span>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${colors.from}, ${colors.to}, transparent)` }}
      />
    </motion.div>
  );
}

export default function PortfolioSection() {
  const { translations } = useLanguage();
  const portfolio = translations?.portfolio;
  if (!portfolio) return null;

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="font-mono-kaba text-xs text-[#64748B] tracking-widest uppercase">Portfolio</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white font-black leading-tight tracking-tighter mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                {portfolio.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#94A3B8] text-lg max-w-xl"
              >
                {portfolio.subtitle}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.items.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} viewProject={portfolio.viewProject} />
          ))}
        </div>
      </div>
    </section>
  );
}