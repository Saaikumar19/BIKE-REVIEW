// MotoReview India - Bike Database
const BIKES_DATA = [
  {
    id: "yamaha-r15-v4",
    name: "Yamaha YZF R15 V4",
    brand: "Yamaha",
    brandSlug: "yamaha",
    tagline: "Born of the Racing DNA with Traction Control & Quick Shifter",
    category: "Sports",
    bodyType: "Track & Supersport",
    exShowroomPrice: 182600,
    onRoadPrice: 212450,
    mileage: 45,
    topSpeed: 142,
    engine: 155.0,
    engineType: "Liquid-cooled, 4-stroke, SOHC, 4-valve, VVA",
    power: "18.4 PS @ 10,000 rpm",
    powerVal: 18.4,
    torque: "14.2 Nm @ 7,500 rpm",
    torqueVal: 14.2,
    kerbWeight: 142,
    fuelTank: 11,
    seatHeight: 815,
    groundClearance: 170,
    gearbox: "6-Speed Manual with Assist & Slipper Clutch",
    frontBrake: "282 mm Disc with Dual-Channel ABS",
    rearBrake: "220 mm Disc",
    tyreFront: "100/80-17M/C 52P Tubeless",
    tyreRear: "140/70R17M/C 66H Radial Tubeless",
    serviceCost: "₹2,200 - ₹3,000 / year",
    userRating: 4.7,
    ratingCount: 3840,
    ratingsBreakdown: {
      performance: 4.9,
      mileage: 4.4,
      comfort: 3.6,
      design: 4.9,
      maintenance: 4.2
    },
    isLatest: true,
    isBestMileage: false,
    budgetCategory: "under-2lakh",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Racing Blue", hex: "#0033a0" },
      { name: "Metallic Red", hex: "#b71234" },
      { name: "Dark Knight", hex: "#1c1d21" },
      { name: "Intensity White", hex: "#e5e7eb" }
    ],
    features: [
      "Variable Valve Actuation (VVA)",
      "Inverted USD Front Forks (Gold anodized)",
      "Traction Control System (TCS)",
      "Quick Shifter (Up-shifts on select models)",
      "Bluetooth Y-Connect Connectivity & Turn-by-Turn Navigation",
      "Class-D Bi-functional LED Headlight"
    ],
    pros: [
      "Benchmark aerodynamic supersport styling inspired by YZF-R1",
      "VVA provides exhilarating top-end punch while maintaining great fuel efficiency",
      "Superb chassis handling, USD suspension and corner carving agility",
      "Segment-first traction control and quickshifter features",
      "Exceptional mileage for a 155cc track-tuned motorcycle (~45 kmpl)"
    ],
    cons: [
      "Aggressive clip-on riding posture can cause wrist and lower back fatigue in heavy city traffic",
      "Stiff suspension setup transmits road potholes directly to rider",
      "Pillion seat is compact and steep with minimal comfort on long tours"
    ],
    review: {
      overall: 4.7,
      performance: "The 155cc liquid-cooled powerplant with Variable Valve Actuation (VVA) is a technological masterpiece. At 7,400 RPM, the high-cam kicks in delivering an exhilarating pull up to its 10,500 RPM limiter. The 6-speed gearbox with slipper clutch clicks with surgical precision.",
      mileage: "Despite delivering peak supersport performance, real-world tests yield an astonishing 42-47 kmpl in mixed driving conditions thanks to smart VVA calibration.",
      comfort: "The ergonomics are undeniably aggressive. The low clip-ons and high rearsets demand core engagement. It's built for twisties and track days, not for effortless daily city crawling or relaxed long highway touring.",
      design: "With sleek M1-inspired aerodynamic fairings, integrated winglets, and bi-functional projector headlamps, the R15 V4 is arguably the most head-turning sub-200cc motorcycle in the Indian market.",
      maintenance: "Yamaha's service network across tier 1 and 2 Indian cities is widespread. Routine service costs remain around ₹800-₹1,200 per service with genuine Yamalube oil.",
      verdict: "For college riders, weekend track enthusiasts, and aerodynamic sports bike lovers, the Yamaha R15 V4 remains the undisputed king of entry-level supersports in India."
    }
  },
  {
    id: "yamaha-r15-v2",
    name: "Yamaha YZF R15 V2.0",
    brand: "Yamaha",
    brandSlug: "yamaha",
    tagline: "The Legend that Ignited India's 150cc Supersport Revolution",
    category: "Sports",
    bodyType: "Track & Supersport",
    exShowroomPrice: 118000,
    onRoadPrice: 135000,
    mileage: 40,
    topSpeed: 136,
    engine: 149.8,
    engineType: "Liquid-cooled, 4-stroke, SOHC, 4-valve",
    power: "17.0 PS @ 8,500 rpm",
    powerVal: 17.0,
    torque: "15.0 Nm @ 7,500 rpm",
    torqueVal: 15.0,
    kerbWeight: 136,
    fuelTank: 12,
    seatHeight: 800,
    groundClearance: 160,
    gearbox: "6-Speed Manual",
    frontBrake: "267 mm Hydraulic Disc",
    rearBrake: "220 mm Hydraulic Disc",
    tyreFront: "90/80-17 Tubeless",
    tyreRear: "130/70-R17 Radial Tubeless",
    serviceCost: "₹1,500 - ₹2,200 / year",
    userRating: 4.6,
    ratingCount: 5120,
    ratingsBreakdown: {
      performance: 4.7,
      mileage: 4.1,
      comfort: 3.4,
      design: 4.8,
      maintenance: 4.3
    },
    isLatest: false,
    isBestMileage: false,
    budgetCategory: "under-1-5lakh",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Revving Blue", hex: "#0047bb" },
      { name: "Sparkling Black", hex: "#111111" },
      { name: "Sunset Red", hex: "#c91a25" },
      { name: "Special 50th GP", hex: "#ffffff" }
    ],
    features: [
      "Legendary Deltabox Frame",
      "Cast Aluminum Swingarm (Longer wheelbase)",
      "Split-seat with iconic high-rise tail cowl",
      "Twin-pod Halogen Projector lamps",
      "Linked-type Monocross rear suspension"
    ],
    pros: [
      "Iconic high-revving engine note with solid mid-range torque",
      "Timeless sharp tail styling that still turns heads",
      "Pure analog-digital tachometer console with raw track feeling",
      "Lightweight Deltabox chassis with laser-sharp cornering feedback",
      "Affordable pre-owned purchase and easily accessible spare parts"
    ],
    cons: [
      "Extreme pillion step seat made carrying co-riders nearly impossible",
      "Lacks modern ABS braking safety and LED lighting",
      "Discontinued from showroom floors; available widely in certified pre-owned markets"
    ],
    review: {
      overall: 4.6,
      performance: "The V2.0 was the pinnacle of mechanical purity. Without electronic rider aids, its 15 PS and 15 Nm delivered raw, visceral throttle response that taught an entire generation of Indian riders how to apex corners.",
      mileage: "Delivers an honest 38-42 kmpl in real world Indian traffic conditions.",
      comfort: "Strictly for solo enthusiasts. The clip-ons were low and aggressive, and the pillion seat was infamous for being higher than the rider's shoulders.",
      design: "Its aggressive predator tail and twin cat-eye headlights remain one of the most recognizable motorcycle profiles ever launched on Indian roads.",
      maintenance: "Parts are cheap and mechanics across India are intimately familiar with the Deltabox architecture.",
      verdict: "A certified modern Indian classic. If you're looking for an affordable, track-friendly pre-owned motorcycle with pedigree racing chops, the R15 V2 holds legendary status."
    }
  },
  {
    id: "yamaha-mt-15",
    name: "Yamaha MT-15 V2",
    brand: "Yamaha",
    brandSlug: "yamaha",
    tagline: "The Dark Warrior - Street Naked Agility with R15 Heart",
    category: "Naked",
    bodyType: "Street Naked",
    exShowroomPrice: 168200,
    onRoadPrice: 196800,
    mileage: 48,
    topSpeed: 130,
    engine: 155.0,
    engineType: "Liquid-cooled, 4-stroke, SOHC, 4-valve, VVA",
    power: "18.4 PS @ 10,000 rpm",
    powerVal: 18.4,
    torque: "14.1 Nm @ 7,500 rpm",
    torqueVal: 14.1,
    kerbWeight: 141,
    fuelTank: 10,
    seatHeight: 810,
    groundClearance: 170,
    gearbox: "6-Speed Manual with Assist & Slipper Clutch",
    frontBrake: "282 mm Disc with Dual-Channel ABS",
    rearBrake: "220 mm Disc",
    tyreFront: "100/80-17 Tubeless",
    tyreRear: "140/70-R17 Radial Tubeless",
    serviceCost: "₹2,000 - ₹2,800 / year",
    userRating: 4.6,
    ratingCount: 4210,
    ratingsBreakdown: {
      performance: 4.8,
      mileage: 4.6,
      comfort: 4.3,
      design: 4.8,
      maintenance: 4.3
    },
    isLatest: true,
    isBestMileage: false,
    budgetCategory: "under-2lakh",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Cyan Storm", hex: "#00c4cc" },
      { name: "Cyber Green", hex: "#2bfd97" },
      { name: "Ice Fluo Vermillion", hex: "#ff3e3e" },
      { name: "Metallic Black Deluxe", hex: "#1a1a1a" }
    ],
    features: [
      "Dual-Channel ABS with Traction Control System",
      "37mm Upside Down (USD) Golden Front Forks",
      "Bi-functional LED Cyclops Projector with Twin LED Position Lights",
      "Aluminum Swingarm for razor-sharp handling",
      "Y-Connect Bluetooth App integration"
    ],
    pros: [
      "Incredible city flickability and explosive off-the-line acceleration",
      "Upright, commanding streetfighter ergonomics without wrist strain",
      "Same explosive 155cc VVA engine as R15 with better lower-gear punch",
      "Stunning aggressive Transformer-like front fascia",
      "Outstanding fuel economy (46-50 kmpl in regular city rides)"
    ],
    cons: [
      "Small 10-liter fuel tank requires frequent highway refueling stops",
      "Firm seat cushion on long continuous rides over 150 km",
      "Pillion seat room remains on the smaller side"
    ],
    review: {
      overall: 4.6,
      performance: "Tuned for punchy urban warfare. Thanks to revised final drive gearing, the MT-15 leaps off traffic signals faster than the R15. The USD forks keep the front end planted during fast transitions.",
      mileage: "One of the most fuel-efficient performance bikes in India, easily returning 47-52 kmpl when ridden sensibly.",
      comfort: "Wide single-piece handlebar and relaxed footpegs offer a commanding stance that cuts through Indian city congestion with zero wrist strain.",
      design: "The Cyclops LED projector and twin eyebrows give it an menacing, hyper-naked stance that stands out instantly on Indian streets.",
      maintenance: "Inexpensive maintenance with high reliability and readily available spares through Yamaha Blue Square dealerships.",
      verdict: "The absolute best city streetfighter under ₹2 lakh. It packs the thrilling mechanical DNA of the R15 into a comfortable, hyper-nimble daily commuter."
    }
  },
  {
    id: "royal-enfield-classic-350",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    brandSlug: "royal-enfield",
    tagline: "Timeless British Heritage Engineered with Smooth J-Series Tech",
    category: "Cruiser",
    bodyType: "Retro Cruiser / Heritage",
    exShowroomPrice: 193080,
    onRoadPrice: 228500,
    mileage: 36,
    topSpeed: 115,
    engine: 349.0,
    engineType: "4 Stroke, Air-Oil Cooled, J-Series SOHC Engine",
    power: "20.2 PS @ 6,100 rpm",
    powerVal: 20.2,
    torque: "27.0 Nm @ 4,000 rpm",
    torqueVal: 27.0,
    kerbWeight: 195,
    fuelTank: 13,
    seatHeight: 805,
    groundClearance: 170,
    gearbox: "5-Speed Constant Mesh",
    frontBrake: "300 mm Disc with Twin Piston Floating Caliper (Dual ABS)",
    rearBrake: "270 mm Disc with Single Piston Floating Caliper",
    tyreFront: "100/90-19 57P (Spoke/Alloy)",
    tyreRear: "120/80-18 62P (Spoke/Alloy)",
    serviceCost: "₹2,800 - ₹3,600 / year",
    userRating: 4.8,
    ratingCount: 8450,
    ratingsBreakdown: {
      performance: 4.3,
      mileage: 3.9,
      comfort: 4.9,
      design: 4.9,
      maintenance: 4.2
    },
    isLatest: true,
    isBestMileage: false,
    budgetCategory: "under-2lakh",
    image: "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Halcyon Black", hex: "#1f2421" },
      { name: "Signals Marsh Grey", hex: "#5b6770" },
      { name: "Dark Stealth Black", hex: "#111111" },
      { name: "Chrome Red", hex: "#8a1c14" },
      { name: "Emerald Green", hex: "#1d382b" }
    ],
    features: [
      "J-Series 349cc Counterbalanced Engine with zero vibrations",
      "Twin Downtube Spine Frame for supreme highway stability",
      "Digi-Analog Instrument Cluster with Tripper Navigation Pod (optional)",
      "Iconic 'Tiger Eye' Pilot lamps and metallic teardrop tank",
      "Dual Channel ABS with wide footprint touring tyres"
    ],
    pros: [
      "Silky-smooth engine with virtually zero vibrations up to 90 km/h",
      "Satisfying low-end torque thump that effortlessly tackles ghats and highways",
      "Plush, wide rider and pillion seats ideal for all-day touring",
      "Unmatched road presence, heritage paint quality, and metal switchgear",
      "Massive aftermarket touring ecosystem and Royal Enfield ride community"
    ],
    cons: [
      "Heavy kerb weight of 195 kg requires muscle when parking in tight spots",
      "Cruises best at 90-100 km/h; lacks top-end urgency beyond 115 km/h",
      "Clutch lever pull can feel heavy in bumper-to-bumper city jams"
    ],
    review: {
      overall: 4.8,
      performance: "The modern J-Platform engine solved the vibration issues of the previous UCE models. The bottom-end torque is bountiful, pulling smoothly from 30 km/h in 4th gear without stalling.",
      mileage: "Delivers a consistent 35-38 kmpl on long highway trips and 32-34 kmpl in city use.",
      comfort: "Unrivaled touring comfort. The well-sprung wide saddle and upright handle position make 400 km Ladakh or coastal tours effortless.",
      design: "Authentic retro craftsmanship. From hand-crafted pinstripes to solid metal fenders and rotary switches, it oozes vintage motorcycle charm.",
      maintenance: "Royal Enfield has over 2,000 service touchpoints across India. Periodic service at 10,000 km intervals keeps ownership costs low.",
      verdict: "India's beloved road monarch. If you want soulful cruising, legendary thump, and effortless highway tourability, the Classic 350 has no peer."
    }
  },
  {
    id: "honda-shine-125",
    name: "Honda Shine 125",
    brand: "Honda",
    brandSlug: "honda",
    tagline: "India's No. 1 Trusted 125cc Commuter Motorcycle",
    category: "Commuter",
    bodyType: "Executive Commuter",
    exShowroomPrice: 79800,
    onRoadPrice: 94200,
    mileage: 65,
    topSpeed: 102,
    engine: 123.94,
    engineType: "4 Stroke, SI, BS-VI OBD-2 compliant, eSP Engine",
    power: "10.7 PS @ 7,500 rpm",
    powerVal: 10.7,
    torque: "11.0 Nm @ 6,000 rpm",
    torqueVal: 11.0,
    kerbWeight: 114,
    fuelTank: 10.5,
    seatHeight: 791,
    groundClearance: 162,
    gearbox: "5-Speed Manual (All Up pattern)",
    frontBrake: "240 mm Disc / 130 mm Drum with CBS",
    rearBrake: "130 mm Drum",
    tyreFront: "80/100-18 Tubeless",
    tyreRear: "80/100-18 Tubeless",
    serviceCost: "₹1,200 - ₹1,800 / year",
    userRating: 4.6,
    ratingCount: 9230,
    ratingsBreakdown: {
      performance: 4.2,
      mileage: 4.9,
      comfort: 4.7,
      design: 4.1,
      maintenance: 4.9
    },
    isLatest: false,
    isBestMileage: true,
    budgetCategory: "under-1lakh",
    image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Geny Grey Metallic", hex: "#5a6265" },
      { name: "Decent Blue Metallic", hex: "#1e3a5f" },
      { name: "Rebel Red Metallic", hex: "#9b1b1b" }
    ],
    features: [
      "Enhanced Smart Power (eSP) & ACG Silent Starter",
      "5-Speed Gearbox for relaxed highway cruising",
      "Combi-Brake System (CBS) with Equalizer",
      "5-Step Adjustable Rear Suspension",
      "Long 651mm seat for ultimate family comfort",
      "Engine Start/Stop Integrated Switch"
    ],
    pros: [
      "Bulletproof Honda Japanese reliability with whisper-quiet engine running",
      "Stellar fuel economy of 60-65 kmpl in everyday Indian traffic",
      "Supreme plush ride quality that absorbs broken rural and city roads easily",
      "Negligible maintenance bills and rock-solid resale value across India",
      "Low seat height and featherweight 114 kg chassis makes it easy for anyone to ride"
    ],
    cons: [
      "Conservative, sober visual styling that doesn't appeal to college youths",
      "Basic analog instrument console without digital odometer trip readings",
      "Narrow rear tyre prioritizes mileage over cornering grip"
    ],
    review: {
      overall: 4.6,
      performance: "Honda's eSP engine starts silently without any starter motor whir. Power delivery is linear, creamy smooth, and vibration-free up to 75 km/h.",
      mileage: "The benchmark for mileage. Daily commuters routinely record between 62 to 67 kmpl with minimal effort.",
      comfort: "The long single-piece bench seat easily accommodates rider, backpack, and pillion. The upright handlebar causes zero back stress.",
      design: "Clean, elegant, understated chrome garnishes and metallic 3D emblems. Practical and durable.",
      maintenance: "Almost zero unexpected headaches. Regular oil changes and air filter cleaning will keep this bike running for over 15 years.",
      verdict: "The undisputed champion of sensible, pocket-friendly daily commuting in India. You simply cannot go wrong with a Honda Shine."
    }
  },
  {
    id: "honda-sp-125",
    name: "Honda SP 125",
    brand: "Honda",
    brandSlug: "honda",
    tagline: "Advanced Style Meets Smart Technology in the 125cc Segment",
    category: "Commuter",
    bodyType: "Sporty Premium Commuter",
    exShowroomPrice: 86017,
    onRoadPrice: 101500,
    mileage: 63,
    topSpeed: 106,
    engine: 123.94,
    engineType: "4 Stroke, SI Engine, BS-VI OBD-2 compliant, eSP",
    power: "10.87 PS @ 7,500 rpm",
    powerVal: 10.87,
    torque: "10.9 Nm @ 6,000 rpm",
    torqueVal: 10.9,
    kerbWeight: 116,
    fuelTank: 11.2,
    seatHeight: 790,
    groundClearance: 160,
    gearbox: "5-Speed Manual",
    frontBrake: "240 mm Disc / 130 mm Drum (CBS)",
    rearBrake: "130 mm Drum",
    tyreFront: "80/100-18 Tubeless",
    tyreRear: "100/80-18 Tubeless (Wider Rear Tyre)",
    serviceCost: "₹1,300 - ₹1,900 / year",
    userRating: 4.7,
    ratingCount: 6140,
    ratingsBreakdown: {
      performance: 4.4,
      mileage: 4.8,
      comfort: 4.7,
      design: 4.7,
      maintenance: 4.8
    },
    isLatest: true,
    isBestMileage: true,
    budgetCategory: "under-1-5lakh",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Black Pearl", hex: "#181818" },
      { name: "Matte Marvel Blue", hex: "#1f4068" },
      { name: "Imperial Red Metallic", hex: "#8c1d22" },
      { name: "Matte Axis Grey", hex: "#4a4e51" }
    ],
    features: [
      "Full Digital Instrument Cluster with Real-time Mileage & Gear Position Indicator",
      "Sharp LED Headlamp with Sporty Visor",
      "Wider 100-section Rear Tyre for enhanced road stability",
      "Chrome Finish Muffler Cover & Muscular Tank Shrouds",
      "eSP Technology with Silent ACG Start"
    ],
    pros: [
      "Sporty, sharp visual design that appeals to young professionals and students",
      "Full digital cluster with distance-to-empty, live mileage, and gear position indicator",
      "Ultra-smooth refined engine with Honda's proprietary eSP tech",
      "Superb 60+ kmpl fuel economy without sacrificing initial pickup",
      "Wider rear tyre provides confidence on slippery and rainy road conditions"
    ],
    cons: [
      "Slightly priced at a premium over base commuter models",
      "Rear drum brakes could have offered a disc option for the top variant",
      "Front suspension feels slightly soft under sudden hard braking"
    ],
    review: {
      overall: 4.7,
      performance: "Shares the bulletproof Shine 125 engine but with sharper throttle mapping. It cruises effortlessly between 60-80 km/h with zero engine buzz.",
      mileage: "Real-world mileage consistently hovers around 60 to 65 kmpl, making it a money-saver for long daily office commutes.",
      comfort: "Plush ergonomics, wide handlebars, and a comfortable seat allow relaxed commuting in heavy bumper-to-bumper traffic.",
      design: "The angular LED headlamp cowl, chiseled fuel tank extensions, and sporty graphics make it look like a 150cc bike from a distance.",
      maintenance: "Low running cost, Honda's extensive service network, and high residual value make it an exceptionally smart financial purchase.",
      verdict: "The most modern, stylish, and feature-packed 125cc executive motorcycle in India. It bridges the gap between raw fuel economy and modern digital styling."
    }
  },
  {
    id: "tvs-apache-rtr-160",
    name: "TVS Apache RTR 160 4V",
    brand: "TVS",
    brandSlug: "tvs",
    tagline: "Born on the Track with TVS Racing Pedigree & Ride Modes",
    category: "Naked",
    bodyType: "Performance Streetfighter",
    exShowroomPrice: 124870,
    onRoadPrice: 147200,
    mileage: 46,
    topSpeed: 114,
    engine: 159.7,
    engineType: "SI, 4 stroke, Oil Cooled, SOHC, 4 Valve",
    power: "17.55 PS @ 9,250 rpm (Sport Mode)",
    powerVal: 17.55,
    torque: "14.73 Nm @ 7,250 rpm",
    torqueVal: 14.73,
    kerbWeight: 144,
    fuelTank: 12,
    seatHeight: 800,
    groundClearance: 180,
    gearbox: "5-Speed Manual",
    frontBrake: "270 mm Wave Petal Disc with Super-Moto ABS",
    rearBrake: "200 mm Disc / 130 mm Drum",
    tyreFront: "90/90-17 Tubeless",
    tyreRear: "130/70-17 Radial Tubeless",
    serviceCost: "₹1,800 - ₹2,500 / year",
    userRating: 4.7,
    ratingCount: 7190,
    ratingsBreakdown: {
      performance: 4.8,
      mileage: 4.4,
      comfort: 4.6,
      design: 4.7,
      maintenance: 4.5
    },
    isLatest: true,
    isBestMileage: false,
    budgetCategory: "under-1-5lakh",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Racing Red", hex: "#cc1122" },
      { name: "Knight Black", hex: "#161616" },
      { name: "Metallic Blue", hex: "#1d4ed8" },
      { name: "Lightning Blue", hex: "#0ea5e9" }
    ],
    features: [
      "Segment-First 3 Riding Modes (Sport, Urban, Rain)",
      "SmartXonnect Bluetooth with Voice Assist & Navigation",
      "Glide Through Technology (GTT) for zero-throttle crawling in traffic",
      "Signature Claw-styling LED Headlamp with DRL",
      "Race-Tuned Showa Monoshock Suspension",
      "Race-Tuned Fuel Injection (RT-Fi)"
    ],
    pros: [
      "Best-in-class power output (17.55 PS) in the 160cc streetfighter segment",
      "Bass-heavy, throaty racing exhaust note that sounds exhilarating",
      "Glide Through Technology (GTT) lets you crawl smoothly in 1st/2nd/3rd gear without clutch slip",
      "Plush Showa tuned suspension soaks up potholed Indian roads with ease",
      "Segment-leading Bluetooth console with telemetry, lean angle and lap timer"
    ],
    cons: [
      "5-speed gearbox misses a 6th overdrive gear for relaxed highway cruising above 100 km/h",
      "Single-channel ABS only on standard variants (dual-channel on special edition)",
      "Headlight throw on pitch-dark highways could have more range"
    ],
    review: {
      overall: 4.7,
      performance: "TVS Racing engineers tuned this 4-valve motor to perfection. In Sport mode, throttle response is immediate with a strong mid-range surge. In Rain mode, power delivery smooths out to prevent tyre spin.",
      mileage: "Yields an impressive 44-48 kmpl in daily city commutes and up to 50 kmpl on steady highway speeds.",
      comfort: "One of the most comfortable saddles in the 160cc class. The rider triangle strikes a golden balance between aggressive lean and upright comfort.",
      design: "Aggressive tank cowls, aerodynamic engine belly cowl, dual-barrel exhaust, and menacing fang-like LED DRLs give it great street appeal.",
      maintenance: "TVS parts are cost-effective, and service intervals are manageable. Oil changes cost under ₹700.",
      verdict: "Hands-down the best all-round 160cc motorcycle in India. It does track enthusiasm, daily office commuting, and weekend touring with equal aplomb."
    }
  },
  {
    id: "bajaj-pulsar-ns200",
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    brandSlug: "bajaj",
    tagline: "The Naked Street Brawler with Triple Spark & USD Forks",
    category: "Naked",
    bodyType: "Street Naked",
    exShowroomPrice: 158400,
    onRoadPrice: 185600,
    mileage: 38,
    topSpeed: 136,
    engine: 199.5,
    engineType: "Liquid Cooled, Triple Spark, 4-Valve FI DTS-i Engine",
    power: "24.5 PS @ 9,750 rpm",
    powerVal: 24.5,
    torque: "18.74 Nm @ 8,000 rpm",
    torqueVal: 18.74,
    kerbWeight: 158,
    fuelTank: 12,
    seatHeight: 805,
    groundClearance: 168,
    gearbox: "6-Speed Manual",
    frontBrake: "300 mm Disc with Dual-Channel ABS",
    rearBrake: "230 mm Disc",
    tyreFront: "100/80-17 Tubeless",
    tyreRear: "130/70-17 Tubeless",
    serviceCost: "₹2,200 - ₹3,000 / year",
    userRating: 4.6,
    ratingCount: 6810,
    ratingsBreakdown: {
      performance: 4.8,
      mileage: 3.9,
      comfort: 4.3,
      design: 4.6,
      maintenance: 4.4
    },
    isLatest: true,
    isBestMileage: false,
    budgetCategory: "under-2lakh",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Pewter Grey", hex: "#4b5320" },
      { name: "Ebony Black", hex: "#111111" },
      { name: "Pearl Metallic White", hex: "#f0f2f5" },
      { name: "Cocktail Wine Red", hex: "#800020" }
    ],
    features: [
      "Inverted USD (Upside Down) 33mm Front Forks",
      "Perimeter Frame for superior torsional rigidity",
      "Dual-Channel ABS with Grimeca brake calipers",
      "Updated Full LCD Console with Turn-by-Turn Navigation & Bluetooth",
      "Underbelly Exhaust for centralized mass and agility"
    ],
    pros: [
      "Fierce 24.5 PS power output - unmatched value-for-performance under ₹1.6 lakh",
      "KTM 200-derived engine architecture with relentless rev-happy top end",
      "Solid perimeter frame and USD forks give confident high-speed composure",
      "Underbelly exhaust keeps center of gravity low and looks muscular",
      "Affordable spare parts and widespread Bajaj service footprint across India"
    ],
    cons: [
      "Noticeably heavy at 158 kg compared to KTM Duke 200",
      "Low-end torque below 4,000 RPM is docile; requires downshifts for rapid overtakes",
      "Halogen headlamp on older trims (though modern models updated to LED)"
    ],
    review: {
      overall: 4.6,
      performance: "The NS200 comes alive above 6,500 RPM. The 24.5 PS power comes on with a thrilling mechanical rush. Out on the highway, it comfortably holds 115-125 km/h all day long.",
      mileage: "Delivers around 34-38 kmpl in typical Indian city conditions and 38-42 kmpl on expressways.",
      comfort: "Sporty yet comfortable. The clip-ons are slightly raised, and the wide seat provides sufficient room, though the foam is on the firmer side.",
      design: "The sculpted fuel tank, aggressive radiator shrouds, perimeter frame, and underbelly exhaust give it classic muscular streetfighter posture.",
      maintenance: "Very economical. Bajaj parts are famously affordable and any local or authorized mechanic can service it without hassle.",
      verdict: "The undisputed bang-for-buck performance champion. For anyone wanting near-KTM Duke speeds at a fraction of the cost, the NS200 remains unmatched."
    }
  },
  {
    id: "ktm-duke-200",
    name: "KTM Duke 200",
    brand: "KTM",
    brandSlug: "ktm",
    tagline: "The Sharp Orange Scalpel - Pure Unadulterated Aggression",
    category: "Naked",
    bodyType: "Naked Streetfighter",
    exShowroomPrice: 198300,
    onRoadPrice: 234100,
    mileage: 34,
    topSpeed: 140,
    engine: 199.5,
    engineType: "Single Cylinder, Liquid Cooled, DOHC, 4-Valve Engine",
    power: "25.0 PS @ 10,000 rpm",
    powerVal: 25.0,
    torque: "19.3 Nm @ 8,000 rpm",
    torqueVal: 19.3,
    kerbWeight: 159,
    fuelTank: 13.4,
    seatHeight: 822,
    groundClearance: 155,
    gearbox: "6-Speed Manual with Slipper Clutch",
    frontBrake: "300 mm Disc with ByBre 4-Piston Radially Mounted Caliper",
    rearBrake: "230 mm Disc with Single Piston Floating Caliper (Dual ABS + Supermoto)",
    tyreFront: "110/70-R17 Radial Tubeless",
    tyreRear: "150/60-R17 Radial Tubeless",
    serviceCost: "₹3,000 - ₹4,200 / year",
    userRating: 4.7,
    ratingCount: 5380,
    ratingsBreakdown: {
      performance: 5.0,
      mileage: 3.5,
      comfort: 3.8,
      design: 4.9,
      maintenance: 4.1
    },
    isLatest: true,
    isBestMileage: false,
    budgetCategory: "under-2lakh",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Electronic Orange", hex: "#ff6600" },
      { name: "Dark Galvano Silver", hex: "#444444" },
      { name: "Ceramic White", hex: "#f3f4f6" }
    ],
    features: [
      "Ultra-lightweight Trellis Frame with bolt-on subframe",
      "43mm WP Apex Upside-Down Front Suspension",
      "Supermoto ABS (Allows rear wheel lockup for track slides)",
      "High-spec ByBre radially mounted front brake calipers",
      "Aggressive predator LED Headlamp unit inherited from Duke 390",
      "Wide 150-section sticky radial rear tyre"
    ],
    pros: [
      "Explosive, hyperactive acceleration with class-leading 25 PS power output",
      "WP Apex suspension and lightweight trellis chassis offer razor-sharp cornering",
      "Supermoto ABS mode gives seasoned riders playful drift control",
      "Radical, head-turning Austrian streetfighter design with trademark orange highlights",
      "Top-tier ByBre braking power with great lever feel"
    ],
    cons: [
      "Firm, stiff ride quality over jagged speed breakers and potholes",
      "Higher service and spare parts expense than standard Japanese commuters",
      "Tall 822mm seat height can be slightly intimidating for shorter riders"
    ],
    review: {
      overall: 4.7,
      performance: "Nothing in the 200cc class hits like a KTM Duke. The DOHC 4-valve motor revs with manic energy to 10,500 RPM. Short gearing produces breathtaking stoplight launches.",
      mileage: "Expect around 30-35 kmpl in spirited city riding and around 36 kmpl during steady cruising.",
      comfort: "Aggressive streetfighter stance with forward-tilted torso and wide motocross handlebars. Perfect for carving apexes, but the firm seat demands rest stops on 300+ km tours.",
      design: "In-your-face Austrian styling. The sharp tank extensions, exposed orange trellis framework, and aggressive LED headlight scream performance.",
      maintenance: "KTM authorized workshops provide specialized synthetic Motul oils and diagnostic checks. Maintenance costs are higher than Japanese bikes but justified by performance.",
      verdict: "The absolute hooligan bike of India. If your heart pumps adrenaline and you want pure thrills every time you twist the throttle, buy the Duke 200."
    }
  },
  {
    id: "suzuki-gixxer",
    name: "Suzuki Gixxer 150 FI",
    brand: "Suzuki",
    brandSlug: "suzuki",
    tagline: "Japanese Refinement, Muscular Lines and Effortless Urban Punch",
    category: "Naked",
    bodyType: "Street Naked",
    exShowroomPrice: 134800,
    onRoadPrice: 159200,
    mileage: 50,
    topSpeed: 120,
    engine: 155.0,
    engineType: "4-Cycle, 1-Cylinder, Air-Cooled, SOHC, 2-Valve, SEP",
    power: "13.6 PS @ 8,000 rpm",
    powerVal: 13.6,
    torque: "13.8 Nm @ 6,000 rpm",
    torqueVal: 13.8,
    kerbWeight: 141,
    fuelTank: 12,
    seatHeight: 795,
    groundClearance: 160,
    gearbox: "5-Speed Manual",
    frontBrake: "Disc with Single-Channel ABS",
    rearBrake: "Disc",
    tyreFront: "100/80-17M/C 52P Tubeless",
    tyreRear: "140/60R17M/C 63P Radial Tubeless",
    serviceCost: "₹1,600 - ₹2,300 / year",
    userRating: 4.6,
    ratingCount: 3950,
    ratingsBreakdown: {
      performance: 4.5,
      mileage: 4.7,
      comfort: 4.6,
      design: 4.6,
      maintenance: 4.6
    },
    isLatest: false,
    isBestMileage: true,
    budgetCategory: "under-1-5lakh",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Metallic Sonic Silver", hex: "#9ca3af" },
      { name: "Glass Sparkle Black", hex: "#111111" },
      { name: "Metallic Triton Blue", hex: "#0284c7" }
    ],
    features: [
      "Suzuki Eco Performance (SEP) Technology with Fuel Injection",
      "Dual Exit Chrome-Tipped Exhaust Muffler with distinct thumping note",
      "Fat 41mm Large Diameter Front Forks",
      "Full Digital Negative LCD Speedometer with Gear Indicator",
      "Single Channel ABS & Ultra-wide 140 Radial Rear Tyre"
    ],
    pros: [
      "Silky-smooth Japanese engine refinement with zero handlebar vibrations",
      "Chunky 41mm front forks and fat 140 rear radial tyre provide sublime cornering balance",
      "Excellent real-world mileage of 48-52 kmpl from a 155cc motor",
      "Plush single/split seat comfort and relaxed city riding posture",
      "Distinctive twin-port exhaust note that sounds deep and sporty"
    ],
    cons: [
      "Modest power figures (13.6 PS) compared to TVS Apache 160 4V and Yamaha R15",
      "Pillion grab rails look slightly utilitarian compared to aggressive tail styling",
      "Dealership network in smaller rural towns is less dense than Honda or Bajaj"
    ],
    review: {
      overall: 4.6,
      performance: "The SEP fuel-injected engine delivers immediate low and mid-range shove. It accelerates cleanly from 30 km/h in 4th gear and glides through city traffic with buttery smoothness.",
      mileage: "One of the most fuel-friendly 150cc motorcycles in the country, easily returning 48-52 kmpl when ridden sensibly.",
      comfort: "Outstanding. The chunky front forks absorb craters and speed humps without jarring the rider's wrists. Seat cushioning is well judged for both rider and pillion.",
      design: "Muscular sculpted tank with chiselled extensions, European-inspired circular LED headlamp, and trademark twin-pipe chrome exhaust.",
      maintenance: "Suzuki engines are famously durable. Oil change intervals and service charges remain very gentle on your wallet.",
      verdict: "An impeccably engineered Japanese street bike. If you prioritize smooth engine refinement, robust chassis handling, and 50 kmpl economy over outright top speed, the Gixxer is top tier."
    }
  },
  {
    id: "royal-enfield-hunter-350",
    name: "Royal Enfield Hunter 350",
    brand: "Royal Enfield",
    brandSlug: "royal-enfield",
    tagline: "A Shot of Pure Motorcycling - The Cool, Compact City Roadster",
    category: "Cruiser",
    bodyType: "Retro Roadster",
    exShowroomPrice: 149900,
    onRoadPrice: 174800,
    mileage: 37,
    topSpeed: 114,
    engine: 349.0,
    engineType: "4 Stroke, Air-Oil Cooled, J-Series SOHC Engine",
    power: "20.2 PS @ 6,100 rpm",
    powerVal: 20.2,
    torque: "27.0 Nm @ 4,000 rpm",
    torqueVal: 27.0,
    kerbWeight: 181,
    fuelTank: 13,
    seatHeight: 790,
    groundClearance: 150,
    gearbox: "5-Speed Constant Mesh",
    frontBrake: "300 mm Disc with Dual-Channel ABS",
    rearBrake: "270 mm Disc",
    tyreFront: "110/70-17 Tubeless",
    tyreRear: "140/70-17 Tubeless",
    serviceCost: "₹2,500 - ₹3,400 / year",
    userRating: 4.7,
    ratingCount: 5740,
    ratingsBreakdown: {
      performance: 4.4,
      mileage: 4.0,
      comfort: 4.6,
      design: 4.8,
      maintenance: 4.5
    },
    isLatest: true,
    isBestMileage: false,
    budgetCategory: "under-1-5lakh",
    image: "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Dapper Ash", hex: "#78716c" },
      { name: "Rebel Blue", hex: "#2563eb" },
      { name: "Rebel Red", hex: "#dc2626" },
      { name: "Dapper White", hex: "#ffffff" }
    ],
    features: [
      "J-Series 349cc Engine tuned for crisper urban throttle response",
      "17-inch Alloy Wheels front & rear for nimble cornering",
      "14 kg lighter than Classic 350 for effortless city flickability",
      "Digi-analog instrument cluster with USB charging port",
      "Short stubby exhaust with a deep, punchy bass note"
    ],
    pros: [
      "Most accessible Royal Enfield in terms of price (starting ₹1.5L) and weight",
      "17-inch wheels make it astonishingly agile and fun in city traffic",
      "Low 790mm seat height fits shorter riders perfectly",
      "Soulful J-series torque thump without old-school engine vibration",
      "Trendy dual-tone custom graphics and modern roadster profile"
    ],
    cons: [
      "Stiffer rear suspension on sharp potholes compared to Classic 350",
      "Slightly firm clutch lever in prolonged traffic jams",
      "Ground clearance of 150mm requires caution over oversized speed breakers"
    ],
    review: {
      overall: 4.7,
      performance: "The Hunter uses the same J-series 349cc engine as the Classic and Meteor, but its lighter kerb weight and 17-inch wheels give it an energetic, eager character off the line.",
      mileage: "Returns 35-38 kmpl on highway rides and 32-35 kmpl in congested city corridors.",
      comfort: "The flat one-piece bench seat and slightly rear-set footpegs place you in an active, involved posture. Great for commuting and weekend breakfast rides.",
      design: "A compact modern British roadster. The round headlamp, offset instrument cluster, and chopped rear fender look super trendy.",
      maintenance: "Very budget-friendly to maintain with 10,000 km oil service intervals.",
      verdict: "The coolest and most agile Royal Enfield yet. If you want the prestigious RE thump and heritage styling in a light, pocket-friendly package, the Hunter 350 is unbeatable."
    }
  },
  {
    id: "tvs-raider-125",
    name: "TVS Raider 125",
    brand: "TVS",
    brandSlug: "tvs",
    tagline: "The Wicked 125cc Naked with TFT Display & Ride Modes",
    category: "Commuter",
    bodyType: "Sporty Naked Commuter",
    exShowroomPrice: 95219,
    onRoadPrice: 111500,
    mileage: 62,
    topSpeed: 99,
    engine: 124.8,
    engineType: "Air and Oil Cooled Single Cylinder, SI, 4 Stroke, 3 Valve",
    power: "11.38 PS @ 7,500 rpm",
    powerVal: 11.38,
    torque: "11.2 Nm @ 6,000 rpm",
    torqueVal: 11.2,
    kerbWeight: 123,
    fuelTank: 10,
    seatHeight: 780,
    groundClearance: 180,
    gearbox: "5-Speed Manual",
    frontBrake: "240 mm Petal Disc / 130 mm Drum (SBT)",
    rearBrake: "130 mm Drum",
    tyreFront: "80/100-17 Tubeless",
    tyreRear: "100/90-17 Tubeless",
    serviceCost: "₹1,400 - ₹2,000 / year",
    userRating: 4.7,
    ratingCount: 7890,
    ratingsBreakdown: {
      performance: 4.6,
      mileage: 4.8,
      comfort: 4.6,
      design: 4.9,
      maintenance: 4.6
    },
    isLatest: true,
    isBestMileage: true,
    budgetCategory: "under-1lakh",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Wicked Black", hex: "#111111" },
      { name: "Blazing Blue", hex: "#2563eb" },
      { name: "Striking Red", hex: "#dc2626" },
      { name: "Fiery Yellow", hex: "#eab308" }
    ],
    features: [
      "Segment-First 5-inch Color TFT Display with SmartXonnect Voice Assist",
      "Eco and Power Ride Modes with Idle Stop-Start (IntelliGO)",
      "Under-seat Storage Compartment (Exclusive in motorcycle segment)",
      "Cross-style Distinctive LED Headlamp with Animalistic DRLs",
      "Gas-Charged Monoshock 5-step adjustable rear suspension"
    ],
    pros: [
      "Stunning Iron-Man style alien LED headlamp and aggressive muscular tank",
      "Segment-first full color TFT console with incoming call/SMS alerts and navigation",
      "IntelliGO stop-start system and 3-valve engine delivers 60-65 kmpl mileage",
      "Handy under-seat storage cubby for phone, papers, or rain jacket",
      "Lively 11.38 PS power delivery with punchy exhaust rumble"
    ],
    cons: [
      "No single or dual-channel ABS (relies on Synchronized Braking Technology)",
      "Rear drum brake instead of disc on all variants",
      "TFT display variant commands a noticeable price premium"
    ],
    review: {
      overall: 4.7,
      performance: "TVS's 3-valve oil-cooled motor is eager and rev-happy. In Power mode, it accelerates from 0 to 60 km/h in just 5.9 seconds, making it the quickest 125cc in India.",
      mileage: "In Eco mode, it consistently delivers between 60 to 65 kmpl in mixed Indian city commutes.",
      comfort: "Plush split seats with comfortable cushioning, neutral footpegs, and a low 780mm seat height make it ideal for college goers and commuters.",
      design: "Looks like a 200cc naked streetfighter. The aggressive tank shrouds and animalistic headlight cowl turn heads everywhere.",
      maintenance: "Low running expenses and affordable spares through TVS's pan-India dealer network.",
      verdict: "The undisputed youth favorite in the 125cc category. It combines cutting-edge TFT tech, 60+ kmpl mileage, and streetfighter attitude under ₹1 Lakh."
    }
  },
  {
    id: "hero-splendor-plus-xtec",
    name: "Hero Splendor Plus XTEC",
    brand: "Hero",
    brandSlug: "hero",
    tagline: "The Undisputed National Mileage Legend - Now With Full Digital Tech",
    category: "Commuter",
    bodyType: "Utility Commuter",
    exShowroomPrice: 79911,
    onRoadPrice: 93400,
    mileage: 70,
    topSpeed: 87,
    engine: 97.2,
    engineType: "Air Cooled, 4-stroke, Single Cylinder, OHC, Programmed FI",
    power: "8.02 PS @ 8,000 rpm",
    powerVal: 8.02,
    torque: "8.05 Nm @ 6,000 rpm",
    torqueVal: 8.05,
    kerbWeight: 112,
    fuelTank: 9.8,
    seatHeight: 785,
    groundClearance: 165,
    gearbox: "4-Speed Constant Mesh (All Down pattern)",
    frontBrake: "130 mm Drum with Integrated Braking System (IBS)",
    rearBrake: "130 mm Drum",
    tyreFront: "80/100-18 Tubeless",
    tyreRear: "80/100-18 Tubeless",
    serviceCost: "₹900 - ₹1,400 / year",
    userRating: 4.8,
    ratingCount: 12500,
    ratingsBreakdown: {
      performance: 3.9,
      mileage: 5.0,
      comfort: 4.5,
      design: 4.0,
      maintenance: 5.0
    },
    isLatest: true,
    isBestMileage: true,
    budgetCategory: "under-1lakh",
    image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Canvas Black", hex: "#111111" },
      { name: "Sparkling Beta Blue", hex: "#1e3a8a" },
      { name: "Tornado Grey", hex: "#4b5563" },
      { name: "Pearl White", hex: "#f9fafb" }
    ],
    features: [
      "Segment-First Full Digital Speedometer with Bluetooth Connectivity",
      "Real-Time Mileage Indicator (RTMI) & Side-Stand Engine Cut-off",
      "i3S (Idle Stop-Start System) for maximum fuel preservation",
      "Integrated USB Mobile Charging Port",
      "Signature LED High-Intensity Position Lamp"
    ],
    pros: [
      "Unrivaled 65-72 kmpl real-world mileage - the ultimate cost-saver",
      "Legendary 97.2cc Honda-derived engine known to survive decades without major overhaul",
      "Lowest maintenance costs in India; spares available at every corner garage",
      "Featherweight 112 kg body makes maneuvering and parking effortless",
      "Incredible resale value in every corner of India"
    ],
    cons: [
      "Drum brakes on both ends; no front disc brake option",
      "Top speed limited to under 90 km/h; strictly intended for city and rural use",
      "Utilitarian boxy commuter styling unchanged for years"
    ],
    review: {
      overall: 4.8,
      performance: "The 97.2cc slant engine is tuned purely for low-end pulling power and reliability. It chugs along smoothly at 40-50 km/h with whisper silence.",
      mileage: "The benchmark of Indian fuel economy. With the i3S start-stop system active, riders easily clock 68-73 kmpl.",
      comfort: "Flat long seat accommodates rider, luggage, or goods. Suspension handles rural potholes and broken tarmac like a champion.",
      design: "Classic Splendor silhouette modernized with subtle LED DRL strip and all-digital Bluetooth cluster.",
      maintenance: "Cheapest vehicle in India to service. Basic oil change and tune-up costs under ₹400.",
      verdict: "India's highest-selling two-wheeler for a reason. For maximum mileage, zero ownership anxiety, and rock-bottom running costs, nothing beats the Splendor Plus XTEC."
    }
  },
  {
    id: "kawasaki-ninja-300",
    name: "Kawasaki Ninja 300",
    brand: "Kawasaki",
    brandSlug: "kawasaki",
    tagline: "The Twin-Cylinder Supersport Symphony & Highway Tourer",
    category: "Sports",
    bodyType: "Twin-Cylinder Supersport",
    exShowroomPrice: 343000,
    onRoadPrice: 398000,
    mileage: 28,
    topSpeed: 172,
    engine: 296.0,
    engineType: "Liquid-cooled, 4-stroke Parallel Twin, DOHC, 8-valve",
    power: "39.0 PS @ 11,000 rpm",
    powerVal: 39.0,
    torque: "26.1 Nm @ 10,000 rpm",
    torqueVal: 26.1,
    kerbWeight: 179,
    fuelTank: 17,
    seatHeight: 785,
    groundClearance: 140,
    gearbox: "6-Speed Manual with Assist & Slipper Clutch",
    frontBrake: "290 mm Petal Disc with Dual Piston Caliper (Dual-Channel ABS)",
    rearBrake: "220 mm Petal Disc with Dual Piston Caliper",
    tyreFront: "110/70-17M/C 54S Tubeless",
    tyreRear: "140/70-17M/C 66S Tubeless",
    serviceCost: "₹5,500 - ₹7,500 / year",
    userRating: 4.8,
    ratingCount: 2890,
    ratingsBreakdown: {
      performance: 4.9,
      mileage: 3.6,
      comfort: 4.7,
      design: 4.8,
      maintenance: 3.8
    },
    isLatest: true,
    isBestMileage: false,
    budgetCategory: "above-2lakh",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Lime Green", hex: "#70c017" },
      { name: "Metallic Moondust Grey", hex: "#374151" },
      { name: "Candy Lime Green", hex: "#16a34a" }
    ],
    features: [
      "High-revving 296cc Parallel Twin Engine with 13,000 RPM redline",
      "Huge 17-Liter Fuel Tank for 450+ km highway touring range",
      "Assist and Slipper Clutch for light lever pull and safe downshifts",
      "Comfortable sports-tourer ergonomics (Low 785mm seat height)",
      "Dual-channel ABS with high-heat dissipation petal discs"
    ],
    pros: [
      "Incredible twin-cylinder exhaust note and buttery smooth 11,000+ RPM rev range",
      "Comfortable sports-touring ergonomics unlike extreme track superbikes",
      "Massive 17-liter fuel tank enables serious interstate endurance touring",
      "Low 785mm seat height inspires confidence for riders of all statures",
      "Legendary Kawasaki build quality and rock-solid aerodynamic stability at 150 km/h"
    ],
    cons: [
      "Analog-digital instrument cluster looks dated compared to modern TFT screens",
      "Relatively higher spare parts and dealership service costs",
      "Halogen dual headlights instead of factory LED projectors"
    ],
    review: {
      overall: 4.8,
      performance: "The 296cc parallel twin is a joy to behold. Below 6,000 RPM, it purrs like a docile kitten. Once the tachometer needle swings past 8,000 RPM, the twin cylinders scream all the way to 11,000 RPM with 39 PS on tap.",
      mileage: "Around 25-28 kmpl in city traffic, increasing to an impressive 32 kmpl during relaxed 100 km/h highway cruising.",
      comfort: "Surprisingly comfortable! The clip-ons are raised on risers, preventing back and wrist ache on 500 km day trips.",
      design: "Classic Ninja aggressive fairing, sharp front nose, integrated side turn signals, and the iconic Kawasaki Lime Green livery.",
      maintenance: "Kawasaki requires periodic inspections every 6,000 km. While pricier than single-cylinder bikes, the engine is renowned for bulletproof Japanese longevity.",
      verdict: "The most affordable twin-cylinder sports tourer in India. For riders stepping up to multi-cylinder smoothness and highway touring capability, the Ninja 300 remains a timeless jewel."
    }
  }
];

// Popular Bike Brands Metadata
const BRANDS_DATA = [
  {
    name: "Yamaha",
    slug: "yamaha",
    origin: "Japan",
    tagline: "Revs Your Heart",
    popularModels: ["R15 V4", "MT-15 V2", "Aerox 155", "FZ-S Fi"],
    description: "Renowned worldwide for razor-sharp handling, race-bred Deltabox frames, and class-defining engines with Variable Valve Actuation.",
    icon: "🏍️",
    count: 3
  },
  {
    name: "Royal Enfield",
    slug: "royal-enfield",
    origin: "India / UK",
    tagline: "Pure Motorcycling Since 1901",
    popularModels: ["Classic 350", "Hunter 350", "Bullet 350", "Himalayan 450"],
    description: "The world's oldest continuous motorcycle manufacturer, famous for heavy-metal heritage cruisers, torque-rich thump, and adventure tourers.",
    icon: "👑",
    count: 2
  },
  {
    name: "Honda",
    slug: "honda",
    origin: "Japan",
    tagline: "The Power of Dreams",
    popularModels: ["Shine 125", "SP 125", "Activa 6G", "CB350 H'ness"],
    description: "The gold standard of reliability, silent ACG starts, refined engines, and segment-dominating mileage across commuter and premium motorcycles.",
    icon: "⭐",
    count: 2
  },
  {
    name: "TVS",
    slug: "tvs",
    origin: "India",
    tagline: "Track-Tuned Since 1982",
    popularModels: ["Apache RTR 160 4V", "Raider 125", "Apache RR 310", "Ronin"],
    description: "Pioneering Indian racing manufacturer known for track-derived chassis dynamics, ride modes, Glide Through Tech, and futuristic TFT consoles.",
    icon: "🏁",
    count: 2
  },
  {
    name: "Bajaj",
    slug: "bajaj",
    origin: "India",
    tagline: "The World's Favourite Indian",
    popularModels: ["Pulsar NS200", "Pulsar N160", "Dominar 400", "Pulsar 150"],
    description: "Revolutionized Indian sports biking with the iconic Pulsar DTS-i platform, delivering explosive power-to-money value and perimeter frame agility.",
    icon: "⚡",
    count: 1
  },
  {
    name: "KTM",
    slug: "ktm",
    origin: "Austria",
    tagline: "Ready to Race",
    popularModels: ["Duke 200", "Duke 390", "RC 200", "Adventure 390"],
    description: "Pure Austrian adrenaline, signature orange trellis frames, high-compression DOHC powerplants, and aggressive streetfighter dynamics.",
    icon: "🔥",
    count: 1
  },
  {
    name: "Suzuki",
    slug: "suzuki",
    origin: "Japan",
    tagline: "Way of Life!",
    popularModels: ["Gixxer 150", "Gixxer SF 250", "Access 125", "V-Strom SX"],
    description: "Crafted with Japanese perfection, offering buttery smooth SEP engines, big-piston front forks, and sublime everyday balance.",
    icon: "🚀",
    count: 1
  },
  {
    name: "Hero",
    slug: "hero",
    origin: "India",
    tagline: "Hum Mein Hai Hero",
    popularModels: ["Splendor Plus XTEC", "HF Deluxe", "Xtreme 160R", "Karizma XMR"],
    description: "The world's largest two-wheeler manufacturer by volume, synonymous with maximum fuel economy, unbreakable durability, and affordable spare parts.",
    icon: "🇮🇳",
    count: 1
  },
  {
    name: "Kawasaki",
    slug: "kawasaki",
    origin: "Japan",
    tagline: "Let the Good Times Roll",
    popularModels: ["Ninja 300", "Ninja ZX-4R", "Z900", "Ninja 650"],
    description: "High-performance Japanese powerhouse famous for screaming multi-cylinder engines, Lime Green liveries, and world superbike championship crowns.",
    icon: "🟢",
    count: 1
  }
];

// City On-Road Price Multipliers & Registration Tariffs (Estimator)
const CITY_RTO_RATES = {
  "delhi": { name: "Delhi", rtoPct: 0.08, insuranceBase: 7800, handling: 1500 },
  "mumbai": { name: "Mumbai (Maharashtra)", rtoPct: 0.12, insuranceBase: 8400, handling: 1800 },
  "bengaluru": { name: "Bengaluru (Karnataka)", rtoPct: 0.14, insuranceBase: 8600, handling: 1900 },
  "chennai": { name: "Chennai (Tamil Nadu)", rtoPct: 0.09, insuranceBase: 7900, handling: 1600 },
  "hyderabad": { name: "Hyderabad (Telangana)", rtoPct: 0.11, insuranceBase: 8200, handling: 1700 },
  "kolkata": { name: "Kolkata (West Bengal)", rtoPct: 0.10, insuranceBase: 8000, handling: 1600 },
  "pune": { name: "Pune (Maharashtra)", rtoPct: 0.12, insuranceBase: 8400, handling: 1800 }
};

// Helper: Format Indian Rupees
function formatINR(number) {
  if (isNaN(number)) return "₹0";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(number);
}

// Helper: Format in Lakhs (e.g. ₹1.82 Lakh)
function formatLakhs(number) {
  if (number >= 100000) {
    const inLakhs = (number / 100000).toFixed(2);
    return `₹${inLakhs} Lakh`;
  }
  return formatINR(number);
}
