import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <img 
            alt="Electron Logo" 
            className="w-24 h-24 mx-auto mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300" 
            src={electronLogo} 
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
            Powered by electron-vite
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Build an Electron app with{' '}
            <span className="text-blue-600 dark:text-blue-400">React</span>
            {' '}and{' '}
            <span className="text-blue-500 dark:text-blue-300">TypeScript</span>
          </h1>
        </div>

        {/* Tip Section */}
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
            💡 Try pressing <code className="bg-amber-100 dark:bg-amber-800 px-2 py-1 rounded text-xs font-mono">F12</code> to open DevTools
          </p>
        </div>

        {/* Actions Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a 
            href="https://electron-vite.org/" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 group"
          >
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-2xl mb-2">📚</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Documentation
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Learn more about electron-vite
              </div>
            </div>
          </a>
          
          <button 
            onClick={ipcHandle}
            className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <div className="text-center">
              <div className="text-green-600 dark:text-green-400 text-2xl mb-2">⚡</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Send IPC
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Test IPC communication
              </div>
            </div>
          </button>
        </div>

        {/* Versions Component */}
        <Versions />
      </div>
    </div>
  )
}

export default App
