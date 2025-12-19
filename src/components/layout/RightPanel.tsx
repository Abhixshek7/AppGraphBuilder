import { useAppStore } from '@/store/useAppStore';
import { NodeInspector } from '@/components/inspector/NodeInspector';
import { GraphNode, NodeData } from '@/types/graph';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { X } from 'lucide-react';

interface RightPanelProps {
  nodes: GraphNode[];
  onUpdateNode: (nodeId: string, data: NodeData) => void;
}

export function RightPanel({ nodes, onUpdateNode }: RightPanelProps) {
  const { selectedNodeId, isMobilePanelOpen, setMobilePanelOpen } = useAppStore();
  
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const panelContent = selectedNode ? (
    <NodeInspector
      node={selectedNode}
      onUpdate={(data) => onUpdateNode(selectedNode.id, data)}
    />
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <div className="w-6 h-6 border-2 border-dashed border-muted-foreground rounded" />
      </div>
      <p className="text-muted-foreground text-sm">
        Select a node to inspect
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop panel */}
      <aside className="hidden lg:flex w-80 border-l border-panel-border bg-panel flex-col">
        {panelContent}
      </aside>

      {/* Mobile drawer */}
      <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
        <SheetContent side="right" className="w-full sm:w-96 p-0 bg-panel border-panel-border">
          <div className="flex items-center justify-between p-4 border-b border-panel-border">
            <h3 className="font-semibold">Inspector</h3>
            <button
              onClick={() => setMobilePanelOpen(false)}
              className="p-1 rounded hover:bg-accent"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {panelContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
