import React from 'react';
import { Coffee, Bike, MapPin } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface MobileActionBarProps {
  onOpenMenuAction: () => void;
  onOpenOrderModal: () => void;
  onNavigateToLocation: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onOpenMenuAction,
  onOpenOrderModal,
  onNavigateToLocation,
}) => {
  const handleMenuClick = () => {
    trackEvent('menu_clicked', { source: 'mobile_sticky_bar' });
    onOpenMenuAction();
  };

  const handleOrderClick = () => {
    trackEvent('order_online_clicked', { source: 'mobile_sticky_bar' });
    onOpenOrderModal();
  };

  const handleDirectionsClick = () => {
    trackEvent('directions_clicked', { source: 'mobile_sticky_bar' });
    onNavigateToLocation();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden p-3 pb-safe bg-white/95 backdrop-blur-md border-t border-[#EFE7DD] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Menu */}
        <button
          type="button"
          onClick={handleMenuClick}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAF7F2] text-[#2C211A] hover:bg-[#F2EAE0] active:scale-95 transition-all text-xs font-semibold"
        >
          <Coffee className="w-5 h-5 text-[#8C5E35] mb-1" />
          <span>Menu</span>
        </button>

        {/* Primary Order Button */}
        <button
          type="button"
          onClick={handleOrderClick}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#2A1F18] text-[#FAF7F2] active:scale-95 transition-all text-xs font-bold shadow-md relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          <Bike className="w-5 h-5 text-[#E4A86F] mb-1 relative z-10" />
          <span className="relative z-10">Order Online</span>
        </button>

        {/* Directions */}
        <button
          type="button"
          onClick={handleDirectionsClick}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAF7F2] text-[#2C211A] hover:bg-[#F2EAE0] active:scale-95 transition-all text-xs font-semibold"
        >
          <MapPin className="w-5 h-5 text-[#8C5E35] mb-1" />
          <span>Directions</span>
        </button>
      </div>
    </div>
  );
};
