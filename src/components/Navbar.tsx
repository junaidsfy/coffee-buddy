import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  ChevronRight,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { CAFE_DATA } from '../data/cafe';
import { trackEvent } from '../utils/analytics';
import { OrderButton } from './OrderButton';

interface NavbarProps {
  onOpenMenuAction: () => void;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMenuAction,
  onOpenOrderModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', type: 'link' },
    { name: 'Menu', href: '#menu', type: 'menu_action' },
    { name: 'About', href: '#about', type: 'link' },
    { name: 'Gallery', href: '#gallery', type: 'link' },
    { name: 'Location', href: '#location', type: 'link' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, type: string, href: string) => {
    if (type === 'menu_action') {
      e.preventDefault();
      trackEvent('menu_clicked', { source: 'navbar_menu_btn' });
      setMobileMenuOpen(false);
      onOpenMenuAction();
    } else {
      setMobileMenuOpen(false);
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleInstagramClick = () => {
    trackEvent('instagram_clicked', { source: 'navbar' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#EFE7DD] py-3'
            : 'bg-gradient-to-b from-[#140F0C]/80 via-[#140F0C]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
              isScrolled 
                ? 'bg-[#2A1F18] text-[#FAF7F2]' 
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/20'
            }`}>
              <Coffee className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight block leading-tight ${
                isScrolled ? 'text-[#231B15]' : 'text-white drop-shadow-sm'
              }`}>
                Coffee Buddy
              </span>
              <span className={`text-[10px] sm:text-xs uppercase tracking-widest block font-medium ${
                isScrolled ? 'text-[#8C5E35]' : 'text-[#E8D9C7] drop-shadow-sm'
              }`}>
                Specialty Café
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.type, link.href)}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isScrolled
                    ? 'text-[#4A3D33] hover:text-[#8C5E35]'
                    : 'text-white/90 hover:text-white drop-shadow-sm'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Social Link: Instagram */}
            <a
              href={CAFE_DATA.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInstagramClick}
              title="Follow Coffee Buddy on Instagram"
              className={`p-2 rounded-xl transition-all ${
                isScrolled
                  ? 'text-[#4A3D33] hover:text-[#E1306C] hover:bg-[#EFE7DD]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Menu Trigger Button */}
            <button
              type="button"
              onClick={() => {
                trackEvent('menu_clicked', { source: 'navbar_desktop_view_menu' });
                onOpenMenuAction();
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                isScrolled
                  ? 'border-[#D9C8B6] text-[#2C211A] hover:bg-[#F0E6D8]'
                  : 'border-white/30 text-white hover:bg-white/15 backdrop-blur-sm'
              }`}
            >
              View Menu
            </button>

            {/* Primary Order Button */}
            <OrderButton
              onClick={onOpenOrderModal}
              variant={isScrolled ? 'primary' : 'accent'}
              source="navbar_desktop"
              className="py-2 px-4.5 text-sm"
            >
              Order Online
            </OrderButton>
          </div>

          {/* Mobile Right CTA & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => {
                trackEvent('order_online_clicked', { source: 'navbar_mobile_header_btn' });
                onOpenOrderModal();
              }}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-[#E23744] text-white text-xs font-bold shadow-sm"
            >
              Order
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`p-2 rounded-xl transition-colors ${
                isScrolled
                  ? 'text-[#231B15] hover:bg-[#EFE7DD]'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#FAF7F2] shadow-2xl z-50 flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#EFE7DD]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1F18] text-white flex items-center justify-center">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <span className="font-serif font-bold text-lg text-[#231B15]">Coffee Buddy</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-[#7A6A5E] hover:bg-[#EFE7DD]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.type, link.href)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold text-[#2C211A] hover:bg-[#EFE7DD] active:bg-[#E4D7C8] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#8C5E35]" />
                  </a>
                ))}
              </div>

              {/* Order Actions */}
              <div className="pt-4 pb-6 space-y-3 border-t border-[#EFE7DD]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrderModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#2A1F18] text-[#FAF7F2] font-bold py-3 px-4 rounded-xl shadow-md text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order on Zomato & Swiggy</span>
                </button>

                <a
                  href={CAFE_DATA.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleInstagramClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#FAF0E6] text-[#8C5E35] hover:bg-[#F3E5D6] font-semibold py-3 px-4 rounded-xl text-sm border border-[#E8D7C4]"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Follow @coffeebuddy2026</span>
                </a>
              </div>

              {/* Quick Hours & Contact */}
              <div className="mt-auto pt-6 border-t border-[#EFE7DD] text-xs text-[#7A6A5E] space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8C5E35]" />
                  <span className="truncate">{CAFE_DATA.address.area}, {CAFE_DATA.address.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8C5E35]" />
                  <span>{CAFE_DATA.phoneDisplay}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
