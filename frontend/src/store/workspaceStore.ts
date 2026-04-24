import { create } from "zustand";
import type { Page } from "../types/page";

interface WorkspaceState {
  pages: Page[];
  activePageId: string | null;
  setPages: (pages: Page[]) => void;
  setActivePageId: (id: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  pages: [],
  activePageId: null,
  setPages: (pages) => set({ pages }),
  setActivePageId: (activePageId) => set({ activePageId })
}));

