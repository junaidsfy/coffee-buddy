import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCoffee } from './components/FeaturedCoffee';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { InstagramGallery } from './components/InstagramGallery';
import { YouTubeSection } from './components/YouTubeSection';
import { LocationSection } from './components/LocationSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { MenuActionModal } from './components/MenuActionModal';
import { OrderOnlineModal } from './components/OrderOnlineModal';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [isMenuActionModalOpen, setIsMenuActionModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOpenMenuAction = () => {
    setIsMenuActionModalOpen(true);
  };

  const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleScrollToMenu = () => {
    setIsMenuActionModalOpen(false);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToLocation = () => {
    const locEl = document.getElementById('location');
    if (locEl) {
      locEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#28201A] font-sans antialiased selection:bg-[#E4D5C7] selection:text-[#1F1712]">
      {/* Top Navigation */}
      <Navbar
        onOpenMenuAction={handleOpenMenuAction}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero
          onOpenMenuAction={handleOpenMenuAction}
          onOpenOrderModal={handleOpenOrderModal}
          onNavigateToLocation={handleScrollToLocation}
        />

        {/* 2. Featured Coffee & Barista Signatures */}
        <FeaturedCoffee
          onOpenOrderModal={handleOpenOrderModal}
          onViewFullMenu={handleScrollToMenu}
        />

        {/* 3. Story & Café Craft */}
        <AboutSection />

        {/* 4. Full Categorized Menu with Post-Menu CTA */}
        <MenuSection onOpenOrderModal={handleOpenOrderModal} />

        {/* 5. Instagram Feed & Visual Social Gallery */}
        <InstagramGallery />

        {/* 6. YouTube Video Previews */}
        <YouTubeSection />

        {/* 7. Location, Google Maps & Directions */}
        <LocationSection />

        {/* 8. Final Conversion CTA */}
        <FinalCTA
          onOpenMenuAction={handleOpenMenuAction}
          onOpenOrderModal={handleOpenOrderModal}
          onNavigateToLocation={handleScrollToLocation}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenMenuAction={handleOpenMenuAction}
        onOpenOrderModal={handleOpenOrderModal}
        onNavigateToLocation={handleScrollToLocation}
      />

      {/* Sticky Bottom Action Bar for Mobile */}
      <MobileActionBar
        onOpenMenuAction={handleOpenMenuAction}
        onOpenOrderModal={handleOpenOrderModal}
        onNavigateToLocation={handleScrollToLocation}
      />

      {/* Interactive Modals */}
      <MenuActionModal
        isOpen={isMenuActionModalOpen}
        onClose={() => setIsMenuActionModalOpen(false)}
        onViewFullMenu={handleScrollToMenu}
      />

      <OrderOnlineModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onNavigateToLocation={handleScrollToLocation}
      />
    </div>
  );
}
