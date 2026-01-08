
'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, Polygon, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useStore } from '../store/useStore';
import { loadMapData, getAllCellsPolygons } from '../utils/mapUtils';

// Fix for default marker icon in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapContent = () => {
    const { mapData, setMapData, setSelectedProvince, setHoveredProvince } = useStore();
    const [polygons, setPolygons] = useState<any[]>([]);
    const map = useMap();

    useEffect(() => {
        const fetchData = async () => {
            if (!mapData) {
                const data = await loadMapData('/map.json');
                setMapData(data);

                // Set map view bounds based on map info
                if (data.info) {
                    const { width, height } = data.info;
                    // CRS.Simple: [y, x]. map coordinates are [row, col] usually or [y, x]
                    // Azgaar coords are [x, y]. Leaflet unproject: map [x, y] to latLng.
                    // For CRS.Simple, it's direct.
                    const bounds: L.LatLngBoundsExpression = [[0, 0], [height, width]];
                    map.fitBounds(bounds);
                }
            }
        };
        fetchData();
    }, [mapData, setMapData, map]);

    useEffect(() => {
        if (mapData) {
            const range = getAllCellsPolygons(mapData);
            setPolygons(range);
        }
    }, [mapData]);

    return (
        <>
            {polygons.map((poly) => {
                // Azgaar vertices are [x, y]. Leaflet expects [lat, lng] = [y, x] (usually).
                // Actually for CRS.Simple, standard is [y, x] too if we treat y as lat.
                // We need to invert coordinates.
                const positions = poly.vertices.map((v: any) => [v[1], v[0]] as [number, number]);

                return (
                    <Polygon
                        key={poly.id}
                        positions={positions}
                        pathOptions={{
                            color: '#333',
                            weight: 0.5,
                            fillColor: `hsl(${poly.data.province * 13 % 360}, 70%, 50%)`, // Randomish color by province
                            fillOpacity: 0.5
                        }}
                        eventHandlers={{
                            click: () => setSelectedProvince(poly.data),
                            mouseover: (e) => {
                                const layer = e.target;
                                layer.setStyle({ fillOpacity: 0.8, weight: 2 });
                                setHoveredProvince(poly.data);
                            },
                            mouseout: (e) => {
                                const layer = e.target;
                                layer.setStyle({ fillOpacity: 0.5, weight: 0.5 });
                                setHoveredProvince(null);
                            }
                        }}
                    >
                        <Tooltip sticky>{`Cell ${poly.id} (Prov: ${poly.data.province})`}</Tooltip>
                    </Polygon>
                );
            })}
        </>
    );
};

interface MapProps { }

const MapComponent: React.FC<MapProps> = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <MapContainer
                center={[0, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%', background: '#1e1e1e' }}
                crs={L.CRS.Simple}
                minZoom={-2}
            >
                <MapContent />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
