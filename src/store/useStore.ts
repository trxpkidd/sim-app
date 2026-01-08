
import { create } from 'zustand';

export interface Province {
    i: number;
    [key: string]: any;
}

export interface MapStore {
    mapData: any | null;
    selectedProvince: Province | null;
    hoveredProvince: Province | null;
    setMapData: (data: any) => void;
    setSelectedProvince: (province: Province | null) => void;
    setHoveredProvince: (province: Province | null) => void;
}

export const useStore = create<MapStore>((set) => ({
    mapData: null,
    selectedProvince: null,
    hoveredProvince: null,
    setMapData: (data) => set({ mapData: data }),
    setSelectedProvince: (province) => set({ selectedProvince: province }),
    setHoveredProvince: (province) => set({ hoveredProvince: province }),
}));
