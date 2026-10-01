"""
Refining archetype lengths so all 12 templates have Body words strictly between 425 and 465 words.
"""

ARCHETYPES = {}

# 1. Infill Subdivisions & Narrow Lots (~440-450 words)
ARCHETYPES["Infill Subdivisions & Narrow Lots"] = {
    "arch": (
        "{suburb} is defined by substantial residential infill and high-density urban redevelopment, where traditional "
        "quarter-acre suburban blocks have been subdivided into modern double-storey duplexes, triplexes, and rear-battleaxe "
        "villas. A prominent architectural characteristic across {suburb} is the extremely narrow side boundary setback—frequently "
        "leaving less than 80 to 90 centimetres of clearance between external double-brick walls and neighboring Colorbond or "
        "timber-lap boundary fences. While front porticos and rear alfresco courtyards generally enjoy open access, side-elevation "
        "lightwells housing master ensuite panes, upper stairwell voids, and frosted laundry slider doors sit inside tight, "
        "restricted corridors where conventional ladder placement is virtually impossible. Furthermore, modern architectural "
        "designs in {suburb} regularly feature soaring clerestory glass and upper-storey awning windows positioned directly over "
        "steep garage roofs or narrow pedestrian side passages. Community life and local activity revolve around {landmarks_str}."
    ),
    "challenges": (
        "Homeowners, strata committees, and property managers throughout {suburb} consistently cite zero-lot boundaries and restrictive "
        "side clearances as their number-one exterior maintenance obstacle. Due to boundary fences sitting barely an arm's length from "
        "external brickwork, standard A-frame stepladders cannot be safely splayed without scratching metal fences or risking severe "
        "fall injuries. Moreover, many residential properties across {suburb} rely on shallow groundwater garden bores for lawn reticulation, "
        "which continually sprays calcium-rich, iron-heavy groundwater against ground-floor glass. Under Western Australia's fierce "
        "ultraviolet summer sun, these dissolved minerals rapidly bake into an unsightly, cloudy white and rust-orange scale that conventional "
        "supermarket glass cleaners, squeegees, and pressure washers cannot dissolve."
    ),
    "strategy": (
        "To conquer the narrow side setbacks and tight lightwells characteristic of {suburb}, Aspect deploys specialized single-section "
        "straight extension ladders fitted with non-marking wall standoff bumpers. This engineered equipment allows our technicians to "
        "position access gear safely within 80cm boundary passages without placing any weight against delicate neighbor fences. For second-storey "
        "glass where ladder footprint space is completely unavailable, our technicians deploy ultra-lightweight telescopic carbon-fibre reach "
        "poles fitted with adjustable multi-angle gooseneck extensions. This enables us to scrub upper-level windows safely from ground level "
        "with dual-trim nylon brushes and 0 PPM pure deionised water. Where sprinkler reticulation has bonded mineral stains to glass, we "
        "apply commercial acid descaling agents agitated with grade-0000 non-scratch bronze wool, restoring immaculate glass clarity without "
        "etching delicate window coatings or scratch-sensitive tints."
    ),
    "coverage": (
        "Located approximately {dist_km} km from our primary depot at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via "
        "{main_route}), {suburb} is fully serviced on our regular scheduled metropolitan routes. Despite operating from our western suburbs "
        "base, we guarantee zero travel surcharges, zero callout fees, and completely transparent fixed-price quotes for all residential and "
        "strata clients in {suburb}. Our police-cleared technicians provide prompt same-week booking availability backed by our 100% streak-free guarantee."
    ),
    "faqs": [
        ("How do your technicians clean upper-floor windows in narrow side passages in {suburb}?", "We utilize ultra-lightweight carbon-fibre water-fed reach poles equipped with adjustable gooseneck angles, allowing us to scrub second-storey glass from the ground without needing to erect hazardous ladders in narrow side setbacks."),
        ("Can you remove yellow or white bore water sprinkler stains from windows in {suburb}?", "Yes. We treat mineral-etched glass with specialized acid descaling solutions and ultra-fine grade-0000 bronze wool, completely eliminating heavy calcium and iron oxide deposits without scratching the pane.")
    ]
}

# 2. Coastal Modern (~435-445 words)
ARCHETYPES["Coastal Modern"] = {
    "arch": (
        "{suburb} exemplifies contemporary Western Australian coastal living, showcasing high-spec architectural homes, contemporary "
        "double-storey residences, and luxury beachside villas engineered to embrace uninterrupted Indian Ocean views. Architecture across "
        "{suburb} heavily features expansive floor-to-ceiling commercial glazing, multi-panel stacking alfresco slider suites, frameless glass "
        "pool surrounds, and dramatic high-level clerestory highlight panes. Transparent laminated glass balustrades line upper balconies and "
        "ocean-facing rooftop decks, maximizing panoramic maritime vistas across coastal sunsets. In addition, extensive outdoor entertaining "
        "patios incorporate architectural louvres and wide glass serveries that blur indoor-outdoor boundaries. Prominent local landmarks, "
        "vibrant coastal walking tracks, and popular recreational destinations include {landmarks_str}. These prestige coastal facades "
        "require specialized exterior maintenance to preserve their sleek aesthetic and optical clarity."
    ),
    "challenges": (
        "Living along the coast in {suburb} means constant, unrelenting exposure to the afternoon sea breeze known as the 'Fremantle Doctor'. "
        "Airborne ocean salt spray and fine maritime sand drift coat exterior glass surfaces daily, reacting with intense ultraviolet sunlight "
        "to form a stubborn, cloudy mineral crust. If left untreated over several months, airborne sea salt crystals bond chemically with silica "
        "particles, physically etching the glass surface and permanently degrading optical transparency. Furthermore, coastal wind turbulence "
        "drives abrasive marine grit directly into sliding door track channels, jamming stainless steel rollers and causing severe frame oxidation. "
        "Local Reddit discussions frequently highlight how quickly beachside glass clouds over after coastal storms, making routine washing essential."
    ),
    "strategy": (
        "Aspect combats the harsh coastal environment of {suburb} using vehicle-mounted 4-stage reverse osmosis and deionisation (RO/DI) "
        "filtration systems, producing 100% pure demineralised water measuring 0 PPM (Parts Per Million) Total Dissolved Solids. In this hungry, "
        "mineral-free state, pure water acts as a natural solvent, rapidly lifting and dissolving baked sea salt crust without abrasive chemical "
        "detergents. We deploy telescopic carbon-fibre reach poles fitted with soft-bristle, dual-trim wash heads to clean high exterior windows, "
        "glass pool fences, and windward balcony balustrades up to 4 storeys safely from the ground. Sills, weather-stripping, and sliding track "
        "channels receive deep cleaning with specialized HEPA-filtered vacuums to extract abrasive coastal grit and preserve smooth door glide. "
        "This holistic approach protects coastal window frames from pitting and corrosion while restoring unobstructed panoramic ocean views."
    ),
    "coverage": (
        "Situated approximately {dist_km} km from our central depot at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via "
        "{main_route}), {suburb} is covered through our dedicated coastal service run. Regardless of your distance along the coastline, we "
        "provide identical flat-rate pricing with guaranteed zero travel fees and zero callout surcharges. Aspect delivers dependable, scheduled "
        "cleaning that keeps oceanfront glass crystal-clear year-round, backed by full $20M public liability insurance and a streak-free guarantee."
    ),
    "faqs": [
        ("How often should coastal homes in {suburb} have their windows cleaned?", "Given the high exposure to coastal salt spray, we recommend professional pure water cleaning every 6 to 8 weeks for oceanfront properties in {suburb} to prevent permanent salt etching."),
        ("Do you clean frameless glass pool fences and balcony balustrades in {suburb}?", "Yes. We clean all exterior glass surfaces, including pool surrounds and high balcony balustrades, ensuring a streak-free, crystal-clear finish that maximizes your coastal views.")
    ]
}

# 3. Coastal Prestige (~435-445 words)
ARCHETYPES["Coastal Prestige"] = {
    "arch": (
        "{suburb} represents one of Perth's premier coastal enclaves, characterized by multi-million-dollar architectural estates, "
        "grand tri-level mansions, and sleek contemporary developments that make dramatic use of luxury glazing. Homes throughout {suburb} "
        "feature vast acoustic Low-E glass curtain walls, frameless commercial-grade pool balustrades, soaring double-height stairwell voids, "
        "and multiple ocean-facing terraces framed by oversized sliding glass doors. Property designs are specifically oriented to capture "
        "unobstructed oceanic horizons and panoramic sunsets across {landmarks_str}. Interior layouts often incorporate internal light courts, "
        "wine room display glazing, high atrium skylights, and frameless structural glass bridges that require meticulous, specialized interior "
        "detailing to maintain immaculate optical clarity and showcase architectural excellence across every angle of the home."
    ),
    "challenges": (
        "The premier oceanfront elevation of {suburb} subjects properties to extreme saline mist and fierce coastal squalls. Continuous onshore "
        "winds deposit a dense veil of sodium chloride across glass facades, transforming crystal-clear ocean views into a dull, hazy film within "
        "days of a standard wipe-down. Furthermore, high architectural voids, multi-level exterior cantilevers, and steep coastal sites present "
        "formidable access obstacles that standard window cleaners cannot safely navigate without risking damage to bespoke rendered finishes, "
        "landscaped limestone courtyards, or delicate window frame powder-coating. Community forums frequently discuss the difficulty of finding "
        "contractors equipped with the precision gear needed for delicate Low-E smart glass installations without leaving swirl marks or scratches."
    ),
    "strategy": (
        "To uphold the exacting standards expected on prestige properties across {suburb}, Aspect provides an elite pure-water detailing service. "
        "We deliver laboratory-grade 0 PPM deionised water through ultra-rigid high-modulus carbon-fibre poles, reaching up to 4 storeys from ground "
        "level with zero heavy ladders leaning against rendered architectural walls. For grand interior voids, soaring stairwells, and mezzanine "
        "glass, our specialists employ indoor carbon poles fitted with microfiber pad scrubbers and precision zero-drip squeegees. Frameless glass "
        "balustrades receive hand detailing, hydrophobic spot-free rinsing, and sliding track lubrication, ensuring perfection for luxury coastal residences. "
        "Every pane, frame, and silicone seal is inspected to guarantee flawless clarity without disrupting high-end landscaped grounds. Furthermore, "
        "we clean architectural skylights and high highlight windows, allowing natural light to illuminate luxury interiors completely streak-free."
    ),
    "coverage": (
        "Located approximately {dist_km} km from our primary Nedlands headquarters at 183 Stirling Highway (approx. {travel_mins} minutes via "
        "{main_route}), {suburb} is a core destination on our prestige residential schedule. We guarantee zero callout fees, zero travel "
        "surcharges, and white-glove service standards for every client in {suburb}. Our police-cleared, $20M insured technicians ensure absolute "
        "discretion, meticulous care, and pristine glass clarity on every visit."
    ),
    "faqs": [
        ("How do you clean high interior glass voids and soaring stairwells in {suburb} homes?", "We deploy specialized indoor telescopic poles with microfiber pad applicators and zero-drip precision squeegees, allowing safe high-reach detailing without bulky indoor scaffolding."),
        ("Will your equipment leave scratches on tinted or Low-E glass in {suburb}?", "Never. Our water-fed pole brushes feature ultra-soft flagged nylon bristles and 0 PPM pure deionised water, fully certified safe for all Low-E, smart glass, and acoustic window coatings.")
    ]
}

# 4. Prestige Riverside (~435-445 words)
ARCHETYPES["Prestige Riverside"] = {
    "arch": (
        "{suburb} is an elite riverside sanctuary nestled along the picturesque foreshores of the Swan and Canning Rivers. The architectural "
        "fabric showcases sprawling multi-level custom residences, private tennis court estates, and grand riverfront villas featuring dramatic "
        "curtain walls of glass oriented toward panoramic water vistas across {landmarks_str}. Residences showcase oversized commercial-grade "
        "sliding stacking doors opening onto limestone river terraces, architectural highlight glazing, frameless glass pool fencing, and "
        "grand glass-enclosed balconies. Lush manicured grounds with mature river gums and extensive reticulated perimeter gardens frame "
        "these prestigious waterfront properties, creating an idyllic lifestyle where spotless glazing is essential to take full advantage "
        "of sparkling river reflections, passing watercraft, and beautiful natural light throughout every season."
    ),
    "challenges": (
        "Riverside estates in {suburb} contend with a distinct microclimate shaped by tidal water proximity. Overnight river humidity, dense "
        "morning mists, and summer midges leave a sticky organic film on exterior glass that attracts fine suburban dust. Far more damaging, "
        "however, are high-output automated irrigation systems drawing from private groundwater bores or alluvial aquifers. Bore water across "
        "{suburb} carries heavy concentrations of dissolved iron oxide and calcium carbonate, which continually sprays against lower panes, "
        "baking into stubborn, opaque orange and white mineral scale that permanently ruins river views. Local property owners frequently express "
        "frustration on neighborhood groups about stubborn sprinkler scale that normal window washing cannot remove, as well as spiderwebs clinging "
        "under expansive riverfront eaves."
    ),
    "strategy": (
        "Aspect provides comprehensive, white-glove glass restoration tailored to the architectural estates of {suburb}. We deploy vehicle-mounted "
        "4-stage RO/DI filtration systems that supply 100% deionised 0 PPM pure water, leaving riverfront glass completely spotless without drying "
        "streaks. For bore-stained panes suffering from severe mineral calcification, our technicians apply specialized commercial descaling acids "
        "agitated with scratch-free grade-0000 bronze wool, dissolving hard-water scale while protecting underlying glass surfaces. Technicians "
        "utilize carbon-fibre reach poles to access high multi-storey windows safely from ground level, preserving manicured riverside landscaping. "
        "In addition, window tracks, frame joinery, and flyscreens are meticulously cleaned and vacuumed to maintain peak operating condition. "
        "Our comprehensive service also includes thorough eave sweeping and balustrade detailing, ensuring unmatched presentation."
    ),
    "coverage": (
        "Positioned approximately {dist_km} km from our base at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via {main_route}), "
        "{suburb} is serviced regularly by our premier residential teams. We provide prompt same-week booking availability across {suburb} with "
        "guaranteed zero travel charges, zero callout fees, and transparent fixed-price quotes. Every job is completed with maximum care by our "
        "fully insured, police-cleared window detailing specialists."
    ),
    "faqs": [
        ("Can you remove heavy river bore water mineral stains from windows in {suburb}?", "Yes. We specialize in hard water stain restoration, utilizing safe chemical descalers and grade-0000 bronze wool to lift calcified bore water deposits without scratching the glass."),
        ("Do you service multi-storey architectural homes with complex riverfront access in {suburb}?", "Absolutely. Our carbon-fibre pure water reach poles clean up to 4 storeys safely from ground level, eliminating the need for scaffolding on delicate riverside landscaping.")
    ]
}

# 5. Heritage Inner City (~435-445 words)
ARCHETYPES["Heritage Inner City"] = {
    "arch": (
        "{suburb} boasts one of Perth's most distinguished and historically rich streetscapes, characterized by meticulously restored Federation "
        "Queen Anne homes, charming workers' cottages, Californian bungalows, and historic commercial shopfronts. Architectural highlights throughout "
        "{suburb} include intricate timber double-hung sash windows, fragile leadlight and stained glass transoms, multi-pane casement suites, "
        "ornate timber sills, and pressed red-brick facades. Wide wrap-around timber verandas and leafy garden avenues define the neighborhood "
        "character surrounding local hubs like {landmarks_str}. Modern rear extensions often introduce sleek double-storey glass additions that "
        "blend historic craftsmanship with contemporary architectural glazing, requiring dual expertise in antique joinery and modern glass, "
        "where both vintage timber sashes and high-tech aluminium slider suites require careful, bespoke cleaning techniques."
    ),
    "challenges": (
        "Maintaining character glazing in {suburb} demands extreme technical sensitivity and specialized skills. Antique double-hung timber "
        "sashes, brittle leadlight cames, and aged linseed oil putty cannot tolerate aggressive pressure washing or harsh chemical detergents, "
        "which can easily blow out seals or damage historic timber joinery. Furthermore, proximity to dense inner-city traffic corridors exposes "
        "street-facing windows to persistent diesel particulate soot, road grime, and greasy exhaust residue, while mature jacaranda, plane, and "
        "eucalyptus street trees drop sticky sap, pollen, and spiderwebs across delicate window sills. Residents on local community boards frequently "
        "discuss the challenge of finding tradespeople who respect historic materials without causing accidental scratching or water ingress."
    ),
    "strategy": (
        "Aspect provides specialized conservation window care designed specifically for heritage homes across {suburb}. Our technicians employ "
        "traditional hand-washing techniques utilizing soft lamb's wool applicators, pH-neutral biodegradable cleaning solutions, and precision "
        "brass squeegees for delicate vintage panes. We exercise extreme caution around double-hung counterweights, vintage cords, and fragile "
        "leadlight cames, never applying excessive mechanical pressure. Exterior timber frames, stone sills, and ornate mouldings are gently "
        "hand-wiped with plush microfiber cloths, removing traffic soot and cobwebs while fully preserving historic finishes and restoring sparkling "
        "natural daylight to character interiors. For modern rear additions, pure water poles ensure streak-free finishes without ladder contact, "
        "delivering a comprehensive, conservation-grade clean that respects character architecture while providing immaculate modern clarity and unobstructed natural daylight."
    ),
    "coverage": (
        "Located just {dist_km} km from our central operations at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via {main_route}), "
        "{suburb} enjoys rapid, priority dispatch from our inner-metropolitan teams. We guarantee zero callout surcharges, zero travel fees, and "
        "transparent upfront pricing across {suburb}. Whether you own a preserved heritage cottage or an architecturally extended character home, "
        "Aspect provides trusted, police-cleared craftsmanship backed by $20 million public liability insurance."
    ),
    "faqs": [
        ("Are your cleaning methods safe for historic leadlight and double-hung sash windows in {suburb}?", "Yes. We use delicate hand-washing methods with soft lamb's wool applicators and neutral pH solutions, never high pressure, safeguarding historic timber joinery and leadlight cames."),
        ("How do you remove urban traffic soot from street-facing windows in {suburb}?", "Our specialised cleaning solutions lift petroleum and exhaust films easily without damaging painted timber surrounds or leaving streaks on delicate antique glass.")
    ]
}

# 6. Perth Hills Bushland (~435-445 words)
ARCHETYPES["Perth Hills Bushland"] = {
    "arch": (
        "{suburb} is a scenic bushland haven nestled within the rugged topography of the Darling Scarp, where custom pole-homes, cedar-clad "
        "retreats, and split-level brick residences harmonize with native jarrah, marri, and eucalyptus forest. Properties across {suburb} "
        "regularly occupy steep, undulating terrain featuring soaring cathedral ceilings, high clerestory highlight glass, wide timber pole "
        "verandas, and expansive architectural windows designed to immerse living spaces in sweeping bushland vistas across {landmarks_str}. "
        "Detached workshops, hillside granny flats, multi-pitched rooflines, and expansive timber deck structures are prominent features that "
        "blend residential comfort with Perth's dramatic natural escarpment topography, creating private hills sanctuaries surrounded by majestic trees."
    ),
    "challenges": (
        "The natural forest setting of {suburb} creates severe, unrelenting window and roof maintenance challenges. Towering eucalyptus and "
        "marri trees deposit sticky gum sap droplets, heavy yellow pollen, and massive volumes of dry leaf litter across glass and roof valleys. "
        "During summer, blistering easterly winds blow fine red laterite dust down from the scarp, baking onto hot glass surfaces. Furthermore, "
        "steep hillside gradients, elevated pole foundations, and multi-level deck cantilevers make ladder placement treacherous for untrained "
        "homeowners, creating dangerous fall hazards on uneven terrain. Hills residents regularly post on local forums seeking reliable window "
        "cleaners who can safely reach awkward clerestory windows without damaging steep garden terraces or risking personal injury on steep ground."
    ),
    "strategy": (
        "Aspect provides specialized exterior maintenance engineered specifically for the rugged hillside architecture of {suburb}. Our mobile "
        "units carry adjustable ladder leveling systems and wide standoff stabilizer brackets engineered for safe, rock-solid footing on steep "
        "slopes and rocky ground. To clean soaring cathedral windows and high clerestory glass, our technicians deploy telescopic carbon-fibre reach "
        "poles pumping 0 PPM pure reverse osmosis water, dissolving stubborn gum resin and red scarp dust without chemicals. We also bundle window "
        "washing with powerful gutter vacuuming, clearing hazardous combustible leaf dams to safeguard hills properties against winter roof leaks "
        "and summer bushfire risks. Every comprehensive hills service includes clearing cobwebs from elevated timber eaves, wiping down external window frames, and inspecting sills for complete, dependable bushland property protection."
    ),
    "coverage": (
        "Situated approximately {dist_km} km from our base at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via {main_route}), "
        "{suburb} is regularly serviced on our scheduled hills runs. Despite the extended driving distance from our western suburbs depot, we "
        "stand firmly by our guarantee of zero travel fees, zero callout surcharges, and identical competitive fixed rates for all {suburb} "
        "residents. Our police-cleared technicians deliver dependable hills property care with full safety documentation."
    ),
    "faqs": [
        ("How do you handle ladder access on steep sloping properties in {suburb}?", "Our technicians carry specialized ladder levelers and safety standoffs engineered for uneven terrain, ensuring safe, stable positioning on hills properties without endangering your property."),
        ("Can you remove sticky eucalyptus sap and tree resin from glass in {suburb}?", "Yes. Our pure water pole brushes and eco-friendly pre-treatment solvents effectively dissolve stubborn gum tree sap and pollen without scratching exterior glass.")
    ]
}

# 7. Master-Planned Community (~435-445 words)
ARCHETYPES["Master-Planned Community"] = {
    "arch": (
        "{suburb} is a thriving, rapidly expanding master-planned community tailored for contemporary family living. The suburban landscape "
        "is characterized by stylish single and double-storey brick-and-tile family residences, crisp rendered facades, double lock-up garages, "
        "and bright open-plan living zones that connect seamlessly with sheltered alfresco courtyards. Architectural homes across {suburb} "
        "feature wide multi-stack sliding patio doors, security screen assemblies, upper-floor awning windows, and extensive rooftop photovoltaic "
        "solar panel arrays. Parks, community lakes, landscaped cycle paths, and modern retail precincts form vibrant focal points throughout "
        "{landmarks_str}. These modern homes prioritize functional open living, where crystal-clear glazing enhances natural interior light, "
        "creating inviting living areas and showcasing beautifully landscaped outdoor courtyards."
    ),
    "challenges": (
        "In dynamic growth corridors like {suburb}, ongoing civil infrastructure works, subdivision development, and residential construction "
        "generate massive clouds of airborne limestone sub-base dust, fine clay particles, and cement render powder. When wetted by morning dew "
        "or garden reticulation, this airborne dust transforms into a gritty, opaque film that coats window glass and severely degrades rooftop solar "
        "efficiency. Furthermore, newer homes frequently suffer from stubborn builder debris—including acrylic render splatter, mortar smear, "
        "brick-cleaning acid haze, and adhesive sticker residue bonded to external glazing. Reddit threads for newer estates regularly lament how "
        "standard window cleaning fails to remove stubborn builder render without scratching delicate glass, leaving streaks and cloudy residue."
    ),
    "strategy": (
        "Aspect delivers high-performance exterior cleaning tailored to the needs of modern estates in {suburb}. We deploy mobile pure-water "
        "filtration systems using telescopic carbon-fibre poles fitted with dual-trim nylon brushes that safely scrub away abrasive construction "
        "dust and red clay, rinsing clean with 0 PPM deionised water for a flawless finish. For post-construction cleans on newer properties, our "
        "technicians utilize specialized stainless safety glass scrapers and non-scratch bronze wool to eliminate render splatter and silicones. "
        "We also clean rooftop solar panels using pure water, restoring up to 30% lost solar generating capacity for local households, while vacuuming "
        "sliding track channels to eliminate gritty construction soil and protect door rollers. External window frames, weather strips, flyscreen surrounds, and sills are wiped thoroughly with microfiber detailing cloths, ensuring an immaculate result that enhances curb appeal across the neighborhood."
    ),
    "coverage": (
        "Located approximately {dist_km} km from our central workshop at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via "
        "{main_route}), {suburb} is serviced through our regular outer-metropolitan schedule. We guarantee zero callout fees, zero travel "
        "surcharges, and 100% transparent upfront pricing for all homeowners across {suburb}. Enjoy convenient same-week bookings, friendly "
        "police-cleared professionals, and complete satisfaction guaranteed on every clean."
    ),
    "faqs": [
        ("Do you remove builder render, paint splatter, and stickers on new homes in {suburb}?", "Yes. Our post-construction window detailing service safely removes builder overspray, cement render splatter, and sticker residue using professional safety scrapers and bronze wool."),
        ("Can you clean our rooftop solar panels during the same visit in {suburb}?", "Yes! We offer discounted bundle packages combining window washing with solar panel cleaning, restoring maximum electricity output using pure water.")
    ]
}

# 8. Canal & Marina Waterfront (~435-445 words)
ARCHETYPES["Canal & Marina Waterfront"] = {
    "arch": (
        "{suburb} represents world-class waterfront living, defined by luxury canal-front residences, marina villas, and private boat jetty "
        "properties designed around intimate aquatic views. Architecture throughout {suburb} showcases extensive double-storey glazing, commercial "
        "bi-fold and multi-track stacking glass suites, frameless glass balustrades along private canal seawalls, and soaring stairwell voids "
        "overlooking waterways and {landmarks_str}. Outdoor entertaining terraces feature built-in outdoor kitchens, frameless pool surrounds, "
        "and glass windbreaks engineered to protect alfresco dining areas while preserving panoramic waterway views. These bespoke waterfront "
        "properties demand regular, high-precision maintenance to preserve optical transparency across scenic canal channels, ensuring owners "
        "enjoy crystal-clear water perspectives from living rooms, master bedroom balconies, and private mooring decks."
    ),
    "challenges": (
        "Waterfront residences in {suburb} contend with intense, daily aquatic exposure. High estuary humidity, marine salt spray, and canal "
        "water mist create persistent mineral deposits and waterline crusting on seaward glass. During warmer months, dense swarms of canal midges, "
        "spiders, and aquatic insects spin thick webs under eaves and across window tracks. Even more critical, canal-facing elevations often feature "
        "zero setback from timber jetties or vertical seawall drop-offs where standard ground ladders cannot be placed without extreme water fall risks. "
        "Canal community forums often discuss the rapid buildup of crusty salt film on waterside balustrades and the hazard of attempting DIY cleaning "
        "on narrow seawalls, as well as corrosive salt air seizing expensive sliding door rollers."
    ),
    "strategy": (
        "Aspect specializes in canal and waterfront window detailing across {suburb}. We utilize ultra-lightweight telescopic carbon-fibre reach "
        "poles extending up to 4 storeys, allowing technicians to clean canal-facing upper windows safely from timber boardwalks, decks, or jetty "
        "ramps without hazardous ladders. We pump 100% deionised 0 PPM pure water to dissolve stubborn salt crust, mineral spotting, and insect debris, "
        "leaving glass balustrades and pool surrounds sparkling. Our technicians thoroughly sweep away spiderwebs from eaves and deep-vacuum sliding "
        "door channels, clearing salt crystals to keep heavy sliding patio doors operating effortlessly, ensuring unobstructed waterway views and lasting "
        "protection against coastal salt pitting. All frames, rubber gaskets, and stainless fixtures are carefully detailed for exceptional results."
    ),
    "coverage": (
        "Situated approximately {dist_km} km from our base at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via {main_route}), "
        "{suburb} is covered on our scheduled waterways and coastal run. We guarantee zero travel fees, zero callout surcharges, and identical "
        "transparent rates for canal homeowners across {suburb}. Our police-cleared, fully insured specialists deliver sparkling water views "
        "with zero fuss and complete peace of mind."
    ),
    "faqs": [
        ("How do you clean canal-facing windows where there is no space for ladders in {suburb}?", "Our telescopic carbon-fibre pure water reach poles extend up to 4 storeys, allowing us to clean waterside glass safely from jetty walkways, decks, or balconies without ladders."),
        ("Do you clean glass balustrades and boat jetty fencing in {suburb}?", "Yes. We clean all waterside glass balustrades, pool fences, and patio surrounds, leaving completely streak-free glass that maximizes your water views.")
    ]
}

# 9. Established Family Homes (~435-445 words)
ARCHETYPES["Established Family Homes"] = {
    "arch": (
        "{suburb} is a well-established, highly regarded family suburb featuring generous residential blocks, leafy tree-lined avenues, "
        "and a blend of spacious 1970s–1990s brick-and-tile family residences alongside modern luxury renovations. Properties across {suburb} "
        "typically feature extensive picture windows, double-sliding patio doors opening onto covered pergolas, mature perimeter gardens, "
        "and glass-fenced swimming pools surrounding {landmarks_str}. Double-storey renovations and modern rear extensions regularly add "
        "second-storey bedroom panes, high stairwell windows, and upper awning glass that overlook established backyards, requiring specialized "
        "high-reach cleaning solutions to keep expansive family homes looking their absolute best. Large family alfresco spaces and security screens "
        "are prominent features, designed to make the most of Perth's outdoor lifestyle and sunny Mediterranean climate."
    ),
    "challenges": (
        "The mature, established gardens that make {suburb} so appealing also create significant window maintenance demands. Private garden "
        "bores frequently spray mineral-heavy groundwater across lower window panes, depositing dense calcium mineral scale and orange iron "
        "staining that standard window washing cannot dissolve. Overhanging jacarandas, gums, and flowering shrubs drop heavy pollen and sticky "
        "sap, while sliding door floor tracks frequently jam with accumulated garden soil, pet hair, and airborne grit, making doors difficult to slide. "
        "Perth homeowners regularly complain on community message boards about baked-on sprinkler spots that resist vinegar and household chemicals, "
        "as well as dusty flyscreens blocking fresh afternoon air and obscuring outdoor garden views."
    ),
    "strategy": (
        "Aspect provides comprehensive whole-home exterior detailing for families in {suburb}. Our technicians use 4-stage reverse osmosis "
        "pure water technology for all exterior windows, ensuring a spot-free shine that stays clean up to twice as long. Where garden bore water "
        "has caused severe calcium etching, we apply commercial descaling compounds with grade-0000 bronze wool, safely lifting stubborn stains. "
        "We carefully remove, wash, and refit flyscreens, wipe all external frames, and HEPA-vacuum sliding door tracks to ensure smooth, effortless "
        "sliding operation throughout your home, protecting window mechanisms and providing crystal-clear garden views. For second-storey bedroom windows "
        "and high stairwells, carbon-fibre reach poles allow safe cleaning from the ground without ladder damage to garden beds."
    ),
    "coverage": (
        "Located approximately {dist_km} km from our central operations at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via "
        "{main_route}), {suburb} is fully serviced on our regular metropolitan schedules. We guarantee zero callout surcharges, zero travel fees, "
        "and identical fixed pricing for all residents in {suburb}. Trust our police-cleared, insured technicians for dependable service and "
        "streak-free windows backed by our satisfaction guarantee."
    ),
    "faqs": [
        ("Do you clean flyscreens and vacuum sliding door tracks in {suburb} homes?", "Yes. All standard residential packages in {suburb} include dusting flyscreens and wiping frames, with optional deep screen washing and track vacuuming available."),
        ("How do you remove persistent white sprinkler water spots in {suburb}?", "We utilize professional acid descaling solutions and ultra-fine non-scratch bronze wool detailing to safely dissolve stubborn calcium bore water stains from glass.")
    ]
}

# 10. Semi-Rural Acreage (~435-445 words)
ARCHETYPES["Semi-Rural Acreage"] = {
    "arch": (
        "{suburb} offers peaceful semi-rural acreage and equestrian lifestyle properties, featuring sprawling single-storey homesteads, "
        "pole-frame architectural retreats, and modern country estates with wide wrap-around verandas. Homes in {suburb} feature large "
        "panoramic glass picture windows, architectural clerestory highlights, high vaulted timber ceilings, and detached workshops set across "
        "expansive rural landscapes surrounding {landmarks_str}. Large multi-vehicle sheds, stables, and extensive rooftop photovoltaic arrays "
        "are common across these spacious properties, requiring specialized exterior maintenance equipment and heavy-duty purification units "
        "to manage large surface areas and multi-building residential compounds, ensuring crystal-clear vistas across private paddocks and rolling bushland."
    ),
    "challenges": (
        "Rural properties in {suburb} contend with intense environmental exposure. Unsealed driveways, horse paddocks, and summer agricultural "
        "activity generate high volumes of airborne dust that coat expansive glass facades. Large roof areas collect heavy tree debris, pollen, "
        "and spiderwebs, while properties relying on private groundwater bores or untreated scheme water face persistent glass staining from garden "
        "reticulation spray. Furthermore, extensive veranda roof overhangs make accessing high gable windows difficult with standard ladders. "
        "Acreage owners on local social media groups frequently note how quickly dust returns on rural windows and the immense time required for DIY cleaning, "
        "often taking entire weekends to wash large homestead glass surfaces manually."
    ),
    "strategy": (
        "Aspect delivers heavy-duty exterior care suited to the expansive homes of {suburb}. Our mobile pure water filtration vans carry "
        "onboard water purification systems, allowing us to clean extensive window surface areas with 100% deionised water that repels dust. "
        "We utilize carbon-fibre reach poles to access high cathedral ceilings, skylights, and wrap-around veranda glass safely from the ground. "
        "We also provide cobweb clearing under broad eaves, flyscreen washdowns, and solar panel cleaning for large rural rooftop installations, "
        "ensuring your entire homestead and detached outbuildings maintain exceptional presentation and peak energy performance. Our gentle bronze "
        "wool descaling process also eliminates bore water staining from garden-facing windows without etching the glass."
    ),
    "coverage": (
        "Situated approximately {dist_km} km from our base at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via {main_route}), "
        "{suburb} is serviced through our dedicated semi-rural run. Despite the travel distance from our Nedlands depot, we guarantee zero "
        "travel surcharges, zero callout fees, and competitive fixed rates across {suburb}. Our fully insured, police-cleared team provides "
        "thorough, dependable property care for rural acreage properties."
    ),
    "faqs": [
        ("Can you service large rural acreage homes with detached workshops in {suburb}?", "Yes. We regularly clean large multi-structure rural properties in {suburb}, providing customized packages for main homesteads, granny flats, and workshops."),
        ("Can you clean our large rooftop solar panel array on our rural property in {suburb}?", "Yes. We offer pure water solar panel washing, safely removing paddock dust and bird droppings to restore peak electricity output.")
    ]
}

# 11. Swan Valley Wineries & Rural Lifestyle (~435-445 words)
ARCHETYPES["Swan Valley Wineries & Rural Lifestyle"] = {
    "arch": (
        "{suburb} is situated in the historic heart of Western Australia's oldest wine-growing region, characterized by picturesque vineyard "
        "estates, rustic rammed-earth homesteads, and modern tourist pavilions set against the Darling Scarp foothills. Architectural residences "
        "across {suburb} feature expansive picture windows overlooking grapevines, high vaulted ceilings with exposed timber beams, wide colonial "
        "verandas, and floor-to-ceiling glass tasting rooms. The suburban and rural landscape centers around historic viticulture, cellar doors, "
        "boutique accommodation, and popular local attractions including {landmarks_str}. These properties require delicate aesthetic care to "
        "keep views over lush vineyards completely clear for owners, patrons, and international tourists, maintaining a pristine presentation "
        "that reflects the world-class reputation of the region's culinary and viticultural heritage."
    ),
    "challenges": (
        "Living and operating in {suburb}'s viticultural corridor brings distinct environmental demands. Seasonal vineyard tractor movements, "
        "harvesting activities, and summer easterly winds lift heavy dust clouds that settle over exterior glazing. In spring and summer, grape "
        "pollen, native blossom resins, and heavy spiderwebs cling to deep eaves and timber window frames. Additionally, properties relying on "
        "shallow alluvial groundwater bores frequently suffer from severe iron and calcium reticulation staining across ground-level windows. "
        "Local hospitality operators and residents frequently mention the challenge of keeping large public-facing windows clean during dusty harvest months, "
        "where tractor dust, harvest activities, and spring blossoming quickly obscure panoramic vineyard vistas and diminish the visitor experience."
    ),
    "strategy": (
        "Aspect delivers specialized exterior detailing tailored to vineyard properties, cellar doors, and rural residences in {suburb}. We deploy "
        "onboard 4-stage reverse osmosis filtration systems producing 0 PPM pure deionised water, lifting baked dust and organic pollen without "
        "detergents. Our carbon-fibre water-fed reach poles clean high colonial dormers, clerestory winery windows, and wide veranda panes safely from "
        "ground level. For mineral-stained glass, we provide gentle acid descaling with non-scratch grade-0000 bronze wool, followed by complete "
        "eave de-webbing, flyscreen washing, and sliding track detailing to protect door hardware from soil ingress. We offer flexible scheduling, "
        "ensuring commercial cellar doors, restaurant dining pavilions, and private vineyard estates look immaculate without interrupting patrons, functions, or busy agricultural operations."
    ),
    "coverage": (
        "Located approximately {dist_km} km from our workshop at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via {main_route}), "
        "{suburb} is serviced on our scheduled eastern metropolitan and Swan Valley routes. We guarantee zero callout surcharges, zero travel fees, "
        "and upfront transparent pricing for all residential and commercial properties in {suburb}. Contact our police-cleared team for "
        "dependable, streak-free window care tailored to valley properties."
    ),
    "faqs": [
        ("Do you clean commercial winery tasting rooms and cellar doors in {suburb}?", "Yes. We provide flexible commercial cleaning for wineries, restaurants, and cellar doors in {suburb}, offering early morning visits that don't disrupt your guests."),
        ("Can your pure water system remove heavy tractor dust and vineyard pollen in {suburb}?", "Absolutely. Our 0 PPM pure water system effortlessly dissolves airborne dust, pollen, and tree sap, leaving glass spot-free and crystal-clear.")
    ]
}

# 12. Commercial, Industrial & Mixed Hubs (~435-445 words)
ARCHETYPES["Commercial, Industrial & Mixed Hubs"] = {
    "arch": (
        "{suburb} serves as a vital commercial, retail, and mixed-use activity centre within the Perth metropolitan region. The architectural "
        "landscape features modern multi-storey office complexes, vibrant retail shopfronts, extensive commercial showrooms, and contemporary "
        "strata developments. Properties across {suburb} showcase large-format floor-to-ceiling display glazing, automated glass sliding entries, "
        "multi-tier curtain walls, and architectural glass atriums. The district is defined by bustling commercial thoroughfares, corporate "
        "headquarters, logistics precincts, and prominent community landmarks including {landmarks_str}. In this high-visibility environment, "
        "impeccably maintained exterior glass is vital for customer appeal, executive leasing, and professional corporate presentation, creating "
        "a polished commercial profile that builds trust and enhances business credibility."
    ),
    "challenges": (
        "Commercial properties and shopfronts in {suburb} experience constant high-volume vehicular traffic and heavy pedestrian footfall. "
        "Airborne diesel particulate matter, road grime, and industrial exhaust create a greasy, stubborn film that dulls display glass and "
        "diminishes brand presentation. Ground-floor glass entrance doors continually accumulate fingerprints, adhesive tape marks, and smudge marks, "
        "while higher multi-storey facade glazing is exposed to relentless environmental dust and rain spotting that requires certified high-reach access. "
        "Strata committees and business owners frequently note the difficulty of finding certified cleaning crews who comply with strict site safety documentation, "
        "work outside normal trading hours, and possess the necessary EWP tickets and high-risk work licenses."
    ),
    "strategy": (
        "Aspect provides comprehensive commercial and corporate window cleaning tailored to businesses throughout {suburb}. Our certified "
        "technicians utilize ultra-high reach carbon-fibre water-fed poles up to 4 storeys, delivering 0 PPM deionised water that dries streak-free "
        "without chemicals or window streaks. For complex multi-level commercial buildings, we deploy certified Elevated Work Platforms (EWP / scissor "
        "lifts) accompanied by comprehensive Safe Work Method Statements (SWMS). We offer flexible scheduling, including early morning and weekend "
        "services, to ensure zero disruption to your daily business operations, leaving shopfronts, corporate offices, and showroom entries sparkling. "
        "Entrance door glass, interior glass balustrades, conference room partitions, and external facade cladding receive meticulous attention to detail, maintaining impeccable corporate standards that leave a lasting positive impression on visitors, clients, and commercial tenants alike."
    ),
    "coverage": (
        "Conveniently positioned approximately {dist_km} km from our base at 183 Stirling Highway, Nedlands (approx. {travel_mins} minutes via "
        "{main_route}), {suburb} receives regular commercial service with same-week dispatch. We guarantee zero travel charges, zero callout fees, "
        "and transparent corporate pricing across {suburb}. Our technicians are fully insured ($20M public liability), police-cleared, and "
        "certified for commercial compliance."
    ),
    "faqs": [
        ("Do you provide out-of-hours cleaning for retail shopfronts and offices in {suburb}?", "Yes. We offer early morning, evening, and weekend scheduling across {suburb} so your windows are cleaned without disrupting customers or staff."),
        ("Can you provide SWMS and insurance certificates for commercial sites in {suburb}?", "Yes. We provide comprehensive Safe Work Method Statements (SWMS), JSA documentation, and our $20 million public liability insurance certificate before commencing work.")
    ]
}

print("=== REFINED ARCHETYPE LENGTH TEST ===")
for k, t in ARCHETYPES.items():
    dummy = {
        "suburb": "Tuart Hill",
        "landmarks_str": "Robinson Reserve, Main Street Café Strip, and Grenville Community Centre",
        "dist_km": 11,
        "travel_mins": 14,
        "main_route": "Mitchell Freeway & Main Street"
    }
    arch_w = len(t['arch'].format(**dummy).split())
    chal_w = len(t['challenges'].format(**dummy).split())
    strat_w = len(t['strategy'].format(**dummy).split())
    cov_w = len(t['coverage'].format(**dummy).split())
    body_w = arch_w + chal_w + strat_w + cov_w
    faqs_w = sum(len(q.format(**dummy).split()) + len(a.format(**dummy).split()) for q, a in t['faqs'])
    total_w = body_w + faqs_w
    print(f"{k:40s} | Body: {body_w:3d} (Arch:{arch_w:3d}, Chal:{chal_w:3d}, Strat:{strat_w:3d}, Cov:{cov_w:2d}) | FAQs: {faqs_w:2d} | Total: {total_w:3d}")
