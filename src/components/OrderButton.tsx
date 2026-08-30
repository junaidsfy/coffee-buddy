import React from 'react';
import { Bike, ShoppingBag, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface OrderButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'compact' | 'pill';
  className?: string;
  source?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export const OrderButton: React.FC<OrderButtonProps> = ({
  onClick,
  variant = 'primary',
  className = '',
  source = 'button',
  children,
  showIcon = true,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent('order_online_clicked', { source });
    onClick();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] shadow-md hover:shadow-lg';
      case 'accent':
        return 'bg-[#B27038] hover:bg-[#9B5F2D] text-white shadow-md hover:shadow-lg';
      case 'secondary':
        return 'bg-[#FAF7F2] text-[#2A1F18] border border-[#D8C7B5] hover:bg-[#F2EAE0]';
      case 'pill':
        return 'bg-[#E23744] hover:bg-[#c92e3a] text-white shadow-sm';
      case 'compact':
        return 'bg-[#2A1F18] hover:bg-[#3D2E24] text-white text-xs px-3 py-1.5 rounded-lg';
      default:
        return 'bg-[#2A1F18] text-white';
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8C5E35] focus:ring-offset-2 ${getVariantStyles()} ${
        variant !== 'compact' ? 'px-5 py-2.5 rounded-xl text-sm sm:text-base' : ''
      } ${className}`}
    >
      {showIcon && (variant === 'pill' ? <Bike className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />)}
      <span>{children || 'Order Online'}</span>
    </button>
  );
};
