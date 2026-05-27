import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    chunkSizeWarningLimit: 700,

    rollupOptions: {
      output: {
        // Rolldown (Vite 8) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'framer';
          }
          if (
            id.includes('node_modules/canvas-confetti/') ||
            id.includes('node_modules/html2canvas/') ||
            id.includes('node_modules/qrcode.react/')
          ) {
            return 'utils';
          }
        },
      },
    },
  },
})
