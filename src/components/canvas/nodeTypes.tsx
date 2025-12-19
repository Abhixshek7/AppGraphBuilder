import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { NodeStatus } from '@/types/graph';
import { cn } from '@/lib/utils';

const statusColors: Record<NodeStatus, string> = {
  Healthy: 'bg-status-healthy',
  Degraded: 'bg-status-degraded',
  Error: 'bg-status-error',
};

interface CustomNodeData {
  label: string;
  status: NodeStatus;
  value: number;
  [key: string]: unknown;
}

function CustomNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as CustomNodeData;
  
  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg bg-card border-2 transition-all min-w-[140px]',
        selected ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-muted-foreground !border-2 !border-card hover:!bg-primary !transition-colors"
      />
      
      <div className="flex items-center gap-2 mb-1">
        <div className={cn('w-2 h-2 rounded-full', statusColors[nodeData.status])} />
        <span className="font-medium text-sm">{nodeData.label}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${nodeData.value}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-mono">{nodeData.value}%</span>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-muted-foreground !border-2 !border-card hover:!bg-primary !transition-colors"
      />
    </div>
  );
}

export const nodeTypes = {
  default: memo(CustomNodeComponent),
};
