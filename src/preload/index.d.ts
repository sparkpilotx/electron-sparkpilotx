interface ElectronAPI {
  platform: string
  versions: NodeJS.ProcessVersions
}

interface API {
  ping: () => Promise<string>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}

export {}
