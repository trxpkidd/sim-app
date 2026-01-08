import { useEffect, useState } from 'react';
import { loadMapData, getCellPolygon, getMapBounds } from '../utils/mapData';
import { useTerritoryStore } from '../store/territoryStore';

/**
 * Main map component that renders the geopolitical map using SVG
 */
export default function MapView() {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewBox, setViewBox] = useState('0 0 1647 789');
  
  const { setSelected } = useTerritoryStore();
  
  // Load map data on mount
  useEffect(() => {
    loadMapData()
      .then(data => {
        setMapData(data);
        
        // Calculate viewBox from vertices
        const vertices = data.pack?.vertices || [];
        const bounds = getMapBounds(vertices);
        const padding = 20;
        setViewBox(`${bounds.minX - padding} ${bounds.minY - padding} ${bounds.maxX - bounds.minX + padding * 2} ${bounds.maxY - bounds.minY + padding * 2}`);
        
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  // Get color for a state (default colors for now)
  const getStateColor = (stateId) => {
    if (stateId === 0 || stateId === -1) return '#e5e7eb'; // Unclaimed/gray
    const colors = [
      '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
      '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
    ];
    return colors[stateId % colors.length] || '#9ca3af';
  };
  
  // Handle cell click
  const handleCellClick = (cell, event) => {
    event.stopPropagation();
    console.log('Cell clicked:', cell);
    
    if (cell.state !== undefined && cell.state !== -1) {
      setSelected(cell.state, 'state');
    } else if (cell.province !== undefined && cell.province !== -1) {
      setSelected(cell.province, 'province');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl">Loading map...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-red-500">Error loading map: {error}</div>
      </div>
    );
  }
  
  if (!mapData) {
    return null;
  }
  
  const cells = mapData.pack?.cells || [];
  const vertices = mapData.pack?.vertices || [];
  
  return (
    <div className="w-full h-full bg-amber-50 relative overflow-hidden">
      <svg
        viewBox={viewBox}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ background: '#fef3c7' }}
      >
        {/* Render cells/polygons */}
        {cells.map((cell, index) => {
          const polygon = getCellPolygon(cell, vertices);
          if (polygon.length === 0) return null;
          
          const points = polygon.map(([x, y]) => `${x},${y}`).join(' ');
          const fillColor = getStateColor(cell.state);
          const opacity = cell.state === 0 || cell.state === -1 ? 0.3 : 0.7;
          
          return (
            <polygon
              key={`cell-${cell.i}`}
              points={points}
              fill={fillColor}
              stroke="#6b7280"
              strokeWidth="0.5"
              opacity={opacity}
              className="cursor-pointer hover:opacity-100 transition-opacity"
              onClick={(e) => handleCellClick(cell, e)}
            />
          );
        })}
      </svg>
    </div>
  );
}
