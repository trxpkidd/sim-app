/**
 * Utility functions for loading and processing Azgaar Fantasy Map Generator data
 */

/**
 * Load map data from JSON file
 */
export async function loadMapData() {
  try {
    const response = await fetch('/map.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading map data:', error);
    throw error;
  }
}

/**
 * Get polygon coordinates for a cell
 * @param {Object} cell - Cell object from map data
 * @param {Array} vertices - Vertices array from map data
 * @returns {Array} Array of [x, y] coordinates
 */
export function getCellPolygon(cell, vertices) {
  if (!cell.v || !vertices) return [];
  
  return cell.v.map(vertexIndex => {
    const vertex = vertices[vertexIndex];
    return vertex ? vertex.p : [0, 0];
  });
}

/**
 * Get all cells for a given state
 * @param {Array} cells - Cells array from map data
 * @param {Number} stateId - State ID
 * @returns {Array} Array of cell objects
 */
export function getCellsForState(cells, stateId) {
  return cells.filter(cell => cell.state === stateId);
}

/**
 * Get all cells for a given province
 * @param {Array} cells - Cells array from map data
 * @param {Number} provinceId - Province ID
 * @returns {Array} Array of cell objects
 */
export function getCellsForProvince(cells, provinceId) {
  return cells.filter(cell => cell.province === provinceId);
}

/**
 * Calculate bounding box for all vertices
 * @param {Array} vertices - Vertices array
 * @returns {Object} {minX, minY, maxX, maxY}
 */
export function getMapBounds(vertices) {
  if (!vertices || vertices.length === 0) {
    return { minX: 0, minY: 0, maxX: 1000, maxY: 1000 };
  }
  
  const coords = vertices.map(v => v.p);
  const minX = Math.min(...coords.map(c => c[0]));
  const minY = Math.min(...coords.map(c => c[1]));
  const maxX = Math.max(...coords.map(c => c[0]));
  const maxY = Math.max(...coords.map(c => c[1]));
  
  return { minX, minY, maxX, maxY };
}
