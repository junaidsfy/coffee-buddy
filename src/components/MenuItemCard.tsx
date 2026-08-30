import React from 'react';
import { Sparkles, Flame, ShoppingBag, Leaf, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onQuickOrder: (item: MenuItem) => void;
  onSelect: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onQuickOrder,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-white rounded-2xl overflow-hidden border border-[#E9DFD3] hover:border-[#C4A88E] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Image Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F2EAE0]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges & Tags */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {item.signature && (
            <span className="px-2 py-0.5 rounded-md bg-[#2A1F18]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#F5C77E]" />
              Signature
            </span>
          )}
          {item.popular && (
            <span className="px-2 py-0.5 rounded-md bg-[#B27038] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Flame className="w-2.5 h-2.5" />
              Popular
            </span>
          )}
          {item.dietary === 'vegan' && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Leaf className="w-2.5 h-2.5" />
              Vegan
            </span>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[#231B15] font-extrabold text-xs sm:text-sm shadow-sm">
            ₹{item.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#8C5E35] font-bold uppercase tracking-wider mb-1">
            <span>{item.category}</span>
            {item.servingSize && <span className="text-[#8A7A6E]">{item.servingSize}</span>}
          </div>

          <h3 className="font-serif font-bold text-base sm:text-lg text-[#231B15] group-hover:text-[#8C5E35] transition-colors line-clamp-1">
            {item.name}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-[#6E5D4F] line-clamp-2 leading-relaxed font-light">
            {item.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
          <span className="text-[11px] text-[#8A7A6E] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available today
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickOrder(item);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF0E6] hover:bg-[#2A1F18] text-[#8C5E35] hover:text-white text-xs font-bold transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
