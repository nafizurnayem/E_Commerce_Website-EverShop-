// Google Analytics and other analytics configurations
export const analyticsConfig = {
  googleAnalytics: {
    measurementId: 'G-XXXXXXXXXX', // Replace with your actual GA4 Measurement ID
  },
  facebookPixel: {
    pixelId: 'XXXXXXXXXXXXXXX', // Replace with your Facebook Pixel ID
  },
  hotjar: {
    hjid: 'XXXXXXX', // Replace with your Hotjar ID
  },
  clarity: {
    projectId: 'XXXXXXXXXX', // Replace with your Microsoft Clarity project ID
  },
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPurchase = (transactionId: string, value: number, currency: string = 'BDT') => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
  });
};

export const trackAddToCart = (itemId: string, itemName: string, value: number) => {
  trackEvent('add_to_cart', {
    currency: 'BDT',
    value: value,
    items: [
      {
        item_id: itemId,
        item_name: itemName,
        currency: 'BDT',
        value: value,
      },
    ],
  });
};

export const trackViewItem = (itemId: string, itemName: string, category: string, value: number) => {
  trackEvent('view_item', {
    currency: 'BDT',
    value: value,
    items: [
      {
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        currency: 'BDT',
        value: value,
      },
    ],
  });
};