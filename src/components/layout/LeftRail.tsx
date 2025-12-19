import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { Box, Loader2, Plus } from 'lucide-react';

function DraggableNode() {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', 'default');
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border bg-card hover:bg-accent cursor-grab active:cursor-grabbing transition-colors"
    >
      <Plus className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Drag to add node</span>
    </div>
  );
}

export function LeftRail() {
  const { data: apps, isLoading } = useApps();
  const { selectedAppId, setSelectedApp } = useAppStore();

  return (
    <aside className="w-56 border-r border-panel-border bg-panel flex flex-col">
      <div className="p-4 border-b border-panel-border">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Applications
        </h2>
      </div>
      
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          apps?.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all',
                selectedAppId === app.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Box className="w-4 h-4" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{app.name}</p>
                {app.description && (
                  <p className="text-xs text-muted-foreground truncate">
                    {app.description}
                  </p>
                )}
              </div>
            </button>
          ))
        )}
      </nav>

      <div className="p-3 border-t border-panel-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Node Palette
        </p>
        <DraggableNode />
      </div>
    </aside>
  );
}
