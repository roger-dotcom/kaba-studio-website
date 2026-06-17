import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TrustMarquee from '@/components/TrustMarquee';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import WhyUsSection from '@/components/WhyUsSection';
import Footer from '@/components/Footer';
import DataOverlay from '@/components/DataOverlay';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <div className="relative" style={{ background: '#050508', minHeight: '100vh' }}>
      <CustomCursor />
      <DataOverlay />
      <Navigation />
      <main>
        <HeroSection />
        <TrustMarquee />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}