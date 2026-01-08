
'use client';

import { useStore } from '../store/useStore';

export default function Sidebar() {
    const { selectedProvince, hoveredProvince } = useStore();

    const displayData = hoveredProvince || selectedProvince;

    return (
        <div className="w-80 h-full bg-gray-900 text-white p-4 overflow-y-auto border-l border-gray-700 font-sans shadow-xl z-50 absolute right-0 top-0 pointer-events-auto">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Province Details</h2>

            {!displayData ? (
                <p className="text-gray-400 italic">Hover or click a province to see details.</p>
            ) : (
                <div className="space-y-4">
                    <div>
                        <span className="text-gray-400 block text-sm">ID</span>
                        <span className="text-xl font-mono">{displayData.i}</span>
                    </div>

                    <div>
                        <span className="text-gray-400 block text-sm">Province Index</span>
                        <span className="text-lg">{displayData.province}</span>
                    </div>

                    <div>
                        <span className="text-gray-400 block text-sm">State Index</span>
                        <span className="text-lg">{displayData.state}</span>
                    </div>

                    <div>
                        <span className="text-gray-400 block text-sm">Biome Index</span>
                        <span className="text-lg">{displayData.biome}</span>
                    </div>

                    <div>
                        <span className="text-gray-400 block text-sm">Population</span>
                        <span className="text-lg">{displayData.pop ? Math.round(displayData.pop) : 'N/A'}</span>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Raw Data</h3>
                        <pre className="text-xs text-gray-500 overflow-x-auto bg-black p-2 rounded">
                            {JSON.stringify(displayData, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
