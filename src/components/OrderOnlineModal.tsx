import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, MapPin, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { getAvailablePlatforms, isUrlConfigured } from '../config/ordering';
import { CAFE_DATA } from '../data/cafe';
import { trackEvent } from '../utils/analytics';

interface OrderOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLocation?: () => void;
}

export const OrderOnlineModal: React.FC<OrderOnlineModalProps> = ({
  isOpen,
  onClose,
  onNavigateToLocation,
}) => {
  const platforms = getAvailablePlatforms();
  const hasZomato = isUrlConfigured(platforms.zomato.url);
  const hasSwiggy = isUrlConfigured(platforms.swiggy.url);
  const hasAnyPlatform = hasZomato || hasSwiggy;

  // Lock body scroll when modal is open
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

  const handlePlatformClick = (platform: 'zomato' | 'swiggy', url: string) => {
    trackEvent(platform === 'zomato' ? 'zomato_clicked' : 'swiggy_clicked', {
      platform,
      url,
      source: 'order_online_modal',
    });
    // Open in new tab securely
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectionsClick = () => {
    trackEvent('directions_clicked', { source: 'order_modal_fallback' });
    onClose();
    if (onNavigateToLocation) {
      onNavigateToLocation();
    } else {
      const el = document.getElementById('location');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#140F0C]/70 backdrop-blur-sm"
          />

          {/* Modal / Bottom Sheet Box */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E9DFD3] overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Mobile Sheet Drag Handle */}
            <div className="flex sm:hidden justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-[#D5C6B7] rounded-full" />
            </div>

            {/* Header */}
            <div className="p-6 sm:p-7 pb-4 flex items-start justify-between border-b border-[#EFE7DD]">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EFE7DD] text-[#8C5E35] text-xs font-semibold tracking-wider uppercase mb-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Instant Doorstep Delivery
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#231B15] tracking-tight">
                  Order Coffee Buddy
                </h2>
                <p className="text-[#6E5D4F] text-sm sm:text-base mt-1">
                  Choose your preferred delivery platform.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 rounded-full text-[#7A6A5E] hover:text-[#231B15] hover:bg-[#EFE7DD] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8C5E35]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-7 space-y-4 overflow-y-auto">
              {hasAnyPlatform ? (
                <div className="space-y-3.5">
                  {/* Zomato Platform Card */}
                  {hasZomato && (
                    <div className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#E9DFD3] shadow-sm hover:border-[#E23744]/40 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-[#E23744] flex items-center justify-center text-white shadow-sm flex-shrink-0 font-bold text-lg tracking-wider">
                            z
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-[#1F1712]">ZOMATO</h3>
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#E23744] rounded-md">
                                Live
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#7A6A5E] mt-0.5">
                              Order through Zomato with live tracking
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handlePlatformClick('zomato', platforms.zomato.url)}
                          className="flex items-center gap-2 bg-[#E23744] hover:bg-[#c92e3a] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-transform active:scale-95 shadow-sm whitespace-nowrap"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Swiggy Platform Card */}
                  {hasSwiggy && (
                    <div className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#E9DFD3] shadow-sm hover:border-[#FC8019]/40 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-[#FC8019] flex items-center justify-center text-white shadow-sm flex-shrink-0 font-bold text-xl">
                            s
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-[#1F1712]">SWIGGY</h3>
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#FC8019] rounded-md">
                                Fast
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#7A6A5E] mt-0.5">
                              Order through Swiggy to your doorstep
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handlePlatformClick('swiggy', platforms.swiggy.url)}
                          className="flex items-center gap-2 bg-[#FC8019] hover:bg-[#e47012] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-transform active:scale-95 shadow-sm whitespace-nowrap"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback when neither platform URL is configured */
                <div className="bg-white rounded-2xl p-6 border border-[#E9DFD3] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FAF0E6] text-[#8C5E35] flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#231B15]">
                    Online ordering is coming soon.
                  </h3>
                  <p className="text-sm text-[#6E5D4F] max-w-sm mx-auto">
                    We are putting the final touches on our delivery channels. In the meantime, we would love to welcome you at our café!
                  </p>
                </div>
              )}

              {/* Visit Cafe Prompt */}
              <div className="pt-2 border-t border-[#EFE7DD] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                <div className="text-center sm:text-left text-[#6E5D4F]">
                  <span className="font-medium text-[#231B15]">Prefer to visit us?</span>
                  <p className="text-xs text-[#8A7A6E]">Enjoy the aroma & freshly pulled espresso in person</p>
                </div>
                <button
                  type="button"
                  onClick={handleDirectionsClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#EFE7DD] hover:bg-[#E4D7C8] text-[#2C211A] font-semibold text-xs sm:text-sm transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#8C5E35]" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>

            {/* Note & Security Badge */}
            <div className="bg-[#F2EAE0] px-6 py-3 text-center text-[11px] text-[#7A6A5E] border-t border-[#E8DED1]">
              Orders are placed securely directly on Zomato & Swiggy.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
