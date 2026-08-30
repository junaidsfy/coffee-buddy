import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle, Play, ExternalLink, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';
import { CAFE_DATA } from '../data/cafe';
import { LightboxModal } from './LightboxModal';
import { trackEvent } from '../utils/analytics';

export const InstagramGallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const handleItemClick = (item: GalleryItem) => {
    trackEvent('gallery_opened', {
      item_id: item.id,
      tag: item.tag,
      type: item.type,
    });
    setActiveItem(item);
  };

  const handleFollowClick = () => {
    trackEvent('instagram_clicked', { source: 'gallery_follow_button' });
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EBE1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D3] text-[#8C5E35] text-xs font-bold uppercase tracking-wider mb-3">
            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
            Instagram Feed & Moments
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#231B15] tracking-tight">
            Follow the Coffee Buddys Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E5D4F]">
            From artisan latte art to cozy café corners and daily roasts. Tag us <span className="font-semibold text-[#8C5E35]">@coffeebuddy2026</span> to be featured!
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href={CAFE_DATA.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFollowClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white font-bold text-sm shadow-md hover:shadow-lg transition-transform active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @coffeebuddy2026</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Gallery Grid (3-4 columns desktop, 2 columns mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => handleItemClick(item)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#FAF7F2] border border-[#E8DED1] shadow-sm hover:shadow-md transition-all duration-300 aspect-square sm:aspect-[4/5]"
            >
              {/* Media Image */}
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Reel Badge if video */}
              {item.type === 'reel' && (
                <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm text-white flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
              )}

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-[#140F0C]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white z-10">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#FAF7F2]" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8D9C7] block mb-1">
                    #{item.tag}
                  </span>
                  <p className="text-xs text-[#FAF7F2] line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                  
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] text-[#E8D9C7] font-semibold">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-[#E1306C] fill-[#E1306C]" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {item.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Instagram Link CTA */}
        <div className="mt-12 text-center">
          <a
            href={CAFE_DATA.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFollowClick}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#8C5E35] hover:text-[#4A2E16] transition-colors"
          >
            <span>See more daily stories on Instagram</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
};
