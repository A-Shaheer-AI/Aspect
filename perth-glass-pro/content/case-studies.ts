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
  googlePosts?: string[];
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
    slug: "post-renovation-to-auction-window-cleaning-subiaco",
    title: "From Post-Renovation to Auction Day: A Complete Property Journey",
    date: "2026-09-07T10:00:00Z",
    suburb: "Subiaco",
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
    googlePosts: [
      "https://posts.gle/sRSweqVdnrURyTgQ6",
      "https://posts.gle/VrXtYmem5fJFzTs16"
    ],
  },
  {
    id: 3,
    slug: "coastal-pre-sale-window-cleaning-eglinton",
    title: "Coastal Pre-Sale Window Cleaning in Eglinton: Erasing Years of Salt Buildup",
    date: "2026-09-07T11:00:00Z",
    suburb: "Eglinton",
    nearbySuburbs: [
      "eglinton", "alkimos", "yanchep", "jindalee", "butler", "quinns-rocks", "two-rocks", "mindarie", "clarkson"
    ],
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771873841/residential-window-cleaning_nhnoux.jpg",
    images: [],
    excerpt: "See how we transformed this beautiful coastal home in Eglinton on a tight deadline. By removing years of stubborn ocean salt buildup, we helped the homeowner get their property market-ready and looking pristine.",
    serviceType: ["Residential Window Cleaning", "Pre-Sale Cleaning", "Coastal Property Maintenance"],
    challenge: "The homeowner of this beautiful coastal property in Eglinton (WA 6034) was preparing to list their home on the market. Located right by the ocean, the windows were heavily coated in years of thick, baked-on salt buildup. Under immense pressure with everything happening at once, the owner required the cleaning to be completed on a very urgent deadline.",
    solution: "Our team came in clutch to meet the urgent deadline. We utilized professional-grade equipment to carefully break down and strip away the hardened coastal salt spray without risking any damage to the glass or frames. We worked efficiently as a team to transform the entire property's exterior and interior windows within the strict timeframe.",
    result: "The windows came up beautifully, completely free of the stubborn salt haze, leaving the entire house refreshed and ready for sale. The homeowner was incredibly relieved and thrilled with the results. For our team, hearing the ocean waves in the background while watching years of salt wash away made it a highly satisfying job.",
    jobDetails: {
      crew: "Rapid response crew",
      duration: "Urgent turnaround",
      property: "Coastal Residential Home",
      services: ["Pre-sale window cleaning", "Heavy salt residue removal", "Exterior and interior glass detailing"],
    },
    sections: [
      {
        heading: "The Challenge: Tight Deadlines and Heavy Ocean Salt",
        body: "Preparing a home for the real estate market is always a stressful time for homeowners, but it becomes even more challenging when you're dealing with coastal conditions. This beautiful property in Eglinton, WA 6034, sits right by the ocean. While the location is stunning, the constant exposure to sea breezes meant the windows had accumulated years of thick salt buildup. The homeowner was under a lot of pressure to get the property listed and needed the windows restored to absolute clarity on a very tight, urgent schedule."
      },
      {
        heading: "Our Approach: Coming in Clutch for the Client",
        body: "Understanding the urgency of the pre-sale timeline, our team quickly mobilized to get the job done. Removing baked-on sea salt requires more than just a quick wipe down; if not done correctly, the abrasive salt crystals can easily scratch the glass. We systematically broke down the heavy salt layers, meticulously cleaning the glass, frames, and tracks. Despite the rush, we didn't compromise on quality, ensuring every panel was left completely streak-free and sparkling."
      },
      {
        heading: "The Result: A Market-Ready Coastal Home",
        body: "The homeowner was extremely happy with the final result, and honestly, so were we! There is something incredibly satisfying about hearing the ocean waves in the background while watching years of opaque salt buildup simply melt away from the glass. The windows came up beautifully, and the entire house looked instantly refreshed, maximizing its curb appeal for upcoming home opens and real estate photography."
      },
      {
        heading: "Specialist Cleaning for Coastal Properties",
        body: "Properties along Perth's northern coastal corridor—from Mindarie and Quinns Rocks up to Alkimos, Eglinton, and Yanchep—require specialized window cleaning. The combination of intense WA sun and continuous salt spray creates a hazy, corrosive layer on glass and aluminium frames that standard household cleaners simply cannot remove. Whether you are selling, renting out, or just want to maintain the value of your oceanfront home, professional window cleaning is an essential investment."
      }
    ],
    tags: ["eglinton", "coastal window cleaning", "pre-sale", "salt removal", "urgent booking", "real estate"],
    googlePosts: [
      "https://posts.gle/imdd7sPFtmkXoYBi7"
    ],
  }
];
