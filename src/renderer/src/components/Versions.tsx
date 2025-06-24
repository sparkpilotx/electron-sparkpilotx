import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

function Versions(): React.JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  const versionItems = [
    { name: 'Electron', version: versions.electron, variant: 'default' as const },
    { name: 'Chromium', version: versions.chrome, variant: 'secondary' as const },
    { name: 'Node.js', version: versions.node, variant: 'outline' as const },
  ]

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-center">Runtime Versions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {versionItems.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {item.name}
              </span>
              <Badge variant={item.variant} className="font-mono">
                v{item.version}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Versions
