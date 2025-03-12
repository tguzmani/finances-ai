import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      manifest: {
        name: 'Finances AI',
        short_name: 'Fin AI',
        description: 'A simple finance tracker',
        start_url: '/',
        display: 'standalone',
        background_color: '#030712',
        theme_color: '#030712',
        orientation: 'portrait',
        scope: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
  ],

  server: {
    port: 4300,
  },

  build: {
    target: 'ES2022',
    rollupOptions: {
      treeshake: true,
    },
  },

  define: {
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify(
      process.env.VITE_BACKEND_URL
    ),
  },

  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@common',
        replacement: path.resolve(__dirname, 'src', 'common'),
      },
      {
        find: '@config',
        replacement: path.resolve(__dirname, 'src', 'config'),
      },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src', 'hooks') },
      {
        find: '@images',
        replacement: path.resolve(__dirname, 'src', 'assets', 'images'),
      },
      {
        find: '@layout',
        replacement: path.resolve(__dirname, 'src', 'modules', 'layout'),
      },
      {
        find: '@modules',
        replacement: path.resolve(__dirname, 'src', 'modules'),
      },
      {
        find: '@repositories',
        replacement: path.resolve(__dirname, 'src', 'repositories'),
      },
      {
        find: '@routes',
        replacement: path.resolve(__dirname, 'src', 'routes'),
      },
      { find: '@pages', replacement: path.resolve(__dirname, 'src', 'pages') },
      { find: '@util', replacement: path.resolve(__dirname, 'src', 'util') },
    ],
  },
})
