/**
 * MotoReview India - Core Application Logic & SPA Engine
 */

(function () {
  'use strict';

  // Application State
  const state = {
    currentRoute: '',
    currentParams: {},
    compareList: JSON.parse(localStorage.getItem('mri_compare_list') || '[]'),
    theme: localStorage.getItem('mri_theme') || 'dark',
    userReviews: JSON.parse(localStorage.getItem('mri_user_reviews') || '{}'),
    filters: {
      search: '',
      brand: 'all',
      budget: 'all',
      engine: 'all',
      category: 'all',
      mileage: 'all',
      sort: 'default'
    },
    activeCity: 'delhi'
  };

  // DOM Elements cache
  let appContainer;
  let navCompareCount;
  let floatingCompareTray;
  let searchModal;
  let searchModalInput;
  let searchModalResults;
  let toastEl;

  // Initialize Application
  function init() {
    appContainer = document.getElementById('app-content');
    navCompareCount = document.getElementById('nav-compare-count');
    floatingCompareTray = document.getElementById('floating-compare-tray');
    searchModal = document.getElementById('search-modal');
    searchModalInput = document.getElementById('search-modal-input');
    searchModalResults = document.getElementById('search-modal-results');
    toastEl = document.getElementById('toast-notification');

    // Set Theme
    applyTheme(state.theme);

    // Event Listeners
    setupGlobalListeners();
    updateCompareUI();

    // Handle Initial Route
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
  }

  // Theme Management
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('mri_theme', theme);
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    showToast(`Switched to ${state.theme === 'dark' ? 'Dark' : 'Light'} Mode`);
  }

  // Notification Toast Helper
  function showToast(message) {
    if (!toastEl) return;
    const msgSpan = toastEl.querySelector('.toast-message');
    if (msgSpan) msgSpan.textContent = message;
    toastEl.classList.add('active');
    setTimeout(() => {
      toastEl.classList.remove('active');
    }, 3200);
  }

  // Comparison Management
  function toggleCompare(bikeId) {
    const index = state.compareList.indexOf(bikeId);
    if (index > -1) {
      state.compareList.splice(index, 1);
      showToast('Removed bike from comparison');
    } else {
      if (state.compareList.length >= 3) {
        showToast('You can compare maximum 3 bikes at once!');
        return;
      }
      state.compareList.push(bikeId);
      const bike = BIKES_DATA.find(b => b.id === bikeId);
      showToast(`Added ${bike ? bike.name : 'bike'} to comparison (${state.compareList.length}/3)`);
    }

    localStorage.setItem('mri_compare_list', JSON.stringify(state.compareList));
    updateCompareUI();

    // Refresh compare page if currently on it
    if (state.currentRoute === 'compare') {
      renderComparePage();
    } else {
      // Re-render quick compare button states
      document.querySelectorAll(`[data-compare-id="${bikeId}"]`).forEach(btn => {
        btn.classList.toggle('in-compare', state.compareList.includes(bikeId));
      });
    }
  }

  function removeFromCompare(bikeId) {
    state.compareList = state.compareList.filter(id => id !== bikeId);
    localStorage.setItem('mri_compare_list', JSON.stringify(state.compareList));
    updateCompareUI();
    if (state.currentRoute === 'compare') {
      renderComparePage();
    }
  }

  function clearCompare() {
    state.compareList = [];
    localStorage.setItem('mri_compare_list', JSON.stringify(state.compareList));
    updateCompareUI();
    if (state.currentRoute === 'compare') {
      renderComparePage();
    }
    showToast('Comparison cleared');
  }

  function updateCompareUI() {
    const count = state.compareList.length;
    if (navCompareCount) navCompareCount.textContent = count;

    if (floatingCompareTray) {
      if (count > 0 && state.currentRoute !== 'compare') {
        renderFloatingTray();
        floatingCompareTray.classList.add('active');
      } else {
        floatingCompareTray.classList.remove('active');
      }
    }
  }

  function renderFloatingTray() {
    const container = document.getElementById('tray-items-container');
    if (!container) return;

    let html = '';
    for (let i = 0; i < 3; i++) {
      if (i < state.compareList.length) {
        const bike = BIKES_DATA.find(b => b.id === state.compareList[i]);
        if (bike) {
          html += `
            <div style="position:relative;">
              <img src="${bike.image}" alt="${bike.name}" class="tray-thumb" title="${bike.name}">
              <button onclick="MotoReview.removeFromCompare('${bike.id}')" style="position:absolute;top:-6px;right:-6px;background:var(--accent-red);color:#fff;border-radius:50%;width:18px;height:18px;font-size:10px;display:flex;align-items:center;justify-content:center;">✕</button>
            </div>
          `;
        }
      } else {
        html += `<div class="tray-empty-slot">+</div>`;
      }
    }
    container.innerHTML = html;
  }

  // Routing Engine
  function handleRouteChange() {
    const hash = window.location.hash.slice(1) || '/';
    const parts = hash.split('/').filter(Boolean);

    // Update active nav links
    document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkHash = href.replace('#', '').split('/')[1] || '';
      const currentSection = parts[0] || '';
      link.classList.toggle('active', linkHash === currentSection || (href === '#/' && parts.length === 0));
    });

    // Close mobile drawer on route change
    closeMobileDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (parts.length === 0 || parts[0] === '') {
      state.currentRoute = 'home';
      renderHomePage();
    } else if (parts[0] === 'bikes') {
      state.currentRoute = 'bikes';
      renderAllBikesPage();
    } else if (parts[0] === 'bike' && parts[1]) {
      state.currentRoute = 'bike-detail';
      state.currentParams = { id: parts[1] };
      renderBikeDetailPage(parts[1]);
    } else if (parts[0] === 'reviews') {
      state.currentRoute = 'reviews';
      if (parts[1]) {
        renderBikeDetailPage(parts[1], true);
      } else {
        renderReviewsPage();
      }
    } else if (parts[0] === 'compare') {
      state.currentRoute = 'compare';
      renderComparePage();
    } else if (parts[0] === 'mileage') {
      state.currentRoute = 'mileage';
      renderMileagePage();
    } else if (parts[0] === 'budget') {
      state.currentRoute = 'budget';
      state.currentParams = { tier: parts[1] || 'under-1lakh' };
      renderBudgetPage(parts[1]);
    } else if (parts[0] === 'latest') {
      state.currentRoute = 'latest';
      renderLatestPage();
    } else if (parts[0] === 'brands') {
      state.currentRoute = 'brands';
      state.currentParams = { brand: parts[1] || null };
      renderBrandsPage(parts[1]);
    } else if (parts[0] === 'about') {
      state.currentRoute = 'about';
      renderAboutPage();
    } else if (parts[0] === 'contact') {
      state.currentRoute = 'contact';
      renderContactPage();
    } else {
      renderNotFound();
    }

    updateCompareUI();
  }

  // ==========================================================================
  // PAGE RENDERERS
  // ==========================================================================

  // 1. Home Page
  function renderHomePage() {
    const latestBikes = BIKES_DATA.filter(b => b.isLatest).slice(0, 3);
    const mileageBikes = [...BIKES_DATA].sort((a, b) => b.mileage - a.mileage).slice(0, 3);
    const featuredBike = BIKES_DATA.find(b => b.id === 'yamaha-r15-v4') || BIKES_DATA[0];

    appContainer.innerHTML = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container hero-grid">
          <div class="hero-content">
            <div class="hero-badge-pill">
              <span class="pulse-dot"></span>
              India's #1 Motorcycle Research Hub
            </div>
            <h1 class="hero-title">
              Find Your <span class="gradient-text">Perfect Bike</span> In India.
            </h1>
            <p class="hero-description">
              Unbiased reviews, transparent on-road prices, real-world mileage figures, and side-by-side specs comparison for Indian riders.
            </p>

            <!-- Search Bar -->
            <div class="hero-search-wrapper">
              <div class="hero-search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="hero-search-input" class="hero-search-input" placeholder="Search bike name or brand (e.g. R15, Classic 350, Honda, TVS)..." autocomplete="off">
                <button class="hero-search-btn" id="hero-search-submit">
                  Search Bikes
                </button>
              </div>
              <div class="search-dropdown-results" id="hero-search-dropdown"></div>
            </div>

            <!-- Quick Popular Searches -->
            <div class="hero-quick-tags">
              <span class="quick-tag-label">Popular:</span>
              <a href="#/bike/yamaha-r15-v4" class="quick-tag-pill">Yamaha R15 V4</a>
              <a href="#/bike/royal-enfield-classic-350" class="quick-tag-pill">Classic 350</a>
              <a href="#/bike/yamaha-mt-15" class="quick-tag-pill">MT-15</a>
              <a href="#/bike/bajaj-pulsar-ns200" class="quick-tag-pill">Pulsar NS200</a>
              <a href="#/budget/under-1lakh" class="quick-tag-pill">Bikes under ₹1 Lakh</a>
            </div>
          </div>

          <!-- Hero Visual Feature -->
          <div class="hero-visual">
            <div class="hero-showcase-card">
              <span class="hero-featured-tag">🔥 Trending This Week</span>
              <img src="${featuredBike.image}" alt="${featuredBike.name}" class="hero-bike-img" onerror="MotoReview.handleImgError(this, '${featuredBike.name}', '${featuredBike.brand}')">
              <div class="hero-bike-details">
                <div>
                  <h3 class="hero-bike-name">${featuredBike.name}</h3>
                  <p class="hero-bike-meta">${featuredBike.engine}cc • ${featuredBike.mileage} kmpl • ${featuredBike.powerVal} PS</p>
                </div>
                <div class="hero-bike-price-box">
                  <div class="hero-bike-price">${formatLakhs(featuredBike.exShowroomPrice)}</div>
                  <span class="hero-bike-price-label">Ex-Showroom Delhi</span>
                </div>
              </div>
              <div style="margin-top: 1rem; display: flex; gap: 0.6rem;">
                <a href="#/bike/${featuredBike.id}" class="btn-primary" style="flex: 1; text-align: center;">View Details</a>
                <button onclick="MotoReview.toggleCompare('${featuredBike.id}')" class="btn-secondary" style="flex: 1;">+ Compare</button>
              </div>
            </div>

            <div class="hero-floating-chip chip-1">
              <span class="chip-icon">⛽</span>
              <div>
                <div class="chip-title">Top Mileage</div>
                <div class="chip-val">Up to 70 kmpl</div>
              </div>
            </div>

            <div class="hero-floating-chip chip-2">
              <span class="chip-icon">⚡</span>
              <div>
                <div class="chip-title">Power Kings</div>
                <div class="chip-val">Up to 39 PS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Bike Brands -->
      <section class="section section-bg-alt">
        <div class="container">
          <div class="section-header">
            <div class="section-header-left">
              <span class="section-tag">Manufacturers</span>
              <h2 class="section-title">Popular Bike Brands</h2>
              <p class="section-subtitle">Explore motorcycles by India's leading two-wheeler brands</p>
            </div>
            <div class="section-header-action">
              <a href="#/brands" class="btn-link">View All Brands →</a>
            </div>
          </div>

          <div class="brands-grid">
            ${BRANDS_DATA.map(brand => `
              <div class="brand-card" onclick="location.hash='#/brands/${brand.slug}'">
                <div class="brand-card-icon">${brand.icon}</div>
                <div class="brand-card-name">${brand.name}</div>
                <div class="brand-card-count">${brand.count} Models</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Latest Bikes -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <div class="section-header-left">
              <span class="section-tag">New Launches</span>
              <h2 class="section-title">Latest Bikes in India</h2>
              <p class="section-subtitle">Fresh releases with cutting-edge electronics, ride modes & styling</p>
            </div>
            <div class="section-header-action">
              <a href="#/latest" class="btn-link">Explore Latest Launches →</a>
            </div>
          </div>

          <div class="bikes-grid">
            ${latestBikes.map(bike => renderBikeCard(bike)).join('')}
          </div>
        </div>
      </section>

      <!-- Best Mileage Bikes -->
      <section class="section section-bg-alt">
        <div class="container">
          <div class="section-header">
            <div class="section-header-left">
              <span class="section-tag">Fuel Economy</span>
              <h2 class="section-title">Best Mileage Bikes</h2>
              <p class="section-subtitle">Save daily on petrol with India's highest mileage two-wheelers (60 - 70+ kmpl)</p>
            </div>
            <div class="section-header-action">
              <a href="#/mileage" class="btn-link">See All Mileage Kings →</a>
            </div>
          </div>

          <div class="bikes-grid">
            ${mileageBikes.map(bike => renderBikeCard(bike)).join('')}
          </div>
        </div>
      </section>

      <!-- Best Bikes by Budget (Under 1 Lakh, 1.5 Lakh, 2 Lakh) -->
      <section class="section">
        <div class="container">
          <div class="section-header" style="text-align: center; display: block;">
            <span class="section-tag">Price Segments</span>
            <h2 class="section-title">Best Bikes by Budget</h2>
            <p class="section-subtitle">Find top-rated bikes tailored specifically to your spending limit</p>
          </div>

          <div class="budget-tabs-wrapper" id="home-budget-tabs">
            <button class="budget-tab-btn active" data-budget="under-1lakh">Bikes Under ₹1 Lakh</button>
            <button class="budget-tab-btn" data-budget="under-1-5lakh">Bikes Under ₹1.5 Lakh</button>
            <button class="budget-tab-btn" data-budget="under-2lakh">Bikes Under ₹2 Lakh</button>
          </div>

          <div class="bikes-grid" id="home-budget-bikes-grid">
            ${BIKES_DATA.filter(b => b.budgetCategory === 'under-1lakh').map(bike => renderBikeCard(bike)).join('')}
          </div>

          <div style="text-align: center; margin-top: 2.5rem;">
            <a href="#/bikes" class="btn-primary" style="display: inline-flex; padding: 0.85rem 2rem;">Explore All Motorcycle Models</a>
          </div>
        </div>
      </section>

      <!-- Featured Bike Reviews -->
      <section class="section section-bg-alt">
        <div class="container">
          <div class="section-header">
            <div class="section-header-left">
              <span class="section-tag">Expert Road Tests</span>
              <h2 class="section-title">Featured Bike Reviews</h2>
              <p class="section-subtitle">Thorough track, highway, and city road tests conducted by Indian moto experts</p>
            </div>
            <div class="section-header-action">
              <a href="#/reviews" class="btn-link">View All Reviews →</a>
            </div>
          </div>

          <div class="bikes-grid">
            ${BIKES_DATA.slice(0, 3).map(bike => renderReviewSummaryCard(bike)).join('')}
          </div>
        </div>
      </section>

      <!-- Compare Callout Banner -->
      <section class="section">
        <div class="container">
          <div class="compare-hero-bar" style="text-align: center; padding: 3.5rem 2rem;">
            <span class="section-tag">Side-by-Side Analysis</span>
            <h2 class="section-title" style="margin-bottom: 1rem;">Confused Between Two Bikes?</h2>
            <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 2rem;">
              Compare up to 3 motorcycles across 15+ mechanical specifications including on-road price, real mileage, bhp, torque, and service cost.
            </p>
            <a href="#/compare" class="btn-primary" style="display: inline-flex; padding: 0.85rem 2.2rem; font-size: 1rem;">
              Open Bike Comparison Tool ⚖️
            </a>
          </div>
        </div>
      </section>
    `;

    setupHomeListeners();
  }

  function setupHomeListeners() {
    // Hero search input
    const input = document.getElementById('hero-search-input');
    const dropdown = document.getElementById('hero-search-dropdown');
    const submitBtn = document.getElementById('hero-search-submit');

    if (input && dropdown) {
      input.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          dropdown.classList.remove('active');
          return;
        }

        const matches = BIKES_DATA.filter(b => 
          b.name.toLowerCase().includes(query) || 
          b.brand.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query)
        ).slice(0, 6);

        if (matches.length > 0) {
          dropdown.innerHTML = matches.map(b => `
            <div class="search-item" onclick="location.hash='#/bike/${b.id}'">
              <div class="search-item-info">
                <span class="search-item-title">${b.name}</span>
                <span class="search-item-sub">${b.brand} • ${b.category} • ${b.mileage} kmpl</span>
              </div>
              <span class="search-item-price">${formatLakhs(b.exShowroomPrice)}</span>
            </div>
          `).join('');
          dropdown.classList.add('active');
        } else {
          dropdown.innerHTML = `
            <div style="padding: 1rem; color: var(--text-muted); text-align: center;">
              No matching bikes found for "${query}"
            </div>
          `;
          dropdown.classList.add('active');
        }
      });

      // Close dropdown on outside click
      document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });

      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          const query = input.value.trim();
          if (query) {
            state.filters.search = query;
            location.hash = '#/bikes';
          }
        });
      }
    }

    // Budget Tabs on Home
    const tabButtons = document.querySelectorAll('#home-budget-tabs .budget-tab-btn');
    const budgetGrid = document.getElementById('home-budget-bikes-grid');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const budget = btn.getAttribute('data-budget');
        const filtered = BIKES_DATA.filter(b => b.budgetCategory === budget);
        budgetGrid.innerHTML = filtered.map(b => renderBikeCard(b)).join('');
      });
    });
  }

  // 2. All Bikes Catalog Page
  function renderAllBikesPage() {
    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container">
          <div class="section-header" style="margin-bottom: 1.5rem;">
            <div>
              <span class="section-tag">Motorcycle Catalog</span>
              <h1 class="section-title">All Motorcycles in India</h1>
              <p class="section-subtitle">Filter by brand, price range, engine cc, category, and fuel efficiency</p>
            </div>
          </div>

          <div class="catalog-layout">
            <!-- Filter Sidebar -->
            <aside class="filter-sidebar">
              <div class="filter-header">
                <span class="filter-title">🔍 Filters</span>
                <button class="btn-filter-reset" id="btn-reset-filters">Reset All</button>
              </div>

              <!-- Brand Filter -->
              <div class="filter-group">
                <div class="filter-group-title">Brand</div>
                <div class="filter-options-list">
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-brand" value="all" ${state.filters.brand === 'all' ? 'checked' : ''}> All Brands
                  </label>
                  ${['Yamaha', 'Royal Enfield', 'Honda', 'TVS', 'Bajaj', 'KTM', 'Suzuki', 'Hero', 'Kawasaki'].map(brand => `
                    <label class="custom-checkbox-label">
                      <input type="radio" name="filter-brand" value="${brand}" ${state.filters.brand === brand ? 'checked' : ''}> ${brand}
                    </label>
                  `).join('')}
                </div>
              </div>

              <!-- Budget Range Filter -->
              <div class="filter-group">
                <div class="filter-group-title">Price Range</div>
                <div class="filter-options-list">
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-budget" value="all" ${state.filters.budget === 'all' ? 'checked' : ''}> Any Budget
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-budget" value="under-1lakh" ${state.filters.budget === 'under-1lakh' ? 'checked' : ''}> Under ₹1 Lakh
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-budget" value="under-1-5lakh" ${state.filters.budget === 'under-1-5lakh' ? 'checked' : ''}> Under ₹1.5 Lakh
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-budget" value="under-2lakh" ${state.filters.budget === 'under-2lakh' ? 'checked' : ''}> Under ₹2 Lakh
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-budget" value="above-2lakh" ${state.filters.budget === 'above-2lakh' ? 'checked' : ''}> Above ₹2 Lakh
                  </label>
                </div>
              </div>

              <!-- Engine Displacement -->
              <div class="filter-group">
                <div class="filter-group-title">Engine Displacement</div>
                <div class="filter-options-list">
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-engine" value="all" ${state.filters.engine === 'all' ? 'checked' : ''}> All Engines
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-engine" value="under-125" ${state.filters.engine === 'under-125' ? 'checked' : ''}> Up to 125cc
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-engine" value="125-160" ${state.filters.engine === '125-160' ? 'checked' : ''}> 125cc - 160cc
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-engine" value="160-250" ${state.filters.engine === '160-250' ? 'checked' : ''}> 160cc - 250cc
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-engine" value="above-250" ${state.filters.engine === 'above-250' ? 'checked' : ''}> Above 250cc
                  </label>
                </div>
              </div>

              <!-- Body Type / Category -->
              <div class="filter-group">
                <div class="filter-group-title">Body Style</div>
                <div class="filter-options-list">
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-category" value="all" ${state.filters.category === 'all' ? 'checked' : ''}> All Categories
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-category" value="Sports" ${state.filters.category === 'Sports' ? 'checked' : ''}> Sports / Supersport
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-category" value="Naked" ${state.filters.category === 'Naked' ? 'checked' : ''}> Street Naked
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-category" value="Cruiser" ${state.filters.category === 'Cruiser' ? 'checked' : ''}> Cruiser / Retro
                  </label>
                  <label class="custom-checkbox-label">
                    <input type="radio" name="filter-category" value="Commuter" ${state.filters.category === 'Commuter' ? 'checked' : ''}> Daily Commuter
                  </label>
                </div>
              </div>
            </aside>

            <!-- Catalog Results Container -->
            <div class="catalog-main">
              <!-- Catalog Toolbar -->
              <div class="catalog-toolbar">
                <div class="results-count-text" id="catalog-count-text">
                  Showing <strong>${BIKES_DATA.length}</strong> bikes
                </div>

                <div class="catalog-sort-box">
                  <span class="sort-label">Sort By:</span>
                  <select id="catalog-sort-select" class="sort-select">
                    <option value="default">Featured / Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="mileage-desc">Mileage: High to Low</option>
                    <option value="power-desc">Max Power (PS): High to Low</option>
                    <option value="rating-desc">User Rating: High to Low</option>
                  </select>
                </div>
              </div>

              <!-- Active Search Filter Badge (if any) -->
              <div id="active-search-indicator" style="display: ${state.filters.search ? 'flex' : 'none'}; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem;">
                <span style="font-size: 0.9rem; color: var(--text-secondary);">Filtered by keyword: "<strong>${state.filters.search}</strong>"</span>
                <button id="btn-clear-search" style="font-size: 0.8rem; color: var(--accent-red); cursor: pointer;">(Clear)</button>
              </div>

              <!-- Bikes Grid -->
              <div class="bikes-grid" id="catalog-bikes-grid">
                <!-- Dynamically populated -->
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    setupCatalogListeners();
    filterAndRenderCatalog();
  }

  function filterAndRenderCatalog() {
    let list = [...BIKES_DATA];

    // Search query filter
    if (state.filters.search) {
      const q = state.filters.search.toLowerCase();
      list = list.filter(b => 
        b.name.toLowerCase().includes(q) || 
        b.brand.toLowerCase().includes(q) || 
        b.category.toLowerCase().includes(q)
      );
    }

    // Brand filter
    if (state.filters.brand !== 'all') {
      list = list.filter(b => b.brand.toLowerCase() === state.filters.brand.toLowerCase());
    }

    // Budget filter
    if (state.filters.budget !== 'all') {
      list = list.filter(b => b.budgetCategory === state.filters.budget);
    }

    // Engine filter
    if (state.filters.engine !== 'all') {
      if (state.filters.engine === 'under-125') {
        list = list.filter(b => b.engine <= 125);
      } else if (state.filters.engine === '125-160') {
        list = list.filter(b => b.engine > 125 && b.engine <= 160);
      } else if (state.filters.engine === '160-250') {
        list = list.filter(b => b.engine > 160 && b.engine <= 250);
      } else if (state.filters.engine === 'above-250') {
        list = list.filter(b => b.engine > 250);
      }
    }

    // Category filter
    if (state.filters.category !== 'all') {
      list = list.filter(b => b.category === state.filters.category);
    }

    // Sorting
    if (state.filters.sort === 'price-asc') {
      list.sort((a, b) => a.exShowroomPrice - b.exShowroomPrice);
    } else if (state.filters.sort === 'price-desc') {
      list.sort((a, b) => b.exShowroomPrice - a.exShowroomPrice);
    } else if (state.filters.sort === 'mileage-desc') {
      list.sort((a, b) => b.mileage - a.mileage);
    } else if (state.filters.sort === 'power-desc') {
      list.sort((a, b) => b.powerVal - a.powerVal);
    } else if (state.filters.sort === 'rating-desc') {
      list.sort((a, b) => b.userRating - a.userRating);
    }

    const grid = document.getElementById('catalog-bikes-grid');
    const countText = document.getElementById('catalog-count-text');

    if (countText) {
      countText.innerHTML = `Showing <strong>${list.length}</strong> bikes`;
    }

    if (grid) {
      if (list.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🏍️</div>
            <h3>No Bikes Found Matching Your Criteria</h3>
            <p style="color: var(--text-secondary); margin: 0.5rem 0 1.5rem;">Try relaxing your budget, brand, or engine filters.</p>
            <button onclick="MotoReview.resetCatalogFilters()" class="btn-primary" style="display: inline-flex; margin: 0 auto;">Reset All Filters</button>
          </div>
        `;
      } else {
        grid.innerHTML = list.map(bike => renderBikeCard(bike)).join('');
      }
    }
  }

  function setupCatalogListeners() {
    // Reset filters button
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetCatalogFilters();
      });
    }

    // Clear search keyword
    const clearSearchBtn = document.getElementById('btn-clear-search');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        state.filters.search = '';
        const ind = document.getElementById('active-search-indicator');
        if (ind) ind.style.display = 'none';
        filterAndRenderCatalog();
      });
    }

    // Radio filters
    document.querySelectorAll('input[name="filter-brand"]').forEach(el => {
      el.addEventListener('change', (e) => {
        state.filters.brand = e.target.value;
        filterAndRenderCatalog();
      });
    });

    document.querySelectorAll('input[name="filter-budget"]').forEach(el => {
      el.addEventListener('change', (e) => {
        state.filters.budget = e.target.value;
        filterAndRenderCatalog();
      });
    });

    document.querySelectorAll('input[name="filter-engine"]').forEach(el => {
      el.addEventListener('change', (e) => {
        state.filters.engine = e.target.value;
        filterAndRenderCatalog();
      });
    });

    document.querySelectorAll('input[name="filter-category"]').forEach(el => {
      el.addEventListener('change', (e) => {
        state.filters.category = e.target.value;
        filterAndRenderCatalog();
      });
    });

    // Sorting dropdown
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.value = state.filters.sort;
      sortSelect.addEventListener('change', (e) => {
        state.filters.sort = e.target.value;
        filterAndRenderCatalog();
      });
    }
  }

  function resetCatalogFilters() {
    state.filters = {
      search: '',
      brand: 'all',
      budget: 'all',
      engine: 'all',
      category: 'all',
      mileage: 'all',
      sort: 'default'
    };
    renderAllBikesPage();
  }

  // 3. Bike Detail Page View
  function renderBikeDetailPage(bikeId, scrollToReviews = false) {
    const bike = BIKES_DATA.find(b => b.id === bikeId);
    if (!bike) {
      renderNotFound();
      return;
    }

    // Calculate City On-Road Price breakdown
    const currentCityData = CITY_RTO_RATES[state.activeCity] || CITY_RTO_RATES.delhi;
    const rtoTax = Math.round(bike.exShowroomPrice * currentCityData.rtoPct);
    const insurance = currentCityData.insuranceBase;
    const handling = currentCityData.handling;
    const calculatedOnRoad = bike.exShowroomPrice + rtoTax + insurance + handling;

    // Get user reviews stored for this bike
    const storedReviews = state.userReviews[bikeId] || [];

    appContainer.innerHTML = `
      <section class="section detail-header-card">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="detail-breadcrumb">
            <a href="#/">Home</a>
            <span>/</span>
            <a href="#/bikes">Bikes</a>
            <span>/</span>
            <a href="#/brands/${bike.brandSlug}">${bike.brand}</a>
            <span>/</span>
            <span style="color: var(--text-primary); font-weight: 600;">${bike.name}</span>
          </nav>

          <!-- Top Presentation Grid -->
          <div class="detail-top-grid">
            <!-- Visual Gallery & Swatches -->
            <div class="detail-gallery-wrapper">
              <img id="detail-main-img" src="${bike.image}" alt="${bike.name}" class="detail-main-img" onerror="MotoReview.handleImgError(this, '${bike.name}', '${bike.brand}')">

              <div class="color-swatches-box">
                <span class="color-swatch-label">Available Colors:</span>
                <div class="color-swatches-list">
                  ${bike.colors.map((c, idx) => `
                    <div class="color-swatch-circle ${idx === 0 ? 'active' : ''}" style="background-color: ${c.hex};" title="${c.name}"></div>
                  `).join('')}
                </div>
                <span id="active-color-name" style="font-size: 0.82rem; color: var(--text-muted); margin-left: 0.5rem;">${bike.colors[0].name}</span>
              </div>

              <!-- Key Highlights Bullets -->
              <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
                <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--accent-red); font-weight: 700;">Key Motorcycle Highlights</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                  ${bike.features.slice(0, 6).map(feat => `
                    <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.4rem;">
                      <span style="color: var(--accent-emerald);">✔</span> ${feat}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Price & Information Panel -->
            <div class="detail-info-panel">
              <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span class="badge-pill badge-brand">${bike.brand}</span>
                <span class="badge-pill badge-category">${bike.category}</span>
                <span class="bike-rating-pill">⭐ ${bike.userRating} / 5 (${bike.ratingCount.toLocaleString('en-IN')} Reviews)</span>
              </div>

              <h1 class="detail-bike-title">${bike.name}</h1>
              <p class="detail-bike-tagline">${bike.tagline}</p>

              <!-- Price Card with Dynamic City Calculator -->
              <div class="detail-price-card">
                <div class="detail-price-heading">
                  <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Ex-Showroom Price</span>
                    <div class="detail-ex-price">${formatINR(bike.exShowroomPrice)}</div>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Real Mileage</span>
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-amber);">${bike.mileage} kmpl</div>
                  </div>
                </div>

                <!-- City On-Road Selector -->
                <div class="on-road-city-selector">
                  <span class="on-road-city-label">Select City for On-Road Price:</span>
                  <select id="detail-city-select" class="city-select-input">
                    ${Object.keys(CITY_RTO_RATES).map(cityKey => `
                      <option value="${cityKey}" ${state.activeCity === cityKey ? 'selected' : ''}>${CITY_RTO_RATES[cityKey].name}</option>
                    `).join('')}
                  </select>
                </div>

                <!-- Price Breakdown Accordion -->
                <div class="price-breakdown-details">
                  <div class="breakdown-row">
                    <span>Ex-Showroom Price</span>
                    <span style="font-weight: 600;">${formatINR(bike.exShowroomPrice)}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>RTO Registration & Road Tax (${(currentCityData.rtoPct * 100).toFixed(0)}%)</span>
                    <span id="breakdown-rto" style="font-weight: 600;">+ ${formatINR(rtoTax)}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>5-Year Comprehensive Insurance</span>
                    <span id="breakdown-insurance" style="font-weight: 600;">+ ${formatINR(insurance)}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>Hypothecation & Handling Charges</span>
                    <span id="breakdown-handling" style="font-weight: 600;">+ ${formatINR(handling)}</span>
                  </div>
                  <div class="breakdown-row total-on-road">
                    <span>Estimated On-Road Price (${currentCityData.name})</span>
                    <span id="breakdown-total" style="color: var(--accent-emerald); font-size: 1.3rem;">${formatINR(calculatedOnRoad)}</span>
                  </div>
                </div>
              </div>

              <!-- Quick Action Buttons -->
              <div class="detail-action-buttons">
                <button onclick="MotoReview.toggleCompare('${bike.id}')" class="btn-secondary" style="padding: 0.85rem;">
                  ⚖️ Compare With Other Bikes
                </button>
                <a href="#reviews-section" class="btn-primary" style="padding: 0.85rem; text-align: center;">
                  ⭐ Read Expert Review
                </a>
              </div>

              <!-- Quick EMI Calculator Card -->
              <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <span style="font-size: 0.88rem; font-weight: 700;">Estimated EMI Calculator</span>
                  <span id="calculated-emi" style="font-size: 1.1rem; font-weight: 800; color: var(--accent-emerald);">₹4,250 / mo</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">Based on 20% down payment, 9.5% interest rate over 36 months tenure.</div>
                <input type="range" id="emi-tenure-slider" min="12" max="48" step="6" value="36" style="width: 100%; accent-color: var(--accent-red);">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
                  <span>12 Months</span>
                  <span id="emi-tenure-label">Tenure: 36 Months</span>
                  <span>48 Months</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Complete Motorcycle Specifications Matrix -->
          <div class="specifications-table-card">
            <div class="section-header" style="margin-bottom: 1.75rem;">
              <div>
                <span class="section-tag">Technical Specs</span>
                <h2 class="section-title">Full Technical Specifications</h2>
                <p class="section-subtitle">Factory data & certified performance specs for ${bike.name}</p>
              </div>
            </div>

            <!-- Spec Category: Engine & Transmission -->
            <div class="spec-category-block">
              <h3 class="spec-category-heading">⚙️ Engine & Transmission</h3>
              <div class="spec-grid-2col">
                <div class="spec-data-row">
                  <span class="spec-label">Engine Capacity (Displacement)</span>
                  <span class="spec-val">${bike.engine} cc</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Engine Configuration</span>
                  <span class="spec-val">${bike.engineType}</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Maximum Power</span>
                  <span class="spec-val">${bike.power}</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Maximum Torque</span>
                  <span class="spec-val">${bike.torque}</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Gearbox / Transmission</span>
                  <span class="spec-val">${bike.gearbox}</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Top Speed (Claimed)</span>
                  <span class="spec-val">${bike.topSpeed} km/h</span>
                </div>
              </div>
            </div>

            <!-- Spec Category: Mileage, Dimensions & Weight -->
            <div class="spec-category-block">
              <h3 class="spec-category-heading">📏 Dimensions, Weight & Fuel Capacity</h3>
              <div class="spec-grid-2col">
                <div class="spec-data-row">
                  <span class="spec-label">Real-World Mileage</span>
                  <span class="spec-val" style="color: var(--accent-emerald);">${bike.mileage} kmpl</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Kerb Weight</span>
                  <span class="spec-val">${bike.kerbWeight} kg</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Fuel Tank Capacity</span>
                  <span class="spec-val">${bike.fuelTank} Litres</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Seat Height</span>
                  <span class="spec-val">${bike.seatHeight} mm</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Ground Clearance</span>
                  <span class="spec-val">${bike.groundClearance} mm</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Estimated Service Cost</span>
                  <span class="spec-val">${bike.serviceCost}</span>
                </div>
              </div>
            </div>

            <!-- Spec Category: Brakes, Suspension & Tyres -->
            <div class="spec-category-block">
              <h3 class="spec-category-heading">🛑 Brakes, Tyres & Chassis</h3>
              <div class="spec-grid-2col">
                <div class="spec-data-row">
                  <span class="spec-label">Front Brake</span>
                  <span class="spec-val">${bike.frontBrake}</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Rear Brake</span>
                  <span class="spec-val">${bike.rearBrake}</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Front Tyre Size</span>
                  <span class="spec-val">${bike.tyreFront}</span>
                </div>
                <div class="spec-data-row">
                  <span class="spec-label">Rear Tyre Size</span>
                  <span class="spec-val">${bike.tyreRear}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- In-Depth Review Section -->
          <div class="review-detail-card" id="reviews-section">
            <div class="section-header" style="margin-bottom: 2rem;">
              <div>
                <span class="section-tag">Road Test Report</span>
                <h2 class="section-title">In-Depth Review & Ratings</h2>
                <p class="section-subtitle">Comprehensive performance, comfort, mileage and maintenance analysis</p>
              </div>
            </div>

            <!-- Overall Rating & Breakdown Bars -->
            <div class="review-summary-grid">
              <div class="overall-score-box">
                <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Overall Rating</span>
                <div class="score-big-number">${bike.review.overall}</div>
                <div class="score-stars-row">★★★★★</div>
                <div class="score-subtitle">Based on testing & owner consensus</div>
              </div>

              <div class="ratings-breakdown-bars">
                <div class="bar-row">
                  <span class="bar-label">Performance</span>
                  <div class="bar-track"><div class="bar-fill" style="width: ${(bike.ratingsBreakdown.performance / 5) * 100}%;"></div></div>
                  <span class="bar-value">${bike.ratingsBreakdown.performance}</span>
                </div>
                <div class="bar-row">
                  <span class="bar-label">Mileage</span>
                  <div class="bar-track"><div class="bar-fill" style="width: ${(bike.ratingsBreakdown.mileage / 5) * 100}%;"></div></div>
                  <span class="bar-value">${bike.ratingsBreakdown.mileage}</span>
                </div>
                <div class="bar-row">
                  <span class="bar-label">Comfort</span>
                  <div class="bar-track"><div class="bar-fill" style="width: ${(bike.ratingsBreakdown.comfort / 5) * 100}%;"></div></div>
                  <span class="bar-value">${bike.ratingsBreakdown.comfort}</span>
                </div>
                <div class="bar-row">
                  <span class="bar-label">Design</span>
                  <div class="bar-track"><div class="bar-fill" style="width: ${(bike.ratingsBreakdown.design / 5) * 100}%;"></div></div>
                  <span class="bar-value">${bike.ratingsBreakdown.design}</span>
                </div>
                <div class="bar-row">
                  <span class="bar-label">Maintenance</span>
                  <div class="bar-track"><div class="bar-fill" style="width: ${(bike.ratingsBreakdown.maintenance / 5) * 100}%;"></div></div>
                  <span class="bar-value">${bike.ratingsBreakdown.maintenance}</span>
                </div>
              </div>
            </div>

            <!-- Pros and Cons Matrix -->
            <div class="pros-cons-grid">
              <div class="pros-box">
                <h4 class="box-title-pro">
                  <span>✔</span> What We Love (Pros)
                </h4>
                <ul class="pros-cons-list">
                  ${bike.pros.map(pro => `
                    <li>
                      <span class="bullet-icon" style="color: var(--accent-emerald);">✔</span>
                      <span>${pro}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="cons-box">
                <h4 class="box-title-con">
                  <span>✖</span> Things to Consider (Cons)
                </h4>
                <ul class="pros-cons-list">
                  ${bike.cons.map(con => `
                    <li>
                      <span class="bullet-icon" style="color: var(--accent-red);">✖</span>
                      <span>${con}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- Deep Individual Reviews -->
            <div class="detailed-review-sections">
              <div class="review-sub-block">
                <h4>🚀 Performance Review</h4>
                <p>${bike.review.performance}</p>
              </div>

              <div class="review-sub-block">
                <h4>⛽ Mileage & Fuel Economy Review</h4>
                <p>${bike.review.mileage}</p>
              </div>

              <div class="review-sub-block">
                <h4>🛋️ Comfort & Ergonomics Review</h4>
                <p>${bike.review.comfort}</p>
              </div>

              <div class="review-sub-block">
                <h4>🎨 Design & Build Quality Review</h4>
                <p>${bike.review.design}</p>
              </div>

              <div class="review-sub-block">
                <h4>🔧 Maintenance & Service Cost Review</h4>
                <p>${bike.review.maintenance}</p>
              </div>
            </div>

            <!-- Final Verdict -->
            <div class="verdict-box">
              <h4 class="verdict-title">🏆 Final Verdict</h4>
              <p class="verdict-text">${bike.review.verdict}</p>
            </div>

            <!-- User Community Reviews -->
            <div class="user-reviews-wrapper">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; font-weight: 800;">Indian Owner Reviews</h3>
                <span style="font-size: 0.85rem; color: var(--text-muted);">${bike.ratingCount + storedReviews.length} Community Ratings</span>
              </div>

              <!-- Pre-populated verified reviews + user submitted reviews -->
              <div class="user-review-card">
                <div class="user-review-header">
                  <span class="user-name">Rahul Sharma (Verified Rider, Delhi)</span>
                  <span class="user-rating-stars">★★★★★</span>
                </div>
                <p class="user-review-comment">"Ridden over 8,500 km in 6 months. It handles Indian potholes with great confidence and the fuel efficiency in city commutes is exactly as advertised!"</p>
              </div>

              <div class="user-review-card">
                <div class="user-review-header">
                  <span class="user-name">Praveen Kumar (Bengaluru)</span>
                  <span class="user-rating-stars">★★★★☆</span>
                </div>
                <p class="user-review-comment">"Outstanding throttle response and initial pickup. Routine service at the authorized service center was transparent and affordable."</p>
              </div>

              ${storedReviews.map(r => `
                <div class="user-review-card" style="border-color: var(--accent-emerald);">
                  <div class="user-review-header">
                    <span class="user-name">${r.name} (Recent Community Review)</span>
                    <span class="user-rating-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
                  </div>
                  <p class="user-review-comment">"${r.comment}"</p>
                </div>
              `).join('')}

              <!-- Write a Review Form -->
              <div class="write-review-form-card">
                <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">Share Your Experience With ${bike.name}</h4>
                <form id="submit-user-review-form">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                      <label class="form-label">Your Name</label>
                      <input type="text" id="review-user-name" class="form-input" placeholder="e.g. Amit Patel" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Your Rating</label>
                      <select id="review-user-rating" class="form-select">
                        <option value="5">⭐⭐⭐⭐⭐ (5/5 - Outstanding)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5 - Very Good)</option>
                        <option value="3">⭐⭐⭐ (3/5 - Average)</option>
                        <option value="2">⭐⭐ (2/5 - Below Average)</option>
                        <option value="1">⭐ (1/5 - Poor)</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Your Review & Thoughts</label>
                    <textarea id="review-user-comment" class="form-textarea" rows="3" placeholder="Share mileage, comfort, and service experience on Indian roads..." required></textarea>
                  </div>
                  <button type="submit" class="btn-primary" style="padding: 0.75rem 1.75rem;">Submit Owner Review</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    setupDetailListeners(bike);

    if (scrollToReviews) {
      setTimeout(() => {
        const el = document.getElementById('reviews-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  function setupDetailListeners(bike) {
    // City selector for On-Road price
    const citySelect = document.getElementById('detail-city-select');
    if (citySelect) {
      citySelect.addEventListener('change', (e) => {
        state.activeCity = e.target.value;
        const cityData = CITY_RTO_RATES[state.activeCity];
        const rtoTax = Math.round(bike.exShowroomPrice * cityData.rtoPct);
        const insurance = cityData.insuranceBase;
        const handling = cityData.handling;
        const total = bike.exShowroomPrice + rtoTax + insurance + handling;

        document.getElementById('breakdown-rto').textContent = `+ ${formatINR(rtoTax)}`;
        document.getElementById('breakdown-insurance').textContent = `+ ${formatINR(insurance)}`;
        document.getElementById('breakdown-handling').textContent = `+ ${formatINR(handling)}`;
        document.getElementById('breakdown-total').textContent = formatINR(total);
        showToast(`Calculated On-Road Price for ${cityData.name}`);
      });
    }

    // Color swatches click
    const swatches = document.querySelectorAll('.color-swatch-circle');
    const colorLabel = document.getElementById('active-color-name');
    swatches.forEach((swatch, idx) => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        if (colorLabel && bike.colors[idx]) {
          colorLabel.textContent = bike.colors[idx].name;
        }
      });
    });

    // EMI Slider
    const emiSlider = document.getElementById('emi-tenure-slider');
    const emiLabel = document.getElementById('emi-tenure-label');
    const calculatedEmi = document.getElementById('calculated-emi');

    if (emiSlider) {
      emiSlider.addEventListener('input', (e) => {
        const tenureMonths = parseInt(e.target.value);
        emiLabel.textContent = `Tenure: ${tenureMonths} Months`;
        
        // Loan calculation: 80% loan, 9.5% per annum
        const principal = bike.exShowroomPrice * 0.8;
        const monthlyRate = (9.5 / 12) / 100;
        const emi = Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
          (Math.pow(1 + monthlyRate, tenureMonths) - 1)
        );
        calculatedEmi.textContent = `${formatINR(emi)} / mo`;
      });
    }

    // Submit User Review Form
    const reviewForm = document.getElementById('submit-user-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('review-user-name').value.trim();
        const rating = parseInt(document.getElementById('review-user-rating').value);
        const comment = document.getElementById('review-user-comment').value.trim();

        if (!name || !comment) return;

        if (!state.userReviews[bike.id]) {
          state.userReviews[bike.id] = [];
        }

        state.userReviews[bike.id].push({ name, rating, comment, date: new Date().toLocaleDateString() });
        localStorage.setItem('mri_user_reviews', JSON.stringify(state.userReviews));
        showToast('Thank you! Your owner review has been posted.');
        renderBikeDetailPage(bike.id, true);
      });
    }
  }

  // 4. Compare Bikes Page
  function renderComparePage() {
    // Populate slots with either selected bikes or first available defaults if empty
    let bikesToCompare = state.compareList.map(id => BIKES_DATA.find(b => b.id === id)).filter(Boolean);

    // If user arrived with 0 or 1 bike, populate sensible defaults for immediate side-by-side enjoyment
    if (bikesToCompare.length < 2) {
      const default1 = BIKES_DATA.find(b => b.id === 'yamaha-r15-v4') || BIKES_DATA[0];
      const default2 = BIKES_DATA.find(b => b.id === 'yamaha-mt-15') || BIKES_DATA[1];
      bikesToCompare = [default1, default2];
      state.compareList = bikesToCompare.map(b => b.id);
      localStorage.setItem('mri_compare_list', JSON.stringify(state.compareList));
    }

    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container">
          <div class="section-header" style="margin-bottom: 2rem;">
            <div>
              <span class="section-tag">Head-to-Head Showdown</span>
              <h1 class="section-title">Compare Bikes Side-by-Side</h1>
              <p class="section-subtitle">Select up to 3 motorcycles and examine differences in price, power, torque, mileage & dimensions</p>
            </div>
            <div class="section-header-action" style="display: flex; gap: 0.6rem;">
              <button onclick="MotoReview.clearCompare()" class="btn-secondary">Clear All</button>
            </div>
          </div>

          <!-- Quick Preset Battles -->
          <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-red);">Popular Battles:</span>
            <button onclick="MotoReview.loadComparePreset(['yamaha-r15-v4', 'yamaha-mt-15'])" class="quick-tag-pill">R15 V4 vs MT-15</button>
            <button onclick="MotoReview.loadComparePreset(['royal-enfield-classic-350', 'royal-enfield-hunter-350'])" class="quick-tag-pill">Classic 350 vs Hunter 350</button>
            <button onclick="MotoReview.loadComparePreset(['tvs-apache-rtr-160', 'bajaj-pulsar-ns200'])" class="quick-tag-pill">Apache 160 4V vs Pulsar NS200</button>
            <button onclick="MotoReview.loadComparePreset(['honda-sp-125', 'tvs-raider-125', 'honda-shine-125'])" class="quick-tag-pill">SP 125 vs Raider vs Shine</button>
          </div>

          <!-- 3-Slot Bike Selector Grid -->
          <div class="compare-selector-grid">
            ${[0, 1, 2].map(slotIdx => {
              const currentBike = bikesToCompare[slotIdx];
              return `
                <div class="compare-select-card ${currentBike ? 'has-bike' : ''}">
                  ${currentBike ? `
                    <button onclick="MotoReview.removeFromCompare('${currentBike.id}')" class="btn-remove-compare-slot" title="Remove bike">✕</button>
                    <img src="${currentBike.image}" alt="${currentBike.name}" class="compare-slot-img" onerror="MotoReview.handleImgError(this, '${currentBike.name}', '${currentBike.brand}')">
                    <div class="compare-slot-name">${currentBike.name}</div>
                    <div class="compare-slot-price">${formatLakhs(currentBike.exShowroomPrice)}</div>
                  ` : `
                    <div style="font-size: 2.2rem; color: var(--text-muted); margin-bottom: 0.4rem;">+</div>
                    <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.2rem;">Add Bike ${slotIdx + 1}</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.6rem;">Select any motorcycle from below</div>
                  `}
                  <select onchange="MotoReview.setCompareSlot(${slotIdx}, this.value)" class="compare-dropdown-select">
                    <option value="">${currentBike ? 'Change Bike...' : 'Select Bike...'}</option>
                    ${BIKES_DATA.map(b => `
                      <option value="${b.id}" ${currentBike && currentBike.id === b.id ? 'selected' : ''}>${b.brand} - ${b.name}</option>
                    `).join('')}
                  </select>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Comparison Spec Table -->
          <div class="compare-matrix-card" style="margin-top: 2.5rem;">
            <table class="compare-table">
              <thead>
                <tr>
                  <th>Specification Feature</th>
                  ${bikesToCompare.map(b => `
                    <th>
                      <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.2rem;">${b.name}</div>
                      <div style="color: var(--accent-emerald); font-weight: 700; font-size: 1rem;">${formatLakhs(b.exShowroomPrice)}</div>
                      <a href="#/bike/${b.id}" class="btn-link" style="font-size: 0.78rem; margin-top: 0.4rem; display: inline-block;">Full Details →</a>
                    </th>
                  `).join('')}
                </tr>
              </thead>
              <tbody>
                <!-- Group: Pricing & Economy -->
                <tr>
                  <td colspan="${bikesToCompare.length + 1}" class="compare-feature-group-header">💰 Pricing & Mileage</td>
                </tr>
                <tr>
                  <td>Ex-Showroom Price</td>
                  ${bikesToCompare.map(b => {
                    const minPrice = Math.min(...bikesToCompare.map(x => x.exShowroomPrice));
                    const isBest = b.exShowroomPrice === minPrice && bikesToCompare.length > 1;
                    return `<td class="${isBest ? 'compare-highlight-best' : ''}">${formatINR(b.exShowroomPrice)}</td>`;
                  }).join('')}
                </tr>
                <tr>
                  <td>Est. On-Road Price (Delhi)</td>
                  ${bikesToCompare.map(b => `<td>${formatINR(b.onRoadPrice)}</td>`).join('')}
                </tr>
                <tr>
                  <td>Claimed / City Mileage</td>
                  ${bikesToCompare.map(b => {
                    const maxMileage = Math.max(...bikesToCompare.map(x => x.mileage));
                    const isBest = b.mileage === maxMileage && bikesToCompare.length > 1;
                    return `<td class="${isBest ? 'compare-highlight-best' : ''}" style="font-weight: 700;">${b.mileage} kmpl</td>`;
                  }).join('')}
                </tr>

                <!-- Group: Engine & Power -->
                <tr>
                  <td colspan="${bikesToCompare.length + 1}" class="compare-feature-group-header">⚡ Engine & Performance</td>
                </tr>
                <tr>
                  <td>Engine Displacement</td>
                  ${bikesToCompare.map(b => `<td>${b.engine} cc</td>`).join('')}
                </tr>
                <tr>
                  <td>Maximum Power</td>
                  ${bikesToCompare.map(b => {
                    const maxPower = Math.max(...bikesToCompare.map(x => x.powerVal));
                    const isBest = b.powerVal === maxPower && bikesToCompare.length > 1;
                    return `<td class="${isBest ? 'compare-highlight-best' : ''}"><strong>${b.power}</strong></td>`;
                  }).join('')}
                </tr>
                <tr>
                  <td>Maximum Torque</td>
                  ${bikesToCompare.map(b => `<td>${b.torque}</td>`).join('')}
                </tr>
                <tr>
                  <td>Top Speed</td>
                  ${bikesToCompare.map(b => {
                    const maxSpeed = Math.max(...bikesToCompare.map(x => x.topSpeed));
                    const isBest = b.topSpeed === maxSpeed && bikesToCompare.length > 1;
                    return `<td class="${isBest ? 'compare-highlight-best' : ''}">${b.topSpeed} km/h</td>`;
                  }).join('')}
                </tr>
                <tr>
                  <td>Gearbox</td>
                  ${bikesToCompare.map(b => `<td>${b.gearbox}</td>`).join('')}
                </tr>

                <!-- Group: Chassis & Dimensions -->
                <tr>
                  <td colspan="${bikesToCompare.length + 1}" class="compare-feature-group-header">📏 Dimensions, Weight & Fuel</td>
                </tr>
                <tr>
                  <td>Kerb Weight</td>
                  ${bikesToCompare.map(b => {
                    const minWeight = Math.min(...bikesToCompare.map(x => x.kerbWeight));
                    const isBest = b.kerbWeight === minWeight && bikesToCompare.length > 1;
                    return `<td class="${isBest ? 'compare-highlight-best' : ''}">${b.kerbWeight} kg</td>`;
                  }).join('')}
                </tr>
                <tr>
                  <td>Fuel Tank Capacity</td>
                  ${bikesToCompare.map(b => `<td>${b.fuelTank} L</td>`).join('')}
                </tr>
                <tr>
                  <td>Seat Height</td>
                  ${bikesToCompare.map(b => `<td>${b.seatHeight} mm</td>`).join('')}
                </tr>
                <tr>
                  <td>Ground Clearance</td>
                  ${bikesToCompare.map(b => `<td>${b.groundClearance} mm</td>`).join('')}
                </tr>

                <!-- Group: Brakes & Tyres -->
                <tr>
                  <td colspan="${bikesToCompare.length + 1}" class="compare-feature-group-header">🛑 Brakes & Tyres</td>
                </tr>
                <tr>
                  <td>Front Brake</td>
                  ${bikesToCompare.map(b => `<td>${b.frontBrake}</td>`).join('')}
                </tr>
                <tr>
                  <td>Rear Brake</td>
                  ${bikesToCompare.map(b => `<td>${b.rearBrake}</td>`).join('')}
                </tr>
                <tr>
                  <td>Front Tyre</td>
                  ${bikesToCompare.map(b => `<td>${b.tyreFront}</td>`).join('')}
                </tr>
                <tr>
                  <td>Rear Tyre</td>
                  ${bikesToCompare.map(b => `<td>${b.tyreRear}</td>`).join('')}
                </tr>

                <!-- Group: Maintenance & Rating -->
                <tr>
                  <td colspan="${bikesToCompare.length + 1}" class="compare-feature-group-header">⭐ Maintenance & Rating</td>
                </tr>
                <tr>
                  <td>Est. Annual Service Cost</td>
                  ${bikesToCompare.map(b => `<td>${b.serviceCost}</td>`).join('')}
                </tr>
                <tr>
                  <td>User Rating</td>
                  ${bikesToCompare.map(b => `<td><span class="bike-rating-pill">⭐ ${b.userRating} / 5</span></td>`).join('')}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function setCompareSlot(slotIndex, bikeId) {
    if (!bikeId) {
      if (state.compareList[slotIndex]) {
        state.compareList.splice(slotIndex, 1);
      }
    } else {
      state.compareList[slotIndex] = bikeId;
    }
    // Filter duplicates
    state.compareList = [...new Set(state.compareList)].filter(Boolean);
    localStorage.setItem('mri_compare_list', JSON.stringify(state.compareList));
    renderComparePage();
    updateCompareUI();
  }

  function loadComparePreset(bikeIds) {
    state.compareList = bikeIds;
    localStorage.setItem('mri_compare_list', JSON.stringify(state.compareList));
    renderComparePage();
    updateCompareUI();
    showToast('Loaded preset comparison!');
  }

  // 5. Bike Reviews Page
  function renderReviewsPage() {
    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-tag">Tested on Indian Roads</span>
              <h1 class="section-title">Motorcycle Test Ride Reviews</h1>
              <p class="section-subtitle">Real-world performance evaluations, pillion comfort tests, highway cruising feedback & mileage stats</p>
            </div>
          </div>

          <div class="bikes-grid">
            ${BIKES_DATA.map(bike => renderReviewSummaryCard(bike)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // 6. Best Mileage Bikes Page
  function renderMileagePage() {
    const highMileageBikes = [...BIKES_DATA].sort((a, b) => b.mileage - a.mileage);

    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-tag">Fuel Economy Champions</span>
              <h1 class="section-title">Best Mileage Bikes in India</h1>
              <p class="section-subtitle">Ranked by verified real-world Indian road test figures (up to 70 kmpl)</p>
            </div>
          </div>

          <!-- Indian Fuel Economy Tips Callout -->
          <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 24, 34, 0.8)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2.5rem; display: flex; align-items: center; gap: 1.5rem;">
            <div style="font-size: 2.5rem;">💡</div>
            <div>
              <h4 style="font-size: 1.1rem; color: var(--accent-emerald); font-weight: 700; margin-bottom: 0.25rem;">MotoReview Mileage Tip for India</h4>
              <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
                To get maximum mileage on Indian roads: maintain proper cold tyre pressure (25 psi front / 32 psi rear), keep throttle smooth between 40-55 km/h in top gear, and utilize idle stop-start systems (like Hero i3S or Honda ACG) at red signals.
              </p>
            </div>
          </div>

          <div class="bikes-grid">
            ${highMileageBikes.map(bike => renderBikeCard(bike)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // 7. Best Budget Bikes Page
  function renderBudgetPage(selectedTier) {
    const activeTier = selectedTier || 'under-1lakh';
    const filteredBikes = BIKES_DATA.filter(b => b.budgetCategory === activeTier);

    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container">
          <div class="section-header" style="text-align: center; display: block;">
            <span class="section-tag">Value For Money</span>
            <h1 class="section-title">Best Budget Bikes in India</h1>
            <p class="section-subtitle">Carefully curated motorcycles delivering highest performance, mileage, and features per rupee</p>
          </div>

          <div class="budget-tabs-wrapper">
            <a href="#/budget/under-1lakh" class="budget-tab-btn ${activeTier === 'under-1lakh' ? 'active' : ''}">Best Under ₹1 Lakh</a>
            <a href="#/budget/under-1-5lakh" class="budget-tab-btn ${activeTier === 'under-1-5lakh' ? 'active' : ''}">Best Under ₹1.5 Lakh</a>
            <a href="#/budget/under-2lakh" class="budget-tab-btn ${activeTier === 'under-2lakh' ? 'active' : ''}">Best Under ₹2 Lakh</a>
          </div>

          <div class="bikes-grid">
            ${filteredBikes.map(bike => renderBikeCard(bike)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // 8. Latest Bikes Page
  function renderLatestPage() {
    const latest = BIKES_DATA.filter(b => b.isLatest);

    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-tag">Market Launches</span>
              <h1 class="section-title">Latest Motorcycles in India (2025 - 2026)</h1>
              <p class="section-subtitle">New OBD-2 compliant models equipped with traction control, TFT dashboards & inverted USD forks</p>
            </div>
          </div>

          <div class="bikes-grid">
            ${latest.map(bike => renderBikeCard(bike)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // 9. Bike Brands Page
  function renderBrandsPage(brandSlug) {
    if (brandSlug) {
      const brandObj = BRANDS_DATA.find(b => b.slug === brandSlug);
      const brandBikes = BIKES_DATA.filter(b => b.brandSlug === brandSlug);

      appContainer.innerHTML = `
        <section class="section" style="padding-top: 2.5rem;">
          <div class="container">
            <nav class="detail-breadcrumb">
              <a href="#/">Home</a>
              <span>/</span>
              <a href="#/brands">Brands</a>
              <span>/</span>
              <span style="color: var(--text-primary); font-weight: 600;">${brandObj ? brandObj.name : brandSlug}</span>
            </nav>

            <div class="section-header" style="margin-bottom: 2rem;">
              <div>
                <span class="section-tag">${brandObj ? brandObj.origin : 'Manufacturer'}</span>
                <h1 class="section-title">${brandObj ? brandObj.name : brandSlug} Bikes in India</h1>
                <p class="section-subtitle">${brandObj ? brandObj.description : 'Explore models and prices'}</p>
              </div>
              <div class="section-header-action">
                <a href="#/brands" class="btn-secondary">← All Brands</a>
              </div>
            </div>

            <div class="bikes-grid">
              ${brandBikes.length > 0 ? brandBikes.map(b => renderBikeCard(b)).join('') : `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
                  No motorcycles currently listed for this brand.
                </div>
              `}
            </div>
          </div>
        </section>
      `;
      return;
    }

    // All brands overview
    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-tag">Automotive OEM Directory</span>
              <h1 class="section-title">Motorcycle Brands in India</h1>
              <p class="section-subtitle">Select any manufacturer to browse their complete motorcycle portfolio, prices, and specifications</p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
            ${BRANDS_DATA.map(brand => `
              <div class="brand-card" style="padding: 2rem; align-items: flex-start; text-align: left;" onclick="location.hash='#/brands/${brand.slug}'">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; margin-bottom: 1rem;">
                  <span style="font-size: 2.5rem;">${brand.icon}</span>
                  <span class="badge-pill badge-brand">${brand.origin}</span>
                </div>
                <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.2rem;">${brand.name}</h3>
                <div style="font-size: 0.85rem; color: var(--accent-red); font-weight: 600; margin-bottom: 0.75rem;">${brand.tagline}</div>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5;">${brand.description}</p>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                  Popular: <strong>${brand.popularModels.join(', ')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
                  <span style="font-weight: 700; color: var(--accent-emerald); font-size: 0.9rem;">${brand.count} Models Listed</span>
                  <span style="color: var(--accent-red); font-weight: 600; font-size: 0.88rem;">Explore Range →</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // 10. About Us Page
  function renderAboutPage() {
    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container" style="max-width: 900px;">
          <div class="section-header" style="text-align: center; display: block; margin-bottom: 3rem;">
            <span class="section-tag">Our Mission & Integrity</span>
            <h1 class="section-title">About MotoReview India</h1>
            <p class="section-subtitle">Empowering millions of Indian motorists with honest, rigorous and transparent motorcycle intelligence.</p>
          </div>

          <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 2.5rem; line-height: 1.8; color: var(--text-secondary); font-size: 1.05rem;">
            <h3 style="color: var(--text-primary); font-size: 1.4rem; font-weight: 800; margin-bottom: 0.75rem;">Why MotoReview India Was Founded</h3>
            <p style="margin-bottom: 1.5rem;">
              Buying a two-wheeler in India is one of the most important lifestyle and financial investments for a student, professional, or family. Yet Indian buyers often face misleading dealership on-road quotes, hidden registration charges, and manufacturer-advertised fuel efficiency numbers tested under unrealistic laboratory conditions.
            </p>
            <p style="margin-bottom: 2rem;">
              <strong>MotoReview India</strong> was created to solve this. We conduct exhaustive, real-world tests across bustling city traffic, potholed rural patches, and open monsoon expressways to bring you real numbers.
            </p>

            <h3 style="color: var(--text-primary); font-size: 1.4rem; font-weight: 800; margin-bottom: 1rem;">Our Testing Methodology</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
              <div style="background-color: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md);">
                <h4 style="color: var(--accent-emerald); margin-bottom: 0.4rem;">⛽ True Mileage Tank-to-Tank</h4>
                <p style="font-size: 0.9rem;">We perform calibrated full-tank brim-to-brim mileage runs in peak Indian metro peak-hour traffic and sustained highway speeds.</p>
              </div>
              <div style="background-color: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md);">
                <h4 style="color: var(--accent-red); margin-bottom: 0.4rem;">🛣️ Pillion & Ergonomics Comfort</h4>
                <p style="font-size: 0.9rem;">Every bike is evaluated with solo and co-riders of varied heights to assess seat cushioning, footpeg position, and suspension rebound.</p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 2rem;">
              <a href="#/bikes" class="btn-primary" style="display: inline-flex; padding: 0.85rem 2rem;">Browse Motorcycle Catalog</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 11. Contact Us Page
  function renderContactPage() {
    appContainer.innerHTML = `
      <section class="section" style="padding-top: 2.5rem;">
        <div class="container" style="max-width: 950px;">
          <div class="section-header" style="text-align: center; display: block; margin-bottom: 3rem;">
            <span class="section-tag">Get in Touch</span>
            <h1 class="section-title">Contact & Test Ride Assistance</h1>
            <p class="section-subtitle">Have questions about a motorcycle or want test ride booking advice? Drop us a message.</p>
          </div>

          <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2.5rem;">
            <!-- Interactive Form -->
            <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 2rem;">
              <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.25rem;">Send an Inquiry</h3>
              <form id="contact-inquiry-form">
                <div class="form-group">
                  <label class="form-label">Full Name</label>
                  <input type="text" class="form-input" placeholder="e.g. Ramesh Varma" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-input" placeholder="e.g. ramesh@example.com" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Your City (India)</label>
                  <input type="text" class="form-input" placeholder="e.g. Bengaluru, Karnataka" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Motorcycle You Are Inquiring About</label>
                  <select class="form-select">
                    <option value="">Select a bike (optional)...</option>
                    ${BIKES_DATA.map(b => `<option value="${b.name}">${b.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Message / Query</label>
                  <textarea class="form-textarea" rows="3" placeholder="Tell us what you'd like help with..." required></textarea>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%; padding: 0.85rem;">Submit Inquiry</button>
              </form>
            </div>

            <!-- Offices & Quick Help -->
            <div>
              <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 1.5rem;">
                <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--accent-red);">Headquarters</h4>
                <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
                  MotoReview India HQ<br>
                  Level 5, Automotive Tech Park, Indiranagar<br>
                  Bengaluru, Karnataka 560038, India
                </p>
                <div style="margin-top: 1rem; font-size: 0.88rem; color: var(--text-primary);">
                  📧 editorial@motoreview.in<br>
                  📞 +91 80 4910 2200 (Mon - Fri 10 AM - 6 PM IST)
                </div>
              </div>

              <!-- FAQ Accordion -->
              <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem;">
                <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">Frequent Questions</h4>
                <details style="margin-bottom: 0.75rem; cursor: pointer;">
                  <summary style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">How are On-Road prices estimated?</summary>
                  <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.4rem; padding-left: 0.5rem;">
                    We calculate state-specific RTO taxes (8-14%), 5-year mandatory IRDAI two-wheeler insurance, and standard logistics cess across major Indian metropolitan hubs.
                  </p>
                </details>
                <details style="cursor: pointer;">
                  <summary style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">How do I book an official test ride?</summary>
                  <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.4rem; padding-left: 0.5rem;">
                    You can contact any authorized brand dealer listed on our pages or drop an inquiry above for regional dealer assistance.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    const contactForm = document.getElementById('contact-inquiry-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Inquiry sent successfully! Our editorial team will reach out.');
        contactForm.reset();
      });
    }
  }

  // 12. Not Found Page
  function renderNotFound() {
    appContainer.innerHTML = `
      <section class="section" style="text-align: center; padding: 6rem 1rem;">
        <div class="container">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🏍️💨</div>
          <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 0.75rem;">Page Not Found</h1>
          <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 2rem;">
            The motorcycle or link you are seeking has taken another road.
          </p>
          <a href="#/" class="btn-primary" style="display: inline-flex; padding: 0.85rem 2rem;">Return to Homepage</a>
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // SHARED CARD RENDERERS
  // ==========================================================================

  function renderBikeCard(bike) {
    const inCompare = state.compareList.includes(bike.id);

    return `
      <div class="bike-card">
        <div class="bike-card-media">
          <img src="${bike.image}" alt="${bike.name}" class="bike-card-img" loading="lazy" onerror="MotoReview.handleImgError(this, '${bike.name}', '${bike.brand}')">
          <div class="bike-badge-group">
            <span class="badge-pill badge-brand">${bike.brand}</span>
            <span class="badge-pill badge-category">${bike.category}</span>
            ${bike.mileage >= 50 ? `<span class="badge-pill badge-mileage-highlight">⛽ ${bike.mileage} kmpl</span>` : ''}
          </div>
          <button 
            class="btn-quick-compare ${inCompare ? 'in-compare' : ''}" 
            data-compare-id="${bike.id}"
            onclick="MotoReview.toggleCompare('${bike.id}')"
            title="${inCompare ? 'Remove from compare' : 'Add to compare'}">
            ⚖️
          </button>
        </div>

        <div class="bike-card-body">
          <div class="bike-rating-row">
            <span class="bike-rating-pill">⭐ ${bike.userRating}</span>
            <span class="bike-rating-count">${bike.ratingCount.toLocaleString('en-IN')} reviews</span>
          </div>

          <h3 class="bike-card-name">
            <a href="#/bike/${bike.id}">${bike.name}</a>
          </h3>
          <p class="bike-card-tagline">${bike.tagline}</p>

          <!-- 3-Pill Key Spec Strip -->
          <div class="bike-spec-strip">
            <div class="spec-strip-item">
              <span class="spec-strip-label">Engine</span>
              <span class="spec-strip-value">${bike.engine} cc</span>
            </div>
            <div class="spec-strip-item">
              <span class="spec-strip-label">Mileage</span>
              <span class="spec-strip-value" style="color: var(--accent-emerald);">${bike.mileage} kmpl</span>
            </div>
            <div class="spec-strip-item">
              <span class="spec-strip-label">Power</span>
              <span class="spec-strip-value">${bike.powerVal} PS</span>
            </div>
          </div>

          <!-- Bold Price Block -->
          <div class="bike-price-box">
            <div class="price-main">
              <span class="price-main-val">${formatLakhs(bike.exShowroomPrice)}</span>
              <span class="price-main-label">Ex-Showroom Delhi</span>
            </div>
            <div class="price-on-road">
              <span class="price-on-road-val">${formatLakhs(bike.onRoadPrice)}</span>
              <span class="price-on-road-label">Est. On-Road</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="bike-card-actions">
            <a href="#/bike/${bike.id}" class="btn-primary">View Details</a>
            <a href="#/reviews/${bike.id}" class="btn-secondary">Read Review</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderReviewSummaryCard(bike) {
    return `
      <div class="bike-card">
        <div class="bike-card-media" style="height: 180px;">
          <img src="${bike.image}" alt="${bike.name}" class="bike-card-img" loading="lazy" onerror="MotoReview.handleImgError(this, '${bike.name}', '${bike.brand}')">
          <div class="bike-badge-group">
            <span class="badge-pill badge-brand">${bike.brand}</span>
            <span class="bike-rating-pill" style="background: rgba(0,0,0,0.8);">⭐ ${bike.review.overall} / 5</span>
          </div>
        </div>

        <div class="bike-card-body">
          <h3 class="bike-card-name" style="margin-bottom: 0.5rem;">
            <a href="#/reviews/${bike.id}">${bike.name} Road Test Review</a>
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
            ${bike.review.verdict}
          </p>

          <div style="margin-bottom: 1rem; font-size: 0.82rem; color: var(--text-muted);">
            <div>✔ Top Pro: <strong style="color: var(--accent-emerald);">${bike.pros[0]}</strong></div>
          </div>

          <div class="bike-card-actions" style="margin-top: auto;">
            <a href="#/reviews/${bike.id}" class="btn-primary" style="grid-column: 1/-1;">Read Full Expert Review →</a>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // SEARCH MODAL & GLOBAL LISTENERS
  // ==========================================================================

  function setupGlobalListeners() {
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Mobile nav hamburger
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');

    if (menuBtn && drawer) {
      menuBtn.addEventListener('click', () => drawer.classList.add('active'));
    }
    if (closeDrawerBtn && drawer) {
      closeDrawerBtn.addEventListener('click', () => drawer.classList.remove('active'));
    }

    // Search Trigger (Header Button & Keyboard Shortcut Ctrl+K / Cmd+K)
    const openSearchBtn = document.getElementById('open-search-modal-btn');
    if (openSearchBtn) {
      openSearchBtn.addEventListener('click', openSearchDialog);
    }

    const closeSearchBtn = document.getElementById('close-search-modal-btn');
    if (closeSearchBtn) {
      closeSearchBtn.addEventListener('click', closeSearchDialog);
    }

    if (searchModal) {
      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearchDialog();
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchDialog();
      }
      if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
        closeSearchDialog();
      }
    });

    if (searchModalInput && searchModalResults) {
      searchModalInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          searchModalResults.innerHTML = `
            <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              Type any bike name, engine size (e.g. 150cc), or brand to search.
            </div>
          `;
          return;
        }

        const matches = BIKES_DATA.filter(b => 
          b.name.toLowerCase().includes(query) ||
          b.brand.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query) ||
          b.engine.toString().includes(query)
        );

        if (matches.length > 0) {
          searchModalResults.innerHTML = matches.map(b => `
            <div class="search-item" onclick="MotoReview.selectSearchBike('${b.id}')">
              <div class="search-item-info">
                <span class="search-item-title">${b.name}</span>
                <span class="search-item-sub">${b.brand} • ${b.engine}cc • ${b.mileage} kmpl</span>
              </div>
              <span class="search-item-price">${formatLakhs(b.exShowroomPrice)}</span>
            </div>
          `).join('');
        } else {
          searchModalResults.innerHTML = `
            <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              No motorcycles found matching "${query}".
            </div>
          `;
        }
      });
    }
  }

  function openSearchDialog() {
    if (searchModal) {
      searchModal.classList.add('active');
      if (searchModalInput) {
        searchModalInput.value = '';
        searchModalInput.focus();
      }
      if (searchModalResults) {
        searchModalResults.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            Type any motorcycle name or brand (e.g. R15, Royal Enfield, Shine, Duke, Pulsar)...
          </div>
        `;
      }
    }
  }

  function closeSearchDialog() {
    if (searchModal) searchModal.classList.remove('active');
  }

  function selectSearchBike(bikeId) {
    closeSearchDialog();
    location.hash = `#/bike/${bikeId}`;
  }

  function closeMobileDrawer() {
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer) drawer.classList.remove('active');
  }

  // Image error handling with brand-styled SVG fallback
  function handleImgError(imgElement, name, brand) {
    if (!imgElement || imgElement.dataset.hasFallback) return;
    imgElement.dataset.hasFallback = "true";
    const brandLower = (brand || '').toLowerCase();
    let bgGradient = '%23e11d48,%230a0c10';
    if (brandLower.includes('yamaha')) bgGradient = '%230033a0,%230a0c10';
    else if (brandLower.includes('ktm')) bgGradient = '%23ff6600,%23111111';
    else if (brandLower.includes('enfield')) bgGradient = '%238a1c14,%23111111';
    else if (brandLower.includes('kawasaki')) bgGradient = '%2370c017,%23111111';
    else if (brandLower.includes('honda')) bgGradient = '%23dc2626,%23111111';
    else if (brandLower.includes('tvs')) bgGradient = '%232563eb,%23111111';
    else if (brandLower.includes('bajaj')) bgGradient = '%230284c7,%23111111';
    else if (brandLower.includes('suzuki')) bgGradient = '%230ea5e9,%23111111';

    const cleanName = encodeURIComponent(name || 'Motorcycle');
    const cleanBrand = encodeURIComponent(brand || 'MotoReview India');
    imgElement.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${bgGradient.split(',')[0]}"/><stop offset="100%" stop-color="${bgGradient.split(',')[1]}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><g fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="4"><circle cx="160" cy="270" r="60"/><circle cx="440" cy="270" r="60"/><path d="M160 270 L280 230 L360 170 L440 270 M280 230 L370 230"/></g><text x="50%" y="42%" text-anchor="middle" fill="%23f8fafc" font-family="-apple-system,sans-serif" font-size="26" font-weight="800">${cleanName}</text><text x="50%" y="54%" text-anchor="middle" fill="%23cbd5e1" font-family="-apple-system,sans-serif" font-size="16" font-weight="600">${cleanBrand}</text><text x="50%" y="88%" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="-apple-system,sans-serif" font-size="12" letter-spacing="2">MOTOREVIEW INDIA SHOWCASE</text></svg>`;
  }

  // Expose global interface for inline events
  window.MotoReview = {
    toggleCompare,
    removeFromCompare,
    clearCompare,
    setCompareSlot,
    loadComparePreset,
    resetCatalogFilters,
    selectSearchBike,
    handleImgError
  };

  // Launch app when DOM is ready
  document.addEventListener('DOMContentLoaded', init);

})();
