// Main process environment variables (only MAIN_VITE_ and VITE_ are visible here)
interface ImportMetaEnv {
  readonly MAIN_VITE_APP_VERSION: string
  readonly VITE_BUILD_NUMBER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 