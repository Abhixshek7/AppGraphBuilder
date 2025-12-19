import { create } from 'zustand';

type InspectorTab = 'config' | 'runtime';

interface AppState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;

  setSelectedApp: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  toggleMobilePanel: () => void;
  setMobilePanelOpen: (open: boolean) => void;
  setInspectorTab: (tab: InspectorTab) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: 'app-1',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',

  setSelectedApp: (id) => set({ selectedAppId: id, selectedNodeId: null }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  toggleMobilePanel: () => set((s) => ({ isMobilePanelOpen: !s.isMobilePanelOpen })),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}));
