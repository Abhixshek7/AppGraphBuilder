export type NodeStatus = 'Healthy' | 'Degraded' | 'Error';

export interface AppInfo {
  id: string;
  name: string;
  description?: string;
}

export interface NodeData {
  label: string;
  status: NodeStatus;
  value: number;
  type?: string;
}

export interface GraphNode {
  id: string;
  data: NodeData;
  position: { x: number; y: number };
  type?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
