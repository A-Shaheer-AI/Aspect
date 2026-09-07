export type CaseStudy = {
  id: number;
  slug: string;
  title: string;
  date: string;
  suburb: string;
  nearbySuburbs: string[]; // slugs of related location pages to show this study on
  thumbnail: string; // main image URL
  images?: string[]; // additional gallery images
  excerpt: string;
  serviceType: string[];
  challenge: string;
  solution: string;
  result: string;
  jobDetails: {
    crew?: string;
    duration?: string;
    property?: string;
    services?: string[];
  };
  sections: {
    heading: string;
    body: string;
  }[];
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "mount-pleasant-pre-sale-window-cleaning",
    title: "Getting This Mount Pleasant Property Market-Ready — On a Tight Deadline",
    date: "2026-09-01T09:00:00Z",
    suburb: "Mount Pleasant",
    nearbySuburbs: [
      "mount-pleasant",
      "applecross",
      "ardross",
      "booragoon",
      "bateman",
      "melville",
      "attadale",
      "myaree",
      "bull-creek",
      "kardinya",
      "riverton",
      "shelley",
      "rossmoyne",
      "willetton",
      "winthrop"
    ],
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771873841/residential-window-cleaning_nhnoux.jpg",
    images: [],
    excerpt: "A Mount Pleasant homeowner needed a full, detailed window clean — louvre windows, pool fencing, flyscreens and tracks — all completed within a tight pre-sale deadline. We delivered with a four-man crew in four hours.",
    serviceType: ["Residential Window Cleaning", "Pre-Sale Cleaning"],
    challenge: "The property had complex louvre windows, heavily soiled window tracks, multiple fly screens, and extensive glass pool fencing — all of which needed meticulous attention before the home went on the market. The owner had a strict deadline imposed by their real estate agent, and there was simply no room for delays.",
    solution: "We attended for a same-day quote assessment and mobilised a four-man crew the following day. Working systematically room by room and section by section, the team cleaned every louvre, scrubbed every track, washed all fly screens, and detailed the glass pool fencing — all while carefully working around the family, their children, and their dog to maintain a safe and efficient work environment.",
    result: "The full job was completed in approximately four hours. The property presented immaculately for its real estate photography and subsequent home opens. The booking came through a referral from the listing agent, to whom we are grateful. We are currently seeking their permission to feature this property by name and are looking to acknowledge the referral with our standard $30 referral reward as promised.",
    jobDetails: {
      crew: "4-man crew",
      duration: "Approximately 4 hours",
      property: "Large residential home, Mount Pleasant",
      services: ["Louvre window cleaning", "Window track scrubbing", "Flyscreen washing", "Glass pool fence cleaning", "Frame and sill wipe-down"],
    },
    sections: [
      {
        heading: "The Property and the Challenge",
        body: "When a Mount Pleasant homeowner contacted us ahead of listing their property for sale, the brief was clear: the home needed to be presented in absolute top condition, and quickly. Mount Pleasant is one of Perth's most sought-after riverside suburbs, and properties here attract discerning buyers who will notice every detail. That meant we couldn't cut corners. The home featured louvre windows throughout — a style that accumulates dust and grime in each individual slat's track and frame. On top of that, there were several large glass pool fencing panels, multiple fly screens, and window tracks that had collected years of outdoor grime. Pre-sale cleaning of this scope requires patience, the right equipment, and the kind of attention to detail that only a trained, experienced crew can deliver.",
      },
      {
        heading: "How We Approached the Job",
        body: "From the moment we received the inquiry, speed and thoroughness were the twin priorities. We conducted a same-day quote visit, assessed every area of the property, and scheduled the crew for the next available day. On the day of the clean, we deployed a four-man crew to ensure the job could be completed within a tight four-hour window without sacrificing quality. Each team member was assigned specific zones. Louvre windows were cleaned blade by blade — each individual pane removed, washed, dried and replaced. Tracks were scrubbed with specialist brushes to extract built-up grime. The glass pool fencing panels were treated with a professional solution to lift any water staining or mineral deposits before being squeegeed to a streak-free finish. Fly screens were washed and dried before being refitted. Throughout the entire job, the crew worked carefully around the family at home, including young children and the family dog, ensuring safety was maintained at every stage.",
      },
      {
        heading: "Pre-Sale Cleaning: Why It Matters",
        body: "Real estate photography is the first thing buyers see online, and it happens before any home open. Windows are one of the most visible elements in property photography — dirty or streaky glass immediately signals a poorly maintained home, even if everything else is immaculate. A professional pre-sale window clean can directly affect the perceived value of a property and the quality of offers it attracts. In our experience, the cost of a thorough pre-sale window clean is almost always recovered many times over in the final sale price or the speed of the sale. For this Mount Pleasant property, the clean was booked through a referral from the listing real estate agent — a relationship we value greatly. Any agent who refers a client to us receives our $30 referral reward, and we make every effort to deliver results that reflect well on them.",
      },
      {
        heading: "Our Referral Programme for Real Estate Agents",
        body: "We work closely with real estate agents across the Perth metropolitan area. Whether you are preparing a property for auction, private treaty, or a lease renewal inspection, we can deliver a thorough, professional clean on your client's timeline. Our standard referral programme offers a $30 reward for every client booking that comes through an agent referral. We are currently seeking permission from the agent involved in this Mount Pleasant job to acknowledge them by name. If you are a property manager or sales agent and would like to establish an ongoing referral arrangement with our team, we would welcome the conversation.",
      },
    ],
    tags: ["pre-sale cleaning", "mount pleasant", "louvre windows", "pool fencing", "fly screens", "window tracks", "real estate"],
  },
];
