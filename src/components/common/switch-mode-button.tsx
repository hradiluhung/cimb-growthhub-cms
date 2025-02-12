import { LayoutGrid, ListIcon } from 'lucide-react'
import { Button } from '../ui/button'

function SwitchModeButton({
  viewMode,
  setViewMode,
}: {
  viewMode: 'grid' | 'table'
  setViewMode: (mode: 'grid' | 'table') => void
}) {
  return (
    <div className="flex rounded-lg overflow-hidden">
      <Button
        className="rounded-none px-3"
        variant={viewMode === 'table' ? 'default' : 'secondary'}
        onClick={() => setViewMode('table')}
      >
        <ListIcon className="size-5" />
      </Button>
      <Button
        className="rounded-none px-3"
        variant={viewMode === 'grid' ? 'default' : 'secondary'}
        onClick={() => setViewMode('grid')}
      >
        <LayoutGrid className="size-5" />
      </Button>
    </div>
  )
}

export default SwitchModeButton
