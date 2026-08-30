import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coffee, Bike, ArrowRight, Sparkles } from 'lucide-react';
import { getAvailablePlatforms, isUrlConfigured } from '../config/ordering';
import { trackEvent } from '../utils/analytics';

interface MenuActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFullMenu: () => void;
}

export const MenuActionModal: React.FC<MenuActionModalProps> = ({
  isOpen,
  onClose,
  onViewFullMenu,
}) => {
  const platforms = getAvailablePlatforms();
  const hasZomato = isUrlConfigured(platforms.zomato.url);
  const hasSwiggy = isUrlConfigured(platforms.swiggy.url);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleViewMenuClick = () => {
    trackEvent('menu_clicked', { source: 'menu_choice_modal' });
    onClose();
    onViewFullMenu();
  };

  const handleOrderClick = (platform: 'zomato' | 'swiggy', url: string) => {
    trackEvent(platform === 'zomato' ? 'zomato_clicked' : 'swiggy_clicked', {
      platform,
      source: 'menu_choice_modal',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#140F0C]/70 backdrop-blur-sm"
          />

          {/* Modal / Sheet Container */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E9DFD3] overflow-hidden z-10 max-h-[92vh] flex flex-col"
          >
            {/* Mobile Sheet Indicator */}
            <div className="flex sm:hidden justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-[#D5C6B7] rounded-full" />
            </div>

            {/* Header */}
            <div className="p-6 sm:p-7 pb-4 flex items-start justify-between border-b border-[#EFE7DD]">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EFE7DD] text-[#8C5E35] text-xs font-semibold tracking-wider uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Coffee Buddys Experience
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#231B15] tracking-tight">
                  What would you like to do?
                </h2>
                <p className="text-[#6E5D4F] text-sm sm:text-base mt-1">
                  Browse in-café favorites or order directly to your door.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-full text-[#7A6A5E] hover:text-[#231B15] hover:bg-[#EFE7DD] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8C5E35]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selection Cards */}
            <div className="p-6 sm:p-7 space-y-4 overflow-y-auto">
              {/* Option A: View Menu */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E9DFD3] shadow-sm hover:border-[#C4A88E] transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F6EDE2] text-[#8C5E35] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#231B15] flex items-center gap-2">
                        View Menu
                      </h3>
                      <p className="text-sm text-[#6E5D4F] mt-1">
                        Explore our coffee, beverages, fresh bakery, and food.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleViewMenuClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2C211A] hover:bg-[#433329] text-[#FAF7F2] font-semibold text-sm transition-transform active:scale-95 shadow-sm"
                  >
                    <span>View Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Option B: Order Online */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E9DFD3] shadow-sm hover:border-[#C4A88E] transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF0E6] text-[#FC8019] flex items-center justify-center flex-shrink-0">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#231B15]">
                      Order Online
                    </h3>
                    <p className="text-sm text-[#6E5D4F] mt-1">
                      Get Coffee Buddy delivered fresh to your door.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Zomato Button */}
                  {hasZomato && (
                    <button
                      type="button"
                      onClick={() => handleOrderClick('zomato', platforms.zomato.url)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#E23744] hover:bg-[#cf2f3c] text-white font-semibold text-sm transition-transform active:scale-95 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                          z
                        </span>
                        <span>Order on Zomato</span>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-80" />
                    </button>
                  )}

                  {/* Swiggy Button */}
                  {hasSwiggy && (
                    <button
                      type="button"
                      onClick={() => handleOrderClick('swiggy', platforms.swiggy.url)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#FC8019] hover:bg-[#e47012] text-white font-semibold text-sm transition-transform active:scale-95 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                          s
                        </span>
                        <span>Order on Swiggy</span>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-80" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
