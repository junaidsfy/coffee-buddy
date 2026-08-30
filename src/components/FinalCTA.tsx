import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Bike, MapPin, Sparkles, ArrowRight, Instagram } from 'lucide-react';
import { CAFE_DATA } from '../data/cafe';
import { trackEvent } from '../utils/analytics';
import { OrderButton } from './OrderButton';

interface FinalCTAProps {
  onOpenMenuAction: () => void;
  onOpenOrderModal: () => void;
  onNavigateToLocation: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenMenuAction,
  onOpenOrderModal,
  onNavigateToLocation,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#18110D] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1800&q=80"
          alt="Café mood"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18110D] via-[#18110D]/80 to-[#18110D]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F5C77E] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          Every Cup Tells A Story
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FAF7F2] tracking-tight leading-tight max-w-3xl mx-auto">
          Ready For Your Next Great Coffee Moment?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#C4B5A5] max-w-xl mx-auto font-light leading-relaxed">
          Order to your home via Zomato & Swiggy, or come experience the warm aroma in our café today.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <OrderButton
            onClick={onOpenOrderModal}
            variant="accent"
            source="final_cta"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold"
          >
            Order Online
          </OrderButton>

          <button
            type="button"
            onClick={() => {
              trackEvent('menu_clicked', { source: 'final_cta_explore' });
              onOpenMenuAction();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 font-semibold text-base transition-all"
          >
            <Coffee className="w-5 h-5 text-[#E8D9C7]" />
            <span>Explore Menu</span>
          </button>

          <button
            type="button"
            onClick={() => {
              trackEvent('directions_clicked', { source: 'final_cta_directions' });
              onNavigateToLocation();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[#D8C7B5] hover:text-white text-sm font-semibold transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#8C5E35]" />
            <span>Visit Café</span>
          </button>
        </div>
      </div>
    </section>
  );
};
