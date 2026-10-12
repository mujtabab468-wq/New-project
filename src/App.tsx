import React, { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { MarqueeSection } from './components/MarqueeSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { ContactModal } from './components/ContactModal.tsx';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main
      className="bg-[#0C0C0C] text-[#D7E2EA] min-h-screen selection:bg-[#B600A8]/30 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 1. Hero Section */}
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onOpenContact={() => setIsContactOpen(true)} />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* Footer Section & Contact Anchor */}
      <FooterSection onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
