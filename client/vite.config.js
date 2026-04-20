import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import React from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    React()
  ],
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
})