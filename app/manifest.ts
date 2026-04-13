import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mines',
    short_name: 'Mines',
    description: 'Mine MINE$ and earn real naira',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#0a0f0d',
    theme_color: '#d4af37',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' }
    ]
  }
}
