import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { ContactButton } from './ContactButton.tsx';
import { FadeIn } from './FadeIn.tsx';

interface FooterSectionProps {
  onOpenContact: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'ArtStation', url: 'https://artstation.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'X / Twitter', url: 'https://x.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Behance', url: 'https://behance.net' },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-[#0C0C0C] border-t border-[#D7E2EA]/15 pt-20 pb-12 px-6 md:px-10 overflow-hidden text-[#D7E2EA]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Main callout */}
        <FadeIn delay={0.1} y={30} className="text-center max-w-3xl mb-12">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#BBCCD7]/70 mb-4">
            Available For Select 3D & Brand Collaborations
          </p>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none mb-8"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Let&apos;s Build
          </h2>
          <div className="flex justify-center">
            <ContactButton onClick={onOpenContact} label="Start A Project" />
          </div>
        </FadeIn>

        {/* Social Links & Back to Top */}
        <div className="w-full pt-16 pb-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm uppercase tracking-wider font-medium">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#D7E2EA]/70 hover:text-white transition-colors group"
              >
                <span>{social.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Bottom copyright notice */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#D7E2EA]/40 font-light pt-6 border-t border-white/5">
          <p>© {new Date().getFullYear()} MJ — 3D Creator. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Crafted with precision & passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
