
import MapWrapper from '../components/MapWrapper';
import Sidebar from '../components/Sidebar';

export default function Home() {
    return (
        <main className="flex min-h-screen relative overflow-hidden bg-black">
            <div className="flex-grow relative">
                <MapWrapper />
            </div>
            <Sidebar />
        </main>
    );
}
