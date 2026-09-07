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
  {
    id: 2,
    slug: "post-renovation-to-auction-window-cleaning-perth",
    title: "From Post-Renovation to Auction Day: A Complete Property Journey",
    date: "2026-09-07T10:00:00Z",
    suburb: "Perth",
    nearbySuburbs: [
      "perth", "subiaco", "nedlands", "claremont", "dalkeith", "cottesloe", "city-beach", "mosman-park", "mount-lawley", "south-perth"
    ],
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771873841/residential-window-cleaning_nhnoux.jpg",
    images: [],
    excerpt: "We managed the window cleaning for a beautiful property over a six-month period, handling everything from an intensive post-renovation clean to pristine pre-sale detailing and final pre-auction touch-ups.",
    serviceType: ["Post-Renovation Cleaning", "Pre-Sale Cleaning", "Strata & Property Management"],
    challenge: "Following extensive renovations and painting, the property's glass was covered in paint marks, oil residue, construction dust, and chemical buildup. Featuring large glass panels, sliding doors, delicate vintage windows, skylights, and glass pool fencing, the job required meticulous care. The property manager needed a reliable team to maintain this pristine condition through the entire marketing campaign up to auction day.",
    solution: "We commenced with a highly detailed post-renovation builder's clean, using specialized scrapers and premium solutions to safely lift the paint and construction residue from the glass and frames. Over the subsequent six months, we partnered closely with the property manager, returning for scheduled pre-sale and pre-auction touch-ups. Our established familiarity with the property's unique layout allowed us to work with maximum efficiency.",
    result: "The property was successfully auctioned! By managing the window cleaning throughout the entire six-month lifecycle, we ensured flawless presentation at every critical stage. The property manager enjoyed total peace of mind, knowing a familiar, reliable team was on hand—even accommodating a last-minute weather-related touch-up before the final home open.",
    jobDetails: {
      crew: "Specialist detailing crew",
      duration: "Multiple visits over 6 months",
      property: "Premium Renovated Home",
      services: ["Post-renovation builder's clean", "Pre-sale detailing", "Pre-auction touch-up", "Skylight & vintage window care", "Glass pool fence cleaning"],
    },
    sections: [
      {
        heading: "Phase 1: The Post-Renovation Clean",
        body: "We were initially called in after major renovations and painting had wrapped up. Post-renovation cleaning is significantly more demanding than standard maintenance. The glass throughout the property was marred by paint overspray, oil residue, heavy construction dust, and chemical buildup. Because the home featured a mix of large modern glass panels, sliding doors, delicate vintage windows, and extensive glass pool fencing, a 'one size fits all' approach wouldn't work. We utilized specialized glass scrapers and professional-grade mineral removers to carefully strip the contaminants away, bringing the glass back to its best without damaging the underlying surfaces."
      },
      {
        heading: "Phase 2: Market Preparation & The Pre-Auction Polish",
        body: "Once the property was ready to hit the market, real estate photography and home opens became the priority. We returned for a second comprehensive clean to ensure the property looked pristine for potential buyers. First impressions are critical in real estate, and streaks or smudges on expansive glass features can immediately detract from a home's perceived value. Fast forward to the week of the auction, and the property manager called us in for a final touch-up. We even prepared a contingency plan to quickly return if weekend rain threatened the flawless finish before the auction hammer fell. The result? A highly successful auction and a thrilled vendor."
      },
      {
        heading: "Why We Love Repeat Property Management Work",
        body: "Some customers call us once. Others become long-term clients. This property is a perfect example. Over approximately six months, we cleaned this property 3–4 times, working alongside the property manager through renovations, market preparation, auction and after-sale maintenance. And there is a big advantage to that: We already know the property. We know which windows need extra attention, where residue tends to build up, which glass needs a gentler approach and all those little nooks and crannies that can easily be missed. After completing yet another clean, the property manager even asked us to come back for a quick touch-up if it rains over the weekend. That is the kind of service we aim to provide — reliable, affordable and familiar with your property."
      },
      {
        heading: "Complete Real Estate & Strata Cleaning Services",
        body: "Whether you're a property manager, real estate agent, homeowner or landlord, we can help get your property looking its best. Our suite of services includes pre-sale cleans, post-renovation cleans, move-in/move-out cleans, pre-auction cleans, and regular maintenance. We specialize in challenging features like windows, sliding doors, large glass panels, glass pool fencing, and skylights. If you have a property coming onto the market, being renovated, sold or handed over to new owners, give us a call. Let us take care of the glass while you take care of everything else."
      }
    ],
    tags: ["post-renovation", "pre-sale", "auction", "property management", "skylights", "pool fencing", "vintage windows"],
  }
];
