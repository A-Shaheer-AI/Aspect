export interface Suburb {
    name: string;
    region: 'North' | 'South';
}

export const ALL_SUBURBS: Suburb[] = [
    // North of River
    { name: 'Alexander Heights', region: 'North' },
    { name: 'Alkimos', region: 'North' },
    { name: 'Balcatta', region: 'North' },
    { name: 'Balga', region: 'North' },
    { name: 'Ballajura', region: 'North' },
    { name: 'Bayswater', region: 'North' },
    { name: 'Bedford', region: 'North' },
    { name: 'Burns Beach', region: 'North' },
    { name: 'Butler', region: 'North' },
    { name: 'Carine', region: 'North' },
    { name: 'Churchlands', region: 'North' },
    { name: 'City Beach', region: 'North' },
    { name: 'Claremont', region: 'North' },
    { name: 'Clarkson', region: 'North' },
    { name: 'Connolly', region: 'North' },
    { name: 'Cottesloe', region: 'North' },
    { name: 'Craigie', region: 'North' },
    { name: 'Currambine', region: 'North' },
    { name: 'Dalkeith', region: 'North' },
    { name: 'Dianella', region: 'North' },
    { name: 'Doubleview', region: 'North' },
    { name: 'Duncraig', region: 'North' },
    { name: 'East Perth', region: 'North' },
    { name: 'Edgewater', region: 'North' },
    { name: 'Ellenbrook', region: 'North' },
    { name: 'Floreat', region: 'North' },
    { name: 'Greenwood', region: 'North' },
    { name: 'Gwelup', region: 'North' },
    { name: 'Hamersley', region: 'North' },
    { name: 'Hillarys', region: 'North' },
    { name: 'Innaloo', region: 'North' },
    { name: 'Joondalup', region: 'North' },
    { name: 'Karrinyup', region: 'North' },
    { name: 'Kingsley', region: 'North' },
    { name: 'Leederville', region: 'North' },
    { name: 'Maylands', region: 'North' },
    { name: 'Mindarie', region: 'North' },
    { name: 'Morley', region: 'North' },
    { name: 'Mosman Park', region: 'North' },
    { name: 'Mount Claremont', region: 'North' },
    { name: 'Mount Hawthorn', region: 'North' },
    { name: 'Mount Lawley', region: 'North' },
    { name: 'Mullaloo', region: 'North' },
    { name: 'Nedlands', region: 'North' },
    { name: 'North Beach', region: 'North' },
    { name: 'North Perth', region: 'North' },
    { name: 'Ocean Reef', region: 'North' },
    { name: 'Padbury', region: 'North' },
    { name: 'Peppermint Grove', region: 'North' },
    { name: 'Perth', region: 'North' },
    { name: 'Quinns Rocks', region: 'North' },
    { name: 'Scarborough', region: 'North' },
    { name: 'Sorrento', region: 'North' },
    { name: 'Subiaco', region: 'North' },
    { name: 'Swanbourne', region: 'North' },
    { name: 'Trigg', region: 'North' },
    { name: 'Wanneroo', region: 'North' },
    { name: 'Warwick', region: 'North' },
    { name: 'Wembley', region: 'North' },
    { name: 'West Perth', region: 'North' },
    { name: 'Woodlands', region: 'North' },
    { name: 'Yanchep', region: 'North' },
    { name: 'Yokine', region: 'North' },

    // South of River
    { name: 'Alfred Cove', region: 'South' },
    { name: 'Applecross', region: 'South' },
    { name: 'Ardross', region: 'South' },
    { name: 'Armadale', region: 'South' },
    { name: 'Attadale', region: 'South' },
    { name: 'Atwell', region: 'South' },
    { name: 'Baldivis', region: 'South' },
    { name: 'Bateman', region: 'South' },
    { name: 'Beaconsfield', region: 'South' },
    { name: 'Belmont', region: 'South' },
    { name: 'Bentley', region: 'South' },
    { name: 'Bibra Lake', region: 'South' },
    { name: 'Bicton', region: 'South' },
    { name: 'Booragoon', region: 'South' },
    { name: 'Bull Creek', region: 'South' },
    { name: 'Byford', region: 'South' },
    { name: 'Canning Vale', region: 'South' },
    { name: 'Cannington', region: 'South' },
    { name: 'Cockburn Central', region: 'South' },
    { name: 'Como', region: 'South' },
    { name: 'Coogee', region: 'South' },
    { name: 'East Fremantle', region: 'South' },
    { name: 'East Victoria Park', region: 'South' },
    { name: 'Fremantle', region: 'South' },
    { name: 'Gosnells', region: 'South' },
    { name: 'Hamilton Hill', region: 'South' },
    { name: 'Harrisdale', region: 'South' },
    { name: 'Kardinya', region: 'South' },
    { name: 'Kensington', region: 'South' },
    { name: 'Leeming', region: 'South' },
    { name: 'Manning', region: 'South' },
    { name: 'Melville', region: 'South' },
    { name: 'Mount Pleasant', region: 'South' },
    { name: 'Murdoch', region: 'South' },
    { name: 'Myaree', region: 'South' },
    { name: 'Palmyra', region: 'South' },
    { name: 'Piara Waters', region: 'South' },
    { name: 'Riverton', region: 'South' },
    { name: 'Rockingham', region: 'South' },
    { name: 'Rossmoyne', region: 'South' },
    { name: 'Shelley', region: 'South' },
    { name: 'South Fremantle', region: 'South' },
    { name: 'South Perth', region: 'South' },
    { name: 'Southern River', region: 'South' },
    { name: 'Success', region: 'South' },
    { name: 'Thornlie', region: 'South' },
    { name: 'Victoria Park', region: 'South' },
    { name: 'Willetton', region: 'South' },
    { name: 'Winthrop', region: 'South' },
];

export function getRandomSuburbs(count: number): string[] {
    const array = [...ALL_SUBURBS];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, count).map(s => s.name);
}

// Pre-compute sorted regions at module load time (runs once)
// This makes getSuburbsByRegion an O(1) operation
const NORTH_SUBURBS = ALL_SUBURBS
    .filter(s => s.region === 'North')
    .sort((a, b) => a.name.localeCompare(b.name));

const SOUTH_SUBURBS = ALL_SUBURBS
    .filter(s => s.region === 'South')
    .sort((a, b) => a.name.localeCompare(b.name));

// O(1) - instant access to pre-computed lists
export function getSuburbsByRegion() {
    return {
        North: NORTH_SUBURBS,
        South: SOUTH_SUBURBS
    };
}

