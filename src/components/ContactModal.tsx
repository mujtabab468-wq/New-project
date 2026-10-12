import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, CheckCircle2, Copy, Sparkles, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '3D Modeling & Animation',
    budget: '$3,000 - $5,000',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = 'mj@3dcreator.design';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl bg-[#121212] border border-[#2A2E35] rounded-3xl p-6 sm:p-8 text-[#D7E2EA] shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Top decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-[#B600A8]/20 via-[#7621B0]/10 to-transparent blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#BBCCD7] bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
                  Open For New Commissions
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Let&apos;s Build Together
                </h3>
                <p className="text-sm text-[#BBCCD7]/80 font-light mt-1">
                  Tell me about your 3D project, timeline, and vision.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-[#D7E2EA]/70 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold uppercase text-white">Message Received!</h4>
                <p className="text-sm text-[#BBCCD7] max-w-sm mx-auto font-light">
                  Thank you for reaching out. MJ will review your project brief and get back to you within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium uppercase tracking-wider transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#BBCCD7] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#18191C] border border-[#2A2E35] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#BBCCD7] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#18191C] border border-[#2A2E35] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#BBCCD7] mb-1.5">
                      Service Needed
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#18191C] border border-[#2A2E35] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    >
                      <option value="3D Modeling">3D Modeling</option>
                      <option value="Photorealistic Rendering">Photorealistic Rendering</option>
                      <option value="Motion Design & Animation">Motion Design & Animation</option>
                      <option value="Branding & Visual Identity">Branding & Visual Identity</option>
                      <option value="Web Design & Experience">Web Design & Experience</option>
                      <option value="Full Package">Full Creative Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider text-[#BBCCD7] mb-1.5">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#18191C] border border-[#2A2E35] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    >
                      <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider text-[#BBCCD7] mb-1.5">
                    Project Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your creative goals, key deliverables, and target deadline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#18191C] border border-[#2A2E35] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#BBCCD7] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 text-xs text-[#BBCCD7] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/5"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Email' : email}</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-widest text-xs px-6 py-3 text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      outline: '2px solid white',
                      outlineOffset: '-3px',
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
