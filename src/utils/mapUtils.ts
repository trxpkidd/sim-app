
interface AzgaarMap {
    pack: {
        cells: {
            i: number;
            v: number[];
            c: number[];
            p: [number, number];
            [key: string]: any;
        }[];
        vertices: [number, number][] | { [key: string]: any }[];
        [key: string]: any;
    };
}

export const loadMapData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export const getCellVertices = (cellId: number, mapData: AzgaarMap) => {
    const cell = mapData.pack.cells[cellId];
    if (!cell) return [];
    const vertices = mapData.pack.vertices;
    // Check if vertices are arrays of numbers or objects
    return cell.v.map(vIndex => {
        // @ts-ignore
        return vertices[vIndex];
    });
};

export const getAllCellsPolygons = (mapData: AzgaarMap) => {
    if (!mapData || !mapData.pack) return [];
    return mapData.pack.cells.map(cell => {
        const vertices = cell.v.map(vIdx => mapData.pack.vertices[vIdx]);
        return {
            id: cell.i,
            vertices,
            data: cell
        };
    });
};
