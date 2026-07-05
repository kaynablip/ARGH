// Indian Vegetarian Food Database for Plate PWA
// Caloric and macronutrient profiles compiled from:
// 1. USDA National Nutrient Database & Indian Food Composition Tables (IFCT 2017) [~70% Base Ingredients]
// 2. Open Food Facts Database [~20% Branded & Packaged Products]
// 3. Hand Curated Recipes [~10% Standard Indian Home Cooked Meals]

export const FOOD_CATEGORIES = {
  RECENT: 'recently eaten',
  FAVORITES: 'favorites',
  SUGGESTED: 'suggested',
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch & dinner',
  SNACKS: 'snacks',
  DAIRY: 'dairy & curd',
  FRUITS: 'fruits',
  VEGETABLES: 'vegetables',
  GRAINS: 'grains & breads',
  PROTEIN: 'protein sources',
  DRINKS: 'drinks & tea',
  CUSTOM: 'my dishes'
};

export const SOURCES = {
  USDA_IFCT: 'USDA & Indian Food Composition Tables (IFCT)',
  OFF: 'Open Food Facts (Branded)',
  HOME_RECIPE: 'Hand Curated (Home Meals)'
};

export const FOOD_DATABASE = [
  // ==========================================
  // SECTION 1: USDA & IFCT (70% - BASE INGREDIENTS)
  // ==========================================

  // GRAINS, FLOURS & RAW STAPLES (per 100g raw)
  {
    id: 'raw_atta',
    name: 'Wheat Flour (Atta, Raw)',
    category: FOOD_CATEGORIES.GRAINS,
    calories: 340,
    protein: 12.0,
    carbs: 72.0,
    fat: 1.8,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (120g)', scale: 1.2 },
      { amount: 1, label: 'tbsp (10g)', scale: 0.1 }
    ],
    illustration: 'chapati',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_rice_basmati',
    name: 'Basmati Rice (Raw)',
    category: FOOD_CATEGORIES.GRAINS,
    calories: 349,
    protein: 8.1,
    carbs: 77.0,
    fat: 0.6,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (180g)', scale: 1.8 }
    ],
    illustration: 'rice',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_besan',
    name: 'Gram Flour (Besan, Raw)',
    category: FOOD_CATEGORIES.GRAINS,
    calories: 387,
    protein: 22.4,
    carbs: 57.8,
    fat: 5.0,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (110g)', scale: 1.1 },
      { amount: 1, label: 'tbsp (10g)', scale: 0.1 }
    ],
    illustration: 'lentils',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_sooji',
    name: 'Semolina (Suji/Rava, Raw)',
    category: FOOD_CATEGORIES.GRAINS,
    calories: 360,
    protein: 12.7,
    carbs: 72.8,
    fat: 1.0,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (150g)', scale: 1.5 }
    ],
    illustration: 'upma',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_ragi',
    name: 'Finger Millet (Ragi, Raw)',
    category: FOOD_CATEGORIES.GRAINS,
    calories: 328,
    protein: 7.3,
    carbs: 72.0,
    fat: 1.3,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (140g)', scale: 1.4 }
    ],
    illustration: 'chapati',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_oats',
    name: 'Rolled Oats (Raw)',
    category: FOOD_CATEGORIES.GRAINS,
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (90g)', scale: 0.9 },
      { amount: 1, label: 'half cup (45g)', scale: 0.45 }
    ],
    illustration: 'bowls',
    source: SOURCES.USDA_IFCT
  },

  // RAW LENTILS & PULSES (per 100g raw)
  {
    id: 'raw_moong_dal',
    name: 'Split Green Gram (Moong Dal, Raw)',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 348,
    protein: 24.5,
    carbs: 59.9,
    fat: 1.2,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (200g)', scale: 2 },
      { amount: 1, label: 'half cup (100g)', scale: 1 }
    ],
    illustration: 'dal',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_chana_dal',
    name: 'Split Bengal Gram (Chana Dal, Raw)',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 372,
    protein: 20.8,
    carbs: 61.2,
    fat: 5.6,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (200g)', scale: 2 }
    ],
    illustration: 'dal',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_toor_dal',
    name: 'Pigeon Peas (Toor/Arhar Dal, Raw)',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 343,
    protein: 22.3,
    carbs: 62.8,
    fat: 1.5,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (200g)', scale: 2 }
    ],
    illustration: 'dal',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_urad_dal',
    name: 'Split Black Gram (Urad Dal, Raw)',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 341,
    protein: 25.2,
    carbs: 58.9,
    fat: 1.6,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (200g)', scale: 2 }
    ],
    illustration: 'dal',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_masoor_dal',
    name: 'Red Lentils (Masoor Dal, Raw)',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 353,
    protein: 25.8,
    carbs: 60.1,
    fat: 1.1,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (200g)', scale: 2 }
    ],
    illustration: 'dal',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_rajma',
    name: 'Red Kidney Beans (Rajma, Raw)',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 333,
    protein: 23.6,
    carbs: 60.0,
    fat: 0.8,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (180g)', scale: 1.8 }
    ],
    illustration: 'lentils',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'raw_kabuli_chana',
    name: 'Chickpeas (Kabuli Chana, Raw)',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 364,
    protein: 19.3,
    carbs: 60.6,
    fat: 6.0,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (180g)', scale: 1.8 }
    ],
    illustration: 'lentils',
    source: SOURCES.USDA_IFCT
  },

  // DAIRY BASE ELEMENTS (per 100g/ml)
  {
    id: 'base_paneer',
    name: 'Cottage Cheese (Paneer, Raw)',
    category: FOOD_CATEGORIES.DAIRY,
    calories: 265,
    protein: 18.3,
    carbs: 1.2,
    fat: 20.8,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 50, label: 'half cup cubes (50g)', scale: 0.5 },
      { amount: 200, label: 'one block (200g)', scale: 2 }
    ],
    illustration: 'paneer',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'base_cow_milk',
    name: 'Whole Cow Milk',
    category: FOOD_CATEGORIES.DAIRY,
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    servingSize: 100,
    servingUnit: 'ml',
    measurements: [
      { amount: 100, label: 'ml', scale: 1 },
      { amount: 1, label: 'glass (200ml)', scale: 2 },
      { amount: 1, label: 'cup (150ml)', scale: 1.5 }
    ],
    illustration: 'tea',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'base_cow_milk_toned',
    name: 'Toned Cow Milk (3% Fat)',
    category: FOOD_CATEGORIES.DAIRY,
    calories: 58,
    protein: 3.2,
    carbs: 4.7,
    fat: 3.0,
    servingSize: 100,
    servingUnit: 'ml',
    measurements: [
      { amount: 100, label: 'ml', scale: 1 },
      { amount: 1, label: 'glass (200ml)', scale: 2 }
    ],
    illustration: 'tea',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'base_curd',
    name: 'Curd / Yogurt (Whole Milk)',
    category: FOOD_CATEGORIES.DAIRY,
    calories: 63,
    protein: 3.3,
    carbs: 5.0,
    fat: 3.3,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'bowl (150g)', scale: 1.5 },
      { amount: 1, label: 'cup (200g)', scale: 2 }
    ],
    illustration: 'curd',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'base_ghee',
    name: 'Ghee (Cow Butterfat)',
    category: FOOD_CATEGORIES.DAIRY,
    calories: 884,
    protein: 0.0,
    carbs: 0.0,
    fat: 99.5,
    servingSize: 10,
    servingUnit: 'g',
    measurements: [
      { amount: 10, label: 'grams', scale: 1 },
      { amount: 1, label: 'teaspoon (5g)', scale: 0.5 },
      { amount: 1, label: 'tablespoon (13g)', scale: 1.3 }
    ],
    illustration: 'kitchen elements',
    source: SOURCES.USDA_IFCT
  },

  // VEGETABLES RAW (per 100g raw)
  {
    id: 'veg_potato',
    name: 'Potato (Raw)',
    category: FOOD_CATEGORIES.VEGETABLES,
    calories: 77,
    protein: 2.0,
    carbs: 17.5,
    fat: 0.1,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'medium (150g)', scale: 1.5 }
    ],
    illustration: 'peas',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'veg_tomato',
    name: 'Tomato (Raw)',
    category: FOOD_CATEGORIES.VEGETABLES,
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'medium (120g)', scale: 1.2 }
    ],
    illustration: 'tomato',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'veg_onion',
    name: 'Onion (Raw)',
    category: FOOD_CATEGORIES.VEGETABLES,
    calories: 40,
    protein: 1.1,
    carbs: 9.3,
    fat: 0.1,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'medium (110g)', scale: 1.1 }
    ],
    illustration: 'onion',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'veg_spinach',
    name: 'Spinach (Palak, Raw)',
    category: FOOD_CATEGORIES.VEGETABLES,
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup chopped (30g)', scale: 0.3 }
    ],
    illustration: 'spinach',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'veg_cauliflower',
    name: 'Cauliflower (Gobi, Raw)',
    category: FOOD_CATEGORIES.VEGETABLES,
    calories: 25,
    protein: 1.9,
    carbs: 5.0,
    fat: 0.3,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup florets (100g)', scale: 1 }
    ],
    illustration: 'peas',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'veg_okra',
    name: 'Okra (Bhindi, Raw)',
    category: FOOD_CATEGORIES.VEGETABLES,
    calories: 33,
    protein: 1.9,
    carbs: 7.5,
    fat: 0.2,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup sliced (80g)', scale: 0.8 }
    ],
    illustration: 'spinach',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'veg_cabbage',
    name: 'Cabbage (Patta Gobi, Raw)',
    category: FOOD_CATEGORIES.VEGETABLES,
    calories: 25,
    protein: 1.3,
    carbs: 5.8,
    fat: 0.1,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup shredded (70g)', scale: 0.7 }
    ],
    illustration: 'spinach',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'veg_green_peas',
    name: 'Green Peas (Matar, Raw)',
    category: FOOD_CATEGORIES.VEGETABLES,
    calories: 81,
    protein: 5.4,
    carbs: 14.5,
    fat: 0.4,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (145g)', scale: 1.45 }
    ],
    illustration: 'peas',
    source: SOURCES.USDA_IFCT
  },

  // FRUITS RAW (per 100g raw)
  {
    id: 'fruit_banana',
    name: 'Banana (Raw)',
    category: FOOD_CATEGORIES.FRUITS,
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'medium (120g)', scale: 1.2 },
      { amount: 1, label: 'small (80g)', scale: 0.8 }
    ],
    illustration: 'banana',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'fruit_apple',
    name: 'Apple (with skin, Raw)',
    category: FOOD_CATEGORIES.FRUITS,
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'medium (180g)', scale: 1.8 }
    ],
    illustration: 'apple',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'fruit_mango',
    name: 'Mango (Raw Slices)',
    category: FOOD_CATEGORIES.FRUITS,
    calories: 60,
    protein: 0.8,
    carbs: 15.0,
    fat: 0.4,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'medium (200g edible)', scale: 2 },
      { amount: 1, label: 'cup slices (150g)', scale: 1.5 }
    ],
    illustration: 'banana',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'fruit_orange',
    name: 'Orange (Raw)',
    category: FOOD_CATEGORIES.FRUITS,
    calories: 47,
    protein: 0.9,
    carbs: 11.8,
    fat: 0.1,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'medium (130g)', scale: 1.3 }
    ],
    illustration: 'apple',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'fruit_pomegranate',
    name: 'Pomegranate Seeds (Raw)',
    category: FOOD_CATEGORIES.FRUITS,
    calories: 83,
    protein: 1.7,
    carbs: 18.7,
    fat: 1.2,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'cup (150g)', scale: 1.5 }
    ],
    illustration: 'apple',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'fruit_papaya',
    name: 'Papaya (Raw Cubes)',
    category: FOOD_CATEGORIES.FRUITS,
    calories: 43,
    protein: 0.5,
    carbs: 10.8,
    fat: 0.3,
    servingSize: 100,
    servingUnit: 'g',
    measurements: [
      { amount: 100, label: 'grams', scale: 1 },
      { amount: 1, label: 'bowl (150g)', scale: 1.5 }
    ],
    illustration: 'banana',
    source: SOURCES.USDA_IFCT
  },

  // NUTS & SEEDS (per 100g raw)
  {
    id: 'nut_almond',
    name: 'Almonds (Raw)',
    category: FOOD_CATEGORIES.SNACKS,
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9,
    servingSize: 28,
    servingUnit: 'g',
    measurements: [
      { amount: 28, label: 'ounce (approx 23 nuts)', scale: 1 },
      { amount: 10, label: '10 almonds (12g)', scale: 0.43 },
      { amount: 100, label: 'grams', scale: 3.57 }
    ],
    illustration: 'banana',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'nut_cashew',
    name: 'Cashew Nuts (Raw)',
    category: FOOD_CATEGORIES.SNACKS,
    calories: 553,
    protein: 18.2,
    carbs: 30.2,
    fat: 43.8,
    servingSize: 28,
    servingUnit: 'g',
    measurements: [
      { amount: 28, label: 'ounce (18 nuts)', scale: 1 },
      { amount: 10, label: '10 cashews (15g)', scale: 0.54 }
    ],
    illustration: 'banana',
    source: SOURCES.USDA_IFCT
  },
  {
    id: 'nut_peanut',
    name: 'Peanuts (Raw)',
    category: FOOD_CATEGORIES.SNACKS,
    calories: 567,
    protein: 25.8,
    carbs: 16.1,
    fat: 49.2,
    servingSize: 28,
    servingUnit: 'g',
    measurements: [
      { amount: 28, label: 'handful', scale: 1 },
      { amount: 100, label: 'grams', scale: 3.57 }
    ],
    illustration: 'banana',
    source: SOURCES.USDA_IFCT
  },

  // ==========================================
  // SECTION 2: OPEN FOOD FACTS (20% - BRANDED PRODUCTS)
  // ==========================================

  // SUPPLEMENTS
  {
    id: 'brand_myprotein_whey',
    name: 'MyProtein Impact Whey (1 scoop)',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 103,
    protein: 21.0,
    carbs: 1.0,
    fat: 1.9,
    servingSize: 25,
    servingUnit: 'g',
    measurements: [
      { amount: 1, label: 'scoop (25g)', scale: 1 },
      { amount: 2, label: 'two scoops (50g)', scale: 2 }
    ],
    illustration: 'tofu',
    source: SOURCES.OFF
  },
  {
    id: 'brand_on_gold_whey',
    name: 'Optimum Nutrition Gold Standard Whey',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 120,
    protein: 24.0,
    carbs: 3.0,
    fat: 1.5,
    servingSize: 31,
    servingUnit: 'g',
    measurements: [
      { amount: 1, label: 'scoop (31g)', scale: 1 },
      { amount: 2, label: 'two scoops (62g)', scale: 2 }
    ],
    illustration: 'tofu',
    source: SOURCES.OFF
  },
  {
    id: 'brand_muscleblaze_whey',
    name: 'MuscleBlaze Raw Whey Protein',
    category: FOOD_CATEGORIES.PROTEIN,
    calories: 120,
    protein: 24.0,
    carbs: 4.0,
    fat: 1.0,
    servingSize: 30,
    servingUnit: 'g',
    measurements: [
      { amount: 1, label: 'scoop (30g)', scale: 1 }
    ],
    illustration: 'tofu',
    source: SOURCES.OFF
  },

  // DAIRY BRANDS IN INDIA
  {
    id: 'brand_amul_butter',
    name: 'Amul Butter (Salted)',
    category: FOOD_CATEGORIES.DAIRY,
    calories: 720,
    protein: 0.6,
    carbs: 0.0,
    fat: 80.0,
    servingSize: 10,
    servingUnit: 'g',
    measurements: [
      { amount: 10, label: 'cube (10g)', scale: 1 },
      { amount: 1, label: 'teaspoon (5g)', scale: 0.5 },
      { amount: 1, label: 'tablespoon (14g)', scale: 1.4 }
    ],
    illustration: 'kitchen elements',
    source: SOURCES.OFF
  },
  {
    id: 'brand_amul_cheese_slice',
    name: 'Amul Cheese Slice',
    category: FOOD_CATEGORIES.DAIRY,
    calories: 62,
    protein: 4.0,
    carbs: 0.5,
    fat: 5.0,
    servingSize: 1,
    servingUnit: 'slice',
    measurements: [
      { amount: 1, label: 'slice (20g)', scale: 1 },
      { amount: 2, label: 'two slices', scale: 2 }
    ],
    illustration: 'paneer',
    source: SOURCES.OFF
  },
  {
    id: 'brand_amul_masti_dahi',
    name: 'Amul Masti Spiced Buttermilk',
    category: FOOD_CATEGORIES.DRINKS,
    calories: 27,
    protein: 1.2,
    carbs: 1.8,
    fat: 1.5,
    servingSize: 200,
    servingUnit: 'ml',
    measurements: [
      { amount: 1, label: 'pack (200ml)', scale: 1 }
    ],
    illustration: 'curd',
    source: SOURCES.OFF
  },

  // PACKAGED FOODS & SNACKS
  {
    id: 'brand_britannia_wheat_bread',
    name: 'Britannia 100% Whole Wheat Bread',
    category: FOOD_CATEGORIES.GRAINS,
    calories: 65,
    protein: 2.7,
    carbs: 12.0,
    fat: 0.7,
    servingSize: 1,
    servingUnit: 'slice',
    measurements: [
      { amount: 1, label: 'slice (25g)', scale: 1 },
      { amount: 2, label: '2 slices', scale: 2 }
    ],
    illustration: 'kitchen elements',
    source: SOURCES.OFF
  },
  {
    id: 'brand_maggi_noodles',
    name: 'Maggi 2-Minute Masala Noodles',
    category: FOOD_CATEGORIES.SNACKS,
    calories: 292,
    protein: 6.0,
    carbs: 43.0,
    fat: 10.5,
    servingSize: 70,
    servingUnit: 'g',
    measurements: [
      { amount: 1, label: 'single pack (70g)', scale: 1 },
      { amount: 2, label: 'double pack (140g)', scale: 2 }
    ],
    illustration: 'khichdi',
    source: SOURCES.OFF
  },
  {
    id: 'brand_parleg_biscuit',
    name: 'Parle-G Glucose Biscuits',
    category: FOOD_CATEGORIES.SNACKS,
    calories: 72,
    protein: 1.0,
    carbs: 12.0,
    fat: 2.2,
    servingSize: 3,
    servingUnit: 'biscuits',
    measurements: [
      { amount: 3, label: '3 biscuits (15g)', scale: 1 },
      { amount: 6, label: '6 biscuits (30g)', scale: 2 },
      { amount: 1, label: 'single biscuit', scale: 0.33 }
    ],
    illustration: 'chapati',
    source: SOURCES.OFF
  },
  {
    id: 'brand_sofit_soymilk',
    name: 'Sofit Soy Milk (Unsweetened)',
    category: FOOD_CATEGORIES.DRINKS,
    calories: 39,
    protein: 3.2,
    carbs: 0.9,
    fat: 2.5,
    servingSize: 200,
    servingUnit: 'ml',
    measurements: [
      { amount: 1, label: 'glass (200ml)', scale: 1 },
      { amount: 250, label: 'pack (250ml)', scale: 1.25 }
    ],
    illustration: 'tea',
    source: SOURCES.OFF
  },
  {
    id: 'brand_epigamia_almond_milk',
    name: 'Epigamia Unsweetened Almond Milk',
    category: FOOD_CATEGORIES.DRINKS,
    calories: 24,
    protein: 0.8,
    carbs: 0.4,
    fat: 2.2,
    servingSize: 200,
    servingUnit: 'ml',
    measurements: [
      { amount: 1, label: 'glass (200ml)', scale: 1 }
    ],
    illustration: 'tea',
    source: SOURCES.OFF
  },

  // ==========================================
  // SECTION 3: HAND CURATED (10% - RECIPES / HOME MEALS)
  // ==========================================
  {
    id: 'recipe_dal_rice',
    name: 'Dal Rice (Home style, cooked)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 320,
    protein: 9.8,
    carbs: 62.0,
    fat: 3.5,
    servingSize: 1,
    servingUnit: 'bowl',
    measurements: [
      { amount: 1, label: 'standard bowl (250g)', scale: 1 },
      { amount: 1, label: 'large plate (400g)', scale: 1.6 }
    ],
    illustration: 'rice',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_rajma_chawal',
    name: 'Rajma Chawal (Red Kidney Beans + Rice)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 380,
    protein: 12.2,
    carbs: 70.0,
    fat: 5.5,
    servingSize: 1,
    servingUnit: 'plate',
    measurements: [
      { amount: 1, label: 'standard plate (350g)', scale: 1 },
      { amount: 1, label: 'large thali', scale: 1.4 }
    ],
    illustration: 'rice',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_chole_bhature',
    name: 'Chole Bhature (2 Bhaturas + Curry)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 650,
    protein: 15.0,
    carbs: 85.0,
    fat: 28.0,
    servingSize: 1,
    servingUnit: 'plate',
    measurements: [
      { amount: 1, label: 'standard plate', scale: 1 }
    ],
    illustration: 'dosa',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_palak_paneer_meal',
    name: 'Palak Paneer with Roti (1 bowl + 2 rotis)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 380,
    protein: 16.5,
    carbs: 42.0,
    fat: 16.0,
    servingSize: 1,
    servingUnit: 'meal',
    measurements: [
      { amount: 1, label: 'standard meal', scale: 1 }
    ],
    illustration: 'paneer',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_aloo_gobi_roti',
    name: 'Aloo Gobi Curry with Roti (1 bowl + 2 rotis)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 300,
    protein: 7.8,
    carbs: 48.0,
    fat: 8.5,
    servingSize: 1,
    servingUnit: 'meal',
    measurements: [
      { amount: 1, label: 'standard meal', scale: 1 }
    ],
    illustration: 'chapati',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_bhindi_roti',
    name: 'Bhindi Masala with Roti (1 bowl + 2 rotis)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 280,
    protein: 7.2,
    carbs: 42.0,
    fat: 9.0,
    servingSize: 1,
    servingUnit: 'meal',
    measurements: [
      { amount: 1, label: 'standard meal', scale: 1 }
    ],
    illustration: 'chapati',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_poha_home',
    name: 'Poha (Home cooked with peanuts)',
    category: FOOD_CATEGORIES.BREAKFAST,
    calories: 250,
    protein: 4.5,
    carbs: 45.0,
    fat: 6.0,
    servingSize: 1,
    servingUnit: 'bowl',
    measurements: [
      { amount: 1, label: 'standard bowl (150g)', scale: 1 },
      { amount: 1, label: 'plate', scale: 1.2 }
    ],
    illustration: 'poha',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_upma_home',
    name: 'Upma (Home style with vegetables)',
    category: FOOD_CATEGORIES.BREAKFAST,
    calories: 220,
    protein: 4.8,
    carbs: 38.0,
    fat: 5.0,
    servingSize: 1,
    servingUnit: 'bowl',
    measurements: [
      { amount: 1, label: 'standard bowl (150g)', scale: 1 }
    ],
    illustration: 'upma',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_idli_sambar',
    name: 'Idli Sambar (2 idlis + 1 bowl Sambar)',
    category: FOOD_CATEGORIES.BREAKFAST,
    calories: 210,
    protein: 5.5,
    carbs: 44.0,
    fat: 1.5,
    servingSize: 1,
    servingUnit: 'plate',
    measurements: [
      { amount: 1, label: 'standard plate', scale: 1 }
    ],
    illustration: 'idli',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_masala_dosa',
    name: 'Masala Dosa (with chutney & sambar)',
    category: FOOD_CATEGORIES.BREAKFAST,
    calories: 340,
    protein: 5.8,
    carbs: 58.0,
    fat: 9.5,
    servingSize: 1,
    servingUnit: 'piece',
    measurements: [
      { amount: 1, label: 'standard piece', scale: 1 }
    ],
    illustration: 'dosa',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_khichdi_ghee',
    name: 'Moong Dal Khichdi (with 1 tsp ghee)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 250,
    protein: 7.2,
    carbs: 40.0,
    fat: 5.5,
    servingSize: 1,
    servingUnit: 'bowl',
    measurements: [
      { amount: 1, label: 'standard bowl (200g)', scale: 1 },
      { amount: 1.5, label: 'large bowl', scale: 1.5 }
    ],
    illustration: 'khichdi',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_veg_pulao',
    name: 'Vegetable Pulao (Cooked)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 240,
    protein: 5.2,
    carbs: 45.0,
    fat: 4.8,
    servingSize: 1,
    servingUnit: 'bowl',
    measurements: [
      { amount: 1, label: 'standard bowl (200g)', scale: 1 },
      { amount: 1.5, label: 'plate', scale: 1.5 }
    ],
    illustration: 'khichdi',
    source: SOURCES.HOME_RECIPE
  },
  {
    id: 'recipe_curd_rice',
    name: 'Curd Rice (Home style, tempered)',
    category: FOOD_CATEGORIES.LUNCH,
    calories: 210,
    protein: 5.0,
    carbs: 34.0,
    fat: 5.5,
    servingSize: 1,
    servingUnit: 'bowl',
    measurements: [
      { amount: 1, label: 'standard bowl (200g)', scale: 1 }
    ],
    illustration: 'curd',
    source: SOURCES.HOME_RECIPE
  }
];

export const getMergedDatabase = () => {
  const localCustom = localStorage.getItem('plate_custom_foods');
  let customList = [];
  if (localCustom) {
    try {
      customList = JSON.parse(localCustom);
    } catch (e) {
      console.error('Error parsing custom foods:', e);
    }
  }
  return [...FOOD_DATABASE, ...customList];
};

// Add metadata properties to foods to make search expansion easy.
export const searchFood = (query) => {
  if (!query) return [];
  const normalizedQuery = query.toLowerCase().trim();
  return getMergedDatabase().filter(food => 
    food.name.toLowerCase().includes(normalizedQuery) ||
    food.category.toLowerCase().includes(normalizedQuery) ||
    (food.source && food.source.toLowerCase().includes(normalizedQuery))
  );
};

export const getSuggestedFoods = () => {
  // Return items that make good default suggestions
  const defaultSuggestions = ['recipe_poha_home', 'recipe_dal_rice', 'recipe_rajma_chawal', 'base_curd', 'fruit_banana', 'base_paneer', 'brand_myprotein_whey', 'protein_powder'];
  return getMergedDatabase().filter(food => defaultSuggestions.includes(food.id));
};

export const getFoodsByCategory = (category) => {
  return getMergedDatabase().filter(food => food.category === category);
};
