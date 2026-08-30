import React from 'react';
import { 
  Coffee, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Clock, 
  ArrowRight, 
  ShoppingBag,
  Bike
} from 'lucide-react';
import { CAFE_DATA } from '../data/cafe';
import { getAvailablePlatforms, isUrlConfigured } from '../config/ordering';
import { trackEvent } from '../utils/analytics';

interface FooterProps {
  onOpenMenuAction: () => void;
  onOpenOrderModal: () => void;
  onNavigateToLocation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMenuAction,
  onOpenOrderModal,
  onNavigateToLocation,
}) => {
  const platforms = getAvailablePlatforms();
  const hasZomato = isUrlConfigured(platforms.zomato.url);
  const hasSwiggy = isUrlConfigured(platforms.swiggy.url);

  const handleInstagramClick = () => {
    trackEvent('instagram_clicked', { source: 'footer_social' });
  };

  const handleYoutubeClick = () => {
    trackEvent('youtube_clicked', { source: 'footer_social' });
  };

  const handlePlatformClick = (platform: 'zomato' | 'swiggy', url: string) => {
    trackEvent(platform === 'zomato' ? 'zomato_clicked' : 'swiggy_clicked', {
      platform,
      source: 'footer_links',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#120D0A] text-[#BDB0A4] pt-16 sm:pt-20 pb-28 sm:pb-16 border-t border-[#2A1F18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#241A14]">
          
          {/* Brand Info & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#2A1F18] border border-white/10 flex items-center justify-center text-[#FAF7F2]">
                <Coffee className="w-5 h-5 text-[#F5C77E]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight block">
                  Coffee Buddy
                </span>
                <span className="text-xs uppercase tracking-widest text-[#8C5E35] font-semibold">
                  Specialty Café & Roastery
                </span>
              </div>
            </div>

            <p className="text-sm text-[#9E8E80] leading-relaxed max-w-sm">
              {CAFE_DATA.tagline}. Handcrafted artisanal brews, fresh daily bakery items, and good vibes.
            </p>

            {/* Social Channels Area */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8D9C7] block">
                Follow Coffee Buddy
              </span>
              <div className="flex items-center gap-3">
                {/* Official Instagram */}
                <a
                  href={CAFE_DATA.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleInstagramClick}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#201712] hover:bg-[#E1306C] text-white text-xs font-semibold border border-white/5 transition-all group"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C] group-hover:text-white transition-colors" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {/* Official YouTube */}
                <a
                  href={CAFE_DATA.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleYoutubeClick}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#201712] hover:bg-[#CC0000] text-white text-xs font-semibold border border-white/5 transition-all group"
                >
                  <Youtube className="w-4 h-4 text-[#CC0000] group-hover:text-white transition-colors" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Menu Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8D9C7] block">
              Menu Categories
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenMenuAction}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Specialty Coffee</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMenuAction}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Nitro Cold Brews</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMenuAction}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Gourmet Sourdough & Food</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMenuAction}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Desserts & Bakes</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMenuAction}
                  className="text-[#F5C77E] font-semibold hover:underline flex items-center gap-1 mt-2"
                >
                  <span>View Full Menu</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Order Online Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8D9C7] block">
              Order Online
            </span>
            <p className="text-xs text-[#9E8E80]">
              Fast doorstep delivery across the city.
            </p>

            <div className="space-y-2.5">
              {hasZomato && (
                <button
                  type="button"
                  onClick={() => handlePlatformClick('zomato', platforms.zomato.url)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#201712] hover:bg-[#E23744] text-white text-xs font-semibold border border-white/5 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#E23744] group-hover:bg-white text-white group-hover:text-[#E23744] flex items-center justify-center text-[10px] font-bold">
                      z
                    </span>
                    <span>Order on Zomato</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>
              )}

              {hasSwiggy && (
                <button
                  type="button"
                  onClick={() => handlePlatformClick('swiggy', platforms.swiggy.url)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#201712] hover:bg-[#FC8019] text-white text-xs font-semibold border border-white/5 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#FC8019] group-hover:bg-white text-white group-hover:text-[#FC8019] flex items-center justify-center text-[10px] font-bold">
                      s
                    </span>
                    <span>Order on Swiggy</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>
              )}

              <button
                type="button"
                onClick={onOpenOrderModal}
                className="w-full text-center py-2 text-xs text-[#C4B5A5] hover:text-white transition-colors"
              >
                Choose Delivery Partner →
              </button>
            </div>
          </div>

          {/* Visit Us Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8D9C7] block">
              Visit Us
            </span>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-[#C4B5A5]">
                <MapPin className="w-4 h-4 text-[#F5C77E] flex-shrink-0 mt-0.5" />
                <span>{CAFE_DATA.address.full}</span>
              </div>

              <div className="flex items-center gap-2.5 text-[#C4B5A5]">
                <Clock className="w-4 h-4 text-[#F5C77E] flex-shrink-0" />
                <span>Mon–Sun: 8:00 AM – 11:30 PM</span>
              </div>

              <div className="flex items-center gap-2.5 text-[#C4B5A5]">
                <Phone className="w-4 h-4 text-[#F5C77E] flex-shrink-0" />
                <span>{CAFE_DATA.phoneDisplay}</span>
              </div>

              <button
                type="button"
                onClick={onNavigateToLocation}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2A1F18] text-[#FAF7F2] hover:bg-[#3D2E24] font-semibold text-xs transition-colors"
              >
                <span>Get Directions</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & SEO Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6A5E]">
          <p>© {new Date().getFullYear()} Coffee Buddy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-white transition-colors">Back to Top ↑</a>
            <span>•</span>
            <a
              href={CAFE_DATA.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition-colors"
            >
              @coffeebuddy2026
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
