import type { Metadata } from 'next';

export const siteConfig = {
  name: 'EverShop',
  description: 'Bangladesh\'s leading e-commerce platform for quality electronics, microcontrollers, and innovative technology solutions.',
  url: 'https://evershop.com',
  keywords: [
    'electronics',
    'e-commerce',
    'microcontrollers',
    'arduino',
    'esp32',
    'development boards',
    'bangladesh',
    'online shopping',
    'technology',
    'gadgets'
  ],
  author: 'EverShop Team',
  creator: 'Nafizur Rahman Nayem',
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
    },
  ],
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
    creator: '@evershop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};