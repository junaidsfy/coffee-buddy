import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Filter, X, ShoppingBag, Coffee, ArrowRight, Check } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { MenuItem, MenuCategory } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { PostMenuOrderCTA } from './PostMenuOrderCTA';
import { trackEvent } from '../utils/analytics';
import { getAvailablePlatforms, isUrlConfigured } from '../config/ordering';

interface MenuSectionProps {
  onOpenOrderModal: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenOrderModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'vegan'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const platforms = getAvailablePlatforms();
  const hasZomato = isUrlConfigured(platforms.zomato.url);
  const hasSwiggy = isUrlConfigured(platforms.swiggy.url);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Search match
      const searchMatch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary match
      const dietaryMatch =
        dietaryFilter === 'all' || item.dietary === dietaryFilter;

      return categoryMatch && searchMatch && dietaryMatch;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    trackEvent('category_filtered', { category, source: 'menu_section' });
  };

  const handleQuickOrder = (item: MenuItem) => {
    trackEvent('item_quick_order', {
      item_id: item.id,
      item_name: item.name,
      source: 'menu_grid',
    });
    onOpenOrderModal();
  };

  const handlePlatformDirectOrder = (platform: 'zomato' | 'swiggy', item: MenuItem) => {
    trackEvent(platform === 'zomato' ? 'zomato_clicked' : 'swiggy_clicked', {
      item_id: item.id,
      item_name: item.name,
      platform,
      source: 'item_detail_modal',
    });
    const url = platform === 'zomato' ? platforms.zomato.url : platforms.swiggy.url;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EFE7DD] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE7DD] text-[#8C5E35] text-xs font-bold uppercase tracking-wider mb-3">
            <Coffee className="w-3.5 h-3.5" />
            Artisanal Selection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#231B15] tracking-tight">
            Our Full Café Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E5D4F]">
            From morning pour-overs to gourmet sandwiches and decadent desserts, every recipe is crafted to delight.
          </p>
        </div>

        {/* Search & Dietary Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 sm:p-4 rounded-2xl border border-[#E9DFD3] shadow-sm">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#8C5E35] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, bites, matcha..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E9DFD3] text-sm text-[#231B15] placeholder-[#9E8E80] focus:outline-none focus:ring-2 focus:ring-[#8C5E35]/30 focus:border-[#8C5E35]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E8E80] hover:text-[#231B15]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-[#7A6A5E] whitespace-nowrap pl-1">
              Dietary:
            </span>
            <button
              type="button"
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                dietaryFilter === 'all'
                  ? 'bg-[#2A1F18] text-white'
                  : 'bg-[#FAF7F2] text-[#6E5D4F] hover:bg-[#EFE7DD]'
              }`}
            >
              All Items
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                dietaryFilter === 'veg'
                  ? 'bg-[#2A1F18] text-white'
                  : 'bg-[#FAF7F2] text-[#6E5D4F] hover:bg-[#EFE7DD]'
              }`}
            >
              Vegetarian
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter('vegan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                dietaryFilter === 'vegan'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#FAF7F2] text-[#6E5D4F] hover:bg-[#EFE7DD]'
              }`}
            >
              100% Vegan
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-[#2A1F18] text-white ring-2 ring-[#2A1F18] ring-offset-2 ring-offset-[#FAF7F2]'
                    : 'bg-white text-[#5D4E42] border border-[#E9DFD3] hover:bg-[#F4ECE2] hover:border-[#C4A88E]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onQuickOrder={handleQuickOrder}
                onSelect={(selected) => setSelectedItem(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E9DFD3] max-w-md mx-auto my-8">
            <Coffee className="w-10 h-10 text-[#8C5E35] mx-auto mb-3 opacity-60" />
            <h3 className="font-bold text-lg text-[#231B15]">No items found</h3>
            <p className="text-xs sm:text-sm text-[#6E5D4F] mt-1">
              Try adjusting your search query or selected dietary filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#2A1F18] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Post-Menu Order CTA Banner (Requirement #9) */}
        <PostMenuOrderCTA onOpenOrderModal={onOpenOrderModal} />

      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-[#140F0C]/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#E9DFD3] z-10 max-h-[90vh] flex flex-col"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] bg-[#EFE7DD] overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-[#140F0C]/60 text-white hover:bg-[#140F0C] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 rounded-lg bg-white/95 text-[#231B15] font-extrabold text-sm sm:text-base shadow-sm">
                    ₹{selectedItem.price}
                  </span>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-6 overflow-y-auto space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C5E35] font-bold uppercase tracking-wider mb-1">
                    <span>{selectedItem.category}</span>
                    {selectedItem.servingSize && <span>Serving: {selectedItem.servingSize}</span>}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#231B15]">
                    {selectedItem.name}
                  </h3>
                  <p className="text-sm text-[#5D4E42] mt-2 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {selectedItem.customization && (
                  <div className="pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E35] block mb-2">
                      Popular Customizations (Available via Delivery App)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.customization.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-[#E9DFD3] text-xs text-[#4A3D33]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Order on Delivery Platform */}
                <div className="pt-4 border-t border-[#EFE7DD] space-y-2.5">
                  <span className="text-xs font-semibold text-[#6E5D4F] block">
                    Order this item directly on your preferred app:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {hasZomato && (
                      <button
                        type="button"
                        onClick={() => handlePlatformDirectOrder('zomato', selectedItem)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#E23744] hover:bg-[#c92e3a] text-white font-bold text-xs shadow-sm"
                      >
                        <span>Order on Zomato</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {hasSwiggy && (
                      <button
                        type="button"
                        onClick={() => handlePlatformDirectOrder('swiggy', selectedItem)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#FC8019] hover:bg-[#e47012] text-white font-bold text-xs shadow-sm"
                      >
                        <span>Order on Swiggy</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
