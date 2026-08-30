import React from 'react';
import { Bike, ShoppingBag, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { getAvailablePlatforms, isUrlConfigured } from '../config/ordering';
import { trackEvent } from '../utils/analytics';

interface PostMenuOrderCTAProps {
  onOpenOrderModal: () => void;
}

export const PostMenuOrderCTA: React.FC<PostMenuOrderCTAProps> = ({
  onOpenOrderModal,
}) => {
  const platforms = getAvailablePlatforms();
  const hasZomato = isUrlConfigured(platforms.zomato.url);
  const hasSwiggy = isUrlConfigured(platforms.swiggy.url);

  const handlePlatformClick = (platform: 'zomato' | 'swiggy', url: string) => {
    trackEvent(platform === 'zomato' ? 'zomato_clicked' : 'swiggy_clicked', {
      platform,
      source: 'post_menu_conversion_cta',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-16 bg-[#231B15] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-[#3E3025]">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B27038]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#E23744]/15 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EAD8C7] text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#F5C77E]" />
            Fast Delivery (Avg. 30 Mins)
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#FAF7F2] tracking-tight">
            Craving it already?
          </h3>
          <p className="text-sm sm:text-base text-[#C4B5A5] max-w-md">
            Get your Coffee Buddy favorites delivered steaming hot or refreshingly chilled right to your door.
          </p>
        </div>

        {/* Platform Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {hasZomato && (
            <button
              type="button"
              onClick={() => handlePlatformClick('zomato', platforms.zomato.url)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E23744] hover:bg-[#c92e3a] text-white font-bold text-sm shadow-md transition-transform active:scale-95 whitespace-nowrap"
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-extrabold">
                z
              </span>
              <span>Order on Zomato</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {hasSwiggy && (
            <button
              type="button"
              onClick={() => handlePlatformClick('swiggy', platforms.swiggy.url)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FC8019] hover:bg-[#e47012] text-white font-bold text-sm shadow-md transition-transform active:scale-95 whitespace-nowrap"
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-extrabold">
                s
              </span>
              <span>Order on Swiggy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {!hasZomato && !hasSwiggy && (
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B27038] hover:bg-[#9B5F2D] text-white font-bold text-sm shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Online</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
