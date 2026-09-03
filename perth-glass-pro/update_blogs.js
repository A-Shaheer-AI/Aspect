const fs = require('fs');
const path = 'c:/projetcs/Aspect/perth-glass-pro/content/blogs.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace dates
content = content.replace(/id: 1,[\s\S]*?date: ".*?"/, match => match.replace(/date: ".*?"/, 'date: "2025-08-10T09:00:00Z"'));
content = content.replace(/id: 2,[\s\S]*?date: ".*?"/, match => match.replace(/date: ".*?"/, 'date: "2025-09-02T09:00:00Z"'));
content = content.replace(/id: 3,[\s\S]*?date: ".*?"/, match => match.replace(/date: ".*?"/, 'date: "2025-10-14T09:00:00Z"'));
content = content.replace(/id: 4,[\s\S]*?date: ".*?"/, match => match.replace(/date: ".*?"/, 'date: "2025-11-20T09:00:00Z"'));
content = content.replace(/id: 5,[\s\S]*?date: ".*?"/, match => match.replace(/date: ".*?"/, 'date: "2026-01-08T09:00:00Z"'));
content = content.replace(/"id": 6,[\s\S]*?"date": ".*?"/, match => match.replace(/"date": ".*?"/, '"date": "2026-03-15T09:00:00Z"'));
content = content.replace(/"id": 7,[\s\S]*?"date": ".*?"/, match => match.replace(/"date": ".*?"/, '"date": "2026-05-18T09:00:00Z"'));

// Append new posts
const newPosts = \  },
  {
    id: 8,
    title: "How Often Should Perth Homes Clean Their Windows? A Practical Guide",
    slug: "how-often-should-perth-homes-clean-their-windows",
    date: "2026-06-10T09:00:00Z",
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771873841/residential-window-cleaning_nhnoux.jpg",
    excerpt: "Perth's coastal air, dry winds, and dusty suburbs mean windows get dirty faster than most Australian cities. Here's how to set the right cleaning schedule for your home.",
    intro: "How often should you clean your windows? It's one of the most common questions we hear from Perth homeowners — and the honest answer is: more often than most people think. Perth's unique combination of coastal salt air, summer dust storms, and sticky eucalyptus pollen creates conditions where windows can go from clean to visibly dirty in just a few weeks. This guide breaks down the right schedule for different property types across the Perth metro area.",
    sections: [
      {
        heading: "Why Perth Windows Get Dirty Faster Than Most Cities",
        body: "Perth's Mediterranean climate is a double-edged sword. The sunshine is spectacular, but the same conditions that make it one of Australia's most liveable cities also make it tough on windows. Hot, dry summers bring red dust and pollen from the Perth hills and surrounding bushland. Coastal suburbs from Cottesloe to Trigg cop daily salt spray from the Indian Ocean — a fine, invisible film that etches into glass over time. Add eucalyptus resin drops from gum trees, and you've got a recipe for windows that look dull within weeks."
      },
      {
        heading: "Recommended Cleaning Frequency by Property Type",
        subsections: [
          { heading: "Coastal Homes (Within 3km of Ocean)", body: "Every 6-8 weeks. Salt air deposits accumulate rapidly and become increasingly hard to remove the longer they're left. Homes in Cottesloe, City Beach, Scarborough, and similar suburbs should be on a frequent schedule to prevent permanent etching." },
          { heading: "Suburban Homes with Trees", body: "Every 8-12 weeks. Eucalyptus resin, pollen, and dust are the main culprits. Properties in Kalamunda, Roleystone, or leafy inner suburbs like Nedlands and Dalkeith typically need quarterly cleaning to stay on top of organic buildup." },
          { heading: "Standard Perth Metro Homes", body: "Every 3-6 months. For homes in the middle and outer suburbs without significant coastal exposure or tree coverage, a biannual clean — once before summer and once heading into winter — keeps windows in good condition year-round." },
          { heading: "Commercial Properties", body: "Monthly to quarterly depending on foot traffic and location. Shopfronts, office buildings, and restaurants need more frequent cleaning to maintain professional presentation and comply with strata or body corporate standards." }
        ]
      },
      {
        heading: "Signs It's Time to Book — Regardless of Schedule",
        bullets: [
          { label: "Visible streaks or haze that doesn't wipe off", body: "This indicates mineral deposit buildup that requires professional treatment, not just a wipe-down." },
          { label: "Water spots after rain that don't clear", body: "A sign that salt or hard water minerals have started to bond to the glass surface." },
          { label: "Frames or tracks with visible mould or grime", body: "Mould spreads quickly and is a health concern — it needs proper treatment, not just surface wiping." },
          { label: "Reduced natural light indoors", body: "If your rooms feel darker even on sunny days, dirty glass is likely blocking a significant amount of light." }
        ]
      },
      {
        heading: "The Cost of Waiting Too Long",
        body: "Windows that go 12+ months without cleaning in Perth's conditions don't just look bad — they develop permanent damage. Mineral deposits from hard water and salt bond to the glass surface and require specialist acid treatment to remove. In extreme cases, the etching is irreversible and the glass must be replaced entirely — at a cost of hundreds to thousands of dollars per pane. Regular cleaning is always cheaper than reactive damage repair."
      }
    ],
    conclusion: "For most Perth homeowners, a twice-yearly professional clean is the minimum — but properties near the coast or surrounded by trees need more frequent attention. The easiest approach is to set a recurring schedule rather than waiting until your windows look visibly dirty. By then, some of the damage may already be done. Aspect Window Cleaning offers flexible recurring bookings across the Perth metro — contact us today to set up a schedule that suits your property."
  },
  {
    id: 9,
    title: "The Hidden Damage Dirty Windows Are Doing to Your Perth Home",
    slug: "hidden-damage-dirty-windows-perth",
    date: "2026-07-22T09:00:00Z",
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771873841/residential-window-cleaning_nhnoux.jpg",
    excerpt: "Dirty windows aren't just an eyesore. Over time, mineral deposits, salt, and pollution permanently etch glass — and the damage is often irreversible without professional intervention.",
    intro: "Most Perth homeowners see dirty windows as a cosmetic issue — something to deal with when guests are coming, or when the annual spring clean rolls around. But the reality is far more serious. Left uncleaned, the combination of salt air, hard water, mineral deposits, and organic matter doesn't just sit on top of your glass — it bonds to it. And over time, it permanently damages the glass, the frames, the seals, and the structural integrity of your windows. Here's what's actually happening to your windows right now.",
    sections: [
      {
        heading: "Hard Water Etching: Permanent Damage You Can't See Coming",
        body: "Perth's tap water is notably high in dissolved minerals — particularly calcium and magnesium. Every time water hits your windows and evaporates (from rain, irrigation, or cleaning), it leaves microscopic mineral deposits behind. These deposits are alkaline and mildly caustic. Over weeks and months, they chemically bond to the silica in glass, creating a rough, hazy surface that no amount of standard cleaning will remove. This process — called silicate bonding — is accelerated in Perth's hot sun. Once it reaches a certain point, the only solutions are specialist acid treatment or full glass replacement."
      },
      {
        heading: "Salt Corrosion in Coastal Suburbs",
        body: "If you live within a few kilometres of the Indian Ocean — Cottesloe, City Beach, Trigg, Scarborough, Fremantle — your windows are under constant assault from airborne salt particles. Salt is hygroscopic, meaning it absorbs moisture from the air and holds it against your glass and frames. This creates a persistent damp environment that accelerates corrosion of aluminium frames, degrades rubber seals, and causes white calcium carbonate staining on glass that's extremely difficult to remove. Coastal homeowners who leave windows uncleaned for more than 6-8 weeks often find the damage has already set in."
      },
      {
        heading: "Frame Rot and Seal Failure",
        body: "It's not just the glass that suffers. Grime, moisture, and organic matter accumulate in window tracks, sills, and around frame edges — creating the perfect environment for mould and rot. Timber frames absorb moisture and develop structural rot. Aluminium frames corrode at the joints. Rubber seals degrade when exposed to prolonged dampness and UV, losing their flexibility and allowing drafts, water ingress, and condensation inside the double-glazing unit. A professional clean that includes frames, tracks, and sills actively prevents this progression."
      },
      {
        heading: "What Professional Cleaning Actually Prevents",
        bullets: [
          { label: "Glass replacement costs", body: "A single double-glazed pane replacement in Perth typically costs -800+. Regular cleaning costs a fraction of that." },
          { label: "Frame and seal repairs", body: "Corroded or rotted frames require resealing or full replacement — professional cleaning removes the corrosive buildup before it causes structural damage." },
          { label: "Mould remediation", body: "Mould in window tracks and sills can spread to surrounding walls and ceilings. Addressing it early through regular cleaning is dramatically cheaper than mould remediation." },
          { label: "Energy efficiency loss", body: "Damaged seals allow heated or cooled air to escape, increasing your power bills. Regular cleaning preserves seal integrity." }
        ]
      }
    ],
    conclusion: "The message is simple: dirty windows cost money — just not in the way most people expect. The real expense isn't the cleaning bill. It's the glass replacement, frame repairs, and mould remediation that follows years of neglect. Professional window cleaning is maintenance, not a luxury — and in Perth's conditions, it's one of the most cost-effective things you can do to protect your home. Don't wait until the damage is visible. By then, it's often too late."
  },
  {
    id: 10,
    title: "What to Expect From a Professional Window Clean in Perth",
    slug: "what-to-expect-professional-window-clean-perth",
    date: "2026-08-05T09:00:00Z",
    thumbnail: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771873841/residential-window-cleaning_nhnoux.jpg",
    excerpt: "Wondering what actually happens during a professional window cleaning visit? Here's a step-by-step walkthrough of what our Aspect team does — and why it matters.",
    intro: "If you've never had professional window cleaning before, it's natural to wonder what you're actually paying for. Is it just someone with a squeegee and a bucket? How long will it take? Do you need to be home? What exactly gets cleaned? At Aspect Window Cleaning, we believe transparency builds trust — so here's an honest, step-by-step account of what happens on every job we do, and why each step makes a difference to the final result.",
    sections: [
      {
        heading: "Before We Arrive: What You Need to Do",
        body: "Very little, actually. We ask that any fragile items near window sills are moved, and that we have clear access to the exterior of the property — gates unlocked, dogs secured inside, and space for our equipment. We'll confirm your booking the day before by text. You don't need to be home for an exterior-only clean, but we do ask that someone is present for interior access."
      },
      {
        heading: "On Arrival: Assessment and Setup",
        body: "Our technician will introduce themselves, do a quick walkthrough of the property, and confirm the scope of work with you before starting. We check window accessibility, note any problem areas (hard water staining, damaged frames, stuck flyscreens), and set up our equipment — which includes our pure water system, water-fed poles, and appropriate ladders or extension tools."
      },
      {
        heading: "The Cleaning Process: What We Actually Do",
        subsections: [
          { heading: "Exterior Windows", body: "We use a water-fed pole system fed with 100% purified, deionised water. The soft-bristle brush head scrubs each pane, frame, and sill thoroughly before rinsing with pure water. Because the water contains zero minerals, it evaporates completely clean with no spots or streaks — no squeegee needed. This method also lets us safely clean windows up to 4 stories from the ground." },
          { heading: "Interior Windows", body: "For interiors, we use professional-grade cleaning solutions, microfibre cloths, and squeegees to achieve a flawless, streak-free result. Every pane is finished by hand. We protect your floors and sills with drop sheets and work carefully around furniture and valuables." },
          { heading: "Frames, Tracks, and Sills", body: "This is where we go beyond a basic clean. Tracks are vacuumed and wiped, sills are wiped down, and frames are cleaned with appropriate solutions. Removing the grime and moisture from these areas prevents mould growth and protects seals — extending the life of your window system." },
          { heading: "Flyscreens", body: "Screens are removed, cleaned with a brush and rinse, and refitted. Dirty flyscreens block airflow and filter light — cleaning them makes a noticeable difference to how your home feels." }
        ]
      },
      {
        heading: "How Long Does It Take?",
        body: "A standard 3-4 bedroom Perth home with exterior-only cleaning typically takes 1.5-2 hours. Interior and exterior together is usually 2.5-4 hours depending on the number of windows, access difficulty, and any specialist treatment required (hard water stain removal, etc.). We'll give you a realistic time estimate when you book."
      },
      {
        heading: "After We Finish: Inspection and Sign-Off",
        body: "We won't leave until you've had a chance to inspect the work. Walk through with your technician, check any areas you're concerned about, and let us know if anything needs attention. Our satisfaction guarantee means we fix any issues on the spot — at no extra cost. We also leave the property exactly as we found it: no mess, no residue, nothing moved out of place."
      }
    ],
    conclusion: "A professional window clean isn't just about clean glass — it's about protecting your property, improving your home environment, and getting results that last. From the moment we arrive to the moment we leave, every step is designed to deliver maximum value with minimum disruption to your day. Ready to experience the difference? Get in touch for a free, no-obligation quote today."
  }
];\;

content = content.replace(/  }\n];/, newPosts);
fs.writeFileSync(path, content, 'utf8');
console.log('Update complete!');
