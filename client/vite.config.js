import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      VitePWA({
          includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
          manifest: {
              name: 'Twitterr: Share your activities!',
              short_name: 'Twitterr',
              description: 'Share your activities!',
              theme_color: '#67e8f9',
              icons: [
                  {
                      src: 'https://i.imgur.com/MPmR15O.png',
                      sizes: '192x192',
                      type: 'image/png'
                  },
                  {
                      src: 'https://i.imgur.com/RNtoYDT.png',
                      sizes: '512x512',
                      type: 'image/png'
                  }
              ]
          }
      }),
  ],
})
