import { useState, useCallback, useRef } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { LeftRail } from '@/components/layout/LeftRail';
import { RightPanel } from '@/components/layout/RightPanel';
import { GraphCanvas, GraphCanvasRef } from '@/components/canvas/GraphCanvas';
import { useAppStore } from '@/store/useAppStore';
import { useGraph } from '@/hooks/useApps';
import { GraphNode, NodeData } from '@/types/graph';

const Index = () => {
  const { selectedAppId } = useAppStore();
  const { data: graphData, isLoading } = useGraph(selectedAppId);
  const [currentNodes, setCurrentNodes] = useState<GraphNode[]>([]);
  const [nodeUpdate, setNodeUpdate] = useState<{ nodeId: string; data: NodeData } | null>(null);
  const canvasRef = useRef<GraphCanvasRef>(null);

  const handleNodesUpdate = useCallback((nodes: GraphNode[]) => {
    setCurrentNodes(nodes);
  }, []);

  const handleUpdateNode = useCallback((nodeId: string, data: NodeData) => {
    setNodeUpdate({ nodeId, data });
  }, []);

  const handleAddNode = useCallback(() => {
    canvasRef.current?.addNode();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopBar onAddNode={handleAddNode} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left rail - hidden on mobile */}
        <div className="hidden md:flex">
          <LeftRail />
        </div>
        
        {/* Main canvas */}
        <GraphCanvas
          ref={canvasRef}
          data={graphData}
          isLoading={isLoading}
          onNodesUpdate={handleNodesUpdate}
          externalNodeUpdates={nodeUpdate}
        />
        
        {/* Right panel */}
        <RightPanel
          nodes={currentNodes}
          onUpdateNode={handleUpdateNode}
        />
      </div>
    </div>
  );
};

export default Index;
