import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://evershop.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/products',
    '/categories',
    '/cart',
    '/checkout',
    '/auth/login',
    '/account',
  ]

  // Sample product IDs (replace with actual product fetching)
  const productIds = ['1', '2', '3', '4', '5', '6']
  
  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly',
    priority: page === '' ? 1 : 0.8,
  }))

  const productUrls: MetadataRoute.Sitemap = productIds.map((id) => ({
    url: `${baseUrl}/products/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticUrls, ...productUrls]
}