import { AppInfo, GraphData } from '@/types/graph';

export const mockApps: AppInfo[] = [
  { id: 'app-1', name: 'Payments', description: 'Payment processing service' },
  { id: 'app-2', name: 'Notifications', description: 'Push & email notifications' },
  { id: 'app-3', name: 'Analytics', description: 'User analytics pipeline' },
];

export const mockGraphs: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      { id: '1', data: { label: 'API Gateway', status: 'Healthy', value: 85 }, position: { x: 50, y: 100 } },
      { id: '2', data: { label: 'Payment Worker', status: 'Degraded', value: 45 }, position: { x: 300, y: 50 } },
      { id: '3', data: { label: 'Database', status: 'Healthy', value: 92 }, position: { x: 550, y: 100 } },
      { id: '4', data: { label: 'Cache Layer', status: 'Healthy', value: 78 }, position: { x: 300, y: 200 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e4-3', source: '4', target: '3' },
    ],
  },
  'app-2': {
    nodes: [
      { id: '1', data: { label: 'Event Bus', status: 'Healthy', value: 95 }, position: { x: 50, y: 100 } },
      { id: '2', data: { label: 'Email Service', status: 'Healthy', value: 88 }, position: { x: 300, y: 50 } },
      { id: '3', data: { label: 'Push Service', status: 'Error', value: 12 }, position: { x: 300, y: 200 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e1-3', source: '1', target: '3', animated: true },
    ],
  },
  'app-3': {
    nodes: [
      { id: '1', data: { label: 'Collector', status: 'Healthy', value: 99 }, position: { x: 50, y: 100 } },
      { id: '2', data: { label: 'Transformer', status: 'Healthy', value: 76 }, position: { x: 250, y: 100 } },
      { id: '3', data: { label: 'Data Lake', status: 'Healthy', value: 82 }, position: { x: 450, y: 100 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ],
  },
};
