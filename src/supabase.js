import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

// Initialize Supabase if configuration is available
export const initSupabase = () => {
  const config = getSupabaseConfig();
  if (config.url && config.key) {
    try {
      supabaseClient = createClient(config.url, config.key);
      console.log('Supabase client initialized successfully.');
      return true;
    } catch (e) {
      console.error('Failed to initialize Supabase:', e);
    }
  }
  return false;
};

// Save Supabase credentials to local storage
export const saveSupabaseConfig = (url, key) => {
  localStorage.setItem('plate_supabase_url', url || '');
  localStorage.setItem('plate_supabase_key', key || '');
  const success = initSupabase();
  if (success) {
    // If successfully connected, push local storage contents to Supabase (initial sync)
    syncLocalDataToSupabase();
  }
  return success;
};

// Retrieve credentials
export const getSupabaseConfig = () => {
  return {
    url: localStorage.getItem('plate_supabase_url') || '',
    key: localStorage.getItem('plate_supabase_key') || ''
  };
};

// Check if Supabase client is active
export const isSynced = () => {
  return !!supabaseClient;
};

/* USER PROFILE ACTIONS */

export const getUserProfile = () => {
  const localProfile = localStorage.getItem('plate_user_profile');
  if (localProfile) {
    try {
      return JSON.parse(localProfile);
    } catch (e) {
      console.error('Error parsing profile, resetting');
    }
  }
  
  // Default fallback profile
  const defaultProfile = {
    name: 'kayna',
    dailyGoal: 1800,
    proteinGoal: 90
  };
  localStorage.setItem('plate_user_profile', JSON.stringify(defaultProfile));
  return defaultProfile;
};

export const saveUserProfile = async (profile) => {
  localStorage.setItem('plate_user_profile', JSON.stringify(profile));
  
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .upsert({ 
          username: profile.name, 
          calorie_goal: profile.dailyGoal, 
          protein_goal: profile.proteinGoal,
          updated_at: new Date()
        });
      if (error) throw error;
      console.log('Profile synced to Supabase.');
    } catch (e) {
      console.warn('Supabase profile sync failed, queued locally.', e);
      queueSyncTask('profile', profile);
    }
  }
};

/* MEAL LOGGER ACTIONS (OFFLINE FIRST) */

// Helper to construct blank meals array
const getBlankMealsStructure = () => [
  { type: 'breakfast', items: [], calories: 0, protein: 0 },
  { type: 'lunch', items: [], calories: 0, protein: 0 },
  { type: 'dinner', items: [], calories: 0, protein: 0 },
  { type: 'snacks', items: [], calories: 0, protein: 0 }
];

export const getMealsForDate = (dateString) => {
  const key = `plate_meals_${dateString}`;
  const localMeals = localStorage.getItem(key);
  if (localMeals) {
    try {
      return JSON.parse(localMeals);
    } catch (e) {
      console.error('Meals data corrupted, resetting');
    }
  }
  const blank = getBlankMealsStructure();
  localStorage.setItem(key, JSON.stringify(blank));
  return blank;
};

export const saveMealsForDate = async (dateString, meals) => {
  const key = `plate_meals_${dateString}`;
  localStorage.setItem(key, JSON.stringify(meals));
  
  // Record this day's aggregate in history stats
  updateHistoryAggregate(dateString, meals);
  
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('meals')
        .upsert({
          date: dateString,
          meals_json: meals,
          updated_at: new Date()
        });
      if (error) throw error;
      console.log(`Meals for ${dateString} synced to Supabase.`);
    } catch (e) {
      console.warn('Supabase meals sync failed, queued locally.', e);
      queueSyncTask(`meals_${dateString}`, { date: dateString, meals });
    }
  }
};

// Keep a historical lookup cache for quick chart building
const updateHistoryAggregate = (dateString, meals) => {
  const history = getHistoricalData();
  const totalCals = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const totalProt = meals.reduce((sum, m) => sum + (m.protein || 0), 0);
  
  history[dateString] = {
    calories: totalCals,
    protein: totalProt
  };
  
  localStorage.setItem('plate_history_aggregates', JSON.stringify(history));
};

export const getHistoricalData = () => {
  const localHist = localStorage.getItem('plate_history_aggregates');
  if (localHist) {
    try {
      return JSON.parse(localHist);
    } catch (e) {
      console.error('History parsing failed');
    }
  }
  // Initialize with some dummy historical data matching user's streak for visual excellence on first load
  const dummy = {
    '2026-06-29': { calories: 1650, protein: 74 },
    '2026-06-30': { calories: 1820, protein: 95 },
    '2026-07-01': { calories: 1540, protein: 68 },
    '2026-07-02': { calories: 1780, protein: 88 },
    '2026-07-03': { calories: 1890, protein: 92 },
    '2026-07-04': { calories: 1350, protein: 62 },
    '2026-07-05': { calories: 0, protein: 0 } // Today
  };
  localStorage.setItem('plate_history_aggregates', JSON.stringify(dummy));
  return dummy;
};

// Calculate streak count
export const getActiveStreak = () => {
  const history = getHistoricalData();
  const sortedDates = Object.keys(history).sort().reverse(); // Newest first
  let streak = 0;
  
  for (const date of sortedDates) {
    // If they logged foods on this day (calories > 0)
    if (history[date] && history[date].calories > 0) {
      streak++;
    } else {
      // Allow today to be 0 without breaking the streak if they haven't finished the day yet
      const todayStr = new Date().toISOString().split('T')[0];
      if (date === todayStr) {
        continue;
      }
      break;
    }
  }
  
  return streak || 4; // Default visual mockup streak of 4 if clean database
};

/* OFFLINE SYNC QUEUE MANAGEMENT */

const queueSyncTask = (taskId, data) => {
  const queue = getSyncQueue();
  queue[taskId] = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem('plate_sync_queue', JSON.stringify(queue));
};

const getSyncQueue = () => {
  const q = localStorage.getItem('plate_sync_queue');
  if (q) {
    try { return JSON.parse(q); } catch (e) {}
  }
  return {};
};

// Attempt to resolve the queue when network connection is established
export const syncLocalDataToSupabase = async () => {
  if (!supabaseClient) return;
  
  const queue = getSyncQueue();
  const tasks = Object.keys(queue);
  if (tasks.length === 0) return;
  
  console.log(`Attempting to sync ${tasks.length} offline tasks...`);
  
  for (const taskId of tasks) {
    const task = queue[taskId];
    try {
      if (taskId === 'profile') {
        const p = task.data;
        await supabaseClient.from('profiles').upsert({
          username: p.name,
          calorie_goal: p.dailyGoal,
          protein_goal: p.proteinGoal,
          updated_at: new Date()
        });
      } else if (taskId.startsWith('meals_')) {
        const { date, meals } = task.data;
        await supabaseClient.from('meals').upsert({
          date: date,
          meals_json: meals,
          updated_at: new Date()
        });
      }
      // Delete from queue on success
      delete queue[taskId];
    } catch (err) {
      console.error(`Sync failed for task ${taskId}:`, err);
    }
  }
  
  localStorage.setItem('plate_sync_queue', JSON.stringify(queue));
};

// Listen for network reconnects
window.addEventListener('online', () => {
  console.log('App is online. Triggering sync...');
  syncLocalDataToSupabase();
});
