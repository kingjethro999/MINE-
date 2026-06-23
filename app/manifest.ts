import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MINE$',
    short_name: 'MINE$',
    description: 'Watch videos and play games to earn real Naira',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#0a0f0d',
    theme_color: '#d4af37',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
