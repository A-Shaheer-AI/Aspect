import json

sample_suburbs = [
    {
        "name": "Tuart Hill",
        "region": "North",
        "type": "Infill Residential / Narrow Lot",
        "distance_from_base": {
            "km": 11,
            "travel_time_mins": 14,
            "main_arterial": "Mitchell Freeway & Main Street"
        },
        "nearby_landmarks": [
            "Robinson Reserve",
            "Main Street Café Precinct",
            "Grenville Reserve Community Centre"
        ],
        "architecture_profile": (
            "Tuart Hill is characterized by intense residential infill, where traditional quarter-acre blocks from the 1950s "
            "and 60s have been extensively subdivided into two, three, or four single and double-storey villas and triplexes. "
            "Many homes feature narrow side setbacks—often less than 80 to 90 centimetres between the exterior brick wall and the "
            "Colorbond boundary fence. While front courtyards and rear alfresco areas have decent access, side elevation windows "
            "(typically master ensuite, laundry, and upper bedroom panes) sit in extremely tight lightwells. Popular local hubs "
            "include the bustling café precinct along Main Street and open parklands at Robinson Reserve and Grenville Reserve."
        ),
        "local_challenges_reddit": (
            "A recurring issue discussed by Tuart Hill homeowners and renters on local Perth forums is window access frustration "
            "in modern triplex developments. Because builder floorplans maximize internal living space, upper-floor windows "
            "frequently overlook narrow side paths where standard A-frame stepladders cannot be safely splayed. Additionally, older "
            "homes in the area that rely on shallow groundwater garden bores often suffer from heavy calcification and orange "
            "iron-oxide staining on lower window panes from reticulation overspray."
        ),
        "cleaning_strategy": (
            "To conquer Tuart Hill's narrow side setbacks, Aspect utilizes straight single-section extension ladders fitted with "
            "specialized standoff wall bumpers, allowing safe placement without putting pressure on fragile Colorbond fences. "
            "For second-storey glass where ladder pitch is restricted, our technicians deploy ultra-lightweight telescopic "
            "carbon-fibre reach poles fitted with adjustable gooseneck angles. This allows us to angle our dual-trim nylon brushes "
            "and microfibre squeegee heads directly into narrow lightwells from ground level. Where bore water etching has bonded "
            "to glass, we apply commercial acid descaling agents agitated with grade-0000 non-scratch bronze wool, restoring complete "
            "crystal clarity without scratching tinted or Low-E coatings."
        ),
        "coverage_guarantee": (
            "Located approximately 11 km north of our Nedlands headquarters (approx. 14 minutes via Mitchell Freeway and Main Street), "
            "Tuart Hill falls squarely within our primary northern service run. We schedule regular weekly teams through Tuart Hill, "
            "providing same-week bookings with guaranteed zero travel surcharges and zero callout fees."
        ),
        "window_cleaning_tip": (
            "Adjust garden bore sprinkler heads away from boundary glazing to prevent heavy calcium and iron etching on lower panes."
        ),
        "suburb_faqs": [
            {
                "question": "How do you clean double-storey windows in narrow Tuart Hill side passages?",
                "answer": "We use telescopic carbon-fibre pure water poles with adjustable gooseneck angles from the ground, or straight ladders equipped with standoff bumpers, eliminating any risk of damaging narrow boundary fences."
            },
            {
                "question": "Can you remove yellow bore water stains on ground-floor glass in Tuart Hill?",
                "answer": "Yes. We use commercial acid descaling solutions and grade-0000 bronze wool detailing to safely dissolve stubborn iron and mineral deposits without scratching the glass."
            }
        ]
    }
]

for s in sample_suburbs:
    full_text = " ".join([
        s["architecture_profile"],
        s["local_challenges_reddit"],
        s["cleaning_strategy"],
        s["coverage_guarantee"],
        " ".join([f["question"] + " " + f["answer"] for f in s["suburb_faqs"]])
    ])
    words = len(full_text.split())
    print(f"Suburb: {s['name']}, Word Count: {words}")
