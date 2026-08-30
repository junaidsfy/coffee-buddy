import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShoppingBag, Flame } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { trackEvent } from '../utils/analytics';

interface FeaturedCoffeeProps {
  onOpenOrderModal: () => void;
  onViewFullMenu: () => void;
  onSelectItem?: (item: MenuItem) => void;
}

export const FeaturedCoffee: React.FC<FeaturedCoffeeProps> = ({
  onOpenOrderModal,
  onViewFullMenu,
  onSelectItem,
}) => {
  // Grab signature & popular items
  const featuredItems = MENU_ITEMS.filter((item) => item.signature || item.popular).slice(0, 4);

  const handleOrderQuick = (item: MenuItem) => {
    trackEvent('item_quick_order', {
      item_id: item.id,
      item_name: item.name,
      source: 'featured_coffee_section',
    });
    onOpenOrderModal();
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F5EFE6] border-b border-[#EBE1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0D3] text-[#8C5E35] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Barista Recommendations
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#231B15] tracking-tight">
              Featured Signatures
            </h2>
            <p className="mt-2 text-[#6E5D4F] text-base sm:text-lg max-w-xl">
              Carefully curated favorites, roasted in small batches and crafted by our skilled baristas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              trackEvent('menu_clicked', { source: 'featured_header_view_all' });
              onViewFullMenu();
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#8C5E35] hover:text-[#5F3C1D] transition-colors group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#E9DFD3] shadow-sm hover:shadow-md hover:border-[#C4A88E] transition-all flex flex-col group"
            >
              {/* Image with Badges */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE7DD]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.signature && (
                    <span className="px-2.5 py-1 rounded-md bg-[#2A1F18]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                      Signature
                    </span>
                  )}
                  {item.popular && (
                    <span className="px-2.5 py-1 rounded-md bg-[#B27038] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[#231B15] text-xs font-extrabold shadow-sm">
                    ₹{item.price}
                  </span>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#8C5E35] font-semibold uppercase tracking-wider mb-1">
                    <span>{item.category}</span>
                    {item.servingSize && <span>{item.servingSize}</span>}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#231B15] group-hover:text-[#8C5E35] transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#6E5D4F] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
                  <span className="text-xs text-[#8A7A6E]">Home delivery ready</span>
                  <button
                    type="button"
                    onClick={() => handleOrderQuick(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A1F18] hover:bg-[#433329] text-white text-xs font-semibold shadow-sm transition-transform active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quick Action */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => {
              trackEvent('menu_clicked', { source: 'featured_bottom_cta' });
              onViewFullMenu();
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#2A1F18] hover:bg-[#3D2E24] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore All 20+ Menu Items</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
