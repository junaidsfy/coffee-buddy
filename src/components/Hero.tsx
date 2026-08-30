import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Bike, MapPin, Sparkles, ArrowRight, Instagram, Star } from 'lucide-react';
import { CAFE_DATA } from '../data/cafe';
import { trackEvent } from '../utils/analytics';
import { OrderButton } from './OrderButton';

interface HeroProps {
  onOpenMenuAction: () => void;
  onOpenOrderModal: () => void;
  onNavigateToLocation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenMenuAction,
  onOpenOrderModal,
  onNavigateToLocation,
}) => {
  const handleExploreMenu = () => {
    trackEvent('menu_clicked', { source: 'hero_primary_cta' });
    onOpenMenuAction();
  };

  const handleDirections = () => {
    trackEvent('directions_clicked', { source: 'hero_secondary_cta' });
    onNavigateToLocation();
  };

  const handleInstagramClick = () => {
    trackEvent('instagram_clicked', { source: 'hero_social_badge' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#18110D]">
      {/* Background Image Container with Slow Zoom & Cinematic Dark Tone */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=85"
          alt="Coffee Buddy Café ambiance and specialty coffee pour"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="w-full h-full object-cover object-center opacity-40 brightness-75 filter"
        />
        {/* Soft Vignette and Warm Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18110D] via-[#18110D]/60 to-[#18110D]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#18110D]/30 to-[#18110D]/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 text-center flex flex-col items-center">
        
        {/* Instagram Bio Visitor Tag / Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAD8C7] text-xs sm:text-sm font-medium mb-6 shadow-sm"
        >
          <a
            href={CAFE_DATA.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleInstagramClick}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>@coffeebuddy2026</span>
          </a>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1 text-[#F5C77E]">
            <Sparkles className="w-3.5 h-3.5" />
            Specialty Roastery & Café
          </span>
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

        {/* Brand Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-serif italic text-[#D8C7B5] font-normal tracking-wide"
        >
          Coffee • Food • Good Moments
        </motion.p>

        {/* Short Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#BDB0A4] max-w-2xl font-light leading-relaxed"
        >
          Single-origin South Indian estate beans, handcrafted cold brews, and artisanal comfort bites in the heart of the city.
        </motion.p>

        {/* Delivery Partner Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-6 flex items-center justify-center gap-3 text-xs text-[#E6D7C8]"
        >
          <span className="text-white/60 text-xs">Delivering fresh via</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E23744]/20 border border-[#E23744]/40 font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-[#E23744] animate-pulse" />
            Zomato
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FC8019]/20 border border-[#FC8019]/40 font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-[#FC8019] animate-pulse" />
            Swiggy
          </span>
        </motion.div>

        {/* Action CTAs in Order of Priority */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none"
        >
          {/* 1. Explore Menu */}
          <button
            type="button"
            onClick={handleExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#FFFFFF] text-[#221A15] font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <Coffee className="w-5 h-5 text-[#8C5E35]" />
            <span>Explore Menu</span>
          </button>

          {/* 2. Order Online */}
          <OrderButton
            onClick={onOpenOrderModal}
            variant="accent"
            source="hero_order_button"
            className="w-full sm:w-auto px-7 py-3.5 text-base font-bold"
          >
            Order Online
          </OrderButton>

          {/* 3. Get Directions (Visit Café) */}
          <button
            type="button"
            onClick={handleDirections}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-200 active:scale-95"
          >
            <MapPin className="w-4 h-4 text-[#E8D9C7]" />
            <span>Get Directions</span>
          </button>
        </motion.div>

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
