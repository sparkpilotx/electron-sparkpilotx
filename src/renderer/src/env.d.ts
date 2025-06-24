/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Renderer process variables (only RENDERER_VITE_ and VITE_ are visible here)
  readonly RENDERER_VITE_APP_TITLE: string
  
  // Common variables (VITE_ prefix, visible in all processes)
  readonly VITE_BUILD_NUMBER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
