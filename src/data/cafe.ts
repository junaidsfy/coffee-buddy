import { CafeDetails } from '../types';

export const CAFE_DATA: CafeDetails = {
  name: "Coffee Buddy",
  tagline: "Coffee • Food • Good Moments",
  shortBio: "A warm neighborhood specialty coffee bar bringing artisanal roasts, handcrafted beverages, and good moments to your day.",
  story: "Coffee Buddy was born from a simple passion: creating an inviting haven where thoughtfully sourced coffee beans, gourmet comfort food, and warm conversations meet. Every cup is brewed with precision, from single-origin espressos to velvety cold brews, crafted to make every visit your favorite part of the day.",
  established: "2024",
  phone: "+91 98765 43210",
  phoneDisplay: "+91 98765 43210",
  email: "hello@coffeebuddy.in",
  address: {
    line1: "Shop 4 & 5, Sunshine Boulevard",
    line2: "Near City Centre, Main Commercial Road",
    area: "Civil Lines / Sector 18",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    full: "Shop 4 & 5, Sunshine Boulevard, Main Commercial Road, New Delhi 110001",
  },
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 11:00 PM", isToday: true },
    { days: "Saturday – Sunday", time: "8:00 AM – 11:30 PM" },
  ],
  googleMapsUrl: "https://maps.google.com/?q=Coffee+Buddy+Cafe",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114885820359!2d77.216721!3d28.63273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b0432387%3A0x86134b22c83c0780!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  socials: {
    instagram: "https://www.instagram.com/coffeebuddy2026/?__pwa=1",
    instagramHandle: "@coffeebuddy2026",
    youtube: "https://www.youtube.com/@coffeebuddy2026",
    youtubeHandle: "@coffeebuddy2026",
  },
  amenities: [
    {
      icon: "Wifi",
      title: "High-Speed Wi-Fi",
      desc: "Work comfortably with seamless connectivity & power sockets at every table.",
    },
    {
      icon: "Coffee",
      title: "Fresh Micro-Roasts",
      desc: "100% Arabica beans ethically sourced from South Indian plantations.",
    },
    {
      icon: "Sparkles",
      title: "Cozy Aesthetic Vibes",
      desc: "Warm lighting, soothing lo-fi playlist, and Instagrammable nooks.",
    },
    {
      icon: "ShoppingBag",
      title: "Fast Delivery",
      desc: "Carefully sealed spill-proof delivery via Zomato and Swiggy.",
    },
  ],
};
