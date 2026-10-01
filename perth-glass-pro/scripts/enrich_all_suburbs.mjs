import fs from 'fs';
import path from 'path';

const SUBURBS_FILE = path.resolve('lib/perth_suburbs.json');
const rawData = JSON.parse(fs.readFileSync(SUBURBS_FILE, 'utf-8'));

// Base depot location
const BASE_DEPOT = {
    address: "183 Stirling Hwy, Nedlands WA 6009",
    suburb: "Nedlands",
    postcode: "6009"
};

console.log("Total North Suburbs:", rawData.regions.north_of_river.suburbs.length);
console.log("Total South Suburbs:", rawData.regions.south_of_river.suburbs.length);
