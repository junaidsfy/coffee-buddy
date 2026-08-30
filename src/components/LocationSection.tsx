import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2 
} from 'lucide-react';
import { CAFE_DATA } from '../data/cafe';
import { trackEvent } from '../utils/analytics';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleDirectionsClick = () => {
    trackEvent('directions_clicked', { source: 'location_section_primary' });
    window.open(CAFE_DATA.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    trackEvent('phone_clicked', { source: 'location_section' });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CAFE_DATA.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EFE7DD] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7DD] text-[#8C5E35] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Visit Our Café
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#231B15] tracking-tight">
            Find Us & Drop By
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E5D4F]">
            Step into our warm, aromatic space for fresh roasts, wholesome food, and good conversations.
          </p>
        </div>

        {/* Location Grid: Details Card & Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFD3] shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Address */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E35] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Café Location
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 text-xs text-[#8A7A6E] hover:text-[#231B15] transition-colors"
                    title="Copy full address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-base sm:text-lg font-semibold text-[#231B15] leading-snug">
                  {CAFE_DATA.address.line1}
                </p>
                <p className="text-xs sm:text-sm text-[#6E5D4F]">
                  {CAFE_DATA.address.line2}, {CAFE_DATA.address.city} {CAFE_DATA.address.pincode}
                </p>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-[#F2ECE3] space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E35] flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Opening Hours
                </span>
                <div className="space-y-2 text-xs sm:text-sm">
                  {CAFE_DATA.hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-[#FAF7F2] last:border-0">
                      <span className="font-medium text-[#2C211A]">{h.days}</span>
                      <span className="text-[#8C5E35] font-bold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-[#F2ECE3] space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E35] flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  Call & Inquiries
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${CAFE_DATA.phone}`}
                    onClick={handlePhoneClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2C211A] hover:text-[#8C5E35] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#8C5E35]" />
                    <span>{CAFE_DATA.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Primary Action Button: Get Directions */}
            <div className="pt-4 border-t border-[#F2ECE3] space-y-3">
              <button
                type="button"
                onClick={handleDirectionsClick}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#2A1F18] hover:bg-[#3D2E24] text-white font-bold text-sm sm:text-base shadow-lg transition-transform active:scale-95"
              >
                <Navigation className="w-5 h-5 text-[#F5C77E]" />
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
              </button>
              <p className="text-center text-[11px] text-[#8A7A6E]">
                Opens in Google Maps for live navigation & traffic
              </p>
            </div>

          </div>

          {/* Google Maps Interactive Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#EFE7DD] rounded-3xl overflow-hidden shadow-sm border border-[#E9DFD3] min-h-[380px] lg:min-h-full relative flex flex-col">
            {CAFE_DATA.googleMapsEmbedUrl ? (
              <iframe
                title="Coffee Buddy Location on Google Maps"
                src={CAFE_DATA.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full flex-1"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F2]">
                <MapPin className="w-12 h-12 text-[#8C5E35] mb-3" />
                <h3 className="font-bold text-lg text-[#231B15]">Coffee Buddy Café</h3>
                <p className="text-sm text-[#6E5D4F] max-w-sm mt-1 mb-4">
                  {CAFE_DATA.address.full}
                </p>
                <button
                  type="button"
                  onClick={handleDirectionsClick}
                  className="px-6 py-3 rounded-xl bg-[#2A1F18] text-white font-semibold text-sm"
                >
                  Open in Google Maps
                </button>
              </div>
            )}

            {/* Quick Map floating badge */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-[#E9DFD3] text-xs font-semibold text-[#231B15] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open Now • Dine-in & Takeaway</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
