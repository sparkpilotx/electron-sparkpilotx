// Preload process environment variables (only PRELOAD_VITE_ and VITE_ are visible here)
interface ImportMetaEnv {
  readonly PRELOAD_VITE_API_BASE_URL: string
  readonly VITE_BUILD_NUMBER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 