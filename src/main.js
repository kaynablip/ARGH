// Main Application Controller for Plate
import './index.css';
import { FOOD_DATABASE, FOOD_CATEGORIES, searchFood, getSuggestedFoods, getFoodsByCategory } from './database.js';
import { 
  renderCaloriePlate, 
  renderProteinBar, 
  renderMealCard, 
  renderRecommendations, 
  renderWeeklyCalorieChart, 
  renderMonthlyHeatmap, 
  renderWidgetsSection 
} from './components.js';
import { 
  getUserProfile, 
  saveUserProfile, 
  getMealsForDate, 
  saveMealsForDate, 
  getHistoricalData, 
  getActiveStreak,
  getSupabaseConfig,
  saveSupabaseConfig,
  isSynced,
  initSupabase
} from './supabase.js';

// Application state
const state = {
  selectedDate: new Date().toISOString().split('T')[0],
  userProfile: { name: 'kayna', dailyGoal: 1800, proteinGoal: 90 },
  meals: [],
  activeTab: 'home',
  searchQuery: '',
  selectedCategory: 'suggested',
  
  // Current active logging state (when user clicks a food to log)
  activeLogging: {
    foodItem: null,
    quantity: 1,
    scale: 1,
    unitLabel: '',
    selectedMealType: 'breakfast'
  },
  
  // Current active meal items being inspected for deletion
  activeEditingMealType: null,

  // Custom dish creation state
  customDishBuilder: {
    name: '',
    ingredients: [],
    activeSelectedFood: null
  }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  // Try to initialize Supabase from stored credentials
  initSupabase();
  
  // Load initial state from Local Cache
  state.userProfile = getUserProfile();
  state.meals = getMealsForDate(state.selectedDate);
  
  // Setup routing tabs
  initTabs();
  
  // Bind standard UI elements and event listeners
  bindEvents();
  
  // Render home screen initial UI
  renderActiveTab();
  
  // Register service worker if available
  registerServiceWorker();
  
  // Show welcome toast
  showToast(`Welcome back, ${state.userProfile.name}!`);
});

// ROUTING / TAB MANAGER
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = item.getAttribute('data-tab');
      navigateToTab(tabId);
    });
  });

  // Home search button redirect
  const addFoodHeroBtn = document.getElementById('add-food-hero-btn');
  if (addFoodHeroBtn) {
    addFoodHeroBtn.addEventListener('click', () => {
      // Default search category to 'suggested' and navigate
      state.selectedCategory = 'suggested';
      navigateToTab('search');
    });
  }
}

function navigateToTab(tabId) {
  state.activeTab = tabId;
  
  // Toggle active screen visibility
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    if (screen.id === `${tabId}-screen`) {
      screen.classList.add('active');
    } else {
      screen.classList.remove('active');
    }
  });

  // Toggle nav bar active highlighting
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Specific tab render triggers
  renderActiveTab();
}

// RENDERING SWITCHBOARD
function renderActiveTab() {
  const totalCalories = state.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const totalProtein = state.meals.reduce((sum, m) => sum + (m.protein || 0), 0);
  
  if (state.activeTab === 'home') {
    // 1. RENDER MAIN CALORIE DINNER PLATE
    const platePlaceholder = document.getElementById('plate-widget-placeholder');
    if (platePlaceholder) {
      platePlaceholder.innerHTML = renderCaloriePlate(totalCalories, state.userProfile.dailyGoal, state.meals);
    }
    
    // 2. RENDER PROTEIN BAR
    const proteinPlaceholder = document.getElementById('protein-widget-placeholder');
    if (proteinPlaceholder) {
      proteinPlaceholder.innerHTML = renderProteinBar(totalProtein, state.userProfile.proteinGoal);
    }
    
    // 3. RENDER INDIVIDUAL MEAL CARDS
    const mealListPlaceholder = document.getElementById('meal-list-placeholder');
    if (mealListPlaceholder) {
      mealListPlaceholder.innerHTML = state.meals.map(meal => {
        return renderMealCard(meal.type, meal.calories, meal.items);
      }).join('');
      
      // Bind Edit/Log click handlers to individual rows
      bindMealCardEditActions();
    }

    // 4. RENDER RECOMMENDATIONS (guilt-free suggestions)
    const remaining = Math.max(0, state.userProfile.dailyGoal - totalCalories);
    const recPlaceholder = document.getElementById('home-recommendations-placeholder');
    if (recPlaceholder) {
      recPlaceholder.innerHTML = renderRecommendations(remaining);
      bindQuickAddRecommendationEvents();
    }

    // Update greeting
    const greetText = document.getElementById('greeting-text');
    if (greetText) {
      const hours = new Date().getHours();
      let greetStr = 'good day';
      if (hours < 12) greetStr = 'good morning';
      else if (hours < 17) greetStr = 'good afternoon';
      else greetStr = 'good evening';
      greetText.innerText = `${greetStr}, ${state.userProfile.name}`;
    }
    
  } else if (state.activeTab === 'search') {
    renderFoodSearchScreen();
    
  } else if (state.activeTab === 'insights') {
    renderInsightsScreen();
    
  } else if (state.activeTab === 'ideas') {
    // Dedicated Ideas Recommendations Screen
    const remaining = Math.max(0, state.userProfile.dailyGoal - totalCalories);
    const ideasPlaceholder = document.getElementById('ideas-screen-placeholder');
    if (ideasPlaceholder) {
      ideasPlaceholder.innerHTML = renderRecommendations(remaining);
      bindQuickAddRecommendationEvents();
    }
    
  } else if (state.activeTab === 'history') {
    renderHistoryScreen();
    
  } else if (state.activeTab === 'settings') {
    renderSettingsScreen();
  }
}

// MEAL LIST INTERACTION: Open meal editor popup (delete logged items)
function bindMealCardEditActions() {
  const editButtons = document.querySelectorAll('.edit-meal-btn');
  editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering card selection
      const mealCard = btn.closest('.meal-card');
      const mealType = mealCard.getAttribute('data-meal-type');
      openMealEditorModal(mealType);
    });
  });
}

function openMealEditorModal(mealType) {
  state.activeEditingMealType = mealType;
  const meal = state.meals.find(m => m.type === mealType);
  if (!meal) return;

  const modalTitle = document.getElementById('meal-editor-title');
  const itemsList = document.getElementById('meal-editor-items-list');
  
  if (modalTitle) modalTitle.innerText = `Logged in ${mealType}`;
  
  if (itemsList) {
    if (meal.items.length === 0) {
      itemsList.innerHTML = `<p style="text-align: center; color: var(--text-brown); padding: 1.5rem 0;">No foods logged for this meal.</p>`;
    } else {
      itemsList.innerHTML = meal.items.map((item, idx) => {
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; background-color: var(--card-bg); border: 1px solid var(--card-border); padding: 0.8rem 1rem; border-radius: 12px; margin-bottom: 0.5rem;">
            <div>
              <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-navy);">${item.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-brown); margin-top: 0.1rem;">
                ${item.quantity} ${item.unit} • ${item.calories} kcal • ${item.protein}g protein
              </div>
            </div>
            <button class="delete-logged-item-btn" data-index="${idx}" style="background: none; border: none; color: #d63031; cursor: pointer; padding: 0.5rem; display: flex; align-items: center; justify-content: center;">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        `;
      }).join('');
      
      // Bind delete button events
      const deleteBtns = itemsList.querySelectorAll('.delete-logged-item-btn');
      deleteBtns.forEach(dBtn => {
        dBtn.addEventListener('click', () => {
          const index = parseInt(dBtn.getAttribute('data-index'));
          deleteFoodItem(mealType, index);
        });
      });
    }
  }

  // Open the dialog overlay
  const overlay = document.getElementById('meal-editor-overlay');
  if (overlay) overlay.classList.add('active');
}

function deleteFoodItem(mealType, index) {
  const meal = state.meals.find(m => m.type === mealType);
  if (!meal || !meal.items[index]) return;
  
  const removedItem = meal.items[index];
  
  // Remove item
  meal.items.splice(index, 1);
  
  // Recalculate meal values
  meal.calories = meal.items.reduce((sum, item) => sum + item.calories, 0);
  meal.protein = meal.items.reduce((sum, item) => sum + item.protein, 0);
  
  // Save state
  saveMealsForDate(state.selectedDate, state.meals);
  
  // Show toast feedback
  showToast(`Removed ${removedItem.name} from ${mealType}`);
  
  // Close modal and refresh UI
  const overlay = document.getElementById('meal-editor-overlay');
  if (overlay) overlay.classList.remove('active');
  renderActiveTab();
}

// QUICK ADD RECOMMENDATION ACTION
function bindQuickAddRecommendationEvents() {
  const quickAddBtns = document.querySelectorAll('.quick-add-rec-btn');
  quickAddBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const foodName = btn.getAttribute('data-food-name');
      const calories = parseInt(btn.getAttribute('data-calories'));
      const protein = parseInt(btn.getAttribute('data-protein'));
      const illustration = btn.getAttribute('data-illustration');
      
      // Figure out logical meal type based on time
      const hours = new Date().getHours();
      let defaultMeal = 'breakfast';
      if (hours >= 11 && hours < 16) defaultMeal = 'lunch';
      else if (hours >= 16 && hours < 19) defaultMeal = 'snacks';
      else if (hours >= 19) defaultMeal = 'dinner';
      
      // Log it
      const meal = state.meals.find(m => m.type === defaultMeal);
      if (meal) {
        const loggedItem = {
          name: foodName,
          calories: calories,
          protein: protein,
          quantity: 1,
          unit: 'serving',
          illustration: illustration
        };
        meal.items.push(loggedItem);
        meal.calories += calories;
        meal.protein += protein;
        
        saveMealsForDate(state.selectedDate, state.meals);
        showToast(`Quick-added ${foodName} to ${defaultMeal}! (+${calories} kcal)`);
        renderActiveTab();
      }
    });
  });
}

// FOOD SEARCH SCREEN MANAGER
function renderFoodSearchScreen() {
  // Category slider rendering
  const categoriesList = document.getElementById('search-categories-slider');
  if (categoriesList) {
    const listHTML = Object.entries(FOOD_CATEGORIES).map(([key, name]) => {
      // Don't show RECENT/FAVORITES for now if database is fresh, or show as disabled
      const isActive = state.selectedCategory === name;
      return `<div class="category-chip ${isActive ? 'active' : ''}" data-cat="${name}">${name}</div>`;
    }).join('');
    categoriesList.innerHTML = listHTML;
    
    // Bind chip click events
    const chips = categoriesList.querySelectorAll('.category-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        state.selectedCategory = chip.getAttribute('data-cat');
        renderActiveTab(); // Refresh search screen
      });
    });
  }

  // Get food list based on category & search query
  let filteredFoods = [];
  if (state.searchQuery) {
    filteredFoods = searchFood(state.searchQuery);
  } else {
    if (state.selectedCategory === 'suggested') {
      filteredFoods = getSuggestedFoods();
    } else {
      filteredFoods = getFoodsByCategory(state.selectedCategory);
    }
  }

  // Render food grid results
  const gridPlaceholder = document.getElementById('food-grid-placeholder');
  if (gridPlaceholder) {
    if (filteredFoods.length === 0) {
      gridPlaceholder.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-brown); padding: 2rem 0;">No foods found matching "${state.searchQuery || state.selectedCategory}"</p>`;
    } else {
      gridPlaceholder.innerHTML = filteredFoods.map(food => {
        return `
          <div class="food-item-card" data-food-id="${food.id}">
            <div class="food-item-info">
              <span class="food-item-name">${food.name}</span>
              <span class="food-item-macros">${food.servingSize} ${food.servingUnit} • ${food.protein}g protein</span>
              ${food.source ? `<span style="font-size: 0.65rem; color: var(--text-brown); opacity: 0.6; margin-top: 0.2rem; font-style: italic;">source: ${food.source}</span>` : ''}
            </div>
            <div class="food-item-calories">
              ${food.calories} <span>kcal</span>
            </div>
          </div>
        `;
      }).join('');
      
      // Bind click triggers to open Log Modal
      bindFoodCardClicks(filteredFoods);
    }
  }
}

function bindFoodCardClicks(foodsList) {
  const cards = document.querySelectorAll('.food-item-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-food-id');
      const foodItem = foodsList.find(f => f.id === id);
      if (foodItem) {
        openFoodLoggingModal(foodItem);
      }
    });
  });
}

// LOGGING MODAL OVERLAY: serving selections, unit scales, updates macros
function openFoodLoggingModal(foodItem) {
  state.activeLogging.foodItem = foodItem;
  state.activeLogging.quantity = 1;
  state.activeLogging.scale = 1;
  state.activeLogging.unitLabel = foodItem.servingUnit;
  
  // Set logical default meal type based on hour
  const hours = new Date().getHours();
  if (hours < 11.5) state.activeLogging.selectedMealType = 'breakfast';
  else if (hours < 16) state.activeLogging.selectedMealType = 'lunch';
  else if (hours < 19) state.activeLogging.selectedMealType = 'snacks';
  else state.activeLogging.selectedMealType = 'dinner';

  // Fill content in modal
  const modalName = document.getElementById('logging-food-name');
  if (modalName) modalName.innerText = foodItem.name;
  
  // Render serving unit select dropdown options (common household measurements support)
  const unitSelect = document.getElementById('logging-unit-select');
  if (unitSelect) {
    let optionsHTML = `<option value="1" data-label="${foodItem.servingUnit}">${foodItem.servingUnit} (standard)</option>`;
    if (foodItem.measurements) {
      foodItem.measurements.forEach(m => {
        optionsHTML += `<option value="${m.scale}" data-label="${m.label}">${m.label}</option>`;
      });
    }
    unitSelect.innerHTML = optionsHTML;
  }

  // Reset input quantity
  const qtyInput = document.getElementById('logging-qty-input');
  if (qtyInput) qtyInput.value = 1;

  // Render active meal type button highlighting
  updateLoggingMealTypeSelector();
  
  // Calculate and preview macros
  updateLoggingMacroPreview();

  // Open overlay
  const overlay = document.getElementById('logging-overlay');
  if (overlay) overlay.classList.add('active');
}

function updateLoggingMealTypeSelector() {
  const buttons = document.querySelectorAll('.meal-type-btn');
  buttons.forEach(btn => {
    const meal = btn.getAttribute('data-meal');
    if (meal === state.activeLogging.selectedMealType) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function updateLoggingMacroPreview() {
  const food = state.activeLogging.foodItem;
  if (!food) return;

  const qty = state.activeLogging.quantity;
  const scale = state.activeLogging.scale;
  
  const multiplier = qty * scale;
  
  const cals = Math.round(food.calories * multiplier);
  const protein = Math.round(food.protein * multiplier * 10) / 10;
  const carbs = Math.round(food.carbs * multiplier * 10) / 10;
  const fat = Math.round(food.fat * multiplier * 10) / 10;

  const calsVal = document.getElementById('preview-cals');
  const protVal = document.getElementById('preview-protein');
  const carbVal = document.getElementById('preview-carbs');
  const fatVal = document.getElementById('preview-fat');

  if (calsVal) calsVal.innerText = `${cals} kcal`;
  if (protVal) protVal.innerText = `${protein}g`;
  if (carbVal) carbVal.innerText = `${carbs}g`;
  if (fatVal) fatVal.innerText = `${fat}g`;
}

// INSIGHTS SCREEN MANAGER: Render weekly trend charts & monthly heatmaps
function renderInsightsScreen() {
  const hist = getHistoricalData();
  const sortedDates = Object.keys(hist).sort(); // Oldest first
  
  // Build data list for the last 7 days for the weekly calorie trend chart
  const daysAbbr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Resolve dates to day abbreviations
  const chartData = [];
  // Take last 7 entries
  const recentDates = sortedDates.slice(-7);
  
  recentDates.forEach(dateStr => {
    const dateObj = new Date(dateStr);
    const dayIndex = (dateObj.getDay() + 6) % 7; // Mon=0, Sun=6
    chartData.push({
      day: daysAbbr[dayIndex],
      calories: hist[dateStr].calories || 0
    });
  });

  // Render weekly chart SVG
  const trendPlaceholder = document.getElementById('insights-weekly-chart-placeholder');
  if (trendPlaceholder) {
    trendPlaceholder.innerHTML = renderWeeklyCalorieChart(chartData, state.userProfile.dailyGoal);
  }

  // Render monthly heatmap grid
  const streak = getActiveStreak();
  const streakPlaceholder = document.getElementById('insights-streak-placeholder');
  if (streakPlaceholder) {
    streakPlaceholder.innerHTML = `
      <div class="streak-hero">
        <div>
          <div class="streak-number">${streak}</div>
          <div style="font-family: var(--font-display); font-weight: 800; font-size: 1rem;">days streak</div>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-brown); max-width: 150px; line-height: 1.3;">
          You're doing amazing! Consistently logging meals helps anchor healthy habits.
        </div>
      </div>
    `;
  }

  const heatmapPlaceholder = document.getElementById('insights-heatmap-placeholder');
  if (heatmapPlaceholder) {
    heatmapPlaceholder.innerHTML = renderMonthlyHeatmap('July 2026', 31, hist);
  }
}

// HISTORY TAB SCREEN MANAGER (Browse past dates)
function renderHistoryScreen() {
  const totalCalories = state.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
  
  // Format selectedDate for nice display: e.g. "Sunday, July 5"
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const niceDateStr = new Date(state.selectedDate).toLocaleDateString('en-US', options);

  const headerTitle = document.getElementById('history-selected-date-title');
  if (headerTitle) headerTitle.innerText = niceDateStr.toLowerCase();

  // Render the mini plate for history review
  const historyPlate = document.getElementById('history-plate-placeholder');
  if (historyPlate) {
    historyPlate.innerHTML = renderCaloriePlate(totalCalories, state.userProfile.dailyGoal, state.meals);
  }

  // Render meal rows for selected date
  const historyMealsPlaceholder = document.getElementById('history-meals-list-placeholder');
  if (historyMealsPlaceholder) {
    historyMealsPlaceholder.innerHTML = state.meals.map(meal => {
      return renderMealCard(meal.type, meal.calories, meal.items);
    }).join('');
    
    // Bind Edit actions on historical meal cards too
    bindMealCardEditActions();
  }
}

// SETTINGS & SYNC COMPONENT MANAGER
function renderSettingsScreen() {
  const profileNameInput = document.getElementById('settings-profile-name');
  const calorieGoalInput = document.getElementById('settings-calorie-goal');
  const proteinGoalInput = document.getElementById('settings-protein-goal');
  
  if (profileNameInput) profileNameInput.value = state.userProfile.name;
  if (calorieGoalInput) calorieGoalInput.value = state.userProfile.dailyGoal;
  if (proteinGoalInput) proteinGoalInput.value = state.userProfile.proteinGoal;

  // Supabase Sync Connection fields
  const supabaseUrlInput = document.getElementById('settings-supabase-url');
  const supabaseKeyInput = document.getElementById('settings-supabase-key');
  const syncStatusBox = document.getElementById('settings-sync-status-box');

  const config = getSupabaseConfig();
  if (supabaseUrlInput) supabaseUrlInput.value = config.url;
  if (supabaseKeyInput) supabaseKeyInput.value = config.key;

  if (syncStatusBox) {
    const online = isSynced();
    syncStatusBox.className = `sync-status-indicator ${online ? 'synced' : ''}`;
    syncStatusBox.innerHTML = `
      <div class="sync-status-dot"></div>
      <span>${online ? 'Connected & Synced' : 'Offline / Local Cache'}</span>
    `;
  }
  
  // Render offline/mobile widgets simulation block
  const widgetsPlaceholder = document.getElementById('settings-widgets-placeholder');
  if (widgetsPlaceholder) {
    const totalCalories = state.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    widgetsPlaceholder.innerHTML = renderWidgetsSection(totalCalories, state.userProfile.dailyGoal, state.meals);
  }
}

// GLOBAL BIND EVENTS LISTENER
function bindEvents() {
  // 1. SEARCH INPUT INTERACTION
  const searchBarInput = document.getElementById('food-search-bar');
  if (searchBarInput) {
    searchBarInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderActiveTab(); // Re-render grid results
    });
  }

  // 2. LOG MODAL EVENT CONTROLS
  const qtyInput = document.getElementById('logging-qty-input');
  if (qtyInput) {
    qtyInput.addEventListener('input', (e) => {
      state.activeLogging.quantity = Math.max(0.1, parseFloat(e.target.value) || 1);
      updateLoggingMacroPreview();
    });
  }

  const unitSelect = document.getElementById('logging-unit-select');
  if (unitSelect) {
    unitSelect.addEventListener('change', (e) => {
      state.activeLogging.scale = parseFloat(e.target.value) || 1;
      const selectedOpt = unitSelect.options[unitSelect.selectedIndex];
      state.activeLogging.unitLabel = selectedOpt.getAttribute('data-label') || '';
      updateLoggingMacroPreview();
    });
  }

  const mealTypeButtons = document.querySelectorAll('.meal-type-btn');
  mealTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeLogging.selectedMealType = btn.getAttribute('data-meal');
      updateLoggingMealTypeSelector();
    });
  });

  // Log food submission button click
  const submitLogBtn = document.getElementById('submit-food-log-btn');
  if (submitLogBtn) {
    submitLogBtn.addEventListener('click', () => {
      submitFoodToLog();
    });
  }

  // Close log modal
  const closeLogBtn = document.getElementById('close-log-modal-btn');
  if (closeLogBtn) {
    closeLogBtn.addEventListener('click', () => {
      const overlay = document.getElementById('logging-overlay');
      if (overlay) overlay.classList.remove('active');
    });
  }

  // Close meal editor modal
  const closeMealEditorBtn = document.getElementById('close-meal-editor-btn');
  if (closeMealEditorBtn) {
    closeMealEditorBtn.addEventListener('click', () => {
      const overlay = document.getElementById('meal-editor-overlay');
      if (overlay) overlay.classList.remove('active');
    });
  }

  // 3. SETTINGS FORM SUBMISSION EVENTS
  const saveProfileBtn = document.getElementById('save-profile-settings-btn');
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
      const nameVal = document.getElementById('settings-profile-name').value.trim() || 'kayna';
      const calGoalVal = parseInt(document.getElementById('settings-calorie-goal').value) || 1800;
      const protGoalVal = parseInt(document.getElementById('settings-protein-goal').value) || 90;

      state.userProfile.name = nameVal;
      state.userProfile.dailyGoal = calGoalVal;
      state.userProfile.proteinGoal = protGoalVal;

      saveUserProfile(state.userProfile);
      showToast('Profile goals updated successfully!');
      renderActiveTab();
    });
  }

  const saveSupabaseBtn = document.getElementById('connect-supabase-settings-btn');
  if (saveSupabaseBtn) {
    saveSupabaseBtn.addEventListener('click', () => {
      const urlVal = document.getElementById('settings-supabase-url').value.trim();
      const keyVal = document.getElementById('settings-supabase-key').value.trim();

      const success = saveSupabaseConfig(urlVal, keyVal);
      if (success) {
        showToast('Supabase connected! Sync completed.');
      } else {
        if (!urlVal && !keyVal) {
          showToast('Supabase disconnected. Operating locally.');
        } else {
          showToast('Failed to connect to Supabase. Check credentials.');
        }
      }
      renderActiveTab();
    });
  }

  // 4. HISTORY PREV / NEXT NAV BUTTONS
  const prevDayBtn = document.getElementById('history-prev-day-btn');
  if (prevDayBtn) {
    prevDayBtn.addEventListener('click', () => {
      shiftDate(-1);
    });
  }

  const nextDayBtn = document.getElementById('history-next-day-btn');
  if (nextDayBtn) {
    nextDayBtn.addEventListener('click', () => {
      shiftDate(1);
    });
  }

  // 5. CUSTOM DISH EVENT LISTENERS
  const createDishTriggerBtn = document.getElementById('create-dish-trigger-btn');
  if (createDishTriggerBtn) {
    createDishTriggerBtn.addEventListener('click', () => {
      openCustomDishModal();
    });
  }

  const closeCustomDishBtn = document.getElementById('close-custom-dish-btn');
  if (closeCustomDishBtn) {
    closeCustomDishBtn.addEventListener('click', () => {
      document.getElementById('custom-dish-overlay').classList.remove('active');
    });
  }

  const addIngredientBtn = document.getElementById('custom-dish-add-ingredient-btn');
  if (addIngredientBtn) {
    addIngredientBtn.addEventListener('click', () => {
      addIngredientToCustomDish();
    });
  }

  const saveCustomDishBtn = document.getElementById('custom-dish-save-btn');
  if (saveCustomDishBtn) {
    saveCustomDishBtn.addEventListener('click', () => {
      saveCustomDish();
    });
  }

  const ingSearchInput = document.getElementById('custom-dish-ingredient-search');
  if (ingSearchInput) {
    ingSearchInput.addEventListener('input', (e) => {
      handleIngredientSearchInput(e.target.value);
    });
  }

  document.addEventListener('click', (e) => {
    const sugBox = document.getElementById('custom-dish-ingredient-suggestions');
    if (sugBox && !e.target.closest('#custom-dish-ingredient-search')) {
      sugBox.style.display = 'none';
    }
  });
}

function shiftDate(offset) {
  const current = new Date(state.selectedDate);
  current.setDate(current.getDate() + offset);
  state.selectedDate = current.toISOString().split('T')[0];
  state.meals = getMealsForDate(state.selectedDate);
  renderActiveTab();
}

function submitFoodToLog() {
  const food = state.activeLogging.foodItem;
  if (!food) return;

  const qty = state.activeLogging.quantity;
  const scale = state.activeLogging.scale;
  const mealType = state.activeLogging.selectedMealType;
  const unitLabel = state.activeLogging.unitLabel;

  const multiplier = qty * scale;
  const totalCals = Math.round(food.calories * multiplier);
  const totalProtein = Math.round(food.protein * multiplier);

  // Add to meals array
  const meal = state.meals.find(m => m.type === mealType);
  if (meal) {
    const loggedItem = {
      name: food.name,
      calories: totalCals,
      protein: totalProtein,
      quantity: qty,
      unit: unitLabel,
      illustration: food.illustration || 'leaves'
    };
    meal.items.push(loggedItem);
    
    // Sum meal total cals
    meal.calories = meal.items.reduce((sum, item) => sum + item.calories, 0);
    meal.protein = meal.items.reduce((sum, item) => sum + item.protein, 0);

    // Save cache database
    saveMealsForDate(state.selectedDate, state.meals);
    
    // Close modal
    const overlay = document.getElementById('logging-overlay');
    if (overlay) overlay.classList.remove('active');
    
    // Show toast feedback
    showToast(`Logged ${food.name} to ${mealType}! (+${totalCals} kcal)`);
    
    // Return to home tab & render
    navigateToTab('home');
  }
}

// UTILITY: SHOW TOAST MESSAGE
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (toast) {
    toast.innerText = message;
    toast.classList.add('active');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }
}

// REGISTER PWA SERVICE WORKER
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('ServiceWorker registered successfully:', reg.scope))
        .catch(err => console.log('ServiceWorker registration failed:', err));
    });
  }
}

// CUSTOM DISH CREATION FUNCTIONS
function openCustomDishModal() {
  state.customDishBuilder.name = '';
  state.customDishBuilder.ingredients = [];
  state.customDishBuilder.activeSelectedFood = null;
  
  const nameInput = document.getElementById('custom-dish-name');
  if (nameInput) nameInput.value = '';

  const searchInput = document.getElementById('custom-dish-ingredient-search');
  if (searchInput) searchInput.value = '';

  const sugBox = document.getElementById('custom-dish-ingredient-suggestions');
  if (sugBox) {
    sugBox.innerHTML = '';
    sugBox.style.display = 'none';
  }

  // Reset quantity input to 1
  const qtyInput = document.getElementById('custom-dish-ingredient-qty');
  if (qtyInput) qtyInput.value = 1;

  // Refresh builder UI
  renderCustomDishBuilder();
  
  // Show modal
  document.getElementById('custom-dish-overlay').classList.add('active');
}

function handleIngredientSearchInput(query) {
  const sugBox = document.getElementById('custom-dish-ingredient-suggestions');
  if (!sugBox) return;

  if (!query || query.trim().length === 0) {
    sugBox.style.display = 'none';
    return;
  }

  // Run search on the catalog
  const matches = searchFood(query).slice(0, 5); // Limit suggestions to 5
  
  if (matches.length === 0) {
    sugBox.innerHTML = `<div style="padding: 0.5rem 0.8rem; font-size: 0.8rem; color: var(--text-brown); opacity: 0.6;">No ingredients found</div>`;
    sugBox.style.display = 'block';
    return;
  }

  sugBox.innerHTML = matches.map(food => {
    return `
      <div class="sug-item" data-id="${food.id}" style="padding: 0.5rem 0.8rem; font-size: 0.8rem; font-weight: 700; color: var(--text-navy); cursor: pointer; border-bottom: 1px solid rgba(54, 30, 28, 0.05); transition: background-color 0.2s;">
        ${food.name} <span style="font-size: 0.7rem; font-weight: 400; color: var(--text-brown);">(${food.servingSize} ${food.servingUnit})</span>
      </div>
    `;
  }).join('');

  sugBox.style.display = 'block';

  // Add click handlers to items
  const items = sugBox.querySelectorAll('.sug-item');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => { item.style.backgroundColor = 'rgba(54, 30, 28, 0.05)'; });
    item.addEventListener('mouseleave', () => { item.style.backgroundColor = 'transparent'; });
    
    item.addEventListener('click', () => {
      const foodId = item.getAttribute('data-id');
      // Look up in merged database
      const mergedDb = [...FOOD_DATABASE, ...(JSON.parse(localStorage.getItem('plate_custom_foods')) || [])];
      const food = mergedDb.find(f => f.id === foodId);
      if (food) {
        state.customDishBuilder.activeSelectedFood = food;
        const searchInput = document.getElementById('custom-dish-ingredient-search');
        if (searchInput) searchInput.value = food.name;
        sugBox.style.display = 'none';
      }
    });
  });
}

function addIngredientToCustomDish() {
  const qtyInput = document.getElementById('custom-dish-ingredient-qty');
  if (!qtyInput) return;

  const food = state.customDishBuilder.activeSelectedFood;
  if (!food) {
    showToast('Search and select an ingredient first!');
    return;
  }

  const quantity = Math.max(0.1, parseFloat(qtyInput.value) || 1);

  const cal = Math.round(food.calories * quantity);
  const protein = Math.round(food.protein * quantity * 10) / 10;
  const carbs = Math.round(food.carbs * quantity * 10) / 10;
  const fat = Math.round(food.fat * quantity * 10) / 10;

  state.customDishBuilder.ingredients.push({
    foodId: food.id,
    name: food.name,
    quantity,
    unit: food.servingUnit,
    calories: cal,
    protein,
    carbs,
    fat
  });

  // Clear ingredient input
  const searchInput = document.getElementById('custom-dish-ingredient-search');
  if (searchInput) searchInput.value = '';
  state.customDishBuilder.activeSelectedFood = null;

  renderCustomDishBuilder();
}

function renderCustomDishBuilder() {
  const list = document.getElementById('custom-dish-ingredients-list');
  if (!list) return;

  if (state.customDishBuilder.ingredients.length === 0) {
    list.innerHTML = `<p style="font-size: 0.75rem; text-align: center; color: var(--text-brown); padding: 0.5rem 0;">No ingredients added yet.</p>`;
  } else {
    list.innerHTML = state.customDishBuilder.ingredients.map((ing, idx) => {
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: rgba(54, 30, 28, 0.03); border: 1px solid var(--card-border); padding: 0.3rem 0.5rem; border-radius: 8px; margin-bottom: 0.3rem; font-size: 0.8rem;">
          <div>
            <strong>${ing.name}</strong> (${ing.quantity} ${ing.unit})
            <div style="font-size: 0.65rem; color: var(--text-brown);">${ing.calories} kcal • ${ing.protein}g protein</div>
          </div>
          <button class="delete-builder-ing-btn" data-index="${idx}" style="background: none; border: none; color: #d63031; cursor: pointer; font-weight: 800; font-size: 0.9rem; padding: 0.2rem 0.4rem;">&times;</button>
        </div>
      `;
    }).join('');

    // Bind delete actions
    const delBtns = list.querySelectorAll('.delete-builder-ing-btn');
    delBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        state.customDishBuilder.ingredients.splice(index, 1);
        renderCustomDishBuilder();
      });
    });
  }

  // Calculate sums
  const totalCals = state.customDishBuilder.ingredients.reduce((sum, i) => sum + i.calories, 0);
  const totalProtein = state.customDishBuilder.ingredients.reduce((sum, i) => sum + i.protein, 0);
  const totalCarbs = state.customDishBuilder.ingredients.reduce((sum, i) => sum + i.carbs, 0);
  const totalFat = state.customDishBuilder.ingredients.reduce((sum, i) => sum + i.fat, 0);

  // Update DOM previews
  const totalCalsVal = document.getElementById('custom-dish-total-cals');
  const totalProteinVal = document.getElementById('custom-dish-total-protein');
  const totalCarbsVal = document.getElementById('custom-dish-total-carbs');
  const totalFatVal = document.getElementById('custom-dish-total-fat');

  if (totalCalsVal) totalCalsVal.innerText = `${totalCals} kcal`;
  if (totalProteinVal) totalProteinVal.innerText = `${Math.round(totalProtein * 10) / 10}g`;
  if (totalCarbsVal) totalCarbsVal.innerText = `${Math.round(totalCarbs * 10) / 10}g`;
  if (totalFatVal) totalFatVal.innerText = `${Math.round(totalFat * 10) / 10}g`;
}

function saveCustomDish() {
  const nameInput = document.getElementById('custom-dish-name');
  if (!nameInput) return;

  const dishName = nameInput.value.trim();
  if (!dishName) {
    showToast('Please enter a name for your custom dish!');
    return;
  }

  if (state.customDishBuilder.ingredients.length === 0) {
    showToast('Please add at least one ingredient!');
    return;
  }

  // Calculate sums
  const totalCals = state.customDishBuilder.ingredients.reduce((sum, i) => sum + i.calories, 0);
  const totalProtein = state.customDishBuilder.ingredients.reduce((sum, i) => sum + i.protein, 0);
  const totalCarbs = state.customDishBuilder.ingredients.reduce((sum, i) => sum + i.carbs, 0);
  const totalFat = state.customDishBuilder.ingredients.reduce((sum, i) => sum + i.fat, 0);

  // Construct Custom Food item
  const customFood = {
    id: 'custom_' + Date.now(),
    name: dishName,
    category: FOOD_CATEGORIES.CUSTOM, // "my dishes" category
    calories: totalCals,
    protein: Math.round(totalProtein * 10) / 10,
    carbs: Math.round(totalCarbs * 10) / 10,
    fat: Math.round(totalFat * 10) / 10,
    servingSize: 1,
    servingUnit: 'serving',
    measurements: [
      { amount: 1, label: 'serving', scale: 1 },
      { amount: 2, label: 'double serving', scale: 2 }
    ],
    illustration: 'khichdi',
    isCustom: true,
    ingredients: state.customDishBuilder.ingredients
  };

  // Save to local storage custom list
  let customFoods = [];
  const localCustom = localStorage.getItem('plate_custom_foods');
  if (localCustom) {
    try {
      customFoods = JSON.parse(localCustom);
    } catch (e) {}
  }
  customFoods.push(customFood);
  localStorage.setItem('plate_custom_foods', JSON.stringify(customFoods));

  // Close modal
  document.getElementById('custom-dish-overlay').classList.remove('active');
  
  // Show toast feedback
  showToast(`Created custom dish: ${dishName}!`);

  // Switch to "my dishes" category automatically to show it!
  state.selectedCategory = FOOD_CATEGORIES.CUSTOM;
  state.searchQuery = '';
  
  // Clear search input text
  const searchBarInput = document.getElementById('food-search-bar');
  if (searchBarInput) searchBarInput.value = '';

  // Re-render
  renderActiveTab();
}
