# MotoReview India 🏍️🇮🇳
### Modern, Professional & Fully Responsive Motorcycle Reviews & On-Road Price Platform for India

**MotoReview India** is a high-performance web platform built to give Indian motorcycle buyers, college students, commuters, and track enthusiasts authentic road test reviews, real-world mileage figures, transparent city on-road prices, and interactive 3-way bike comparisons.

---

## 🌟 Key Features

1. **Homepage Experience**:
   - High-impact automotive hero section with *"Find Your Perfect Bike"*.
   - Live search bar with instant autocomplete dropdown.
   - Quick filters for popular motorcycle searches (R15, Classic 350, MT-15, Pulsar NS200).
   - Popular Indian brand cards (Yamaha, Royal Enfield, Honda, TVS, Bajaj, KTM, Suzuki, Hero, Kawasaki).
   - Latest bikes showcase (2025/2026 OBD-2 launches).
   - Best mileage bikes showcase (up to 70 kmpl).
   - Budget segments (interactive tabs for Under ₹1 Lakh, Under ₹1.5 Lakh, and Under ₹2 Lakh).
   - Featured road-test reviews.

2. **Comprehensive Bike Specifications**:
   - Bike name & brand with custom color swatches.
   - Ex-showroom price & **Dynamic City On-Road Price Calculator** (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Pune, Kolkata) breaking down RTO taxes, comprehensive insurance, and handling charges.
   - **Interactive EMI Calculator** with loan tenure slider and monthly installment estimator.
   - Complete technical matrix:
     - Real-world mileage (kmpl) & Top speed (km/h)
     - Engine capacity (cc), engine type, maximum power (bhp/PS @ RPM) & torque (Nm @ RPM)
     - Kerb weight (kg), fuel tank capacity (L), seat height (mm), and ground clearance (mm)
     - Gearbox & clutch configuration
     - Front & rear brakes (disc/drum, single/dual ABS)
     - Front & rear tyre profiles
     - Annual service cost & service intervals
     - Overall user rating ⭐ and owner review count.

3. **In-Depth Road Test Reviews**:
   - 5-Category Rating Breakdown (Performance, Mileage, Comfort, Design, Maintenance).
   - Detailed review sections for Performance, Mileage, Pillion Comfort, Design, and Maintenance.
   - **Pros & Cons Matrix** (with checkmarks and considerations).
   - **Final Expert Verdict**.
   - Verified Indian owner reviews + **Interactive review submission form** (persisted in `localStorage`).

4. **Compare Bikes (2 or 3 Bikes Side-by-Side)**:
   - 3-slot comparative matrix with quick add/remove.
   - Highlights best-in-class power, top speed, mileage, and lightest kerb weight.
   - Preset popular battles (R15 V4 vs MT-15, Classic 350 vs Hunter 350, Apache RTR 160 vs Pulsar NS200, SP 125 vs Raider vs Shine).
   - Persistent bottom floating comparison tray with quick access.

5. **All 11 Dedicated Website Pages**:
   1. `#/` - **Home**
   2. `#/bikes` - **All Bikes** (with live filters: brand, budget, engine displacement, body style, and sorting)
   3. `#/reviews` - **Bike Reviews**
   4. `#/bike/:id` - **Bike Details** (with gallery, city price calculator, specs, and reviews)
   5. `#/compare` - **Compare Bikes**
   6. `#/mileage` - **Best Mileage Bikes** (with Indian fuel-efficiency riding tips)
   7. `#/budget` - **Best Budget Bikes** (Under ₹1L, ₹1.5L, ₹2L)
   8. `#/latest` - **Latest Bike Launches**
   9. `#/brands` - **Bike Brands** (manufacturer directory and brand-filtered models)
   10. `#/about` - **About Us** (mission, testing methodology, dyno & mileage testing)
   11. `#/contact` - **Contact Us** (interactive test ride query form & FAQ accordion)

6. **Design & Automotive Aesthetics**:
   - Premium black & white automotive theme with carbon dark background and crimson motorsport accents.
   - **Dark / Light mode toggle** with instant persistence.
   - Responsive layout for desktop, tablet, and mobile screens.
   - Spotlight search shortcut (`Ctrl + K` or `Cmd + K`).
   - SVG fallback generator ensuring no broken images even when offline.

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or launch a lightweight local server:

### Option A: Using Python (Already running on port 8080)
```powershell
py -m http.server 8080 --directory "C:\Users\saikavin\.gemini\antigravity\scratch\motoreview-india"
```
Then visit: `http://localhost:8080` in your web browser.

### Option B: Direct Browser Launch
Double-click `C:\Users\saikavin\.gemini\antigravity\scratch\motoreview-india\index.html` to open it in Chrome, Edge, or Firefox.

---

## 🏍️ Sample Bikes Included

- **Yamaha YZF R15 V4** (155cc, VVA, USD Forks, Traction Control, Quick Shifter)
- **Yamaha YZF R15 V2.0** (150cc, Deltabox Frame, Iconic Sport Classic)
- **Yamaha MT-15 V2** (155cc, Street Naked, USD Forks, Slipper Clutch)
- **Royal Enfield Classic 350** (349cc, J-Series Engine, Dual ABS, Cruiser Legend)
- **Royal Enfield Hunter 350** (349cc, Agile Urban Roadster, 17-inch Alloys)
- **Honda Shine 125** (124cc, eSP Engine, 65 kmpl, Executive Commuter)
- **Honda SP 125** (124cc, Digital Dash, LED Headlamp, 63 kmpl)
- **TVS Apache RTR 160 4V** (160cc, 17.55 PS, Ride Modes, SmartXonnect, Showa Monoshock)
- **TVS Raider 125** (125cc, Color TFT, IntelliGO Stop-Start, Under-seat Storage)
- **Bajaj Pulsar NS200** (200cc, 24.5 PS, Triple Spark DTS-i, USD Forks, Perimeter Frame)
- **KTM Duke 200** (200cc, 25 PS DOHC, WP Apex USD Suspension, Supermoto ABS)
- **Suzuki Gixxer 150 FI** (155cc, SEP Tech, 41mm Forks, 140 Radial Tyre)
- **Hero Splendor Plus XTEC** (97cc, i3S Tech, Digital Bluetooth Meter, 70 kmpl)
- **Kawasaki Ninja 300** (296cc Parallel-Twin, 39 PS, Assist & Slipper Clutch)

---

## 📁 Project Structure

```
motoreview-india/
├── index.html          # HTML5 layout, header, footer, search modal, compare tray
├── css/
│   └── styles.css      # Automotive styling, theme variables, grids, responsive media queries
├── data/
│   └── bikes.js        # Comprehensive motorcycle database, city RTO rates, brands data
├── js/
│   └── app.js          # SPA router, comparison engine, search modal, live filters, reviews
└── README.md           # Documentation & user guide
```

---

## 🛠️ Adding New Bikes

To add a new motorcycle, simply append a new object to the `BIKES_DATA` array in `data/bikes.js` with its specifications, pricing, pros, cons, and review text. The website dynamically renders it across all 11 pages, catalogs, search suggestions, and comparison tools automatically.
