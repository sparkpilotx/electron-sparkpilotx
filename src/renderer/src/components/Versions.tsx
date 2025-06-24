import { useState } from 'react'

function Versions(): React.JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
        Runtime Versions
      </h3>
      <ul className="space-y-3">
        <li className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Electron</span>
          <span className="text-sm font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
            v{versions.electron}
          </span>
        </li>
        <li className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Chromium</span>
          <span className="text-sm font-mono text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
            v{versions.chrome}
          </span>
        </li>
        <li className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Node.js</span>
          <span className="text-sm font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">
            v{versions.node}
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Versions
