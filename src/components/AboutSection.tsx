import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Wifi, Sparkles, ShoppingBag, Heart, ShieldCheck } from 'lucide-react';
import { CAFE_DATA } from '../data/cafe';

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Story / Editorial Collage */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] max-h-[520px]"
            >
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
                alt="Inside Coffee Buddy café atmosphere"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712]/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif italic text-lg sm:text-xl text-[#F2EAE0]">
                  “Great coffee isn’t just a beverage, it’s the quiet anchor of your day.”
                </p>
                <span className="text-xs uppercase tracking-widest text-[#E8D9C7] font-semibold mt-2 block">
                  — The Coffee Buddys Philosophy
                </span>
              </div>
            </motion.div>

            {/* Small Floating Accent Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 z-20 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-[#E9DFD3] max-w-[220px] sm:max-w-[260px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] text-[#8C5E35] flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 fill-[#8C5E35]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E35] block">
                    Community First
                  </span>
                  <p className="text-xs text-[#52443A] font-medium mt-0.5">
                    Brewing smiles & good moments daily
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Text & Café Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7DD] text-[#8C5E35] text-xs font-bold uppercase tracking-wider">
              <Coffee className="w-3.5 h-3.5" />
              Our Story & Craft
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#231B15] tracking-tight leading-tight">
              A Warm Sanctuary For Real Coffee Lovers
            </h2>

            <p className="text-base sm:text-lg text-[#5D4E42] leading-relaxed">
              {CAFE_DATA.story}
            </p>

            <p className="text-sm sm:text-base text-[#6E5D4F] leading-relaxed">
              Whether you are dropping in for a quick morning flat white, setting up your laptop for a focused afternoon session, or ordering your favorite cold brew through Zomato and Swiggy, we ensure every roast is handled with care and warmth.
            </p>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EFE7DD]">
              {CAFE_DATA.amenities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E9DFD3]/80">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF0E6] text-[#8C5E35] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {iconMap[item.icon] || <Coffee className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#231B15]">{item.title}</h3>
                    <p className="text-xs text-[#6E5D4F] mt-0.5 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
