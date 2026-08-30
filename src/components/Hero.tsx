import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Instagram } from 'lucide-react';
import { CAFE_DATA } from '../data/cafe';
import { trackEvent } from '../utils/analytics';
import mobileHeroBg from '../assets/images/hero_mobile_latte_1788109281566.jpg';

interface HeroProps {
  onOpenMenuAction: () => void;
  onOpenOrderModal: () => void;
  onNavigateToLocation: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const handleInstagramClick = () => {
    trackEvent('instagram_clicked', { source: 'hero_social_badge' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#18110D]">
      {/* Background Image Container with Slow Zoom & Cinematic Dark Tone */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mobile Background Image */}
        <motion.img
          src={mobileHeroBg}
          alt="Coffee extraction over iced milk"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          className="block sm:hidden w-full h-full object-cover object-center opacity-65 brightness-90 filter"
          referrerPolicy="no-referrer"
        />

        {/* Desktop Background Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=85"
          alt="Coffee Buddy Café ambiance and specialty coffee pour"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="hidden sm:block w-full h-full object-cover object-center opacity-40 brightness-75 filter"
        />
        {/* Soft Vignette and Warm Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18110D] via-[#18110D]/50 to-[#18110D]/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#18110D]/20 to-[#18110D]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 text-center flex flex-col items-center">
        
        {/* Instagram Bio Visitor Tag / Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAD8C7] text-xs font-medium mb-6 shadow-sm w-[235px] h-[19px]"
        >
          <a
            href={CAFE_DATA.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleInstagramClick}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Instagram className="w-3 h-3 text-[#E1306C]" />
            <span>@coffeebuddy2026</span>
          </a>
        </motion.div>

        {/* Main Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#FAF7F2] tracking-tight leading-[1.08] max-w-4xl"
        >
          COFFEE BUDDYS
        </motion.h1>

        {/* Scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 sm:mt-16 text-[#A89A8E] text-xs flex flex-col items-center gap-2"
        >
          <span>Scroll to explore our craft</span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#EAD8C7]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
