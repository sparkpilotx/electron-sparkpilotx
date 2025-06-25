import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { IpcEvents } from '@shared/ipc-events'

/**
 * Validates the sender of an IPC message to ensure it comes from a trusted source
 * This implements Electron security recommendation #17
 * @param frame - The frame that sent the IPC message (can be null)
 * @returns true if the sender is valid, false otherwise
 */
function validateSender(frame: Electron.WebFrameMain | null): boolean {
  // If frame is null, reject the request
  if (!frame) {
    console.warn('Rejected IPC message: senderFrame is null')
    return false
  }

  try {
    const url = new URL(frame.url)
    console.log('IPC validation - URL:', frame.url, 'Protocol:', url.protocol, 'Hostname:', url.hostname, 'Dev mode:', is.dev)
    
    // In development, allow localhost and 127.0.0.1
    if (is.dev && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
      console.log('IPC validation - Allowed (dev localhost)')
      return true
    }
    
    // In production, allow file:// protocol for local files
    if (!is.dev && url.protocol === 'file:') {
      console.log('IPC validation - Allowed (production file)')
      return true
    }
    
    // Additionally, allow file:// protocol in development as well (for built version in dev)
    if (url.protocol === 'file:') {
      console.log('IPC validation - Allowed (file protocol)')
      return true
    }
    
    // Log suspicious attempts
    console.warn('Rejected IPC message from untrusted source:', frame.url)
    return false
  } catch (error) {
    console.error('Error validating IPC sender:', error)
    return false
  }
}

/**
 * Enhanced IPC invoke handler wrapper that validates the sender before processing
 * @param channel - The IPC channel name
 * @param handler - The handler function to execute if sender is valid
 */
function createSecureIPCInvokeHandler<T extends any[], R>(
  channel: string,
  handler: (event: Electron.IpcMainInvokeEvent, ...args: T) => R | Promise<R>
) {
  return (event: Electron.IpcMainInvokeEvent, ...args: T) => {
    if (!validateSender(event.senderFrame)) {
      console.warn(`Blocked IPC invoke on channel '${channel}' from untrusted sender`)
      return Promise.reject(new Error('Untrusted sender'))
    }
    return handler(event, ...args)
  }
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

/**
 * Main application entry point
 * @param argv - Command line arguments
 */
function main(argv: string[]): void {
  console.log('Starting Electron app with args:', argv)

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('io.ai-copilots.sparkpilotx')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    // Secure IPC handlers - All handlers now validate sender
    
    // Secure ping handler - validates sender before responding
    ipcMain.handle(IpcEvents.PING, createSecureIPCInvokeHandler(IpcEvents.PING, (event) => {
      console.log('pong - from validated sender:', event.senderFrame?.url || 'unknown')
      return 'pong'
    }))
    
    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

// Start the app immediately
main(process.argv);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
