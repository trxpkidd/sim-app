import { useEffect, useState } from 'react';
import { useTerritoryStore } from '@/store/territoryStore';
import { loadMapData } from '@/utils/mapData';

/**
 * Sidebar component for displaying province/nation details
 */
export default function Sidebar() {
  const { selectedId, selectedType, clearSelected } = useTerritoryStore();
  const [mapData, setMapData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  
  // Load map data
  useEffect(() => {
    loadMapData().then(setMapData).catch(console.error);
  }, []);
  
  // Update selected data when selection changes
  useEffect(() => {
    if (!mapData || !selectedId || !selectedType) {
      setSelectedData(null);
      return;
    }
    
    const pack = mapData.pack || {};
    
    if (selectedType === 'state') {
      const states = pack.states || [];
      const state = states.find(s => s.i === selectedId);
      setSelectedData(state ? { type: 'state', data: state } : null);
    } else if (selectedType === 'province') {
      const provinces = pack.provinces || [];
      // Provinces is a sparse array - find by i field
      const province = provinces.find(p => p && typeof p === 'object' && p.i === selectedId);
      setSelectedData(province ? { type: 'province', data: province } : null);
    }
  }, [mapData, selectedId, selectedType]);
  
  if (!selectedId && selectedType === null) {
    return (
      <div className="w-80 bg-stone-800 text-stone-100 p-6 border-l border-stone-700 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Territory Details</h2>
        <p className="text-stone-400">Click on a territory on the map to view details.</p>
      </div>
    );
  }
  
  return (
    <div className="w-80 bg-stone-800 text-stone-100 p-6 border-l border-stone-700 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Territory Details</h2>
        <button
          onClick={clearSelected}
          className="text-stone-400 hover:text-stone-100 transition-colors text-xl"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      
      {selectedData ? (
        <div className="space-y-4">
          <div>
            <div className="text-sm text-stone-400 uppercase tracking-wide mb-1">
              {selectedData.type === 'state' ? 'Nation' : 'Province'} Name
            </div>
            <div className="text-lg font-semibold">{selectedData.data.name || `ID: ${selectedId}`}</div>
          </div>
          
          {selectedData.type === 'state' && (
            <>
              {selectedData.data.area !== undefined && (
                <div>
                  <div className="text-sm text-stone-400 uppercase tracking-wide mb-1">Area</div>
                  <div>{selectedData.data.area.toLocaleString()} cells</div>
                </div>
              )}
              
              {selectedData.data.burgs !== undefined && (
                <div>
                  <div className="text-sm text-stone-400 uppercase tracking-wide mb-1">Cities</div>
                  <div>{selectedData.data.burgs}</div>
                </div>
              )}
              
              {selectedData.data.cells !== undefined && (
                <div>
                  <div className="text-sm text-stone-400 uppercase tracking-wide mb-1">Total Cells</div>
                  <div>{selectedData.data.cells.toLocaleString()}</div>
                </div>
              )}
              
              {selectedData.data.neighbors && selectedData.data.neighbors.length > 0 && (
                <div>
                  <div className="text-sm text-stone-400 uppercase tracking-wide mb-1">Neighbors</div>
                  <div className="text-sm">{selectedData.data.neighbors.length} neighboring nations</div>
                </div>
              )}
            </>
          )}
          
          {selectedData.type === 'province' && (
            <>
              {selectedData.data.state !== undefined && (
                <div>
                  <div className="text-sm text-stone-400 uppercase tracking-wide mb-1">State</div>
                  <div>State ID: {selectedData.data.state}</div>
                </div>
              )}
              
              {selectedData.data.fullName && (
                <div>
                  <div className="text-sm text-stone-400 uppercase tracking-wide mb-1">Full Name</div>
                  <div>{selectedData.data.fullName}</div>
                </div>
              )}
              
              {selectedData.data.formName && (
                <div>
                  <div className="text-sm text-stone-400 uppercase tracking-wide mb-1">Type</div>
                  <div>{selectedData.data.formName}</div>
                </div>
              )}
            </>
          )}
          
          <div className="pt-4 border-t border-stone-700">
            <p className="text-stone-400 text-xs">
              More detailed information (military, economy, diplomacy) will be available as the system is expanded.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-stone-400">Loading data...</div>
      )}
    </div>
  );
}
