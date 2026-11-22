export interface InclusionItem {
    title: string;
    description: string;
    detail: string;
    benefits: string[];
    img: string;
}

export const whatsInclude: InclusionItem[] = [
    {
        title: "Interior & Exterior Glass",
        description:
            "Full clean of both sides of every window pane — removing dirt, water spots, and environmental buildup for a streak-free finish.",
        detail:
            "Using 100% pure deionised water on external panes and professional squeegees with microfibre detailing on interiors. We remove traffic film, coastal salt haze, dust, fingerprints, and smudges, leaving crystal-clear clarity from edge to edge.",
        benefits: [
            "Zero mineral spots, haze, or water droplets left behind",
            "Safe high-reach cleaning up to 4 storeys from ground level",
            "Both sides cleaned to immaculate streak-free standard",
        ],
        img: "/gallery/gallery-1.jpeg",
    },
    {
        title: "Frames, Sills & Tracks",
        description:
            "Frames and sills wiped clean with every service. Basic track wipes included in Standard for maintained tracks, with deep restoration available for heavy sand and insect buildup.",
        detail:
            "Perth's coastal winds and dry summer dust accumulate heavily in sliding tracks and sills, causing sliding rollers to jam and window seals to degrade prematurely. Routine maintained tracks receive a thorough wipe in our Standard package. For tracks caked in years of sand, insects, or hardened grime, our Deep Track Detailing Add-On and Supreme package deploy specialized vacuum attachments, degreasers, and detail brushes.",
        benefits: [
            "Basic track wipe included in Standard for maintained tracks",
            "Deep track scrub add-on removes heavy insect debris & sand",
            "Prevents expensive sliding door roller jamming and track corrosion",
        ],
        img: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1792771489/aspect_landing/track-cleaning-before-after.jpg",
    },
    {
        title: "Screen & Fly Screen Cleaning",
        description:
            "Screens are removed, cleaned, and refitted — removing dust, pollen, and grime that blocks airflow and reduces light.",
        detail:
            "Dirty flyscreens act like dirty air filters, blocking up to 25% of fresh breeze and casting a dark haze across your view even when the glass is clean. We carefully detach each flyscreen, brush away cobwebs, wash down the mesh, and refit securely.",
        benefits: [
            "Restores maximum airflow and natural sunlight indoors",
            "Eliminates trapped eucalyptus pollen, dust, and spider webs",
            "Carefully removed, washed, and refitted by trained technicians",
        ],
        img: "/gallery/gallery-3.jpeg",
    },
    {
        title: "Pure Water Cleaning Method",
        description:
            "We use purified, deionised water that leaves zero mineral residue on glass — meaning windows stay cleaner for longer after each service.",
        detail:
            "Perth tap water is rich in dissolved minerals (calcium and magnesium) that dry into unsightly white water spots. Our 4-stage reverse osmosis filtration system produces 0ppm deionised pure water that naturally dissolves dirt without soaps or chemicals.",
        benefits: [
            "100% deionised water with zero dissolved minerals (0ppm)",
            "Environmentally friendly — safe for children, pets, and gardens",
            "No chemical residue means glass stays cleaner up to 2x longer",
        ],
        img: "/gallery/gallery-4.jpeg",
    },
    {
        title: "Hard Water Stain Removal",
        description:
            "Stubborn mineral deposits and hard water stains are treated with specialist solutions, restoring glass clarity where standard cleaning can't.",
        detail:
            "Bore water sprinklers and harsh weather can etch dense mineral scale into glass that no ordinary wash can remove. Our restorative detailing utilizes specialised acid descaling agents, safety glass scrapers, and grade-0000 bronze wool to restore glass clarity.",
        benefits: [
            "Dissolves stubborn Perth bore water and calcium etching",
            "Non-scratch restorative technique for delicate glass",
            "Saves thousands of dollars compared to glass replacement",
        ],
        img: "/gallery/gallery-5.jpeg",
    },
];

export const processSteps = [
    { num: "01", title: "Call or Quote", body: "Call us or fill the form. We'll text a price within the hour.", clickable: true },
    { num: "02", title: "We Confirm", body: "Pick a time that works. Same-week slots usually available.", clickable: false },
    { num: "03", title: "We Clean", body: "Our team arrives on time and gets every pane streak-free.", clickable: false },
    { num: "04", title: "You Enjoy", body: "Crystal-clear windows, guaranteed. Book again anytime.", clickable: false },
];

export const windowCleaningReviews = [
    {
        id: 1,
        name: "Peter & Jill Robinson",
        reviews: "1 review",
        rating: 5,
        date: "2 weeks ago",
        content: "Fazal and his team did a great job on our windows, initially keeping us informed as to arrival time, then cleaning high 2 story windows and some hard to get to windows. Very professional and friendly unit, would recommend them to anybody looking for a window cleaner."
    },
    {
        id: 2,
        name: "Chantal Parsons",
        reviews: "8 reviews",
        rating: 5,
        date: "3 weeks ago",
        content: "Brilliant work by this team. We were more than impressed and will continue to use them yearly for our new house. We used them for the sale of our house and it changes the whole look of your home when your windows are cleaned professionally. They also removed all marks, paint and tape that were super hard to get off - highly recommend this great team of cleaners!"
    },
    {
        id: 3,
        name: "J Buchanan",
        reviews: "5 reviews",
        rating: 5,
        date: "19 weeks ago",
        content: "Aspect cleaned out gutters very professionally and swiftly engaged the task. Job was well done and all parts agreed to were completed exactly as denoted. Highly recommended."
    },
    {
        id: 4,
        name: "Diane Bayliss",
        reviews: "5 reviews",
        rating: 5,
        date: "17 weeks ago",
        content: "Aspect Window Cleaning did a great job of cleaning out Solar Panels. After showing me photos of the state of the gutters I agreed to them being cleaned and they promptly carried out that cleaning also."
    },
    {
        id: 5,
        name: "Vicki Slate",
        reviews: "5 reviews",
        rating: 5,
        date: "22 weeks ago",
        content: "These guys did a fantastic job cleaning windows, jams, runners, pressure washing eaves, decks and side walks, removing mould from brickwork., that hadn't been done in probably 10 years. We thought the new owners would need to replace the windows so potentially this added $20,000 value to the house. On time, friendly and professional. Highly recommend them."
    },
    {
        id: 6,
        name: "Katie Hunter",
        reviews: "4 reviews",
        rating: 5,
        date: "12 weeks ago",
        content: "Flynn cleaned the top story of our house including sky lights and solar panels. He did a fantastic job. The equipment he uses is amazing. I wouldn't hesitate to recommend Aspect Window Cleaning."
    }
];

export const galleryImages = [
    {
        thumb: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_400/v1789141016/aspect_landing/expert-window-cleaning-perth.jpg",
        full: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789141016/aspect_landing/expert-window-cleaning-perth.jpg"
    },
    {
        thumb: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_400/v1792766954/aspect_landing/window-track-cleaning-perth.jpg",
        full: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1792766954/aspect_landing/window-track-cleaning-perth.jpg"
    },
    {
        thumb: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_400/v1789141708/aspect_landing/exterior-glass-cleaning-perth-specialists.jpg",
        full: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789141708/aspect_landing/exterior-glass-cleaning-perth-specialists.jpg"
    },
    {
        thumb: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_400/v1789142616/aspect_landing/professional-window-washers-perth.jpg",
        full: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789142616/aspect_landing/professional-window-washers-perth.jpg"
    },
    {
        thumb: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_400/v1789142856/aspect_landing/perth-window-cleaners-in-action.jpg",
        full: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789142856/aspect_landing/perth-window-cleaners-in-action.jpg"
    },
    {
        thumb: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_400/v1789141508/aspect_landing/residential-window-cleaning-wa.jpg",
        full: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789141508/aspect_landing/residential-window-cleaning-wa.jpg"
    }
];
