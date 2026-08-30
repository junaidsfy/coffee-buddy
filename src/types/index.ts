export type MenuCategory = 
  | 'All'
  | 'Coffee'
  | 'Cold Coffee'
  | 'Tea'
  | 'Non-Coffee'
  | 'Food'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Coffee' | 'Cold Coffee' | 'Tea' | 'Non-Coffee' | 'Food' | 'Desserts';
  popular?: boolean;
  signature?: boolean;
  available: boolean;
  dietary?: 'veg' | 'vegan' | 'egg';
  servingSize?: string;
  customization?: string[];
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  likes?: number;
  comments?: number;
  type?: 'photo' | 'reel';
  tag?: string;
  aspectRatio?: 'square' | 'portrait';
  postUrl?: string;
}

export interface CafeOpeningHour {
  days: string;
  time: string;
  isToday?: boolean;
}

export interface CafeDetails {
  name: string;
  tagline: string;
  shortBio: string;
  story: string;
  established: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  hours: CafeOpeningHour[];
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  socials: {
    instagram: string;
    instagramHandle: string;
    youtube: string;
    youtubeHandle: string;
  };
  amenities: { icon: string; title: string; desc: string }[];
}

export interface OrderingLinksConfig {
  zomato: string;
  swiggy: string;
}

export type ModalState = 'closed' | 'menu_choice' | 'order_platforms' | 'item_detail';
