// UI Component rendering library for Plate
import { ILLUSTRATIONS, getFoodIllustration } from './illustrations.js';

// 1. CALORIE PLATE PROGRESS COMPONENT
export const renderCaloriePlate = (consumed, goal, loggedMeals) => {
  const percentage = Math.min(100, Math.round((consumed / goal) * 100)) || 0;
  const remaining = Math.max(0, goal - consumed);

  // Conic gradient style for the plate progress indicator
  // Consumed: Opaque Cream, Remaining: Translucent Cream
  const conicStyle = `background: conic-gradient(
    var(--plate-cream) 0% ${percentage}%, 
    var(--plate-cream-translucent) ${percentage}% 100%
  )`;

  const foodsHTML = '';

  return `
    <div class="plate-hero-container">
      <!-- Dinner Plate -->
      <div class="plate-widget-wrapper">
        <div class="plate-circle" style="${conicStyle}">
          <!-- Inner Calorie Readout -->
          <div class="plate-inner-content">
            <div class="plate-calories-main">${consumed}</div>
            <div class="plate-calories-goal">/ ${goal} kcal</div>
            <div class="plate-divider"></div>
            <div class="plate-remaining">${remaining} kcal remaining</div>
            <div class="plate-percentage">${percentage}% completed</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

// 2. PROTEIN PROGRESS COMPONENT
export const renderProteinBar = (current, goal) => {
  const totalBlocks = 12;
  const filledBlocks = Math.min(totalBlocks, Math.round((current / goal) * totalBlocks)) || 0;

  let blocksHTML = '';
  for (let i = 0; i < totalBlocks; i++) {
    const isFilled = i < filledBlocks;
    blocksHTML += `<div class="protein-block ${isFilled ? 'filled' : ''}"></div>`;
  }

  return `
    <div class="protein-widget">
      <div class="protein-info">
        <h3 class="protein-title">protein goal</h3>
        <div class="protein-blocks-container">
          ${blocksHTML}
        </div>
        <div class="protein-numbers">
          ${current} <span>/ ${goal} g</span>
        </div>
      </div>
      <div class="protein-illustration-box">
        ${ILLUSTRATIONS.paneer()}
      </div>
    </div>
  `;
};

// 3. MEAL CARD ROW COMPONENT
export const renderMealCard = (mealType, calories, loggedItems, onEditClick) => {
  // Map mealType to specific icons and colors
  let iconSVG = '';
  let themeClass = '';
  let itemsText = 'nothing logged yet';

  if (loggedItems && loggedItems.length > 0) {
    itemsText = loggedItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ');
  }

  switch (mealType.toLowerCase()) {
    case 'breakfast':
      iconSVG = ILLUSTRATIONS.tea();
      themeClass = 'meal-breakfast';
      break;
    case 'lunch':
      iconSVG = ILLUSTRATIONS.rice();
      themeClass = 'meal-lunch';
      break;
    case 'dinner':
      iconSVG = ILLUSTRATIONS.chapati();
      themeClass = 'meal-dinner';
      break;
    default:
      iconSVG = ILLUSTRATIONS.apple();
      themeClass = 'meal-snacks';
      break;
  }

  return `
    <div class="meal-card" data-meal-type="${mealType}">
      <div class="meal-icon-container ${themeClass}">
        ${iconSVG}
      </div>
      <div class="meal-details">
        <h4 class="meal-name">${mealType}</h4>
        <div class="meal-logged-items">${itemsText}</div>
      </div>
      <div class="meal-calories">
        ${calories} <span>kcal</span>
      </div>
      <button class="meal-action-btn edit-meal-btn" aria-label="Edit ${mealType}">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
        </svg>
      </button>
    </div>
  `;
};

// 4. MEAL RECOMMENDATIONS WIDGET
export const renderRecommendations = (remainingCalories) => {
  // A friendly guilt-free catalog of vegetarian suggestions
  const recommendations = [
    { name: 'Paneer sandwich', calories: 280, protein: 12, ill: 'paneer', desc: 'grilled paneer cubes between toasted sourdough' },
    { name: 'Dal rice & ghee', calories: 315, protein: 10, ill: 'rice', desc: 'warm yellow dal over basmati rice with a dab of ghee' },
    { name: 'Fresh fruit bowl', calories: 120, protein: 2, ill: 'banana', desc: 'sliced banana, apple, and juicy pomegranate seeds' },
    { name: 'Spiced buttermilk & chana', calories: 155, protein: 8, ill: 'curd', desc: 'chaas with roasted crunchy kala chana seeds' },
    { name: 'Vegetable pulao', calories: 240, protein: 5, ill: 'khichdi', desc: 'aromatic rice simmered with peas, carrots, and herbs' }
  ];

  // Filter recommendations that fit in remaining calories (or recommend fruit/buttermilk if low)
  let visibleIdeas = recommendations.filter(rec => rec.calories <= remainingCalories);
  if (visibleIdeas.length === 0) {
    // If very low calories remain, suggest light options anyway
    visibleIdeas = recommendations.slice(2, 4);
  }

  const cardsHTML = visibleIdeas.map(idea => {
    return `
      <div class="idea-card">
        <div class="idea-image-box meal-snacks" style="background-color: #fdfaf2; border: 1px solid var(--card-border);">
          ${ILLUSTRATIONS[idea.ill] ? ILLUSTRATIONS[idea.ill]() : ILLUSTRATIONS.leaves()}
        </div>
        <div class="idea-info">
          <h4 class="idea-title">${idea.name}</h4>
          <p class="idea-description">${idea.desc}</p>
          <div class="idea-meta">
            <span>${idea.calories} kcal</span>
            <span>•</span>
            <span>${idea.protein}g protein</span>
          </div>
        </div>
        <button class="idea-add-btn quick-add-rec-btn" data-food-name="${idea.name}" data-calories="${idea.calories}" data-protein="${idea.protein}" data-illustration="${idea.ill}">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    `;
  }).join('');

  return `
    <div class="recommendations-container">
      <p class="recommendations-intro">You still have room for...</p>
      <div class="ideas-grid">
        ${cardsHTML}
      </div>
    </div>
  `;
};

// 5. CUSTOM EDITORIAL CHARTS & HEATMAPS
export const renderWeeklyCalorieChart = (historyData, goal) => {
  // Renders a custom editorial SVG bar graph
  // historyData: array of 7 items { day: 'Mon', calories: 1450 }
  const maxCal = Math.max(goal * 1.2, ...historyData.map(d => d.calories));
  const svgWidth = 500;
  const svgHeight = 180;
  const barWidth = 32;
  const spacing = 38;
  const startX = 40;

  let elements = '';

  // Draw Goal line
  const goalY = svgHeight - 30 - ((goal / maxCal) * (svgHeight - 60));
  elements += `
    <line x1="10" y1="${goalY}" x2="${svgWidth - 10}" y2="${goalY}" stroke="rgba(0, 56, 147, 0.2)" stroke-width="2" stroke-dasharray="4 6" />
    <text x="${svgWidth - 65}" y="${goalY - 6}" font-family="Outfit" font-size="10" font-weight="800" fill="rgba(0, 56, 147, 0.5)">GOAL ${goal}</text>
  `;

  historyData.forEach((d, i) => {
    const x = startX + i * (barWidth + spacing);
    const valRatio = d.calories / maxCal;
    const barHeight = valRatio * (svgHeight - 60);
    const y = svgHeight - 30 - barHeight;

    const isGoalMet = d.calories >= goal * 0.9 && d.calories <= goal * 1.1;
    const fillColor = isGoalMet ? 'var(--accent-green)' : (d.calories > goal * 1.1 ? '#d63031' : 'var(--text-navy)');

    elements += `
      <!-- Bar Background slot -->
      <rect x="${x}" y="30" width="${barWidth}" height="${svgHeight - 60}" rx="6" fill="rgba(54, 30, 28, 0.03)" />
      <!-- Calorie Bar -->
      <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="6" fill="${fillColor}" class="chart-bar-rect" style="transform-origin: bottom; animation: barGrow 1s ease forwards;" />
      <!-- Label Calorie Value -->
      <text x="${x + barWidth / 2}" y="${y - 8}" font-family="Outfit" font-size="10" font-weight="900" text-anchor="middle" fill="var(--text-navy)">${d.calories}</text>
      <!-- Day label -->
      <text x="${x + barWidth / 2}" y="${svgHeight - 12}" font-family="Plus Jakarta Sans" font-size="11" font-weight="800" text-anchor="middle" fill="var(--text-brown)" opacity="0.6">${d.day}</text>
    `;
  });

  return `
    <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="svg-editorial-chart" style="width: 100%; height: 100%;">
      ${elements}
    </svg>
  `;
};

export const renderMonthlyHeatmap = (monthName, daysInMonth, loggedDates) => {
  // Renders a grid representing the month's completion
  // loggedDates: object { '2026-07-01': 1420, '2026-07-02': 1850 }
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  const headersHTML = daysOfWeek.map(d => `<div class="heatmap-day-header">${d}</div>`).join('');
  
  // Generate dummy cells for aligning with the starting day of the month
  // Assume July 2026 starts on a Wednesday (2 offset cells)
  let offsetCells = '';
  const firstDayIndex = 2; // Wed
  for (let i = 0; i < firstDayIndex; i++) {
    offsetCells += `<div class="heatmap-cell" style="opacity: 0; pointer-events: none;"></div>`;
  }

  let daysHTML = '';
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `2026-07-${day.toString().padStart(2, '0')}`;
    const loggedCals = loggedDates[dateStr] || 0;
    
    let levelClass = '';
    if (loggedCals > 0) {
      if (loggedCals < 1200) levelClass = 'filled-low';
      else if (loggedCals < 1700) levelClass = 'filled-medium';
      else levelClass = 'filled-high';
    }

    daysHTML += `
      <div class="heatmap-cell ${levelClass}" 
           data-date="${dateStr}" 
           data-calories="${loggedCals}"
           data-date-label="July ${day}: ${loggedCals ? loggedCals + ' kcal' : 'no food logged'}">
      </div>
    `;
  }

  return `
    <div class="heatmap-container">
      <h4 class="editorial-title" style="margin-bottom: 0.8rem; font-size: 1.2rem;">${monthName} streaks</h4>
      <div class="heatmap-grid">
        ${headersHTML}
        ${offsetCells}
        ${daysHTML}
      </div>
    </div>
  `;
};

// 6. EDITORIAL WIDGET COMPONENT (Offline simulation widget)
export const renderWidgetsSection = (consumed, goal, loggedMeals) => {
  const percentage = Math.min(100, Math.round((consumed / goal) * 100)) || 0;
  
  // Conic gradient style
  const conicStyle = `background: conic-gradient(
    var(--plate-cream) 0% ${percentage}%, 
    var(--plate-cream-translucent) ${percentage}% 100%
  )`;

  return `
    <div class="widgets-section">
      <h2 class="editorial-title" style="margin-bottom: 0.5rem;">home screen widgets</h2>
      <p style="margin-bottom: 1.2rem; font-size: 0.9rem;">See how Plate lives on your lockscreen and home screen throughout the day.</p>
      
      <div class="widget-previews-container">
        <!-- Small Widget -->
        <div class="widget-box">
          <div class="widget-tag">Small</div>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100px;">
            <div style="width: 60px; height: 60px; border-radius: 50%; ${conicStyle}; border: 1px solid rgba(54,30,28,0.1); position: relative; box-shadow: inset 0 2px 5px rgba(54,30,28,0.05);">
              <div style="width: 78%; height: 78%; border-radius: 50%; background: var(--plate-cream); position: absolute; top: 11%; left: 11%; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 0.8rem; font-weight: 900;">
                ${percentage}%
              </div>
            </div>
            <div style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; margin-top: 0.4rem; text-transform: lowercase;">plate progress</div>
          </div>
        </div>

        <!-- Medium Widget -->
        <div class="widget-box">
          <div class="widget-tag">Medium</div>
          <div class="widget-medium" style="height: 100px;">
            <div style="width: 80px; height: 80px; border-radius: 50%; ${conicStyle}; border: 1px solid rgba(54,30,28,0.1); position: relative; box-shadow: inset 0 2px 5px rgba(54,30,28,0.05); flex-shrink: 0;">
              <div style="width: 78%; height: 78%; border-radius: 50%; background: var(--plate-cream); position: absolute; top: 11%; left: 11%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 900;">${consumed}</span>
                <span style="font-size: 0.5rem; opacity: 0.6; font-weight: 700;">/${goal}</span>
              </div>
            </div>
            <div style="flex-grow: 1;">
              <h4 style="font-family: var(--font-display); font-size: 1rem; font-weight: 900; margin-bottom: 0.2rem;">today's journal</h4>
              <p style="font-size: 0.75rem; color: var(--text-brown); line-height: 1.2;">
                ${loggedMeals.length ? loggedMeals.map(m => m.items.length ? m.items.map(i => i.name).join(', ') : '').filter(Boolean).slice(0, 2).join(', ') : 'no food logged yet'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
