import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/useAppStore';
import { GraphNode, NodeData, NodeStatus } from '@/types/graph';
import { cn } from '@/lib/utils';
import { Activity, Settings2, Zap } from 'lucide-react';

interface NodeInspectorProps {
  node: GraphNode;
  onUpdate: (data: NodeData) => void;
}

const statusVariants: Record<NodeStatus, string> = {
  Healthy: 'bg-status-healthy/20 text-status-healthy border-status-healthy/30',
  Degraded: 'bg-status-degraded/20 text-status-degraded border-status-degraded/30',
  Error: 'bg-status-error/20 text-status-error border-status-error/30',
};

export function NodeInspector({ node, onUpdate }: NodeInspectorProps) {
  const { activeInspectorTab, setInspectorTab } = useAppStore();

  const handleLabelChange = (label: string) => {
    onUpdate({ ...node.data, label });
  };

  const handleValueChange = (value: number) => {
    onUpdate({ ...node.data, value: Math.max(0, Math.min(100, value)) });
  };

  const handleStatusChange = (status: NodeStatus) => {
    onUpdate({ ...node.data, status });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-panel-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold truncate">{node.data.label}</h3>
          <Badge
            variant="outline"
            className={cn('text-xs', statusVariants[node.data.status])}
          >
            {node.data.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground font-mono">ID: {node.id}</p>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeInspectorTab}
        onValueChange={(v) => setInspectorTab(v as 'config' | 'runtime')}
        className="flex-1 flex flex-col"
      >
        <TabsList className="mx-4 mt-4 bg-muted/50">
          <TabsTrigger value="config" className="flex-1 gap-2">
            <Settings2 className="w-3.5 h-3.5" />
            Config
          </TabsTrigger>
          <TabsTrigger value="runtime" className="flex-1 gap-2">
            <Activity className="w-3.5 h-3.5" />
            Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="flex-1 p-4 space-y-4 mt-0">
          <div className="space-y-2">
            <Label htmlFor="label" className="text-xs text-muted-foreground">
              Label
            </Label>
            <Input
              id="label"
              value={node.data.label}
              onChange={(e) => handleLabelChange(e.target.value)}
              className="bg-muted/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Status</Label>
            <div className="flex gap-2">
              {(['Healthy', 'Degraded', 'Error'] as NodeStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={cn(
                    'flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all',
                    node.data.status === status
                      ? statusVariants[status]
                      : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted'
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="flex-1 p-4 space-y-4 mt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" />
                Load Value
              </Label>
              <span className="text-sm font-mono font-medium">{node.data.value}%</span>
            </div>
            
            <Slider
              value={[node.data.value]}
              onValueChange={([v]) => handleValueChange(v)}
              max={100}
              step={1}
              className="py-2"
            />

            <Input
              type="number"
              value={node.data.value}
              onChange={(e) => handleValueChange(Number(e.target.value))}
              min={0}
              max={100}
              className="bg-muted/50 border-border font-mono"
            />
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Performance</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all',
                    node.data.value > 80
                      ? 'bg-status-healthy'
                      : node.data.value > 40
                      ? 'bg-status-degraded'
                      : 'bg-status-error'
                  )}
                  style={{ width: `${node.data.value}%` }}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
