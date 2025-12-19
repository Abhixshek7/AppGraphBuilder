import { useQuery } from '@tanstack/react-query';
import { mockApps, mockGraphs } from '@/mocks/data';
import { AppInfo, GraphData } from '@/types/graph';

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useApps() {
  return useQuery<AppInfo[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      await delay(300);
      return mockApps;
    },
  });
}

export function useGraph(appId: string | null) {
  return useQuery<GraphData | null>({
    queryKey: ['graph', appId],
    queryFn: async () => {
      if (!appId) return null;
      await delay(200);
      return mockGraphs[appId] || null;
    },
    enabled: !!appId,
  });
}
