import { create } from 'zustand';

/**
 * Store for managing territory ownership
 * This is a local state store for now - will be replaced with backend integration later
 */
export const useTerritoryStore = create((set) => ({
  // Territory ownership: { provinceId: 'nationId' }
  ownership: {},
  
  // Set ownership for a province
  setOwnership: (provinceId, nationId) =>
    set((state) => ({
      ownership: {
        ...state.ownership,
        [provinceId]: nationId,
      },
    })),
  
  // Get ownership for a province
  getOwnership: (provinceId) => {
    const state = useTerritoryStore.getState();
    return state.ownership[provinceId] || null;
  },
  
  // Batch update ownership
  updateOwnership: (updates) =>
    set((state) => ({
      ownership: {
        ...state.ownership,
        ...updates,
      },
    })),
  
  // Clear all ownership
  clearOwnership: () => set({ ownership: {} }),
  
  // Selected province/nation for details view
  selectedId: null,
  selectedType: null, // 'province' or 'state'
  
  setSelected: (id, type) => set({ selectedId: id, selectedType: type }),
  clearSelected: () => set({ selectedId: null, selectedType: null }),
}));
