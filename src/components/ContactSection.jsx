import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';

export default function ContactSection() {
  const { translations } = useLanguage();
  const contact = translations?.contact;

  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  if (!contact) return null;

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('submitting');

    const body = `
New inquiry from Kaba Studio™ website

Name: ${form.name}
Company: ${form.company || 'N/A'}
Email: ${form.email}
Phone: ${form.phone || 'N/A'}

Message:
${form.message}
    `.trim();

    try {
      await base44.integrations.Core.SendEmail({
        to: 'info@kabastudio.se',
        subject: `New Inquiry from ${form.name} — Kaba Studio™`,
        body,
      });
      await base44.integrations.Core.SendEmail({
        to: 'kabastudioo@gmail.com',
        subject: `[Copy] New Inquiry from ${form.name} — Kaba Studio™`,
        body,
      });
      setStatus('success');
      setForm({ name: '', company: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', bottom: '20%', left: '5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="font-mono-kaba text-xs text-[#64748B] tracking-widest uppercase">Contact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white font-black leading-tight tracking-tighter mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {contact.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#94A3B8] text-lg"
          >
            {contact.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              {[
                { icon: Mail, label: 'Primary', value: 'info@kabastudio.se', href: 'mailto:info@kabastudio.se' },
                { icon: Mail, label: 'Backup', value: 'kabastudioo@gmail.com', href: 'mailto:kabastudioo@gmail.com' },
                { icon: MapPin, label: 'Location', value: contact.info.location, href: null },
                { icon: Clock, label: 'Response', value: contact.info.response, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-[#3B82F6]" />
                  </div>
                  <div>
                    <div className="font-mono-kaba text-xs text-[#64748B] mb-1 tracking-wider">{label.toUpperCase()}</div>
                    {href ? (
                      <a href={href} className="text-white hover:text-[#3B82F6] transition-colors font-medium break-all">
                        {value}
                      </a>
                    ) : (
                      <div className="text-white font-medium">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="glass-card rounded-2xl p-5 mt-2"
              style={{ border: '1px solid rgba(59,130,246,0.15)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono-kaba text-xs text-green-400">AVAILABLE FOR PROJECTS</span>
              </div>
              <p className="text-[#64748B] text-sm">
                We're currently taking on new clients. Let's build something great together.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-10 flex flex-col items-center text-center gap-5"
                style={{ border: '1px solid rgba(59,130,246,0.2)' }}
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">{contact.form.success}</h3>
                  <p className="text-[#64748B] text-sm">info@kabastudio.se</p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-[#64748B] hover:text-white transition-colors mt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono-kaba text-xs text-[#64748B] tracking-wider">
                      {contact.form.name} *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="input-underline"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono-kaba text-xs text-[#64748B] tracking-wider">
                      {contact.form.company}
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="input-underline"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono-kaba text-xs text-[#64748B] tracking-wider">
                      {contact.form.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="input-underline"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono-kaba text-xs text-[#64748B] tracking-wider">
                      {contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="input-underline"
                      placeholder="+46 70 000 00 00"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono-kaba text-xs text-[#64748B] tracking-wider">
                    {contact.form.message} *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-underline resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>{contact.form.error}</span>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-gradient rounded-full px-10 py-4 text-white font-semibold inline-flex items-center gap-2 disabled:opacity-60 group min-w-[180px] justify-center"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{contact.form.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{contact.form.submit}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}