/**
 * Analytics abstraction for Coffee Buddy
 * Prepares events for Google Analytics / Google Tag Manager integration
 */

export type AnalyticsEventName =
  | 'menu_clicked'
  | 'order_online_clicked'
  | 'zomato_clicked'
  | 'swiggy_clicked'
  | 'directions_clicked'
  | 'phone_clicked'
  | 'instagram_clicked'
  | 'youtube_clicked'
  | 'gallery_opened'
  | 'category_filtered'
  | 'item_quick_order'
  | 'social_link_clicked';

export interface AnalyticsEventParams {
  location?: string;
  item_id?: string;
  item_name?: string;
  category?: string;
  platform?: 'zomato' | 'swiggy';
  source?: string;
  [key: string]: unknown;
}

export const trackEvent = (
  eventName: AnalyticsEventName,
  params?: AnalyticsEventParams
): void => {
  // Safe console log in development/preview
  if (process.env.NODE_ENV !== 'production' || import.meta.env.DEV) {
    console.log(`📊 [Analytics Event]: ${eventName}`, params || {});
  }

  // Push to dataLayer if GTM is present
  if (typeof window !== 'undefined') {
    const win = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    if (win.dataLayer && Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: eventName,
        ...params,
        timestamp: new Date().toISOString(),
      });
    }

    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, params);
    }
  }
};
