export type CaseStudy = {
  id: number;
  slug: string;
  title: string;
  date: string;
  suburb: string;
  nearbySuburbs: string[]; // slugs of related location pages to show this study on
  thumbnail: string; // main image URL
  images?: string[]; // additional gallery images
  clientLogo?: string; // optional client logo
  clientName?: string; // optional client name
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
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771873841/residential-window-cleaning_nhnoux.jpg",
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
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578382/Pre-sale_Window_Cleaning_in_Subiaco_tf2rtg.jpg",
    images: [
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578382/Pre-sale_Window_Cleaning_in_Subiaco_tf2rtg.jpg",
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578794/Window_Cleaning_Crew_in_Subiaco_kdigjx.heic",
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578789/Skylights_Cleaning_in_Subiaco_nntr7x.heic",
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578791/Pool_fence_cleaning_s1z8zt.heic",
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578789/Glass_balustrade_cleaning_ti7s2k.heic",
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578790/Bathroom_High_Reach_Windows_r8ma3d.heic",
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578789/Million_dollar_property_maintenance_standards_cych8d.heic",
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789578790/Pre-sale_inspection_window_cleaning_i8ypwb.heic",
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789142856/aspect_landing/perth-window-cleaners-in-action.jpg"
    ],
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
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771873841/residential-window-cleaning_nhnoux.jpg",
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
  },
  {
    id: 4,
    slug: "rockingham-toyota-dealership-high-reach-commercial-clean",
    title: "Rockingham Toyota Showroom: High-Reach EWP Facade, Signage & Dealership Detailing",
    date: "2025-09-15T08:00:00Z",
    suburb: "Rockingham",
    nearbySuburbs: [
      "rockingham",
      "east-rockingham",
      "baldivis",
      "waikiki",
      "warnbro",
      "safety-bay",
      "shoalwater",
      "port-kennedy",
      "secret-harbour",
      "kwinana-town-centre",
      "kwinana-beach",
      "wellard",
      "cooloongup",
      "hillman",
      "mandurah",
      "fremantle",
      "perth"
    ],
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771960129/commercial-sign-cleaning_jzafjr.jpg",
    images: [
      "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771960138/sign-cleaning-2_ozlp2x.jpg"
    ],
    excerpt: "When a head contractor needed proven commercial specialists for the Rockingham Toyota showroom, they trusted Aspect. From deploying our first certified EWP cherry picker to deep-cleaning neglected high-level architectural fascia, 3D corporate logos, and towering roadside pylons, here is the story of how our commercial division took flight.",
    serviceType: [
      "Commercial Facade Cleaning",
      "High-Reach Signage Detailing",
      "EWP Cherry Picker Operation",
      "Dealership Window Cleaning",
      "Commercial Subcontracting"
    ],
    challenge: "The Rockingham Toyota showroom presented a multifaceted commercial brief: high-level architectural fascia cladding and canopies positioned well above ground level, illuminated 3D corporate signage with intricate internal lighting bays, an un-level ground slope on one building elevation preventing machinery setup, and a massive roadside pylon totem signpost. Crucially, the horizontal top surfaces of the showroom fascia had been neglected during previous cleans, resulting in heavy dirt accumulation that washed down whenever water was applied.",
    solution: "We deployed an Elevated Work Platform (EWP cherry picker) operated by our certified high-risk work licensed technician, supported by utility support vehicles and carbon-fiber water-fed reach pole systems. Instead of a superficial face rinse, we carried out a comprehensive 360° deep clean—scrubbing the top ledges, undersides, and sign housings, safely disassembling sign faces to hand-detail the interiors with damp microfiber cloths, and adapting to the sloped terrain with long-reach pure water poles from safe ground positions. To ensure complete customer satisfaction, the crew remained late into the evening to detail an overlooked final signboard.",
    result: "The Toyota dealership manager personally inspected the showroom and expressed genuine appreciation for the immaculate transformation and attention to detail. For Aspect, this milestone project cemented our commercial capabilities, proved our ability to overcome site-specific access challenges safely, and established a trusted subcontracting blueprint that continues to guide our commercial partnerships across Western Australia.",
    jobDetails: {
      crew: "Certified EWP boom operator & commercial detailing technicians",
      duration: "Full-day intensive commercial project (into evening)",
      property: "Rockingham Toyota Showroom, Service Centre & Yard",
      services: [
        "Elevated Work Platform (EWP cherry picker) high-reach operation",
        "Architectural showroom fascia and parapet cladding restoration",
        "3D Toyota emblem and dealership lettering detailing",
        "Signage disassembly and internal housing wipe-down",
        "High-reach roadside pylon and totem signpost washing",
        "Sloped-terrain pure water carbon-fiber pole reach cleaning",
        "Showroom perimeter architectural awning wash & glass finish"
      ],
    },
    sections: [
      {
        heading: "The Milestone: How Aspect's Commercial Division Took Flight",
        body: "Approximately one year ago, Aspect Window Cleaning stood at an exciting crossroad. While our team had established an enviable five-star reputation in residential window cleaning across Perth and had completed smaller commercial premises, we were eager to take on larger, more demanding commercial facilities. The turning point arrived when a prime contracting company reached out to us directly. They had followed our work, seen our glowing customer reviews, and were looking for a reliable, quality-obsessed cleaning team to subcontract a flagship automotive dealership project: Rockingham Toyota. Stepping in as subcontractors for the first time was an exciting opportunity, and the mutual respect and transparent communication we experienced with the head contractor set a high standard for how subcontracting partnerships should work. Aspect remains actively open to subcontracting arrangements with professional contractors, facility managers, and builders across WA—provided there is a mutual understanding of what professional-grade commercial work requires, the equipment involved, fair commercial rates, and the physical effort demanded on site."
      },
      {
        heading: "Machinery, Mobilisation & Certified EWP Operation",
        body: "Automotive dealerships are high-profile commercial environments where pristine presentation is critical to showroom sales. The Rockingham Toyota showroom features soaring architectural fascia panels, high-level brand bulkheads, and an expansive roadside presence that standard ground-based ladders cannot service safely. This project marked our first time hiring and mobilising an Elevated Work Platform (EWP / cherry picker) alongside dedicated support utes. Safety in commercial environments is paramount: our team included a qualified technician who already held current High Risk Work certification for operating elevated work platforms. Arriving on site early, we established WorkSafe WA-compliant pedestrian exclusion zones, safety cones, and machinery outrigger pads. With our certified operator at the controls, we were able to safely position personnel right up against the high-level showroom facade, enabling hands-on detailing that ground equipment simply cannot replicate."
      },
      {
        heading: "The 'Hidden Grime' Discovery: Why Surface Rinsing Isn't Enough",
        body: "One of the most eye-opening moments of the day came when we began washing the architectural fascia—the wide cladding band above the showroom windows where the iconic Toyota emblem is mounted. The dealership had supposedly been cleaned just six months prior by another contractor, and from the ground, the vertical front face appeared relatively clean. However, the moment our technician elevated above the parapet and introduced pure water to the top ledge, torrents of thick, black sludge and baked-on dust came cascading down. The previous cleaners had simply sprayed the front face from below, neglecting the wide horizontal shelf above it. Every time it rained, that trapped dirt would wash down across the brand logo and showroom windows, ruining the finish. At Aspect, we refuse to cut corners. We carried out a complete 360-degree clean: scrubbing the top shelf, pressure-detailing the fascia joints, cleaning the underside return, and washing the 3D logo. Wherever possible, we carefully removed the sign faces to wipe down the internal lighting bays and housings with damp microfiber cloths, restoring the brilliant clarity of the illumination."
      },
      {
        heading: "Overcoming the Ground Slope Challenge",
        body: "No commercial site is entirely uniform, and Rockingham Toyota provided a real-world masterclass in adaptability. On one side elevation of the showroom, the ground featured an uneven, steep slope directly underneath the elevated Toyota logo. Operating an EWP requires level ground and stable outrigger engagement; deploying a heavy cherry picker on that particular gradient would have violated safety protocols and risked ground slippage. Rather than taking unacceptable risks or skipping that elevation, our team adapted immediately. We transitioned to our ultra-lightweight carbon-fiber water-fed reach pole system, running 0ppm deionised pure water directly from our mobile purification unit. Operating from secure, level ground footholds, our technicians carefully navigated the pole over the sloped terrain, applying specialized soft-bristle brushes to thoroughly scrub the logo and the running architectural perimeter aisle that spans across the showroom. While we could not disassemble the sign's interior from the pole, the exterior finish was brought up to a brilliant, streak-free shine that matched the rest of the facility."
      },
      {
        heading: "The Late-Night Extra Signboard & The Dealership Manager's Praise",
        body: "After tackling the showroom building, we moved our equipment out to the street to clean the towering roadside pylon signpost outside the Rockingham showroom—a prominent landmark visible to thousands of passing motorists along the main thoroughfare. Working at height against fading afternoon light, we detailed every panel of the pylon until it shone. As evening fell and the crew began the rigorous process of packing down hoses, outriggers, and machinery, we noticed one additional dealership signboard tucked away on the property that had been missed in the initial scope. Many contractors would have clocked off and left it behind. Instead, our crew unpacked the gear, reset our pure water poles, and finished the final signboard before signing off. The Rockingham Toyota dealership general manager conducted the final walkthrough and was genuinely impressed by our thoroughness, our honesty, and our commitment to leaving the entire facility spotless."
      },
      {
        heading: "A Foundation for Ongoing Commercial Growth",
        body: "Looking back, the Rockingham Toyota project was far more than just a successful day's work. It was a foundational learning experience that accelerated Aspect's evolution into a trusted commercial contractor in Western Australia. We learned firsthand the intricate choreography of machinery transport, high-reach safety planning, terrain adaptation, and the value of going above and beyond expectations. Today, Aspect Window Cleaning regularly services commercial office buildings, strata properties, retail centres, and automotive dealerships throughout the Perth metropolitan area and south to Rockingham and Mandurah. Whether working directly for property managers or providing dependable subcontracting support to fellow commercial trade contractors, we bring the same relentless work ethic, certified expertise, and pride in detail to every single job."
      }
    ],
    tags: [
      "rockingham",
      "toyota dealership",
      "commercial window cleaning",
      "ewp cherry picker",
      "signage cleaning",
      "subcontracting",
      "fascia cleaning",
      "pure water pole",
      "working at heights",
      "automotive showroom"
    ],
  },
  {
    id: 5,
    slug: "kalamunda-roof-gutter-clearing-downpipe-flush",
    title: "Kalamunda Bushland Property: Heavy Eucalyptus Gutter Clearing & Downpipe Flush Before Winter Storms",
    date: "2026-09-08T09:00:00Z",
    suburb: "Kalamunda",
    nearbySuburbs: [
      "kalamunda", "gooseberry-hill", "lesmurdie", "roleystone", "mundaring", "midland", "maida-vale", "high-wycombe", "forrestfield", "walliston"
    ],
    thumbnail: "/assets/images/services/gutter-cleaning.webp",
    images: [],
    excerpt: "A two-storey Kalamunda home surrounded by mature gum trees faced severe roof overflow and fire hazards from compacted eucalyptus litter. Our specialist crew cleared over 65kg of debris, flushed all four downpipes, and verified unobstructed drainage.",
    serviceType: ["Gutter Cleaning", "Downpipe Clearing", "Roof Valley Maintenance"],
    challenge: "Nestled in the Perth Hills bushland, the property had not had gutters serviced in over 18 months. Heavy eucalyptus canopies had dropped kilograms of leaves, gumnuts, and bark into roof valleys, completely choking four separate downpipe drop outlets. With winter storm fronts approaching, the homeowner feared roof cavity leaks, rotted fascia boards, and water pooling against the home's foundations.",
    solution: "Working with certified roof-safety equipment, our two-technician team manually scooped compacted sediment and organic sludge from 48 metres of perimeter guttering and three deep roof valleys. We cleared the blocked downpipes using high-pressure water jetting until full flow was restored to street soakwells, conducted a comprehensive visual pitch and bracket inspection, and finished with a full water flush test.",
    result: "All gutters and downpipes were restored to 100% capacity with zero overflow. The technician flagged one loose bracket join and resealed it on the spot. All collected organic waste (over 65kg) was bagged and removed from the premises, leaving the owner completely protected heading into Perth's heavy winter rainfall.",
    jobDetails: {
      crew: "2-man height-safety certified crew",
      duration: "3.5 hours",
      property: "Two-storey residential home, Kalamunda Hills",
      services: ["Perimeter gutter clearing", "Roof valley debris extraction", "High-pressure downpipe flushing", "Gutter bracket & fall inspection", "Bagged waste disposal"],
    },
    sections: [
      {
        heading: "The Challenge: Bushland Canopies & Blocked Water Flow",
        body: "Properties in the Perth Hills enjoy stunning natural bushland settings, but they face relentless organic debris. In Kalamunda, mature marri and jarrah trees drop dense leaves, heavy gumnuts, and sticky resin year-round. When left unattended over dry summer months, this buildup creates a dense, baked-on mat inside gutters and roof valleys. In this home, four separate downpipes had become entirely jammed with organic compost, meaning the first heavy downpour would inevitably overflow back under the eaves into internal ceiling cavities."
      },
      {
        heading: "Safety, Deep Cleaning & High-Pressure Downpipe Flushing",
        body: "Because the home features multiple roof pitches and two-storey drops, safety was paramount. Wearing fall-arrest harnesses and soft-grip safety boots, our technicians methodically cleared every metre of guttering by hand and specialized scoop tools into heavy-duty disposal bags. Special attention was paid to the internal roof valleys where water naturally concentrates. Once the main gutters were spotless, we tackled the choked downpipes, using specialized hose nozzle attachments to break up the dense plugs of gumnuts and wash them cleanly into storm soakwells until crystal-clear water ran freely."
      },
      {
        heading: "The Crucial Flush Test & Proactive Bracket Repair",
        body: "At Aspect, we never consider a gutter clean complete until we perform a live water flush test. Running hoses from the highest elevation confirms proper water gradient and validates that no hidden blockages remain in bends or elbows. During the test, our technician noticed minor water seepage from a sagging seam bracket on the eastern elevation. We re-aligned the bracket and resealed the join immediately—preventing an expensive future repair for the homeowner."
      },
      {
        heading: "Preventative Gutter Maintenance Across the Perth Hills",
        body: "In high-fire and heavy-leaf suburbs like Kalamunda, Lesmurdie, Mundaring, and Roleystone, bi-annual gutter cleaning is not just preventative property care—it is an essential bushfire preparedness requirement. Clean gutters eliminate dry fuel loads during summer and protect building foundations from devastating water damage during Perth's torrential winter storms."
      }
    ],
    tags: ["gutter cleaning", "kalamunda", "perth hills", "downpipe flush", "roof valleys", "eucalyptus debris", "storm protection"],
  },
  {
    id: 6,
    slug: "joondalup-solar-panel-efficiency-restoration",
    title: "Joondalup 6.6kW Residential Array: Restoring 24% Solar Output Lost to Red Dust & Bird Droppings",
    date: "2026-09-09T09:00:00Z",
    suburb: "Joondalup",
    nearbySuburbs: [
      "joondalup", "connolly", "currambine", "edgewater", "heathridge", "iluka", "kinross", "ocean-reef", "kallaroo", "beldon"
    ],
    thumbnail: "/assets/images/services/solar-panel-cleaning.webp",
    images: [],
    excerpt: "A 16-panel residential solar system in Joondalup had lost nearly a quarter of its energy generation due to baked-on summer dust and acidic bird droppings. Our deionised pure-water wash safely restored system efficiency back to peak performance.",
    serviceType: ["Solar Panel Washing", "Pure Water Cleaning", "Renewable Energy Maintenance"],
    challenge: "The homeowner noticed their solar monitoring app reporting an alarming 24% drop in daily kilowatt-hour generation compared to the same period the previous year. Positioned near open parkland in Joondalup, the 16 rooftop photovoltaic panels were coated in an opaque layer of red summer dust, coastal airborne salt haze, and heavy bird droppings that standard garden hose spraying could not lift.",
    solution: "Using our vehicle-mounted 4-stage reverse osmosis and deionisation purification system, we fed 0ppm pure mineral-free water through ultra-soft carbon-fibre telescopic poles. We pre-soaked the stubborn bird droppings with eco-friendly enzymatic descalers safe for anti-reflective coatings, followed by dual-pass mechanical scrubbing and a spotless pure-water rinse.",
    result: "The panels dried with zero mineral spots, streaks, or residue. The homeowner monitored their solar inverter app the following sunny afternoon and confirmed an immediate 24% increase in energy production, recovering approximately $280 in annual electricity bill savings.",
    jobDetails: {
      crew: "2-man trained solar cleaning specialists",
      duration: "1.5 hours",
      property: "Single-storey home, 16-panel 6.6kW solar array, Joondalup",
      services: ["Anti-reflective safe pre-soak", "0ppm deionised pure water scrub", "Bird dropping removal", "Surface crack & frame inspection", "Post-clean generation verification"],
    },
    sections: [
      {
        heading: "The Problem: The 'Invisible Cost' of Dirty Solar Panels",
        body: "Perth enjoys over 3,200 hours of sunshine each year, making solar panels one of the best investments for local homeowners. However, Western Australia's dry, windy climate blows fine red silica dust and pollen over rooftops. Combined with morning coastal dew, this dust forms a baked-on cement-like film. Furthermore, acidic bird droppings create micro-hotspots that can permanently damage photovoltaic cells. For this Joondalup client, their 6.6kW system was generating almost 5 kWh less electricity per day than it should have."
      },
      {
        heading: "Why Tap Water & Soaps Harm Solar Arrays",
        body: "Many homeowners make the costly mistake of washing solar panels with garden hoses or dish soap. Perth tap water contains high levels of dissolved calcium and magnesium (150–250 ppm) which dry into chalky white mineral spots, blocking sunlight further. Harsh detergents leave chemical residues that attract dirt even faster and risk voiding panel manufacturer warranties (such as LG, SunPower, and Jinko). Aspect uses only 0ppm deionised pure water and manufacturer-approved ultra-soft bristle heads."
      },
      {
        heading: "Execution & Immediate Solar Generation Surge",
        body: "Our technicians accessed the roof safely using anchored roof ladders and soft-soled safety footwear. We gently broke down stubborn bird droppings without scraping the tempered glass, washed each panel frame where moss tends to harbor, and rinsed with pure water. Because deionised water evaporates cleanly with no residue, the panels were left crystal-clear. The following afternoon, the homeowner shared a screenshot of their solar app showing generation had bounced straight back to expected peak summer curves."
      },
      {
        heading: "Recommended Cleaning Frequency in Perth's Northern Suburbs",
        body: "For residential solar installations across Joondalup, Wanneroo, and northern coastal suburbs, we recommend professional cleaning at least every 6 to 12 months. Regular cleaning pays for itself multiple times over in recovered energy feed-in credits and lower power bills."
      }
    ],
    tags: ["solar panel cleaning", "joondalup", "pure water", "efficiency restoration", "renewable energy", "perth solar maintenance"],
  },
  {
    id: 7,
    slug: "fremantle-heritage-brick-paver-pressure-clean",
    title: "Fremantle Heritage Property: Restoring Stained Limestone Pavers & Slippery Algae Pool Decking",
    date: "2026-09-10T09:00:00Z",
    suburb: "Fremantle",
    nearbySuburbs: [
      "fremantle", "east-fremantle", "north-fremantle", "south-perth", "cottesloe", "white-gum-valley", "beaconsfield", "hamilton-hill", "palmyra"
    ],
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771960136/shope-gates-cleaning_euctx1.jpg",
    images: [],
    excerpt: "Winter moisture and ocean breezes left this historic Fremantle home's natural limestone pavers and timber pool surrounds coated in dark, slippery algae. Our commercial-grade rotary pressure wash restored the stone's original honey warmth without surface damage.",
    serviceType: ["Pressure Washing", "Driveway & Paver Restoration", "Pool Surround Cleaning"],
    challenge: "Natural limestone and heritage paving are highly porous materials common throughout Fremantle and coastal Perth. A combination of winter shade, coastal humidity, and bore water sprinklers had allowed black algae, moss, and mineral stains to blanket 120 square metres of pool coping, entertaining patio, and driveway. The slippery surface had become a safety hazard for the owners' elderly parents and visiting grandchildren.",
    solution: "We applied an eco-friendly, biodegradable pH-neutral pre-treatment to break down deep biological algae roots without corroding the porous limestone. We then utilized a dual-nozzle 20-inch rotary surface cleaner calibrated to optimal pressure, ensuring uniform cleaning with zero zebra striping or surface gouging, finished with a high-volume soft rinse into stormwater drains.",
    result: "The limestone pavers were completely revitalized, returning to their rich natural golden-buff hue. All slick green and black algae were eradicated from pool coping and timber steps, eliminating the slip hazard completely while preserving the integrity of the heritage masonry.",
    jobDetails: {
      crew: "2-man commercial pressure washing specialists",
      duration: "4 hours",
      property: "Heritage residential home & pool surrounds, Fremantle",
      services: ["Rotary flat-surface pressure washing", "Biodegradable algae & mould treatment", "Limestone coping detailing", "Driveway stain removal", "Garden & plant protective rinse"],
    },
    sections: [
      {
        heading: "The Danger of Algae on Porous Coastal Pavers",
        body: "Fremantle's coastal microclimate means outdoor limestone, liquid limestone, and brick pavers stay damp throughout Perth's winter. Microscopic spores of green and black algae take root in the microscopic pores of the stone, blooming into an unsightly and dangerously slippery film. Standard homeowner pressure washers often do more harm than good: using narrow spray tips at excessive PSI gouges the soft limestone, leaves permanent streaks, and blows out polymeric joint sand."
      },
      {
        heading: "Our Gentle, Commercial Rotary Washing Approach",
        body: "To protect the valuable stone, we employed our professional commercial pressure washing rig. We began by saturating surrounding garden beds and pot plants with fresh water to shield delicate foliage, then applied our biodegradable cleaning agent. Using a 20-inch rotary surface cleaner, two counter-rotating jets delivered constant, evenly distributed pressure across every square centimetre. This lifted the grime and biological growth cleanly without etching lines or loosening the pavers."
      },
      {
        heading: "Pool Coping Detailing & Non-Slip Safety Restored",
        body: "Around the swimming pool, our technicians carefully washed the bullnose coping tiles away from the water to prevent runoff from entering the pool filtration system. The transformation was dramatic: years of dark grey oxidation and green moss disappeared, revealing the original honey-coloured limestone texture underneath. The non-slip friction of the pavers was 100% restored, giving the family complete peace of mind when entertaining around the pool."
      },
      {
        heading: "Long-Term Surface Protection for Perth Homes",
        body: "Periodic high-pressure washing every 12 to 18 months prevents biological growth from permanently etching into concrete, brick, and limestone. Aspect provides full exterior hardstand cleaning across Perth, including driveways, council crossovers, patios, timber decking, and commercial parking bays."
      }
    ],
    tags: ["pressure washing", "fremantle", "limestone pavers", "pool surround", "algae removal", "driveway cleaning", "heritage property"],
  },
  {
    id: 8,
    slug: "grounded-office-window-cleaning-west-perth",
    title: "Urgent After-Hours Office Window Cleaning for Grounded Construction Group — 11 Harvest Terrace, West Perth",
    date: "2026-09-12T09:00:00Z",
    suburb: "West Perth",
    nearbySuburbs: [
      "west-perth", "perth", "subiaco", "leederville", "east-perth", "northbridge", "nedlands", "kings-park", "shenton-park", "highgate", "mount-lawley", "north-perth"
    ],
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1789575306/Grounded_Office_Window_Cleaning_after-hours_r9kc23.jpg",
    clientLogo: "/brand/grounded-logo-dark.svg",
    clientName: "Grounded Construction Group",
    images: [],
    excerpt: "When WA mining and civil infrastructure leader Grounded required urgent overnight window cleaning for their corporate headquarters at 11 Harvest Terrace in West Perth, Aspect mobilized an agile 3-man crew. Working carefully around sensitive IT hardware, monitors, and complex multi-pane architectural lattices under facility camera surveillance, we delivered spotless, streak-free clarity before morning staff arrived.",
    serviceType: ["Commercial Window Cleaning", "Office Window Cleaning", "After-Hours Cleaning"],
    challenge: "Grounded Construction Group contacted Aspect with an urgent, time-critical requirement: their corporate office on Harvest Terrace, West Perth needed a comprehensive window clean completed strictly overnight so the workspace would be 100% ready for business the next morning. The job presented several unique obstacles: 40 to 45 window sections featuring intricate architectural lattice assemblies, where a single long lattice frame contained up to 24 individual small square glass panes. Cleaning dozens of small individual panes requires intensive manual edging and detailed frame wipe-downs. Furthermore, because the glass bordered active staff workstations loaded with dual-monitor setups, desktop PCs, electrical cabling, and workers' personal belongings, our crew had to follow strict zero-drip protocols and exercise extreme care around all electronics.",
    solution: "We deployed a dedicated 3-man commercial window cleaning crew to 11 Harvest Terrace that very evening. A Grounded staff member granted building access, and our team adhered to all security protocols under continuous facility CCTV surveillance, providing regular entry, progress, and departure updates to management. To protect computers, keyboards, and paperwork, we placed waterproof drop sheets across all desk areas and used controlled low-moisture microfibre applicators. With three technicians on site, two focused on the intricate interior lattice glass and detailed frame wipe-downs, while our third specialist washed the exterior glass panels.",
    result: "The after-hours commercial clean was completed hours before staff arrived for work. All 40+ panels and intricate lattice panes were left streak-free and sparkling, with all frames and sills thoroughly cleaned. All computer hardware and personal belongings remained untouched, completely dry, and in pristine condition. Grounded management commended our rapid response, meticulous care around their equipment, and seamless security communication, securing Aspect for upcoming recurring commercial maintenance.",
    jobDetails: {
      crew: "3-man commercial specialist team",
      duration: "Overnight turnaround (approx. 4.5 hours)",
      property: "Corporate Mining Office (Level 4, 11 Harvest Terrace, West Perth)",
      services: [
        "Urgent overnight commercial window cleaning",
        "Multi-pane lattice architectural glass detailing",
        "Interior and exterior window pane washing",
        "Window frame, mullion, and track deep wipe-down",
        "Low-moisture protection for IT equipment & monitors",
        "After-hours security access & surveillance compliance"
      ],
    },
    sections: [
      {
        heading: "The Client & The Brief: Urgent Overnight Service in West Perth",
        body: "Grounded Construction Group is one of Western Australia's premier infrastructure and civil engineering specialists, delivering large-scale non-process infrastructure, remote villages, and modular accommodation across the WA mining sector. Their corporate headquarters at 11 Harvest Terrace in West Perth serves as the central command hub for executive leadership and project management. When Grounded contacted Aspect Window Cleaning requiring urgent, overnight cleaning for their office floor on a strict deadline, we mobilized immediately. For busy corporate offices in prestigious business precincts like West Perth, daytime window cleaning is out of the question—it disrupts meetings, phone calls, and client consultations. Our mission was clear: enter after business hours, execute a comprehensive clean, and leave the workspace completely pristine before staff arrived the next morning."
      },
      {
        heading: "Overcoming Complex Architectural Lattices & Small Glass Panes",
        body: "Upon starting the clean, our initial estimate of 40 to 45 panels revealed a much more intricate architectural layout. Rather than large, standard floor-to-ceiling plate glass, several window sections were constructed with long multi-pane lattice dividers. Each lattice section was divided into grids of smaller cubes and squares—holding up to 24 individual miniature glass panes per partition. Cleaning dozens of small panes is significantly more labor-intensive than squeegeeing wide glass panels: every individual square requires precision hand blade work, microfibre edging, and meticulous corner detailing. Fortunately, because the glass was in relatively good baseline condition, and because we deployed an agile 3-man crew, we were able to absorb the unexpected intricacy. Two technicians methodically detailed the interior lattices and wiped down every aluminium mullion and sill, while our third specialist tackled the exterior elevations."
      },
      {
        heading: "Meticulous Care Around Sensitive IT Equipment & Workstations",
        body: "In a fast-paced mining and engineering office, every desk is packed with vital business technology: high-resolution dual monitors, desktop workstations, sensitive docking stations, and active paperwork. Cleaning interior glass directly above or behind computer terminals requires extreme discipline. Standard window cleaning tools can drip water onto desks and cause devastating electrical shorts. At Aspect, our commercial team followed strict zero-drip protocols: laying waterproof drop sheets over keyboards and towers, using controlled-damp applicator sleeves, and finishing edges with dry lint-free microfibre cloths. Not a single drop of cleaning solution reached any desk surface or electrical component, ensuring complete peace of mind for Grounded's IT and management teams."
      },
      {
        heading: "Security Compliance, Building Access & Real-Time Communication",
        body: "Commercial office towers in West Perth maintain strict facility security. We coordinated arrival directly with Grounded's staff member, who admitted our crew to the building. Knowing the premises were under 24/7 CCTV surveillance, our technicians maintained absolute professionalism throughout the night, wearing company uniforms and adhering to all site protocols. We also kept open lines of communication with our client contact—sending clear SMS confirmations upon entry, mid-shift progress updates, and final sign-off upon securing the building when leaving. That transparency, combined with a flawless finish across all 40+ windows and lattices, earned glowing praise from the Grounded team. They are already planning their next recurring commercial service with us."
      },
      {
        heading: "Why West Perth Corporate Offices Rely on Aspect for Commercial Window Cleaning",
        body: "From mining and engineering resource companies on Harvest Terrace, Kings Park Road, and Ord Street in West Perth to law firms in the Perth CBD and corporate offices in Subiaco, businesses rely on Aspect Window Cleaning for reliability, discretion, and quality. We carry comprehensive $20M public liability insurance, all technicians hold current police clearances, and we offer flexible out-of-hours scheduling (evenings, overnight, and weekends) so your office operations are never interrupted. Whether your premises feature multi-pane architectural lattices, glass partitions, shopfronts, or multi-storey external glass, Aspect delivers streak-free clarity every time. Contact our Perth commercial team today for a rapid, tailored commercial quote."
      }
    ],
    tags: ["commercial window cleaning", "west perth", "office window cleaning", "after-hours cleaning", "grounded", "harvest terrace", "corporate cleaning", "lattice windows", "perth mining offices"],
  }
];
