import React from 'react';
import { FadeIn } from './FadeIn.tsx';
import { Magnet } from './Magnet.tsx';
import { ContactButton } from './ContactButton.tsx';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[640px] flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <header className="w-full px-6 md:px-10 pt-6 md:pt-8">
          <nav className="flex items-center justify-between w-full uppercase tracking-wider font-medium text-[#D7E2EA] text-sm md:text-lg lg:text-[1.4rem]">
            <button
              onClick={() => scrollTo('about')}
              type="button"
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('services')}
              type="button"
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Price
            </button>
            <button
              onClick={() => scrollTo('projects')}
              type="button"
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={onOpenContact}
              type="button"
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </header>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="relative z-0 overflow-hidden w-full flex items-center justify-center">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
            Hi, i&apos;m mj
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Centered Absolutely) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-auto top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="MJ - 3D Creator Portrait"
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] object-contain block mx-auto drop-shadow-2xl pointer-events-none select-none"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end relative z-20 mt-auto">
        {/* Left paragraph */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        {/* Right Contact button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
