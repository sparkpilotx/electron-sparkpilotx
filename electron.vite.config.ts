import { defineConfig, defineViteConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import { resolve } from 'path'
import rendererConfig from './vite.config'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // By default, only env variables prefixed with `MAIN_VITE_`,
  // `PRELOAD_VITE_` and `RENDERER_VITE_` are loaded,
  // unless the third parameter `prefixes` is changed.
  loadEnv(mode)
  
  return {
    main: {
      plugins: [externalizeDepsPlugin()],
      build: {
        rollupOptions: {
          input: resolve(__dirname, 'src/main/main.ts')
        }
      },
      resolve: {
        alias: {
          '@shared': resolve(__dirname, 'src/shared')
        }
      }
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
      resolve: {
        alias: {
          '@shared': resolve(__dirname, 'src/shared')
        }
      }
    },
    renderer: defineViteConfig(rendererConfig)
  }
})
