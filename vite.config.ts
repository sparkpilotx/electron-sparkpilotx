import { defineViteConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineViteConfig({
  plugins: [react(), tailwindcss()],
  
  resolve: {
    alias: {
      '@renderer': resolve(__dirname, 'src/renderer/src'),
      '@': resolve(__dirname, 'src/renderer/src')
    }
  },
  
  base: './',
  build: {
    outDir: 'out/renderer',
    emptyOutDir: true
  },
  
  server: {
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5174
    },
    host: 'localhost',
    strictPort: true
  }
}) 