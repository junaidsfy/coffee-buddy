import { OrderingLinksConfig } from '../types';

/**
 * CENTRALIZED ORDERING CONFIGURATION
 * 
 * Insert the real restaurant URLs here when live.
 * Default values can be replaced or overridden via environment variables or runtime configuration.
 */
export const ORDERING_CONFIG: OrderingLinksConfig = {
  // Replace "ZOMATO_URL" with the actual Zomato restaurant link (e.g. "https://www.zomato.com/coffeebuddy")
  zomato: (import.meta.env.VITE_ZOMATO_URL as string) || "https://www.zomato.com",
  
  // Replace "SWIGGY_URL" with the actual Swiggy restaurant link (e.g. "https://www.swiggy.com/restaurants/coffee-buddy")
  swiggy: (import.meta.env.VITE_SWIGGY_URL as string) || "https://www.swiggy.com",
};

/**
 * Helper to check if a URL is configured and valid
 */
export const isUrlConfigured = (url?: string): boolean => {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === "" || trimmed === "ZOMATO_URL" || trimmed === "SWIGGY_URL") {
    return false;
  }
  return trimmed.startsWith("http://") || trimmed.startsWith("https://");
};

export const hasAnyDeliveryPartner = (): boolean => {
  return isUrlConfigured(ORDERING_CONFIG.zomato) || isUrlConfigured(ORDERING_CONFIG.swiggy);
};

export const getAvailablePlatforms = () => {
  return {
    zomato: {
      name: "Zomato",
      configured: isUrlConfigured(ORDERING_CONFIG.zomato),
      url: ORDERING_CONFIG.zomato,
      color: "#E23744",
      bgClass: "bg-[#E23744]",
      tagline: "Fast home delivery & live tracking",
      buttonText: "Order on Zomato",
    },
    swiggy: {
      name: "Swiggy",
      configured: isUrlConfigured(ORDERING_CONFIG.swiggy),
      url: ORDERING_CONFIG.swiggy,
      color: "#FC8019",
      bgClass: "bg-[#FC8019]",
      tagline: "Instant delivery to your doorstep",
      buttonText: "Order on Swiggy",
    }
  };
};
