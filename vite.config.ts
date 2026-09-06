import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // Split heavy, rarely-changed third-party libs into their own
            // chunks so they cache independently of app code and are loaded
            // once and shared across the lazy section chunks.
            {
              name: 'framer-motion',
              test: /node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
            },
            {
              name: 'i18next',
              test: /node_modules[\\/](i18next|react-i18next|i18next-browser-languagedetector|i18next-resources-to-backend)[\\/]/,
              priority: 20,
            },
            {
              name: 'react-icons',
              test: /node_modules[\\/]react-icons[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})