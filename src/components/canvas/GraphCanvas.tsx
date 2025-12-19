import { useCallback, useEffect, forwardRef, useImperativeHandle, DragEvent } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
  addEdge,
} from '@xyflow/react';
import type { Node, Edge, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppStore } from '@/store/useAppStore';
import { nodeTypes } from './nodeTypes';
import { GraphData, NodeData, GraphNode } from '@/types/graph';
import { Loader2, PanelRightOpen } from 'lucide-react';

interface GraphCanvasProps {
  data: GraphData | null | undefined;
  isLoading: boolean;
  onNodesUpdate: (nodes: GraphNode[]) => void;
  externalNodeUpdates?: { nodeId: string; data: NodeData } | null;
}

export interface GraphCanvasRef {
  addNode: () => void;
}

const GraphCanvasInner = forwardRef<GraphCanvasRef, GraphCanvasProps>(
  ({ data, isLoading, onNodesUpdate, externalNodeUpdates }, ref) => {
    const [nodes, setNodes, onNodesChangeHandler] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { setSelectedNode, toggleMobilePanel } = useAppStore();
    const { screenToFlowPosition } = useReactFlow();

    const addNodeAtPosition = useCallback((position: { x: number; y: number }) => {
      const newId = `node-${Date.now()}`;
      const statuses: Array<'Healthy' | 'Degraded' | 'Error'> = ['Healthy', 'Degraded', 'Error'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const newNode: Node = {
        id: newId,
        position,
        data: {
          label: `New Node`,
          status: randomStatus,
          value: Math.floor(Math.random() * 100),
        } as unknown as Record<string, unknown>,
        type: 'default',
      };

      setNodes((nds) => [...nds, newNode]);
      setSelectedNode(newId);
    }, [setNodes, setSelectedNode]);

    const addNode = useCallback(() => {
      addNodeAtPosition({
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      });
    }, [addNodeAtPosition]);

    useImperativeHandle(ref, () => ({
      addNode,
    }), [addNode]);

    const onDragOver = useCallback((event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNodeAtPosition(position);
    }, [screenToFlowPosition, addNodeAtPosition]);

    const onConnect = useCallback((connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    }, [setEdges]);

    useEffect(() => {
      if (data) {
        const flowNodes: Node[] = data.nodes.map((n) => ({
          id: n.id,
          position: n.position,
          data: n.data as unknown as Record<string, unknown>,
          type: 'default',
        }));
        const flowEdges: Edge[] = data.edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          animated: e.animated,
        }));
        setNodes(flowNodes);
        setEdges(flowEdges);
      }
    }, [data, setNodes, setEdges]);

    // Sync external updates to nodes
    useEffect(() => {
      if (externalNodeUpdates) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === externalNodeUpdates.nodeId
              ? { ...node, data: externalNodeUpdates.data as unknown as Record<string, unknown> }
              : node
          )
        );
      }
    }, [externalNodeUpdates, setNodes]);

    // Report node changes back to parent
    useEffect(() => {
      const graphNodes: GraphNode[] = nodes.map((n) => ({
        id: n.id,
        position: n.position,
        data: n.data as unknown as NodeData,
      }));
      onNodesUpdate(graphNodes);
    }, [nodes, onNodesUpdate]);

    const handleNodeClick = useCallback(
      (_: React.MouseEvent, node: Node) => {
        setSelectedNode(node.id);
      },
      [setSelectedNode]
    );

    const handlePaneClick = useCallback(() => {
      setSelectedNode(null);
    }, [setSelectedNode]);

    if (isLoading) {
      return (
        <div className="flex-1 flex items-center justify-center bg-canvas">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex-1 flex items-center justify-center bg-canvas">
          <p className="text-muted-foreground">Select an app to view its graph</p>
        </div>
      );
    }

    return (
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeHandler}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          className="bg-canvas"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={2} />
          <Controls className="!bg-card !border-border !rounded-lg !shadow-lg" />
        </ReactFlow>

        {/* Mobile inspector toggle */}
        <button
          onClick={toggleMobilePanel}
          className="lg:hidden absolute top-4 right-4 p-3 bg-card border border-border rounded-lg shadow-lg"
        >
          <PanelRightOpen className="w-5 h-5" />
        </button>
      </div>
    );
  }
);

export const GraphCanvas = forwardRef<GraphCanvasRef, GraphCanvasProps>(
  (props, ref) => {
    return (
      <ReactFlowProvider>
        <GraphCanvasInner {...props} ref={ref} />
      </ReactFlowProvider>
    );
  }
);
