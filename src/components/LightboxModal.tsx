import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Instagram, Heart, MessageCircle, ExternalLink, Play } from 'lucide-react';
import { GalleryItem } from '../types';
import { CAFE_DATA } from '../data/cafe';
import { trackEvent } from '../utils/analytics';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  const handleOpenInstagram = () => {
    trackEvent('instagram_clicked', {
      source: 'lightbox_post_link',
      item_id: item.id,
    });
    window.open(item.postUrl || CAFE_DATA.socials.instagram, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0E0A08]/85 backdrop-blur-md"
        />

        {/* Content Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#E9DFD3] z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#140F0C]/70 text-white hover:bg-[#140F0C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Media View (Left / Top) */}
          <div className="md:col-span-7 bg-[#140F0C] relative flex items-center justify-center min-h-[280px] md:min-h-[480px]">
            <img
              src={item.image}
              alt={item.caption}
              className="max-h-[85vh] w-full object-contain"
            />
            {item.type === 'reel' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-xl">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
              </div>
            )}
          </div>

          {/* Social Details (Right / Bottom) */}
          <div className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto bg-white">
            <div>
              {/* Profile Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-[#F2ECE3]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] p-0.5">
                  <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center font-bold text-xs text-[#2A1F18]">
                    CB
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#231B15] flex items-center gap-1.5">
                    <span>coffeebuddy2026</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C]" />
                  </h4>
                  <span className="text-[11px] text-[#8C5E35]">Coffee Buddys Café</span>
                </div>
              </div>

              {/* Tag & Caption */}
              <div className="py-4 space-y-3">
                {item.tag && (
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#FAF0E6] text-[#8C5E35] text-xs font-bold uppercase tracking-wider">
                    #{item.tag}
                  </span>
                )}
                <p className="text-sm text-[#42352B] leading-relaxed whitespace-pre-line font-light">
                  {item.caption}
                </p>
              </div>
            </div>

            {/* Actions & Link */}
            <div className="pt-4 border-t border-[#F2ECE3] space-y-4">
              <div className="flex items-center justify-between text-xs text-[#7A6A5E]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-semibold text-[#231B15]">
                    <Heart className="w-4 h-4 text-[#E1306C] fill-[#E1306C]" />
                    {item.likes || 420} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-[#8C5E35]" />
                    {item.comments || 32} comments
                  </span>
                </div>
                <span className="text-[11px] text-[#A6988D]">Instagram Post</span>
              </div>

              <button
                type="button"
                onClick={handleOpenInstagram}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
              >
                <Instagram className="w-4 h-4" />
                <span>View on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
