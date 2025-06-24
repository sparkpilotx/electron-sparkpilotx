// Import Vite configuration utilities and plugins
import { defineViteConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// Vite configuration for Electron renderer process
export default defineViteConfig({
  // Configure plugins for React and TailwindCSS support
  plugins: [react(), tailwindcss()],
  
  // Set up path aliases for cleaner imports
  resolve: {
    alias: {
      // Alias for renderer source directory
      '@renderer': resolve(__dirname, 'src/renderer/src'),
      // Root alias pointing to renderer src for convenience
      '@': resolve(__dirname, 'src/renderer/src'),
      // Alias for shared code between main and renderer processes
      '@shared': resolve(__dirname, 'src/shared')
    }
  },
  
  // Configure build settings for Electron compatibility
  // Use relative paths to ensure proper asset loading in Electron
  base: './',
  build: {
    // Output directory for built renderer files
    outDir: 'out/renderer',
    // Clear output directory before each build
    emptyOutDir: true
  },
  
  // Development server configuration for hot reload
  server: {
    // Configure the development server port
    port: 5173,
    // Enable Hot Module Replacement for fast development
    hmr: {
      // Use localhost for HMR connection
      host: 'localhost',
      port: 5174
    },
    // Allow external connections for Electron renderer process
    host: 'localhost',
    // Enable strict port to avoid conflicts
    strictPort: true
  }
}) 