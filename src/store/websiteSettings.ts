import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  language: string;
  timezone: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export interface HomePage {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroButton: {
    text: string;
    link: string;
  };
  featuredProducts: string[];
  categories: {
    id: string;
    name: string;
    image: string;
    description: string;
  }[];
  testimonials: {
    id: string;
    name: string;
    text: string;
    rating: number;
    image: string;
  }[];
  newsletter: {
    title: string;
    subtitle: string;
    placeholder: string;
  };
}

export interface AboutPage {
  title: string;
  subtitle: string;
  story: string;
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
    icon: string;
  }[];
  team: {
    id: string;
    name: string;
    role: string;
    image: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
    icon: string;
  }[];
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  type: 'page' | 'category' | 'external';
  children?: NavigationItem[];
  isVisible: boolean;
  order: number;
}

export interface FooterSettings {
  companyInfo: {
    name: string;
    description: string;
    logo: string;
  };
  quickLinks: {
    title: string;
    links: {
      label: string;
      url: string;
    }[];
  }[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
  };
  copyright: string;
  paymentMethods: string[];
}

export interface WebsiteSettings {
  siteSettings: SiteSettings;
  contactInfo: ContactInfo;
  homePage: HomePage;
  aboutPage: AboutPage;
  navigation: NavigationItem[];
  footer: FooterSettings;
}

interface WebsiteSettingsStore {
  settings: WebsiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  updateHomePage: (page: Partial<HomePage>) => void;
  updateAboutPage: (page: Partial<AboutPage>) => void;
  updateNavigation: (navigation: NavigationItem[]) => void;
  updateFooter: (footer: Partial<FooterSettings>) => void;
  resetToDefault: () => void;
}

const defaultSettings: WebsiteSettings = {
  siteSettings: {
    siteName: 'EverShop',
    siteDescription: 'Bangladesh\'s leading e-commerce platform for quality electronics',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    primaryColor: '#2563eb',
    secondaryColor: '#7c3aed',
    currency: 'BDT',
    language: 'en',
    timezone: 'Asia/Dhaka',
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing maintenance. Please check back soon.'
  },
  contactInfo: {
    email: 'info@evershop.com',
    phone: '+880 1712-345678',
    address: '123 Tech Street, Dhanmondi',
    city: 'Dhaka 1205',
    country: 'Bangladesh',
    socialMedia: {
      facebook: 'https://facebook.com/evershop',
      twitter: 'https://twitter.com/evershop',
      instagram: 'https://instagram.com/evershop',
      linkedin: 'https://linkedin.com/company/evershop'
    },
    businessHours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    }
  },
  homePage: {
    heroTitle: 'Discover Amazing Electronics',
    heroSubtitle: 'Find the best deals on electronics, gadgets, and technology',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    heroButton: {
      text: 'Shop Now',
      link: '/products'
    },
    featuredProducts: ['1', '2', '3', '4'],
    categories: [
      {
        id: '1',
        name: 'Microcontrollers',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
        description: 'Arduino, ESP32, and development boards'
      },
      {
        id: '2',
        name: 'Sensors',
        image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400',
        description: 'Temperature, humidity, and motion sensors'
      }
    ],
    testimonials: [
      {
        id: '1',
        name: 'Ahmed Rahman',
        text: 'Excellent service and fast delivery!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
      }
    ],
    newsletter: {
      title: 'Stay Updated',
      subtitle: 'Get the latest deals and new arrivals',
      placeholder: 'Enter your email address'
    }
  },
  aboutPage: {
    title: 'About EverShop',
    subtitle: 'Your trusted partner for quality electronics',
    story: 'EverShop began in 2016 with a simple mission: to make quality electronics accessible to everyone in Bangladesh.',
    mission: 'To democratize access to quality electronics and technology by providing reliable products, exceptional service, and competitive prices.',
    vision: 'To become the leading e-commerce platform for electronics in South Asia, empowering innovation and technological advancement.',
    values: [
      {
        title: 'Quality Assurance',
        description: 'Every product undergoes rigorous testing to ensure reliability.',
        icon: 'shield'
      },
      {
        title: 'Customer First',
        description: 'We prioritize customer satisfaction above everything else.',
        icon: 'heart'
      }
    ],
    team: [
      {
        id: '1',
        name: 'Nafizur Rahman Nayem',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        description: 'Passionate about bringing quality electronics to everyone.'
      }
    ],
    stats: [
      {
        label: 'Happy Customers',
        value: '50,000+',
        icon: 'users'
      },
      {
        label: 'Products Sold',
        value: '1M+',
        icon: 'award'
      }
    ]
  },
  navigation: [
    { id: '1', label: 'Home', url: '/', type: 'page', isVisible: true, order: 1 },
    { id: '2', label: 'Products', url: '/products', type: 'page', isVisible: true, order: 2 },
    { id: '3', label: 'Categories', url: '/categories', type: 'page', isVisible: true, order: 3 },
    { id: '4', label: 'About', url: '/about', type: 'page', isVisible: true, order: 4 },
    { id: '5', label: 'Contact', url: '/contact', type: 'page', isVisible: true, order: 5 }
  ],
  footer: {
    companyInfo: {
      name: 'EverShop',
      description: 'Your trusted partner for quality electronics and innovative technology solutions.',
      logo: '/logo.png'
    },
    quickLinks: [
      {
        title: 'Quick Links',
        links: [
          { label: 'Home', url: '/' },
          { label: 'Products', url: '/products' },
          { label: 'About', url: '/about' }
        ]
      },
      {
        title: 'Support',
        links: [
          { label: 'Contact Us', url: '/contact' },
          { label: 'FAQ', url: '/faq' },
          { label: 'Returns', url: '/returns' }
        ]
      }
    ],
    newsletter: {
      title: 'Newsletter',
      description: 'Subscribe to get updates on new products and offers',
      placeholder: 'Your email address'
    },
    copyright: '© 2024 EverShop. All rights reserved.',
    paymentMethods: ['bkash', 'nagad', 'rocket', 'visa', 'mastercard']
  }
};

export const useWebsiteSettingsStore = create<WebsiteSettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      
      updateSiteSettings: (newSettings) => set((state) => ({
        settings: {
          ...state.settings,
          siteSettings: { ...state.settings.siteSettings, ...newSettings }
        }
      })),
      
      updateContactInfo: (newInfo) => set((state) => ({
        settings: {
          ...state.settings,
          contactInfo: { ...state.settings.contactInfo, ...newInfo }
        }
      })),
      
      updateHomePage: (newPage) => set((state) => ({
        settings: {
          ...state.settings,
          homePage: { ...state.settings.homePage, ...newPage }
        }
      })),
      
      updateAboutPage: (newPage) => set((state) => ({
        settings: {
          ...state.settings,
          aboutPage: { ...state.settings.aboutPage, ...newPage }
        }
      })),
      
      updateNavigation: (navigation) => set((state) => ({
        settings: {
          ...state.settings,
          navigation
        }
      })),
      
      updateFooter: (newFooter) => set((state) => ({
        settings: {
          ...state.settings,
          footer: { ...state.settings.footer, ...newFooter }
        }
      })),
      
      resetToDefault: () => set({ settings: defaultSettings })
    }),
    {
      name: 'website-settings-storage'
    }
  )
);