
import fs from 'fs';
const map = JSON.parse(fs.readFileSync('public/map.json', 'utf8'));
console.log('Keys in map:', Object.keys(map));
if (map.pack) {
    console.log('Keys in map.pack:', Object.keys(map.pack));
    if (map.pack.vertices) {
        console.log('Vertices is present, type:', typeof map.pack.vertices);
        // Check if it's an array or length
        if (Array.isArray(map.pack.vertices)) {
            console.log('Vertices length:', map.pack.vertices.length);
        }
    }
}
