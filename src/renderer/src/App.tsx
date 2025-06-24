import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

function App(): React.JSX.Element {
  const [pingResult, setPingResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePing = async () => {
    setIsLoading(true)
    try {
      const result = await window.api.ping()
      setPingResult(`Response: ${result}`)
    } catch (error) {
      setPingResult(`Error: ${error}`)
      console.error('Ping failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>IPC Communication Test</CardTitle>
            <CardDescription>
              Test the shared IPC events between main and renderer processes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handlePing}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Pinging...' : 'Send Ping'}
            </Button>
            {pingResult && (
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {pingResult}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
