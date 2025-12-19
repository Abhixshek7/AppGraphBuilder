import { Layers, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  onAddNode?: () => void;
}

export function TopBar({ onAddNode }: TopBarProps) {
  return (
    <header className="h-14 border-b border-panel-border bg-panel flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-lg">GraphFlow</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onAddNode}
          className="gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Node
        </Button>
        <button className="p-2 rounded-lg hover:bg-accent transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
