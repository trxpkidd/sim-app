
'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-screen flex items-center justify-center text-white">Loading Map...</div>
});

export default function MapWrapper() {
    return <MapComponent />;
}
